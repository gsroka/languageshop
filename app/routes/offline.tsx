import type { Route } from "./+types/offline";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Offline - LanguageShop" },
    { name: "description", content: "You're currently offline. Please check your connection." },
  ];
}

export default function Offline() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-muted-foreground" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z" 
            />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">You're Offline</h1>
          <p className="text-muted-foreground max-w-md">
            It looks like you've lost your internet connection. Don't worry, you can still browse 
            previously visited pages and your cart items are saved locally.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          
          <div className="text-sm text-muted-foreground">
            <p>While offline, you can:</p>
            <ul className="mt-2 space-y-1">
              <li>• Browse cached product pages</li>
              <li>• View your shopping cart</li>
              <li>• Continue shopping when back online</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}