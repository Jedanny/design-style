# Design Style Matcher

> **设计风格参考来源**: [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) by [VoltAgent](https://github.com/VoltAgent)

58 个设计系统，支持像素级 UI 生成。匹配任意网站的设计风格。

## 快速开始

```bash
# 列出所有设计
node bin/cli.js list

# 获取指定设计
node bin/cli.js get vercel

# 打开 Web 预览
node bin/cli.js preview

# 验证 skill 结构
node bin/cli.js validate
```

## 多平台支持

| 平台 | 安装方式 |
|------|----------|
| Claude Code | `/plugin install design-style@claude-plugins-official` |
| Cursor | `/add-plugin design-style` |
| Codex | `~/.codex/design-style` + symlink |
| OpenCode | `opencode.json` plugin 配置 |
| Gemini CLI | `gemini extensions install` |

## 使用方式

### 直接指定
```
User: "make it look like Stripe"
→ 加载 references/designs/stripe/DESIGN.md
```

### Web 引导选择
```
User: "show me some design options"
→ 打开 assets/preview.html
```

### 分类筛选
```
User: "I want minimal developer-focused"
→ 按 Developer Tools 分类筛选
```

## 包含设计系统

| 分类 | 数量 | 示例 |
|------|------|------|
| AI/ML | 12 | Anthropic, OpenAI, Midjourney |
| 开发者工具 | 16 | Vercel, Linear, Raycast |
| 设计 & 生产力 | 13 | Figma, Notion, Framer |
| 金融 | 5 | Stripe, Coinbase |
| 企业 | 4 | IBM, SpaceX, NVIDIA |
| 汽车 | 5 | Tesla, BMW, Ferrari |
| 消费 | 8 | Airbnb, Apple, Spotify |

## 项目结构

```
design-style/
├── SKILL.md                      # Skill 定义
├── scripts/                      # 工具脚本
├── references/designs/            # 58 个 DESIGN.md
├── assets/preview.html           # Web 预览界面
├── bin/cli.js                    # CLI 工具
├── hooks/                        # Session hooks
├── .claude-plugin/               # Claude Code plugin
├── .cursor-plugin/               # Cursor plugin
├── .github/workflows/            # CI/CD
```

## 发布

```bash
# 发布到 git 和 Skill Hub
./scripts/publish_skill.sh 1.0.0
```

## License

MIT
