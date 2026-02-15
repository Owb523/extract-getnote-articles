#!/bin/bash

set -e

echo "🚀 Get笔记文案提取工具 - 安装脚本"
echo ""

# 检查是否安装了 git
if ! command -v git &> /dev/null; then
    echo "❌ 错误：未找到 git，请先安装 git"
    exit 1
fi

# 检查是否安装了 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 错误：未找到 npm，请先安装 Node.js"
    exit 1
fi

# 询问安装位置
echo "请选择安装位置："
echo "1) 全局安装（所有项目可用）- ~/.claude/skills/"
echo "2) 当前项目安装 - ./skills/"
echo ""
read -p "请输入选项 (1 或 2): " choice

case $choice in
    1)
        INSTALL_DIR="$HOME/.claude/skills/extract-getnote-articles"
        echo ""
        echo "📦 安装到全局目录: $INSTALL_DIR"
        ;;
    2)
        INSTALL_DIR="./skills/extract-getnote-articles"
        echo ""
        echo "📦 安装到当前项目: $INSTALL_DIR"
        ;;
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

# 创建父目录
mkdir -p "$(dirname "$INSTALL_DIR")"

# 克隆仓库
echo ""
echo "⬇️  下载中..."
if [ -d "$INSTALL_DIR" ]; then
    echo "⚠️  目录已存在，正在更新..."
    cd "$INSTALL_DIR"
    git pull
else
    git clone https://github.com/你的用户名/extract-getnote-articles.git "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi

# 安装依赖
echo ""
echo "📚 安装依赖..."
cd "$INSTALL_DIR"
npm install

echo ""
echo "✅ 安装完成！"
echo ""
echo "使用方法："
echo "在 Claude Code 中，直接告诉 Claude："
echo '  "提取这个知识库的文章：https://www.biji.com/subject/xxx/DEFAULT?..."'
echo ""
echo "或使用命令："
echo "  /extract-getnote-articles <知识库URL>"
echo ""
