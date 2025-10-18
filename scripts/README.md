# Scripts Directory

This directory contains utility scripts for testing and validating the LanguageShop PWA.

## Files

### `test-pwa.js`
Main PWA testing script that builds, validates, and starts the production server with detailed instructions.

**Usage:**
```bash
# From project root
pnpm test:pwa

# Or directly
node scripts/test-pwa.js
```

### `validate-pwa.js`
Validation script that checks PWA configuration and build output.

**Usage:**
```bash
# From project root
node scripts/validate-pwa.js

# Or as part of test
pnpm test:pwa:validate
```

### `test-pwa.bat`
Windows batch file for easy PWA testing.

**Usage:**
Double-click the file or run from command prompt.

## Available npm scripts

- `pnpm test:pwa` - Full PWA test with validation and instructions
- `pnpm test:pwa:quick` - Quick build and start without validation
- `pnpm test:pwa:validate` - Build, validate, then start server

## Documentation

See `docs/PWA_TESTING.md` for detailed testing instructions and `docs/PWA_OFFLINE_TROUBLESHOOTING.md` for troubleshooting guide.