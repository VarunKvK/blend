# BlendIt → Shotframe Analytics Tracking

## ✅ Implemented Events (BlendIt)

### 1. `click_send_to_shotframe`
**Trigger**: User clicks "Edit in Shotframe" button  
**Parameters**:
- `success`: boolean
- `timestamp`: ISO string

**Location**: `app/blend/page.js` → `handleEditInShotframe()`

---

### 2. `gradient_copied_to_clipboard`
**Trigger**: Gradient image successfully copied to clipboard  
**Parameters**:
- `timestamp`: ISO string

**Location**: `app/blend/page.js` → `handleEditInShotframe()` (on successful clipboard write)

---

### 3. `shotframe_opened_from_blend`
**Trigger**: Shotframe window opens (via window.open)  
**Parameters**:
- `timestamp`: ISO string

**Location**: `app/blend/page.js` → `handleEditInShotframe()` (after opening new window)

---

### 4. `shotframe_promo_clicked`
**Trigger**: User clicks the Shotframe promo banner  
**Parameters**:
- `timestamp`: ISO string

**Location**: `components/blend/ShotframePromo.jsx` → onClick handler

---

## 🔄 To Be Implemented (Shotframe)

### 5. `mockup_generated_from_gradient`
**Trigger**: User successfully generates a mockup in Shotframe  
**Recommended Parameters**:
- `mockup_type`: 'browser' | 'phone' | 'laptop' etc.
- `source`: 'blendit_integration'
- `from_blend`: boolean (optional - if you can detect paste within 10s of page load)
- `timestamp`: ISO string

**See**: `SHOTFRAME_ANALYTICS_IMPLEMENTATION.md` for implementation guide

---

## 📊 How to View Events in Google Analytics

### Real-Time Monitoring

1. Go to **Google Analytics**
2. Navigate to **Reports** → **Realtime** → **Event count by Event name**
3. Test the integration and watch events appear live

### Event Analysis

1. Go to **Reports** → **Engagement** → **Events**
2. You'll see all your custom events listed:
   - `click_send_to_shotframe`
   - `gradient_copied_to_clipboard`
   - `shotframe_opened_from_blend`
   - `shotframe_promo_clicked`
   - `mockup_generated_from_gradient` (once Shotframe is updated)

### Creating a Funnel Report

1. Go to **Explore** in the left sidebar
2. Click **Blank** to create a new exploration
3. Select **Funnel exploration** template
4. Configure funnel steps:

```
Step 1: click_send_to_shotframe
  ↓
Step 2: gradient_copied_to_clipboard  
  ↓
Step 3: shotframe_opened_from_blend
  ↓
Step 4: mockup_generated_from_gradient
```

5. Click **Apply**

### Understanding the Funnel

**Example Scenario**:
- 100 users click "Edit in Shotframe" → `click_send_to_shotframe`
- 95 successfully copy → `gradient_copied_to_clipboard` (5% drop-off = clipboard issue)
- 95 open Shotframe → `shotframe_opened_from_blend` (0% drop-off)
- 2 generate mockup → `mockup_generated_from_gradient` (97% drop-off = **PROBLEM**)

**This tells you**: The clipboard works, Shotframe opens, but users aren't completing the mockup. Possible issues:
- Paste doesn't work
- Users don't know they need to paste
- Mockup generation fails
- UI is confusing

---

## 🎯 Success Metrics to Track

### Daily
- **Total "Send to Shotframe" clicks**
- **Clipboard success rate**: `gradient_copied / click_send_to_shotframe`
- **Shotframe open rate**: `shotframe_opened / click_send_to_shotframe`

### Weekly
- **End-to-end conversion**: `mockup_generated / click_send_to_shotframe`
- **Promo effectiveness**: `shotframe_promo_clicked` count
- **Funnel drop-off points**

### Monthly
- **Integration usage trend**: Are more users discovering this feature?
- **Conversion improvements**: Is the funnel getting better?

---

## 🔍 Debugging Events

All events log to console in development:
```
[GA Event] click_send_to_shotframe { success: true, timestamp: "..." }
[GA Event] gradient_copied_to_clipboard { timestamp: "..." }
[GA Event] shotframe_opened_from_blend { timestamp: "..." }
```

If you see `"Google Analytics not loaded yet"` in console:
1. Check that `layout.js` has the GA scripts
2. Wait for page to fully load
3. Check browser console Network tab for gtag.js

---

## 📈 Advanced: Custom Dimensions (Optional Future Enhancement)

You can add more context to events:

```javascript
analytics.clickSendToShotframe(true, {
  gradient_colors_count: gradientConfig.colors.length,
  gradient_type: gradientConfig.type,
  canvas_size: `${selectedDimension.width}x${selectedDimension.height}`,
  user_tier: userTier.type,
});
```

This would let you answer questions like:
- "Do Pro users convert better in the Shotframe funnel?"
- "Which gradient types are most popular for Shotframe exports?"
- "What canvas sizes lead to more Shotframe usage?"

---

## 🚀 Next Steps

1. ✅ **BlendIt events are live** - Deploy to production
2. ⏳ **Implement Shotframe tracking** - See `SHOTFRAME_ANALYTICS_IMPLEMENTATION.md`
3. 📊 **Set up funnel in GA** - Create the funnel exploration
4. 📈 **Monitor for 1 week** - Gather baseline data
5. 🔧 **Optimize based on data** - Fix the biggest drop-off point
6. 🔁 **Iterate** - Repeat monitoring and optimization

---

**Questions?** Check the implementation files:
- BlendIt tracking: `app/blend/page.js` + `components/blend/ShotframePromo.jsx`
- Analytics util: `lib/analytics.js`
- Shotframe guide: `SHOTFRAME_ANALYTICS_IMPLEMENTATION.md`
