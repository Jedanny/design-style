# Design Style Matcher 安装指南

> **设计风格参考来源**: [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) by [VoltAgent](https://github.com/VoltAgent)

58 个设计系统的 Skill，支持 Claude Code / Cursor / Codex / OpenCode / Gemini CLI。

## 安装方式

### Claude Code (推荐: Marketplace)

```bash
/plugin install design-style-matcher@claude-plugins-official
```

或手动安装：

```bash
# 1. 克隆仓库
git clone https://github.com/Jedanny/design-style.git ~/.claude/skills/design-style

# 2. 重启 Claude Code
```

### Claude Code (自建 Marketplace)

```bash
# 添加 marketplace
/plugin marketplace add Jedanny/design-style-marketplace

# 安装
/plugin install design-style-matcher@design-style-matcher-marketplace
```

### Cursor

```bash
# 在 Cursor Agent chat 中
/add-plugin design-style-matcher

# 或搜索 "design-style-matcher" 在 plugin marketplace
```

### Codex

```bash
# 1. 克隆仓库
git clone https://github.com/Jedanny/design-style.git ~/.codex/design-style

# 2. 创建 symlink
mkdir -p ~/.agents/skills
ln -s ~/.codex/design-style/skills ~/.agents/skills/design-style

# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\design-style" "$env:USERPROFILE\.codex\design-style\skills"

# 3. 重启 Codex
```

### OpenCode

在 `opencode.json` 中添加 plugin：

```json
{
  "plugin": ["design-style@git+https://github.com/Jedanny/design-style.git"]
}
```

然后重启 OpenCode。

### Gemini CLI

```bash
gemini extensions install https://github.com/Jedanny/design-style

# 更新
gemini extensions update design-style-matcher
```

---

## 使用方式

### 触发 Skill

当提到以下内容时，Skill 会自动激活：

- 特定网站："make it like Vercel"、"参照 Airbnb"
- 设计风格："minimal dark theme"、"科技感"
- UI 生成："create a landing page like Linear"

### 三种使用模式

#### 1. 直接指定
```
User: "make it look like Stripe"
→ 自动加载 Stripe 设计系统
```

#### 2. 交互选择
```
User: "show me some design options"
→ 打开 Web 预览界面进行视觉浏览
```

#### 3. 分类筛选
```
User: "I want something minimal and developer-focused"
→ 展示 Developer Tools 分类下的选项
```

### Web 预览

直接在浏览器打开：

```bash
open assets/preview.html
```

功能：
- 58 个设计系统视觉画廊
- 分类筛选 (AI/ML、开发者工具、金融、汽车等)
- 搜索功能
- 深色/浅色模式切换
- 点击颜色复制 hex 值
- "Use This Style" 一键复制设计 token

---

## CLI 工具

```bash
# 列出所有设计
node bin/cli.js list

# 获取指定设计详情
node bin/cli.js get vercel

# 打开 Web 预览
node bin/cli.js preview

# 验证 skill 结构
node bin/cli.js validate
```

---

## 包含的设计系统 (58 个)

| 分类 | 品牌 |
|------|------|
| AI/ML | Anthropic, OpenAI, Midjourney, Character.AI, Cohere, ElevenLabs, MiniMax, Mistral AI, Ollama, Replicate, Together AI, x.ai |
| 开发者工具 | Vercel, Linear, Raycast, Fig, Sentry, HashiCorp, Expo, ClickHouse, MongoDB, Supabase, Sanity, Resend, Mintlify, Lovable, OpenCode.ai, VoltAgent |
| 设计 & 生产力 | Figma, Framer, Webflow, Cal.com, Miro, Notion, Cursor, Superhuman, PostHog, Intercom, Zapier, Airtable, Composio |
| 金融 | Stripe, Coinbase, Kraken, Revolut, Wise |
| 企业 | IBM, SpaceX, NVIDIA, Uber |
| 汽车 | Tesla, BMW, Ferrari, Lamborghini, Renault |
| 消费 | Airbnb, Apple, Pinterest, Spotify, Runway |

---

## 更新

```bash
# Claude Code
/plugin update design-style-matcher

# Codex
cd ~/.codex/design-style && git pull

# 其他平台
# 重启即可自动更新
```

---

## 卸载

```bash
# Claude Code
/plugin uninstall design-style-matcher

# Codex
rm ~/.agents/skills/design-style
rm -rf ~/.codex/design-style

# OpenCode
# 从 opencode.json 中移除 plugin 配置

# Gemini CLI
gemini extensions uninstall design-style-matcher
```
