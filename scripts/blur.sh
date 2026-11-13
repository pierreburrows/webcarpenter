#!/usr/bin/env bash
# Generates tiny base64 blur placeholders for every project photo into src/lib/blur.json.
set -e
cd "$(dirname "$0")/.."
echo "{" > src/lib/blur.json
first=1
for f in public/img/projects/*/*.jpg public/hero/film-poster.jpg; do
  key="/${f#public/}"
  b64=$(convert "$f" -resize 16x16 -quality 50 jpeg:- | base64 -w0)
  [ $first -eq 1 ] || echo "," >> src/lib/blur.json
  first=0
  printf '  "%s": "data:image/jpeg;base64,%s"' "$key" "$b64" >> src/lib/blur.json
done
echo "" >> src/lib/blur.json; echo "}" >> src/lib/blur.json
echo "wrote $(grep -c data: src/lib/blur.json) placeholders"
