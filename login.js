const { chromium } = require('playwright');
const path = require('path');

async function login() {
  console.log('=== Get笔记登录工具 ===\n');
  console.log('启动浏览器...');

  const userDataDir = path.join(__dirname, 'chrome-user-data');

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    channel: 'chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await context.newPage();

  console.log('正在打开登录页面...');
  await page.goto('https://www.biji.com');

  console.log('\n请在浏览器中完成登录...');
  console.log('脚本会自动检测登录状态，登录成功后会自动关闭\n');

  // 每5秒检查一次是否登录成功
  let attempts = 0;
  const maxAttempts = 60; // 最多等待5分钟

  while (attempts < maxAttempts) {
    await page.waitForTimeout(5000);
    attempts++;

    try {
      // 检查是否有表格元素（登录成功的标志）
      const hasTable = await page.evaluate(() => {
        return document.querySelectorAll('tbody tr').length > 0;
      });

      if (hasTable) {
        console.log('\n✅ 登录成功！');
        console.log('登录状态已保存，下次运行提取脚本时不需要再登录');
        await context.close();
        process.exit(0);
      }

      console.log(`检查登录状态... (${attempts}/${maxAttempts})`);
    } catch (e) {
      // 继续等待
    }
  }

  console.log('\n⏱️  等待超时');
  console.log('如果已经登录，请手动关闭浏览器并重新运行脚本');
  await context.close();
  process.exit(1);
}

login().catch(console.error);
