#!/bin/bash
# Convierte un .html a .png con Chrome headless al tamaño indicado.
# Uso: ./_exportar.sh <archivo-sin-extension> <ancho> <alto>
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIR="$(cd "$(dirname "$0")" && pwd)"
name="$1"; w="${2:-1080}"; h="${3:-1350}"
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --screenshot="$DIR/$name.png" --window-size="$w,$h" "file://$DIR/$name.html" 2>/dev/null
[ -f "$DIR/$name.png" ] && echo "  ✓ $name.png (${w}x${h})" || echo "  ✗ falló $name"
