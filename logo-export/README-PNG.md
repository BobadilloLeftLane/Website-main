# 📦 Nova Studio Logo - PNG Export Guide

## ✅ What's Fixed

1. **Logo Text Correction**: Changed "Digital Solutions" → "Solutions"
2. **Files Updated**:
   - `logo-with-text.svg` - Now shows "Solutions" instead of "Digital Solutions"
   - `public/og-image.svg` - Updated tagline

## 🎨 Available Logo Variants (SVG)

All logos are in the `logo-export/` folder:

1. **logo-icon-only.svg** - Just the planet icon (no text)
2. **logo-with-text.svg** - Planet + "NOVA STUDIO" + "Solutions"
3. **logo-full-color.svg** - Full color version
4. **logo-white.svg** - All white (for dark backgrounds)
5. **logo-dark.svg** - Dark version (for light backgrounds)
6. **logo-dark-bg.svg** - With dark background built-in
7. **logo-transparent-bg.svg** - Transparent background version

## 📸 PNG Export Instructions

### Option 1: Automatic Conversion (Requires ImageMagick)

```bash
# 1. Install ImageMagick (see INSTALL_TOOLS.md)
sudo apt-get install imagemagick

# 2. Run conversion script
cd /home/bgdnc/Website-main/logo-export
./convert-to-png.sh
```

This creates PNG files in `logo-export/png/` with these sizes:
- 32px, 192px, 256px, 512px, 1024px, 1200px, 2048px, 4096px

### Option 2: Manual Conversion

Use online tools or ImageMagick commands:

```bash
# Icon only - 512px (standard icon size)
convert -background none -resize 512x512 \
  logo-icon-only.svg logo-icon-only-512px.png

# Logo with text - 1200px (for social media)
convert -background none -resize 1200x1200 \
  logo-with-text.svg logo-with-text-1200px.png

# Full color - 4096px (print quality)
convert -background none -resize 4096x4096 \
  logo-full-color.svg logo-full-color-4096px.png
```

### Option 3: Online Conversion

Upload SVG files to:
- **CloudConvert**: https://cloudconvert.com/svg-to-png
- **Convertio**: https://convertio.co/svg-png/
- **Vectr**: https://vectr.com/ (export as PNG)

## 📐 Recommended PNG Sizes

| Purpose | Size | Logo File to Use |
|---------|------|------------------|
| **Web Favicon** | 32×32px | `logo-icon-only.svg` |
| **Apple Touch Icon** | 180×180px | `logo-icon-only.svg` |
| **Android Icon** | 192×192px, 512×512px | `logo-icon-only.svg` |
| **Website Header** | 200-400px wide | `logo-with-text.svg` |
| **Email Signature** | 150-200px wide | `logo-with-text.svg` |
| **Social Media Profile** | 400×400px | `logo-icon-only.svg` |
| **Social Media OG Image** | 1200×630px | Custom (landscape) |
| **Business Card** | 2048px+ | `logo-full-color.svg` |
| **Poster/Banner** | 4096px+ | `logo-full-color.svg` |
| **T-Shirt Print** | 4096px+ | `logo-white.svg` or `logo-dark.svg` |

## 🎯 Quick Usage Guide

### For Dark Backgrounds
Use: `logo-white.svg` or convert to PNG

### For Light Backgrounds
Use: `logo-dark.svg` or `logo-full-color.svg`

### For Transparent Backgrounds
Use: `logo-transparent-bg.svg`

### Icon Only (No Text)
Use: `logo-icon-only.svg` - Perfect for favicons, app icons, social media profiles

### Logo with Company Name
Use: `logo-with-text.svg` - Perfect for headers, email signatures, presentations

## 🔄 Batch Export Commands

Export all common sizes at once:

```bash
# Create PNG directory
mkdir -p png

# Export icon-only in multiple sizes
for size in 32 64 128 192 256 512 1024 2048; do
  convert -background none -resize ${size}x${size} \
    logo-icon-only.svg png/logo-icon-${size}px.png
done

# Export with-text in multiple widths (maintaining aspect ratio)
for width in 200 400 600 800 1200; do
  convert -background none -resize ${width}x \
    logo-with-text.svg png/logo-text-${width}px.png
done
```

## ✨ What Changed

### Before:
```
NOVA
STUDIO
Digital Solutions  ❌ (wrong)
```

### After:
```
NOVA
STUDIO
Solutions  ✅ (correct)
```

## 📝 Next Steps

1. Install ImageMagick: `sudo apt-get install imagemagick`
2. Run conversion script: `./convert-to-png.sh`
3. Find PNG files in: `logo-export/png/`
4. Use appropriate size for your needs
5. Update website favicons if needed

## 🐛 Troubleshooting

**Problem:** "convert: command not found"
**Solution:** Install ImageMagick: `sudo apt-get install imagemagick`

**Problem:** "Permission denied"
**Solution:** Make script executable: `chmod +x convert-to-png.sh`

**Problem:** PNG quality is poor
**Solution:** Increase density: `convert -density 600 ...` (instead of 300)

**Problem:** File size too large
**Solution:** Use smaller dimensions or compress: `pngquant logo.png`
