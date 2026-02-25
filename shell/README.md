# Shell Application

This is the shell/host application for the MFE (Micro Front-end) Angular Module Federation project. It serves as the main entry point that orchestrates and loads multiple federated micro-applications.

## Overview

The shell application uses **Module Federation** to dynamically load and manage multiple micro front-end applications:
- `mfe-header` - Header navigation component
- `mfe-footer` - Footer component
- `mfe-home` - Home page
- `mfe-about` - About page
- `mfe-contact` - Contact page
- `mfe-products` - Products page

The shell also provides a shared UI library (`common-ui-lib`) for consistent styling and reusable components across all MFEs.

## Prerequisites

- Node.js 18+ and npm 9+
- Angular CLI 21.x
- Common-ui-lib must be built before installing shell dependencies

## Installation

### Step 1: Build common-ui-lib

Build the shared UI library first:

```bash
cd common-ui-lib
npm install
npm run build
```

This creates the distributable at `../common-ui-lib/dist/common-ui-lib`.

### Step 2: Install Shell Dependencies

```bash
cd shell
npm install
```

This automatically installs `common-ui-lib` from the local path specified in package.json:
```json
"common-ui-lib": "file:../common-ui-lib/dist/common-ui-lib"
```

### Manual Installation (if needed)

To manually install or reinstall the `common-ui-lib` package:

```bash
npm install common-ui-lib@file:../common-ui-lib/dist/common-ui-lib
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on http://localhost:4200 |
| `npm run build` | Build for production |
| `npm run watch` | Build in watch mode for development |
| `npm test` | Run unit tests with Vitest |
| `ng` | Run any Angular CLI command |

## Development

### Start Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

### Build for Production

```bash
npm run build
```

Build artifacts are stored in the `dist/` directory.

### Watch Mode

```bash
npm run watch
```

Recommended for active development with other MFEs.

## Testing

Run unit tests:

```bash
npm test
```

## Module Federation Configuration

The Module Federation setup is configured in `webpack.config.js`. Key settings:

- **Port**: 4200 (shell host)
- **Shared Dependencies**: Angular, RxJS, CommonUI, NgRx
- **Remotes**: References to other MFEs (header, footer, home, about, contact, products)

Each MFE exposes components that the shell can import dynamically.

## Architecture

```
Shell (Port 4200)
├── Routes & Navigation
├── Shared Layout
├── Common-UI-Lib (Shared Components)
└── Federated MFEs
    ├── Header (Port 4201)
    ├── Footer (Port 4202)
    ├── Home (Port 4203)
    ├── About (Port 4204)
    ├── Contact (Port 4205)
    └── Products (Port 4206)
```

## Troubleshooting

### Missing `@angular-devkit/core` Module

**Error**: `Cannot find module '@angular-devkit/core'`

**Solution**:
```bash
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

### Common-UI-Lib Installation Issues

1. Verify the build exists at `../common-ui-lib/dist/common-ui-lib`
2. Rebuild common-ui-lib:
   ```bash
   cd ../common-ui-lib
   npm run build
   cd ../shell
   ```
3. Clear node_modules and reinstall:
   ```bash
   rm -r node_modules package-lock.json
   npm install
   ```

### Port Already in Use

If port 4200 is in use, specify a different port:

```bash
npm start -- --port 4300
```

### MFE Not Loading

Ensure all MFEs are running on their respective ports and check `webpack.config.js` for correct remote URLs.

## State Management

This project uses **NgRx** for state management. See [STORE_INTEGRATION.md](../STORE_INTEGRATION.md) for setup details.

## Related Documentation

- [Project README](../README.md) - Main project overview
- [NGRX_SETUP.md](../NGRX_SETUP.md) - State management setup
- [STORE_INTEGRATION.md](../STORE_INTEGRATION.md) - Store integration guide
- [Common-UI-Lib README](../common-ui-lib/README.md) - Shared components documentation

## License

See [LICENSE](../LICENSE) file in the project root.