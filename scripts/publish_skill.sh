#!/bin/bash
#
# Publish Skill to Git and Skill Hub
#
# Usage: ./publish_skill.sh [version]
#

set -e

SKILL_NAME=$(basename "$(pwd)")
VERSION=${1:-$(date +%Y.%m.%d)}

echo "📦 Publishing: $SKILL_NAME v$VERSION"

# Validate
echo "🔍 Validating skill..."
python3 scripts/quick_validate.py .
if [ $? -ne 0 ]; then
    echo "❌ Validation failed"
    exit 1
fi

# Package
echo "📦 Packaging skill..."
python3 scripts/package_skill.py . ./dist
if [ $? -ne 0 ]; then
    echo "❌ Packaging failed"
    exit 1
fi

# Git operations
echo "📝 Creating git tag..."
git add -A
git commit -m "Release $SKILL_NAME v$VERSION" || echo "Nothing to commit"
git tag -a "v$VERSION" -m "Release $SKILL_NAME v$VERSION"

echo "🚀 Pushing to git..."
git push origin main
git push origin "v$VERSION"

echo ""
echo "✅ Published $SKILL_NAME v$VERSION"
echo "📦 Zip available at: dist/$SKILL_NAME.zip"
