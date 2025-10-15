import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { initMSW } from "./mocks/init";

/**
 * Entry point for the client-side application.
 * Hydrates the server-rendered HTML with React.
 */
function main() {
  console.log('🚀 Starting LanguageShop app...');
  
  // Initialize MSW in development (non-blocking)
  if (import.meta.env.DEV) {
    initMSW().catch((error) => {
      console.error('MSW initialization failed, but app will continue:', error);
    });
  }

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <HydratedRouter />
      </StrictMode>
    );
  });
  
  console.log('✅ App hydrated successfully');
}

main();
