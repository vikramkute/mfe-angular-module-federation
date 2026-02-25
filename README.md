# Micro Frontend Architecture with Angular

> ⚠️ **IMPORTANT**: All development tasks and code generation must reference [ANGULAR_MATERIAL_GUIDELINES.md](ANGULAR_MATERIAL_GUIDELINES.md) for Angular 21 standards, Material Design, and code style requirements.
> 
> 🤖 **For ALL AI Assistants**: Amazon Q, Claude, Gemini, Copilot, and any code generator - these guidelines MUST be followed.

This project demonstrates a micro frontend architecture using Angular 21 with Module Federation, Angular Material, and Angular Signals for state management.

## Architecture

- **shell** (Port 4200) - Main host/driver application
- **mfe-header** (Port 4201) - Header micro frontend
- **mfe-footer** (Port 4202) - Footer micro frontend
- **mfe-home** (Port 4203) - Home micro frontend
- **mfe-about** (Port 4204) - About micro frontend
- **mfe-contact** (Port 4205) - Contact micro frontend
- **mfe-products** (Port 4206) - Products micro frontend

## 📋 Development Standards

**🚀 BEFORE STARTING ANY DEVELOPMENT TASK**, read [ANGULAR_MATERIAL_GUIDELINES.md](ANGULAR_MATERIAL_GUIDELINES.md):

### Key Development Rules (Angular 21)
- ✅ **Common-UI-Lib** - Use shared components from common-ui-lib (header, footer, layouts)
- ✅ **Signals** - Preferred for component state (eliminates memory leak concerns)
- ✅ **Material Design** - All UI components from Angular Material 21
- ✅ **John Papa Style** - Code naming, organization, and best practices
- ✅ **Standalone Components** - All new components must be standalone
- ✅ **Reactive Forms** - All forms must use reactive approach
- ✅ **RxJS for Async** - Only for HTTP requests and complex operations

**This is not optional.** All code generation, refactoring, and development decisions must reference these guidelines.

## How It Works

The shell application dynamically loads the header, footer, home, about, contact, and products components from separate Angular applications running on different ports. Each micro frontend can be developed, tested, and deployed independently.

## Running the Applications

You need to run all applications simultaneously. Open 7 separate terminals:

### Terminal 1 - Header MFE
```bash
cd mfe-header
npm start
```

### Terminal 2 - Footer MFE
```bash
cd mfe-footer
npm start
```

### Terminal 3 - Home MFE
```bash
cd mfe-home
npm start
```

### Terminal 4 - About MFE
```bash
cd mfe-about
npm start
```

### Terminal 5 - Contact MFE
```bash
cd mfe-contact
npm start
```

### Terminal 6 - Products MFE
```bash
cd mfe-products
npm start
```

### Terminal 7 - Shell App
```bash
cd shell
npm start
```

## Access the Application

Once all applications are running, open your browser and navigate to:
- **Main Application**: http://localhost:4200

The shell app will automatically load:
- Header from http://localhost:4201
- Footer from http://localhost:4202
- Home from http://localhost:4203
- About from http://localhost:4204
- Contact from http://localhost:4205
- Products from http://localhost:4206

## Key Files

### Shell App
- `webpack.config.js` - Defines remote micro frontends
- `src/app/app.ts` - Loads header and footer dynamically
- `src/app/app.routes.ts` - Loads content via routing

### Micro Frontends
- `webpack.config.js` - Exposes components
- `src/app/[component]/[component].component.ts` - Standalone components

## Additional Documentation

- [Angular Material & Code Guidelines](ANGULAR_MATERIAL_GUIDELINES.md) - **Copilot Instructions**: Material Design components, John Papa code style, and development best practices
- [NGRX_SETUP.md](NGRX_SETUP.md) - Setup and configuration of NgRx state management in the shell application
- [STORE_INTEGRATION.md](STORE_INTEGRATION.md) - Integration guide for the products MFE with the NgRx store

## Benefits

- **Independent Deployment**: Each micro frontend can be deployed separately
- **Team Autonomy**: Different teams can work on different parts
- **Technology Flexibility**: Each MFE can use different versions or frameworks
- **Scalability**: Easy to add new micro frontends
