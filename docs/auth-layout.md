# Authentication Layout System

## Overview

Enterprise-level authentication layout system with modular architecture and split-screen design.

## Architecture

```
src/
├── components/
│   └── auth/
│       ├── AuthLayout.tsx      # Main split-screen layout
│       ├── ProgressBar.tsx     # Progress indicator component
│       └── index.ts            # Barrel exports
├── pages/
│   └── auth/
│       └── AuthDemo.tsx        # Demo/test page
└── types/
    └── auth.types.ts           # TypeScript definitions
```

## Components

### AuthLayout

**Purpose**: Provides a consistent split-screen layout for all authentication pages.

**Features**:
- ✅ 50/50 split design (content left, image/brand right)
- ✅ Progress bar with step tracking
- ✅ Responsive (stacks on mobile, hides right side)
- ✅ Logo and footer included
- ✅ Primary brand color background on right
- ✅ Optional image overlay support

**Props**:
```typescript
interface AuthLayoutProps {
  children: React.ReactNode;      // Main content
  currentStep: number;             // Current step (0-indexed)
  totalSteps: number;              // Total steps in flow
  imageUrl?: string;               // Optional image for right side
  imageAlt?: string;               // Alt text for image
  heading?: string;                // Optional heading above progress
}
```

**Usage**:
```tsx
import { AuthLayout } from "@/components/auth";

<AuthLayout currentStep={0} totalSteps={4}>
  {/* Your form content here */}
</AuthLayout>
```

### ProgressBar

**Purpose**: Visual indicator of progress through multi-step flows.

**Features**:
- ✅ Animated progress bar
- ✅ Step counter (e.g., "Step 1 of 4")
- ✅ Percentage display
- ✅ Accessibility attributes (ARIA)
- ✅ Secondary brand color (Golden Yellow)

**Props**:
```typescript
interface ProgressBarProps {
  currentStep: number;    // Current step (0-indexed)
  totalSteps: number;     // Total steps
  className?: string;     // Optional styling
}
```

## Design Specifications

### Layout Breakpoints
- **Desktop (lg+)**: Split-screen 50/50
- **Tablet/Mobile**: Single column, right side hidden

### Colors
- **Left side background**: `bg-background` (white/navy based on theme)
- **Right side background**: `bg-primary` (#00072C - Deep Navy Blue)
- **Progress bar**: `bg-secondary` (#FFBD09 - Golden Yellow)

### Spacing
- **Container padding**: 
  - Mobile: `p-6` (24px)
  - Tablet: `p-12` (48px)
  - Desktop: `p-16` (64px)
- **Max content width**: `max-w-2xl` (672px)

### Typography
- **Logo height**: `h-8` (mobile) / `h-10` (desktop)
- **Heading**: `text-3xl md:text-4xl font-bold`
- **Body text**: `text-base`

## File Structure

### Component Files

**AuthLayout.tsx**
- Main layout component
- Handles responsive behavior
- Manages left/right split
- Includes logo and footer

**ProgressBar.tsx**
- Standalone progress indicator
- Can be used independently
- Fully accessible

**index.ts**
- Barrel export for clean imports
- `export { AuthLayout, ProgressBar }`

### Type Definitions

**auth.types.ts**
- TypeScript interfaces
- Ensures type safety
- Self-documenting code

## Testing

**Demo Page**: Visit `/auth-demo` to see the layout in action

**Test Checklist**:
- [ ] Desktop view shows split-screen
- [ ] Mobile view stacks content
- [ ] Progress bar animates smoothly
- [ ] Logo displays correctly
- [ ] Footer appears at bottom
- [ ] Right side shows brand color
- [ ] Responsive breakpoints work

## Usage Examples

### Basic Authentication Page
```tsx
import { AuthLayout } from "@/components/auth";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <AuthLayout currentStep={0} totalSteps={1}>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Welcome back</h1>
        {/* Form content */}
      </div>
    </AuthLayout>
  );
};
```

### Multi-Step Flow
```tsx
import { AuthLayout } from "@/components/auth";
import { useState } from "react";

const SignupFlow = () => {
  const [step, setStep] = useState(0);
  
  return (
    <AuthLayout 
      currentStep={step} 
      totalSteps={4}
      heading="Account Setup"
    >
      {/* Step content based on current step */}
    </AuthLayout>
  );
};
```

### With Custom Image
```tsx
<AuthLayout
  currentStep={2}
  totalSteps={4}
  imageUrl="/images/auth-background.jpg"
  imageAlt="Property Eye Dashboard"
>
  {/* Content */}
</AuthLayout>
```

## Best Practices

1. **Always use 0-indexed steps**: `currentStep={0}` for first step
2. **Keep content concise**: Left side has limited width
3. **Use semantic HTML**: Forms should use `<form>` tags
4. **Maintain consistency**: Use same totalSteps across flow
5. **Test responsiveness**: Check mobile, tablet, desktop
6. **Accessibility**: Ensure proper labels and ARIA attributes

## Next Steps

Ready to build authentication pages:
1. Sign Up (Agency Setup)
2. OTP Verification
3. Agency Owner Information
4. Login

Each page will use this AuthLayout as the foundation.

---

*Last Updated: November 21, 2025*
