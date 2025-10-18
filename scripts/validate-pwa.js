/**
 * PWA Validation Script for LanguageShop
 * 
 * This script validates that the PWA build is properly configured
 * for offline functionality.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

console.log('🔍 Validating LanguageShop PWA Configuration...\n');

const checks = [];

// Check 1: Build directory exists
const buildDir = path.join(projectRoot, 'build', 'client');
if (fs.existsSync(buildDir)) {
  checks.push({ name: 'Build directory exists', status: '✅', details: buildDir });
} else {
  checks.push({ name: 'Build directory exists', status: '❌', details: 'Run: pnpm build' });
}

// Check 2: Service worker file exists
const swPath = path.join(buildDir, 'sw.js');
if (fs.existsSync(swPath)) {
  checks.push({ name: 'Service worker generated', status: '✅', details: 'sw.js found' });
  
  // Check SW content
  const swContent = fs.readFileSync(swPath, 'utf8');
  if (swContent.includes('precacheAndRoute')) {
    checks.push({ name: 'Precaching configured', status: '✅', details: 'precacheAndRoute found' });
  } else {
    checks.push({ name: 'Precaching configured', status: '❌', details: 'No precacheAndRoute in SW' });
  }
  
  if (swContent.includes('NavigationRoute')) {
    checks.push({ name: 'Navigation fallback', status: '✅', details: 'NavigationRoute configured' });
  } else {
    checks.push({ name: 'Navigation fallback', status: '❌', details: 'No NavigationRoute in SW' });
  }
  
  if (swContent.includes('NetworkFirst')) {
    checks.push({ name: 'Network-first caching', status: '✅', details: 'NetworkFirst strategy found' });
  } else {
    checks.push({ name: 'Network-first caching', status: '⚠️', details: 'No NetworkFirst strategy' });
  }
} else {
  checks.push({ name: 'Service worker generated', status: '❌', details: 'sw.js not found' });
}

// Check 3: Workbox runtime exists
const workboxPath = path.join(buildDir, 'workbox-e55a9eda.js');
const workboxFiles = fs.existsSync(buildDir) ? 
  fs.readdirSync(buildDir).filter(f => f.startsWith('workbox-')) : [];

if (workboxFiles.length > 0) {
  checks.push({ name: 'Workbox runtime', status: '✅', details: workboxFiles[0] });
} else {
  checks.push({ name: 'Workbox runtime', status: '❌', details: 'No workbox runtime found' });
}

// Check 4: Manifest file exists
const manifestPath = path.join(buildDir, 'manifest.webmanifest');
if (fs.existsSync(manifestPath)) {
  checks.push({ name: 'PWA manifest', status: '✅', details: 'manifest.webmanifest found' });
  
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (manifest.start_url && manifest.icons && manifest.icons.length > 0) {
      checks.push({ name: 'Manifest valid', status: '✅', details: `${manifest.icons.length} icons` });
    } else {
      checks.push({ name: 'Manifest valid', status: '⚠️', details: 'Missing start_url or icons' });
    }
  } catch (error) {
    checks.push({ name: 'Manifest valid', status: '❌', details: 'Invalid JSON' });
  }
} else {
  checks.push({ name: 'PWA manifest', status: '❌', details: 'manifest.webmanifest not found' });
}

// Check 5: Essential assets exist
const essentialAssets = ['favicon.ico', 'pwa-192x192.png', 'pwa-512x512.png'];
const missingAssets = essentialAssets.filter(asset => 
  !fs.existsSync(path.join(buildDir, asset))
);

if (missingAssets.length === 0) {
  checks.push({ name: 'PWA assets', status: '✅', details: 'All icons and favicon present' });
} else {
  checks.push({ name: 'PWA assets', status: '❌', details: `Missing: ${missingAssets.join(', ')}` });
}

// Check 6: JavaScript bundles exist
const jsFiles = fs.existsSync(path.join(buildDir, 'assets')) ?
  fs.readdirSync(path.join(buildDir, 'assets')).filter(f => f.endsWith('.js')) : [];

if (jsFiles.length > 0) {
  checks.push({ name: 'JavaScript bundles', status: '✅', details: `${jsFiles.length} JS files` });
} else {
  checks.push({ name: 'JavaScript bundles', status: '❌', details: 'No JS files in assets/' });
}

// Check 7: CSS bundles exist
const cssFiles = fs.existsSync(path.join(buildDir, 'assets')) ?
  fs.readdirSync(path.join(buildDir, 'assets')).filter(f => f.endsWith('.css')) : [];

if (cssFiles.length > 0) {
  checks.push({ name: 'CSS bundles', status: '✅', details: `${cssFiles.length} CSS files` });
} else {
  checks.push({ name: 'CSS bundles', status: '❌', details: 'No CSS files in assets/' });
}

// Check 8: PWA registration code
const pwaLibPath = path.join(projectRoot, 'app', 'lib', 'pwa.ts');
if (fs.existsSync(pwaLibPath)) {
  const pwaContent = fs.readFileSync(pwaLibPath, 'utf8');
  if (pwaContent.includes('virtual:pwa-register')) {
    checks.push({ name: 'PWA registration', status: '✅', details: 'Registration code found' });
  } else {
    checks.push({ name: 'PWA registration', status: '❌', details: 'No virtual:pwa-register import' });
  }
} else {
  checks.push({ name: 'PWA registration', status: '❌', details: 'app/lib/pwa.ts not found' });
}

// Check 9: Vite PWA config
const viteConfigPath = path.join(projectRoot, 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  const viteContent = fs.readFileSync(viteConfigPath, 'utf8');
  if (viteContent.includes('VitePWA')) {
    checks.push({ name: 'Vite PWA plugin', status: '✅', details: 'VitePWA configured' });
  } else {
    checks.push({ name: 'Vite PWA plugin', status: '❌', details: 'VitePWA not found in config' });
  }
  
  if (viteContent.includes('navigateFallback')) {
    checks.push({ name: 'Navigate fallback', status: '✅', details: 'Offline navigation configured' });
  } else {
    checks.push({ name: 'Navigate fallback', status: '⚠️', details: 'No navigateFallback in config' });
  }
} else {
  checks.push({ name: 'Vite PWA plugin', status: '❌', details: 'vite.config.ts not found' });
}

// Display results
console.log('📋 Validation Results:\n');

const passed = checks.filter(c => c.status === '✅').length;
const failed = checks.filter(c => c.status === '❌').length;
const warnings = checks.filter(c => c.status === '⚠️').length;

checks.forEach(check => {
  console.log(`${check.status} ${check.name.padEnd(25)} ${check.details}`);
});

console.log('\n📊 Summary:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`⚠️  Warnings: ${warnings}`);
console.log(`📝 Total: ${checks.length}`);

if (failed === 0) {
  console.log('\n🎉 PWA configuration looks good!');
  console.log('\n🚀 Next steps:');
  console.log('1. Start the server: pnpm start');
  console.log('2. Open: http://localhost:3000');
  console.log('3. Test offline: DevTools → Network → Offline');
  console.log('4. Use test tool: http://localhost:3000/test-offline.html');
} else {
  console.log('\n🔧 Issues found. Please fix the failed checks above.');
  console.log('\n💡 Common fixes:');
  console.log('• Run: pnpm build');
  console.log('• Check vite.config.ts PWA configuration');
  console.log('• Ensure workbox-window is installed: pnpm add workbox-window');
}

console.log('\n📖 For detailed troubleshooting, see: docs/PWA_OFFLINE_TROUBLESHOOTING.md');