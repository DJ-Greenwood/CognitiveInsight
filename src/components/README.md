# Components Documentation

This directory contains reusable React components for the CognitiveInsight website. The components have been organized to promote reusability across different pages.

## Main Page Components

These components were extracted from the main landing page and can be reused on other pages:

### Core Sections
- **`TopBanner`** - The announcement banner at the top of the page
- **`HeroSection`** - The main hero section with headline, description, and CTA buttons
- **`ValueAtGlanceSimple`** - Simple 3-column value metrics display
- **`HowInsightWorks`** - 4-column feature overview cards
- **`WhereItHelps`** - Industry-specific use case examples
- **`InsightVsMLTooling`** - Comparison table between Insight™ and traditional ML tools
- **`StandardsAlignment`** - Simple standards compliance section
- **`FooterCTA`** - Call-to-action section before the footer
- **`SiteFooter`** - The main site footer

## Framework Page Components

These components were extracted from the framework page and can be reused:

### Framework Sections
- **`FrameworkHeroSection`** - Framework-specific hero with technical focus
- **`CoreFrameworkComponents`** - 4-column grid showing framework components (Data Anchors, Anchor Keys, etc.)
- **`WhyInsightMatters`** - Value proposition section with Trust/Efficiency/Compliance
- **`RegulatoryAlignmentMap`** - Comprehensive table showing regulatory alignment
- **`PatentDisclaimer`** - Patent-pending notice with warning styling
- **`WhitePaperAccess`** - Technical documentation request section
- **`ComingSoonDashboard`** - Dashboard preview mockup
- **`FrameworkCTA`** - Framework-specific call-to-action footer

### Existing Components
- **`ValueAtGlance`** - Enhanced version with additional audience targeting
- **`InteractiveDemoPreview`** - Demo preview section
- **`PilotProgramCTA`** - Pilot program call-to-action
- **`BeforeAfterInsight`** - Before/after comparison (default export)
- **`ComparisonTable`** - Detailed comparison table (default export)
- **`UseCaseStories`** - Detailed use case stories (default export)

## Directory Structure

```
src/components/
├── framework/           # Framework page specific components
│   ├── index.ts        # Framework components barrel export
│   ├── FrameworkHeroSection.tsx
│   ├── CoreFrameworkComponents.tsx
│   ├── WhyInsightMatters.tsx
│   ├── RegulatoryAlignmentMap.tsx
│   ├── PatentDisclaimer.tsx
│   ├── WhitePaperAccess.tsx
│   ├── ComingSoonDashboard.tsx
│   └── FrameworkCTA.tsx
├── layout/             # Layout components (Header, Footer)
├── ui/                 # Base UI components (shadcn/ui)
├── index.ts            # Main components barrel export
└── README.md           # This file
```

## Usage

You can import components individually:

```tsx
import { FrameworkHeroSection } from '@/components/framework/FrameworkHeroSection';
```

Or use the barrel export for multiple components:

```tsx
import { 
  FrameworkHeroSection, 
  CoreFrameworkComponents, 
  WhyInsightMatters 
} from '@/components';
```

## Component Structure

Each component is:
- **Self-contained** - Includes all necessary data and logic
- **Responsive** - Built with mobile-first design
- **Accessible** - Uses semantic HTML and ARIA attributes where appropriate
- **Styled** - Uses Tailwind CSS classes with the established design system
- **Typed** - Written in TypeScript for type safety

## Reusability

These components can be easily:
- Added to new pages
- Rearranged in different orders
- Modified with props (future enhancement)
- Styled differently based on context
- Mixed and matched between pages (e.g., using framework components on other pages)

## Framework vs Main Page Components

- **Main page components** are focused on marketing, value proposition, and conversion
- **Framework components** are more technical, detailed, and compliance-focused
- Both sets can be used together or separately as needed

## Future Enhancements

Consider adding props to make components more flexible:
- **Theme variants** (light/dark, different color schemes)
- **Content props** to customize text and data
- **Layout props** to adjust spacing and arrangement
- **Callback props** for custom interactions
