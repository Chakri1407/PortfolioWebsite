#!/bin/sh
# Block commits containing credentials.
#
# Install as a pre-commit hook:
#   cp scripts/check-secrets.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
#
# Scans STAGED content only. Patterns allow underscores and hyphens inside the
# token -- an earlier version used [A-Za-z0-9]+ and silently missed a real
# Resend key because the key contained an underscore.

staged=$(git diff --cached --name-only --diff-filter=ACM)
[ -z "$staged" ] && exit 0

fail=0

report() {
  echo "BLOCKED: $1" >&2
  fail=1
}

# Never commit real local env files, whatever .gitignore says.
echo "$staged" | grep -qE '(^|/)\.env(\.local|\.development\.local|\.production\.local)$' \
  && report ".env.local (or similar) is staged - it must stay untracked"

# Provider key formats. Add more as needed.
diff=$(git diff --cached -U0)

printf '%s\n' "$diff" | grep -qE '^\+.*re_[A-Za-z0-9_-]{20,}' \
  && report "looks like a Resend API key"
printf '%s\n' "$diff" | grep -qE '^\+.*sk_(live|test)_[A-Za-z0-9_-]{16,}' \
  && report "looks like a Stripe secret key"
printf '%s\n' "$diff" | grep -qE '^\+.*gh[pousr]_[A-Za-z0-9_-]{20,}' \
  && report "looks like a GitHub token"
printf '%s\n' "$diff" | grep -qE '^\+.*AKIA[0-9A-Z]{16}' \
  && report "looks like an AWS access key id"
printf '%s\n' "$diff" | grep -qE '^\+.*-----BEGIN [A-Z ]*PRIVATE KEY-----' \
  && report "contains a private key block"

if [ "$fail" -ne 0 ]; then
  echo "" >&2
  echo "Nothing was committed. Move the value into .env.local (untracked) and" >&2
  echo "leave a placeholder in .env.example. To override: git commit --no-verify" >&2
  exit 1
fi

exit 0
