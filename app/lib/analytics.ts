/**
 * Web Vitals and Analytics Utilities
 * 
 * This module provides performance monitoring and analytics functionality
 * for the LanguageShop PWA, following 2025 best practices for web vitals
 * tracking and user experience monitoring.
 */

/**
 * Web Vitals metric interface
 */
interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  entries: PerformanceEntry[];
}

/**
 * Initialize Web Vitals monitoring
 * 
 * This function sets up Core Web Vitals tracking for performance monitoring.
 * It uses the web-vitals library to track CLS, INP, FCP, LCP, and TTFB.
 * 
 * Web Vitals should primarily run in production to monitor real user performance
 * but can also run in development for testing purposes.
 */
export const initWebVitals = async () => {
  // Skip if not in a browser environment
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Dynamic import to avoid bundling issues
    const webVitals = await import('web-vitals');

    // Track Core Web Vitals
    webVitals.onCLS(sendToAnalytics);
    webVitals.onINP(sendToAnalytics); // INP replaces FID in web-vitals v4+
    webVitals.onFCP(sendToAnalytics);
    webVitals.onLCP(sendToAnalytics);
    webVitals.onTTFB(sendToAnalytics);

    if (import.meta.env.DEV) {
      console.log('📊 Web Vitals monitoring initialized (development mode)');
    }
  } catch (error) {
    console.warn('⚠️ Web Vitals monitoring failed to initialize:', error);
  }
};

/**
 * Send metric data to analytics service
 * 
 * @param metric - Web vital metric data
 */
const sendToAnalytics = (metric: WebVitalMetric) => {
  const metricData = {
    value: metric.value,
    rating: getMetricRating(metric.name, metric.value),
    id: metric.id,
  };

  // Always log in development for debugging
  if (import.meta.env.DEV) {
    console.log(`📈 ${metric.name}:`, metricData);
  }

  // In production, send to analytics service
  if (import.meta.env.PROD) {
    // TODO: Send to analytics service
    // Example: Google Analytics 4, Plausible, or custom endpoint
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_category: 'Web Vitals',
    //   event_label: metric.id,
    //   non_interaction: true,
    // });
    
    // For now, log in production for demo purposes
    console.log(`📈 ${metric.name} (PROD):`, metricData);
  }
};

/**
 * Get a performance rating for a metric
 * 
 * @param name - Metric name
 * @param value - Metric value
 * @returns Performance rating (good, needs-improvement, poor)
 */
const getMetricRating = (name: string, value: number): string => {
  const thresholds = {
    CLS: { good: 0.1, poor: 0.25 },
    INP: { good: 200, poor: 500 }, // INP replaces FID
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 },
  };

  const threshold = thresholds[name as keyof typeof thresholds];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

/**
 * Track custom events
 * 
 * @param eventName - Event name
 * @param properties - Event properties
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (import.meta.env.DEV) {
    console.log(`🎯 Event: ${eventName}`, properties);
    return;
  }

  // TODO: Send to analytics service
  // Example implementations:
  // - Google Analytics: gtag('event', eventName, properties)
  // - Plausible: plausible(eventName, { props: properties })
  // - Custom API: fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ event: eventName, ...properties }) })
};

/**
 * Track page views
 * 
 * @param path - Page path
 * @param title - Page title
 */
export const trackPageView = (path: string, title?: string) => {
  if (import.meta.env.DEV) {
    console.log(`📄 Page View: ${path}`, { title });
    return;
  }

  // TODO: Send to your analytics service
};