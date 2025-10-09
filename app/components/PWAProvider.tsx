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

import { useEffect, useState } from 'react';
import { registerServiceWorker } from '~/lib/pwa';
import { initWebVitals } from '~/lib/analytics';

/**
 * PWA Provider Component Props
 */
interface PWAProviderProps {
  /** Child components to render (typically the entire app) */
  children: React.ReactNode;
}

/**
 * BeforeInstallPromptEvent interface for install prompt handling
 */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * PWA Provider - Enables Progressive Web App functionality
 * 
 * This component automatically registers the service worker when the app
 * loads in production, enabling offline functionality, caching, and
 * installability features.
 * 
 * The component is completely transparent - it renders children without
 * any wrapper elements and only adds PWA functionality via side effects.
 * 
 * @param props - Component props
 * @param props.children - Child components to render
 * @returns JSX fragment containing children
 * 
 * @example
 * ```tsx
 * // In app/root.tsx
 * export default function App() {
 *   return (
 *     <PWAProvider>
 *       <Outlet />
 *     </PWAProvider>
 *   );
 * }
 * ```
 */
export function PWAProvider({ children }: PWAProviderProps) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Only register service worker in production builds
    if (import.meta.env.PROD) {
      registerServiceWorker(setUpdateAvailable);
      initWebVitals();
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    
    const result = await installPrompt.prompt();
    console.log('Install prompt result:', result);
    setInstallPrompt(null);
  };

  const handleUpdate = () => {
    window.location.reload();
  };

  return (
    <>
      {children}
      
      {/* Update Available Notification */}
      {updateAvailable && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50">
          <p className="text-sm mb-2">New version available!</p>
          <button 
            onClick={handleUpdate}
            className="bg-white text-primary px-3 py-1 rounded text-sm hover:bg-gray-100"
          >
            Update Now
          </button>
        </div>
      )}

      {/* Install App Prompt */}
      {installPrompt && (
        <div className="fixed bottom-4 left-4 bg-secondary text-secondary-foreground p-4 rounded-lg shadow-lg z-50">
          <p className="text-sm mb-2">Install LanguageShop for better experience!</p>
          <div className="flex gap-2">
            <button 
              onClick={handleInstall}
              className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:opacity-90"
            >
              Install
            </button>
            <button 
              onClick={() => setInstallPrompt(null)}
              className="bg-muted text-muted-foreground px-3 py-1 rounded text-sm hover:bg-muted/80"
            >
              Later
            </button>
          </div>
        </div>
      )}
    </>
  );
}