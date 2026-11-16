#!/usr/bin/env bash
# Reads Hakeem's download tier (e.g. "10K+", "50K+", "100K+") from its public Google Play listing
# and writes it into the page's <p ... data-play-downloads>…</p> figure.
#
# Usage: update-hakeem-downloads.sh [path/to/hakeem.html]
# Exit codes: 0 = updated or already current, 1 = could not read a valid figure (page left untouched).
set -euo pipefail

page="${1:-projects/hakeem.html}"
url="https://play.google.com/store/apps/details?id=com.qrcsmad.hakeem_app&hl=en&gl=QA"

html="$(curl -fsSL --max-time 30 \
  -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36" \
  "$url")" || { echo "Could not fetch the Play listing." >&2; exit 1; }

# The listing shows the tier as e.g. >10K+</div><div class="…">Downloads
found="$(printf '%s' "$html" | grep -oE '[0-9][0-9.,]*[KMB]?\+</div><div class="[^"]*">Downloads' | head -n 1 | grep -oE '^[0-9][0-9.,]*[KMB]?\+' || true)"

if ! [[ "$found" =~ ^[0-9][0-9.,]*[KMB]?\+$ ]]; then
  echo "Could not find the download figure on the Play listing; the page layout may have changed." >&2
  exit 1
fi

current="$(grep -oE 'data-play-downloads>[^<]*<' "$page" | sed -E 's/^data-play-downloads>//; s/<$//' || true)"
if [ -z "$current" ]; then
  echo "No data-play-downloads figure found in $page." >&2
  exit 1
fi

if [ "$current" = "$found" ]; then
  echo "Already current: $found"
  exit 0
fi

sed -i -E "s#(data-play-downloads>)[^<]*<#\\1${found}<#" "$page"
echo "Updated $page: $current -> $found"
