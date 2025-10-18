/**
 * PWA Provider Component
 * 
 * This React component provides Progressive Web App (PWA) functionality to the
 * entire LanguageShop application. It acts as a wrapper that automatically
 * handles service worker registration when the app loads in production.
 * 
 * Key Features:
 * - Automatic service worker registration in production builds
 * - Clean React pattern (no dangerouslySetInnerHTML)
 * - Production-only execution (skips registration in development)
 * - Zero visual impact (transparent wrapper)
 * - CSP-friendly implementation
 * 
 * Architecture:
 * This component follows the Provider pattern, wrapping the entire app
 * to ensure PWA functionality is available throughout the application.
 * 
 * Usage:
 * Wrap your root App component with PWAProvider in root.tsx
 * 
 * @see ~/lib/pwa.ts for service worker registration logic
 * @see app/root.tsx for implementation example
 */

import { useRegisterServiceWorker } from "~/hooks/usePWA";

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterServiceWorker();

  return (
    <>
      {children}

      {offlineReady && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-md z-50" aria-live="polite">
          App is ready to work offline 🎉
          <button className="ml-3 underline" onClick={() => {}}>
            Close
          </button>
        </div>
      )}

      {needRefresh && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50">
          <div className="mb-2">New version available. Reload?</div>
          <button className="mr-2 underline" onClick={updateServiceWorker}>
            Reload
          </button>
          <button className="underline" onClick={() => {}}>
            Later
          </button>
        </div>
      )}
    </>
  );
}