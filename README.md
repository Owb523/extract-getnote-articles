# Get笔记文案提取工具

一个 Claude Code Skill，用于自动提取 Get笔记知识库中的所有文章，保存为 Markdown 文件。

## 功能特点

- 🚀 自动提取知识库中的所有文章
- 📝 保存为格式化的 Markdown 文件
- ⚡ 速度约 10 篇/分钟
- 📊 实时显示提取进度和速度
- 🔄 自动处理分页
- 💾 自动保存到以知识库ID命名的文件夹

## 安装

### 一键安装（推荐）

```bash
curl -fsSL https://raw.githubusercontent.com/你的用户名/extract-getnote-articles/main/install.sh | bash
```

安装脚本会询问你是要全局安装（所有项目可用）还是安装到当前项目。

### 手动安装

**全局安装（所有项目可用）：**

```bash
git clone https://github.com/你的用户名/extract-getnote-articles.git ~/.claude/skills/extract-getnote-articles
cd ~/.claude/skills/extract-getnote-articles
npm install
```

**项目级安装：**

```bash
git clone https://github.com/你的用户名/extract-getnote-articles.git ./skills/extract-getnote-articles
cd ./skills/extract-getnote-articles
npm install
```

## 使用方法

### 第一步：订阅知识库

在 Get笔记 APP 中，通过"知识库"功能订阅你想要提取的博主。

### 第二步：获取知识库URL

打开博主的知识库页面，复制完整的浏览器地址：

```
https://www.biji.com/subject/QYARpjM0/DEFAULT?followId=785142&followName=...
```

### 第三步：使用 Skill

在 Claude Code 中，直接用自然语言告诉 Claude：

```
提取这个知识库的文章：https://www.biji.com/subject/QYARpjM0/DEFAULT?followId=...
```

或者使用 skill 命令：

```
/extract-getnote-articles https://www.biji.com/subject/QYARpjM0/DEFAULT?followId=...
```

### 首次使用

- 浏览器会自动打开
- 如果未登录，会显示登录提示页面
- 在浏览器中登录 Get笔记账号
- 登录成功后，脚本会自动开始提取
- 文章会保存在以知识库ID命名的文件夹中

## 输出

提取的文章会保存在项目根目录下，以知识库ID命名的文件夹中：

```
项目根目录/
├── skills/
│   └── extract-getnote-articles/
└── QYARpjM0/              # 提取的文章
    ├── 001_文章标题.md
    ├── 002_文章标题.md
    └── ...
```

每篇文章包含：
- 标题
- 原链接
- 完整正文内容

## 性能

- 提取速度：约 10 篇/分钟
- 自动分页：自动处理所有页面
- 实时反馈：显示提取进度、速度和用时

## 技术栈

- Node.js
- Playwright（浏览器自动化）
- Claude Code Skill 系统

## 注意事项

- 需要有 Get笔记账号并已登录
- 需要在 Get笔记 APP 中订阅目标知识库
- 首次运行需要在浏览器中登录，之后会保持登录状态
- 提取的文章仅供个人学习使用，请尊重原作者版权

## 许可

MIT
