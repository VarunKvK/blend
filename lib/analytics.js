/**
 * Google Analytics Event Tracking Utility
 * 
 * Usage: trackEvent('event_name', { param1: 'value1', param2: 'value2' })
 */

export const trackEvent = (eventName, eventParams = {}) => {
    // Check if gtag is available (Google Analytics loaded)
    if (typeof window !== 'undefined' && window.gtag) {
        try {
            window.gtag('event', eventName, eventParams);
            console.log(`[GA Event] ${eventName}`, eventParams);
        } catch (error) {
            console.error('Error tracking event:', error);
        }
    } else {
        console.warn('Google Analytics not loaded yet');
    }
};

// Pre-defined event tracking functions for BlendIt → Shotframe funnel
export const analytics = {
    // Track when user clicks "Edit in Shotframe" button
    clickSendToShotframe: (success = true) => {
        trackEvent('click_send_to_shotframe', {
            success: success,
            timestamp: new Date().toISOString(),
        });
    },

    // Track when gradient is successfully copied to clipboard
    gradientCopied: () => {
        trackEvent('gradient_copied_to_clipboard', {
            timestamp: new Date().toISOString(),
        });
    },

    // Track when Shotframe is opened (redirect successful)
    shotframeOpened: () => {
        trackEvent('shotframe_opened_from_blend', {
            timestamp: new Date().toISOString(),
        });
    },

    // Track when user clicks the ShotframePromo component
    promoClicked: () => {
        trackEvent('shotframe_promo_clicked', {
            timestamp: new Date().toISOString(),
        });
    },
};
