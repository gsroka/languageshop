/**
 * Initialize MSW in the browser for development
 * This should be called before your app starts making API requests
 */
export async function initMSW(): Promise<void> {
  // Only run in a browser environment
  if (typeof window === 'undefined') {
    return
  }

  // Only enable MSW in development
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import('./browser')
      
      await worker.start({
        onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
        serviceWorker: {
          url: '/mockServiceWorker.js'
        },
        quiet: false // Show MSW logs in development
      })
      
      console.log('🔶 MSW enabled for development')
    } catch (error) {
      console.error('❌ Failed to start MSW:', error)
    }
  }
}