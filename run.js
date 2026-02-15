const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 从URL或直接的ID中提取知识库ID
function extractTopicId(urlOrId) {
  // 如果是URL，提取ID
  const urlMatch = urlOrId.match(/subject\/([^\/\?]+)/);
  if (urlMatch) {
    return urlMatch[1];
  }
  // 否则假设就是ID
  return urlOrId;
}

// 检查输入是否为完整URL
function isFullUrl(input) {
  return input.startsWith('http://') || input.startsWith('https://');
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('❌ 错误：请提供知识库URL或ID');
    console.log('');
    console.log('用法：');
    console.log('  node run.js <URL或ID> [输出目录]');
    console.log('');
    console.log('示例：');
    console.log('  node run.js https://www.biji.com/subject/ABC123/DEFAULT');
    console.log('  node run.js ABC123');
    console.log('  node run.js ABC123 "自定义目录名"');
    process.exit(1);
  }

  const urlOrId = args[0];
  const topicId = extractTopicId(urlOrId);
  // 输出目录应该在项目根目录（skills的上两级）
  const outputDirName = args[1] || topicId;
  const outputDir = `../../${outputDirName}`;

  console.log('=== Get笔记文案提取工具 ===');
  console.log(`输入: ${urlOrId}`);
  console.log(`知识库ID: ${topicId}`);
  console.log(`输出目录: ${outputDirName}`);
  console.log('');

  // 调用原始的 extract.js
  // 如果是完整URL，传递完整URL；否则只传递ID
  const { spawn } = require('child_process');
  const extract = spawn('node', ['extract.js', urlOrId, outputDir, '0', '0'], {
    stdio: 'inherit',
    cwd: __dirname
  });

  extract.on('close', (code) => {
    process.exit(code);
  });
}

main().catch(console.error);
