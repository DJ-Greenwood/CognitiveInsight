# CognitiveInsight.AI Color Scheme Options

## Current Scheme Analysis
- **Primary**: Dark blue (`214 53% 21%`) - Professional, trustworthy
- **Accent**: Emerald green (`168 76% 27%`) - Growth, ethics
- **Background**: Light gray (`220 17% 97%`) - Clean, professional

## Alternative Color Schemes

### 1. **Modern Purple/Tech** (Applied)
```css
--primary: 262 83% 58%;        /* Vibrant purple */
--accent: 142 76% 36%;         /* Modern teal */
--background: 240 10% 98%;     /* Soft white */
```
*Best for: Modern tech companies, innovation-focused brands*

### 2. **Corporate Blue/Orange**
```css
--primary: 211 100% 43%;       /* Professional blue */
--accent: 25 95% 53%;          /* Energetic orange */
--background: 210 20% 98%;     /* Clean blue-white */
```
*Best for: Corporate, finance, professional services*

### 3. **Deep Forest/Gold**
```css
--primary: 158 58% 20%;        /* Deep forest green */
--accent: 43 96% 56%;          /* Warm gold */
--background: 60 9% 98%;       /* Warm white */
```
*Best for: Sustainability, natural AI, ethical tech*

### 4. **Midnight/Cyan (Dark-first)**
```css
--primary: 192 95% 68%;        /* Bright cyan */
--accent: 280 100% 80%;        /* Electric purple */
--background: 220 13% 18%;     /* Dark blue-gray */
--foreground: 210 20% 98%;     /* Light text */
```
*Best for: Cutting-edge tech, developer tools*

### 5. **Warm Crimson/Slate**
```css
--primary: 348 83% 47%;        /* Deep crimson */
--accent: 159 25% 51%;         /* Sage green */
--background: 20 14.3% 97.1%;  /* Warm white */
```
*Best for: Bold, confident, premium brands*

## How to Apply

### Method 1: Direct CSS Edit
Replace the color values in `src/app/globals.css`:

```css
:root {
  --primary: [new-hue] [new-saturation]% [new-lightness]%;
  --accent: [new-hue] [new-saturation]% [new-lightness]%;
  /* ... other colors */
}
```

### Method 2: Theme Switcher (Advanced)
Create multiple theme classes and switch between them:

```css
.theme-corporate {
  --primary: 211 100% 43%;
  --accent: 25 95% 53%;
}

.theme-forest {
  --primary: 158 58% 20%;
  --accent: 43 96% 56%;
}
```

### Method 3: Tailwind Config Override
Modify `tailwind.config.ts` to define custom colors:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: 'hsl(262, 83%, 58%)',
        foreground: 'hsl(0, 0%, 98%)',
      }
    }
  }
}
```

## Color Psychology for AI/Trust Brands

- **Blue**: Trust, reliability, security (current primary)
- **Green**: Growth, sustainability, harmony (current accent)
- **Purple**: Innovation, creativity, premium
- **Orange**: Energy, enthusiasm, warmth
- **Teal**: Balance, clarity, communication
- **Gray**: Professionalism, neutrality, sophistication

## Testing Your Changes

1. Save the CSS file
2. Run `npm run dev`
3. Check the homepage gradient and component colors
4. Test both light and dark modes
5. Verify accessibility contrast ratios

## Brand Consistency Notes

The hero section uses a custom gradient:
```css
bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
from-primary via-[#0B1D3A] to-black
```

Consider updating the hardcoded `#0B1D3A` to use a CSS variable for full theme consistency.
