# 🛠️ Install Tools for PNG Conversion

## Quick Install (Ubuntu/Debian/WSL)

```bash
# Install ImageMagick
sudo apt-get update
sudo apt-get install -y imagemagick

# Verify installation
convert --version
```

## Alternative: Install Inkscape

```bash
# Inkscape is another option for SVG to PNG conversion
sudo apt-get install -y inkscape

# Verify installation
inkscape --version
```

## After Installation

Once ImageMagick is installed, run the conversion script:

```bash
cd /home/bgdnc/Website-main/logo-export
./convert-to-png.sh
```

This will create PNG files in multiple sizes:
- **32px** - Favicons
- **192px** - Android icons
- **256px** - Small icons
- **512px** - Medium icons
- **1024px** - Large icons
- **1200px** - Social media (OG images)
- **2048px** - Print quality (small)
- **4096px** - Print quality (large)

## Manual Conversion (if script fails)

If the script doesn't work, convert manually:

```bash
# Example: Convert logo to 512px PNG
convert -background none -density 300 -resize 512x512 \
  logo-icon-only.svg logo-icon-only-512px.png

# With transparent background
convert -background transparent -density 300 -resize 1024x1024 \
  logo-full-color.svg logo-full-color-1024px.png
```

## Online Alternative (No Installation)

If you can't install tools, use online converters:

1. **CloudConvert** - https://cloudconvert.com/svg-to-png
2. **Convertio** - https://convertio.co/svg-png/
3. **Online-Convert** - https://image.online-convert.com/convert-to-png

Upload the SVG files from `logo-export/` folder and download as PNG.

## Recommended Sizes for Different Uses

| Use Case | Size | File |
|----------|------|------|
| Favicon | 32px, 16px | `logo-icon-only.svg` |
| Apple Touch Icon | 180px | `logo-icon-only.svg` |
| Android Chrome | 192px, 512px | `logo-icon-only.svg` |
| Social Media (OG) | 1200x630px | `logo-with-text.svg` |
| Website Header | 200-400px | `logo-with-text.svg` |
| Print (Business Card) | 2048px+ | `logo-full-color.svg` |
| Print (Poster) | 4096px+ | `logo-full-color.svg` |
| Email Signature | 150-200px | `logo-with-text.svg` |
