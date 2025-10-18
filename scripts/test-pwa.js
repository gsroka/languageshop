/**
 * PWA Testing Script for LanguageShop
 * 
 * This script builds the app and provides instructions for testing PWA functionality
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 LanguageShop PWA Test Environment');
console.log('=====================================\n');

console.log('📦 Building production version...');

// Build the app
const buildProcess = spawn('pnpm', ['build'], {
  stdio: 'inherit',
  shell: true,
  cwd: path.dirname(__dirname)
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Build failed!');
    process.exit(1);
  }

  console.log('\n✅ Build completed successfully!');
  console.log('\n🔍 Running PWA validation...');

  // Run validation
  const validateProcess = spawn('node', ['scripts/validate-pwa.js'], {
    stdio: 'inherit',
    shell: true,
    cwd: path.dirname(__dirname)
  });

  validateProcess.on('close', (validateCode) => {
    if (validateCode !== 0) {
      console.error('⚠️  Validation had issues, but continuing...');
    }

    console.log('\n🌐 Starting production server...');
    console.log('📍 Server will be available at: http://localhost:3000');
    console.log('\n📋 PWA Testing Instructions:');
    console.log('1. Open: http://localhost:3000');
    console.log('2. Wait for "App is ready to work offline" message');
    console.log('3. Open DevTools (F12) → Network → Check "Offline"');
    console.log('4. Refresh page and navigate around');
    console.log('5. Use diagnostic tool: http://localhost:3000/test-offline.html');
    console.log('\n🔧 Service Worker should be: http://localhost:3000/sw.js');
    console.log('📦 Cache should contain 30+ entries');
    console.log('\n⏹️  Press Ctrl+C to stop the server\n');

    // Start the server
    const serverProcess = spawn('pnpm', ['start'], {
      stdio: 'inherit',
      shell: true,
      cwd: path.dirname(__dirname)
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down server...');
      serverProcess.kill('SIGINT');
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      serverProcess.kill('SIGTERM');
      process.exit(0);
    });
  });
});

buildProcess.on('error', (error) => {
  console.error('❌ Failed to start build process:', error);
  process.exit(1);
});