# Google Analytics Tracking - Shotframe Implementation

## Overview
This document explains how to implement the `mockup_generated_from_gradient` event on Shotframe to complete the BlendIt → Shotframe funnel tracking.

## Background
BlendIt now tracks:
- `click_send_to_shotframe` - When user clicks "Edit in Shotframe"
- `gradient_copied_to_clipboard` - When gradient is successfully copied
- `shotframe_opened_from_blend` - When Shotframe window opens
- `shotframe_promo_clicked` - When user clicks the promo banner

## What You Need to Add to Shotframe

### Step 1: Create Analytics Util (if not exists)

Create `lib/analytics.js` in your Shotframe project:

```javascript
/**
 * Google Analytics Event Tracking Utility
 */

export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', eventName, eventParams);
      console.log(`[GA Event] ${eventName}`, eventParams);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }
};

export const analytics = {
  // Track when mockup is generated from a pasted gradient
  mockupGeneratedFromGradient: (mockupType = 'unknown') => {
    trackEvent('mockup_generated_from_gradient', {
      mockup_type: mockupType,
      source: 'blendit_integration',
      timestamp: new Date().toISOString(),
    });
  },
};
```

### Step 2: Identify the Mockup Generation Point

Find where in your Shotframe code a mockup is successfully generated. This is likely:
- After a paste event (Ctrl+V) succeeds
- After an image is loaded/processed
- After the mockup preview is rendered

### Step 3: Add the Tracking Call

In the component/function where mockup generation happens:

```javascript
import { analytics } from '@/lib/analytics';

// Inside your mockup generation function:
const generateMockup = async (image) => {
  // ... your existing mockup generation code ...
  
  // After successful mockup generation:
  analytics.mockupGeneratedFromGradient(mockupType); // e.g., 'browser', 'phone', 'laptop'
  
  // ... rest of your code ...
};
```

### Step 4: Detect if Image Came from BlendIt (Optional Enhanced Tracking)

To specifically track images that came from BlendIt, you could:

```javascript
const handlePaste = async (event) => {
  const items = event.clipboardData?.items;
  
  // Check if this is a recent paste (within 10 seconds of Shotframe opening)
  const isLikelyFromBlend = window.performance.now() < 10000;
  
  // ... process the pasted image ...
  
  if (mockupGenerated && isLikelyFromBlend) {
    analytics.mockupGeneratedFromGradient('browser', { from_blend: true });
  }
};
```

## Example Full Implementation

```javascript
// In your Shotframe canvas/mockup component:

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export default function MockupCanvas() {
  useEffect(() => {
    const handlePaste = async (event) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const blob = item.getAsFile();
          if (blob) {
            // Process the image to create mockup
            await createMockup(blob);
            
            // Track the event
            analytics.mockupGeneratedFromGradient('browser');
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  // ... rest of component ...
}
```

## Testing

After implementation, test the funnel:

1. Go to BlendIt → create a gradient → click "Edit in Shotframe"
2. Paste in Shotframe (Ctrl+V)
3. Generate mockup
4. Check Google Analytics Real-time Events:
   - You should see: `click_send_to_shotframe`
   - Followed by: `mockup_generated_from_gradient`

## Analyzing the Funnel

In Google Analytics, you can now create a funnel report:

1. **Explorations** → **Funnel exploration**
2. Add steps:
   - Step 1: `click_send_to_shotframe`
   - Step 2: `shotframe_opened_from_blend`
   - Step 3: `mockup_generated_from_gradient`

This will show you:
- How many users click "Send to Shotframe"
- How many successfully open Shotframe
- How many actually generate a mockup
- **Drop-off rate** at each step

## Expected Insights

- If 100 people click but only 2 generate mockups → integration UX issue
- If drop-off is at paste step → clipboard API issue
- If drop-off is at mockup generation → processing/loading issue

---

**Priority**: Implement this on Shotframe to complete the funnel tracking!
