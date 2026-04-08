# Installing Design Style Matcher for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed

## Installation

Add to `opencode.json`:

```json
{
  "plugin": ["design-style@git+https://github.com/Jedanny/design-style.git"]
}
```

Restart OpenCode. Plugin auto-installs and registers all skills.

Verify by asking: "show me some design options"

## Updating

Updates automatically on restart. Pin version:

```json
{
  "plugin": ["design-style@git+https://github.com/Jedanny/design-style.git#v1.0.0"]
}
```
