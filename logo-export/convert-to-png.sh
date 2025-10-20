
#!/bin/bash

# Script to convert SVG logos to PNG formats
# Requires ImageMagick (install: sudo apt-get install imagemagick)

LOGO_DIR="/home/bgdnc/Website-main/logo-export"
OUTPUT_DIR="$LOGO_DIR/png"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "🎨 Converting Nova Studio logos to PNG formats..."
echo "================================================"

# Define sizes for different use cases
declare -A sizes=(
    ["favicon"]=32
    ["favicon-large"]=192
    ["icon-small"]=256
    ["icon-medium"]=512
    ["icon-large"]=1024
    ["social"]=1200
    ["print-small"]=2048
    ["print-large"]=4096
)

# Logo files to convert
logos=(
    "logo-icon-only.svg"
    "logo-with-text.svg"
    "logo-full-color.svg"
    "logo-white.svg"
    "logo-dark.svg"
    "logo-dark-bg.svg"
    "logo-transparent-bg.svg"
)

# Convert each logo to various sizes
for logo in "${logos[@]}"; do
    if [ ! -f "$LOGO_DIR/$logo" ]; then
        echo "⚠️  Skipping $logo (not found)"
        continue
    fi

    basename="${logo%.svg}"
    echo ""
    echo "📄 Converting: $logo"

    for size_name in "${!sizes[@]}"; do
        size="${sizes[$size_name]}"
        output="$OUTPUT_DIR/${basename}-${size}px.png"

        # Convert using ImageMagick
        convert -background none -density 300 -resize "${size}x${size}" \
            "$LOGO_DIR/$logo" "$output" 2>/dev/null

        if [ $? -eq 0 ]; then
            echo "  ✅ ${size}px → ${basename}-${size}px.png"
        else
            echo "  ❌ Failed to convert ${size}px"
        fi
    done
done

echo ""
echo "================================================"
echo "✨ Conversion complete!"
echo "📁 PNG files saved to: $OUTPUT_DIR"
echo ""
echo "Generated sizes:"
echo "  • 32px    - Favicons"
echo "  • 192px   - Android icons"
echo "  • 256px   - Small icons"
echo "  • 512px   - Medium icons"
echo "  • 1024px  - Large icons"
echo "  • 1200px  - Social media (OG images)"
echo "  • 2048px  - Print (small)"
echo "  • 4096px  - Print (large)"
