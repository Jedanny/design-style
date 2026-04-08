# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Design Style Matcher - 58 个设计系统，支持 Claude Code / Codex / Cursor / OpenCode / Gemini CLI 多平台，发布到 Git 和 Skill Hub。

> **设计风格参考来源**: [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) by [VoltAgent](https://github.com/VoltAgent)

## 渐进式披露 (Progressive Disclosure)

三层加载系统：

1. **Layer 1 - Metadata** (~100 words): YAML frontmatter — 始终在 context
2. **Layer 2 - SKILL.md body** (<5k words): 触发时加载
3. **Layer 3 - Bundled resources**: `references/designs/*.md` + `assets/preview.html` — 按需加载

## 开发命令

```bash
# CLI 工具
node bin/cli.js list           # 列出 58 个设计
node bin/cli.js get <name>     # 获取指定设计
node bin/cli.js preview        # 打开 Web 预览
node bin/cli.js validate       # 验证 skill 结构

# 脚本工具
python3 scripts/quick_validate.py .
python3 scripts/package_skill.py . dist
./scripts/publish_skill.sh 1.0.0
```

## 项目架构

```
design-style-matcher/
├── SKILL.md                      # Skill 定义 (YAML frontmatter + 三层加载)
│
├── # 多平台插件配置
├── .claude-plugin/
│   ├── plugin.json              # Claude Code plugin manifest
│   └── marketplace.json         # Marketplace 注册
├── .cursor-plugin/
│   └── plugin.json              # Cursor plugin manifest
├── .codex/
│   └── INSTALL.md               # Codex 安装说明
├── .opencode/
│   └── INSTALL.md               # OpenCode 安装说明
├── gemini-extension.json        # Gemini CLI extension
│
├── # 工具脚本
├── scripts/
│   ├── quick_validate.py        # 结构验证
│   ├── package_skill.py         # 打包工具
│   ├── init_skill.py            # 初始化模板
│   └── publish_skill.sh         # 发布脚本
│
├── # Hooks 系统 (session 启动注入)
├── hooks/
│   ├── hooks.json               # Claude Code hooks
│   ├── hooks-cursor.json        # Cursor hooks
│   ├── run-hook.cmd             # 跨平台 hook 包装器
│   └── session-start            # SessionStart hook 脚本
│
├── # CLI 命令
├── commands/
│   ├── list-designs.md          # /list-designs 斜杠命令
│   └── preview-designs.md       # /preview-designs 斜杠命令
│
├── # CLI 工具
├── bin/
│   └── cli.js                   # Node.js CLI 工具
│
├── # 设计系统集合
├── references/designs/          # 58 个 DESIGN.md
│   └── {brand}/
│       ├── DESIGN.md
│       ├── preview.html         # 亮色模式预览
│       └── preview-dark.html    # 暗色模式预览
│
├── # Web 预览界面
├── assets/
│   └── preview.html             # 响应式 Web 预览 (移动端适配)
│
└── # CI/CD
├── .github/workflows/
│   ├── ci.yml                  # Push 时验证
│   └── release.yml             # 打标签时发布
```

## 多平台安装

### Claude Code (Marketplace)
```
/plugin install design-style-matcher@marketplace
```

### Claude Code (Manual)
```bash
git clone https://github.com/Jedanny/design-style.git ~/.claude/skills/design-style
```

### Cursor
```
/add-plugin design-style-matcher
```

### Codex
```bash
git clone https://github.com/Jedanny/design-style.git ~/.codex/design-style
ln -s ~/.codex/design-style/skills ~/.agents/skills/design-style
```

### OpenCode
```json
{
  "plugin": ["design-style@git+https://github.com/Jedanny/design-style.git"]
}
```

### Gemini CLI
```bash
gemini extensions install https://github.com/Jedanny/design-style
```

## 发布流程

1. Push 代码 → 触发 `ci.yml` 验证
2. 打标签 `git tag v1.0.0` → 触发 `release.yml`
3. 自动创建 GitHub Release + zip 包
4. zip 包可上传到 Skill Hub 分享

## 支持的品牌 (58 个)

| 分类 | 品牌 |
|------|------|
| AI/ML (12) | anthropic, openai, midjourney, character.ai, cohere, elevenlabs, minimax, mistral.ai, ollama, replicate, together.ai, x.ai |
| 开发者工具 (16) | vercel, linear, raycast, fig, sentry, hashicorp, expo, clickhouse, mongodb, supabase, sanity, resend, mintlify, lovable, opencode.ai, voltagent |
| 设计 & 生产力 (13) | figma, framer, webflow, cal, miro, notion, cursor, superhuman, posthog, intercom, zapier, airtable, composio |
| 金融 (5) | stripe, coinbase, kraken, revolut, wise |
| 企业 (4) | ibm, spacex, nvidia, uber |
| 汽车 (5) | tesla, bmw, ferrari, lamborghini, renault |
| 消费 (8) | airbnb, apple, pinterest, spotify, runwayml |

## 移动端适配

`assets/preview.html` 响应式设计：

- 移动端 (<768px): 单列布局，搜索框全宽
- 小屏幕 (<480px): 紧凑卡片，调色板缩小
- 键盘快捷键: `/` 聚焦搜索，`Esc` 关闭弹窗
