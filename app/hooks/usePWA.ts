import { useEffect, useRef, useState } from "react";

interface UsePWARegistrationResult {
  offlineReady: boolean;
  needRefresh: boolean;
  updateServiceWorker: () => void;
}

/**
 * React hook to register PWA Service Worker with the Vite plugin.
 * Handles offline ready state, update availability, and update action.
 */
export function useRegisterServiceWorker(): UsePWARegistrationResult {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const updateSW = useRef<null | (() => void)>(null);

  useEffect(() => {
    if (import.meta.env.DEV) return; // Skip in dev mode
    if (typeof window === "undefined") return; // Skip in SSR

    let registered = false;

    // @ts-ignore: Virtual module
    // Dynamic import to avoid issues in SSR or non-browser envs
    import("virtual:pwa-register")
      .then(({ registerSW }) => {
        if (registered) return;

        console.log("🔧 Registering service worker...");

        registerSW({
          onRegisteredSW(_scriptUrl, registration) {
            console.log("✅ Service worker registered successfully");
            updateSW.current = () => registration?.update();
          },
          onOfflineReady() {
            console.log("🌐 App is ready to work offline");
            setOfflineReady(true);
          },
          onNeedRefresh() {
            console.log("🔄 New version available");
            setNeedRefresh(true);
          },
          onRegisterError(error) {
            console.error("❌ Service worker registration failed:", error);
          },
        });
        registered = true;
      })
      .catch((error) => {
        console.error("❌ Failed to import PWA register:", error);
      });

    // Cleanup function if needed
    return () => {
      registered = false;
    };
  }, []);

  /** Call this method to apply the new SW update */
  const updateServiceWorker = () => {
    updateSW.current?.();
    setNeedRefresh(false);
  };

  return { offlineReady, needRefresh, updateServiceWorker };
}
