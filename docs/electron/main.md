---
sidebar_position: 1
title: Main Process
description: Detailed design of the Electron main process in SmartAdmin application
---

# Main Process

## Overview

The `main.js` file serves as the entry point for the SmartAdmin Electron application, orchestrating the entire application lifecycle, window management, and core system initialization.

---

## Architecture Components

### Application Mode
```javascript
export const isDev = true; // Development/Production mode toggle
```
- Controls development vs production behavior
- Affects menu visibility, update checks, and debugging features

### Window Management

#### Main Window (`mainWindow`)

- **Purpose**: Primary chat interface
- **Dimensions**: 800x600 (initial)
- **Features**: AI chat, user interaction, main application logic
- **Security**: Uses main preload script with node integration

#### Splash Screen (`splashScreen`)

- **Purpose**: Loading screen during app initialization
- **Dimensions**: 400x400
- **Features**: Frameless, transparent, non-resizable
- **Lifecycle**: Shows during startup, closes when main window ready

#### Second Window (`secondWindow`)

- **Purpose**: Multi-purpose auxiliary window
- **Use Cases**: External websites, admin dashboard, ban notifications
- **Features**: Configurable dimensions and properties
- **Security**: Uses secondary preload script

#### Settings Window (`settingsWindow`)

- **Purpose**: Configuration management interface
- **Dimensions**: 900x700
- **Features**: AI settings, user preferences, system configuration

#### Action Script Window (`actionScriptWindow`)

- **Purpose**: Browser automation script management
- **Dimensions**: 800x600
- **Features**: Script editor, test runner, template management

#### Notification Window (`notificationWindow`)

- **Purpose**: System notifications and alerts
- **Features**: Frameless, always-on-top, non-focusable
- **Behavior**: Hidden by default, shown on demand

### Core Initialization Sequence

#### 1. Environment Setup

```javascript
import dotenv from 'dotenv';
dotenv.config();
```

- Loads environment variables
- Configures development/production settings

#### 2. Protocol Registration

```javascript
app.setAsDefaultProtocolClient('smartadmin');
```

- Registers `smartadmin://` protocol handler
- Enables deep linking functionality

#### 3. Single Instance Lock

```javascript
const gotTheLock = app.requestSingleInstanceLock();
```

- Prevents multiple app instances
- Focuses existing instance on second launch attempt

#### 4. Window Creation Pipeline

1. **Splash Screen**: Immediate loading indicator
2. **Notification Window**: Background notification system
3. **Main Window**: Primary application interface

#### 5. System Initialization

```javascript
// Auto updater setup
initializeAutoUpdater(mainWindow);

// Database connection test
await testPostgresConnection();

// Settings initialization
await initializeSettings();

// RAG system setup
await initializeRAGSystem();
await refreshLibrary();

// Playwright browser initialization
await initBrowser();

// Global shortcuts registration
await registerGlobalShortcuts(appContext);

// IPC handlers registration
await registerIpcHandlers(ipcMain, appContext);

// AI system initialization
await initializeAI();

// Ably real-time connection
await initAbly();

// User session validation
await readUserSession();
```

### Security Architecture

#### Content Security

- **Node Integration**: Enabled for convenience (development)
- **Context Isolation**: Disabled (should be enabled in production)
- **Preload Scripts**: Separate scripts for different window types

#### Protocol Security

- **Deep Link Handling**: Secure protocol URL processing
- **Single Instance**: Prevents security issues from multiple instances

### Error Handling & User States

#### Initialization Failures

- **AI Initialization**: Graceful fallback with user notification
- **Database Connection**: Error logging with continued operation
- **Network Services**: Retry logic and offline mode support

#### User Authentication States

- **Valid Session**: Welcome message, full feature access
- **No Session**: Locked interface, login prompt
- **Banned User**: Special banned page display, main window hiding

#### Ban System

```javascript
// IP-based bans
const banParams = new URLSearchParams({
  hostname: os.hostname(),
  banType: 'ip',
  ip: ablyConnection.ip,
  bannedDate: ablyConnection.bannedDate,
  reason: ablyConnection.reason
});

// Email-based bans
if (ablyConnection.banType === 'email') {
  banParams.set('banType', 'email');
  banParams.set('email', ablyConnection.email);
}
```

### Development vs Production Modes

#### Development Mode (`isDev = true`)

- Menu bar visible
- Development tools accessible
- Update checks skipped
- Enhanced logging
- Message logs to Ably

#### Production Mode (`isDev = false`)

- Hidden menu bar
- Restricted development tools
- Automatic update checks
- Optimized logging

### Window Communication

#### IPC Architecture

```javascript
await registerIpcHandlers(ipcMain, appContext);
```

- Centralized handler registration
- Context passing for window management
- Secure inter-process communication

#### Application Context

```javascript
const appContext = {
  mainWindow,
  secondWindow,
  createSecondWindow,
  createSettingsWindow,
  getSettingsWindow,
  getSecondWindow,
  createActionScriptWindows,
  getNotificationWindow,
  myScreen
};
```

### Cleanup & Lifecycle Management

#### Application Shutdown

```javascript
mainWindow.on('closed', async () => {
  // Close all dependent windows
  if (secondWindow && !secondWindow.isDestroyed()) {
    secondWindow.close();
  }
  
  // Cleanup resources
  cleanupCodegenProcesses();
  await cleanupAI();
  await closeAbly();
  
  app.quit();
});
```

#### Resource Management

- **Process Cleanup**: Playwright and codegen processes
- **AI Resources**: Model unloading and memory cleanup
- **Network Connections**: Ably connection closure
- **Window Management**: Proper window destruction

### Screen Management

#### Display Configuration

```javascript
const primaryDisplay = screen.getPrimaryDisplay();
myScreen = {
  width: primaryDisplay.workAreaSize.width,
  height: primaryDisplay.workAreaSize.height,
  notificationMargin: 20
};
```

### Auto-Update System

#### Update Management

```javascript
initializeAutoUpdater(mainWindow);
```

- Production-only update checks
- User notification system
- Graceful update installation

### File Paths Configuration

```javascript
const indexDir = path.join(__dirname, 'src', 'pages', 'index.html');
const settingsDir = path.join(__dirname, 'src', 'pages', 'settings.html');
const splashDir = path.join(__dirname, 'src', 'pages', 'splashScreen.html');
const actionScriptDir = path.join(__dirname, 'src', 'pages', 'actionScript.html');
const mainPreloadDir = path.join(__dirname, 'src', 'preload', 'preload.js');
const secondPreloadDir = path.join(__dirname, 'src', 'preload', 'second-preload.js');
const iconDir = path.join(__dirname, 'src', 'assets', 'logo.ico');
```

### Platform-Specific Behavior

#### Windows

- Native notification support via `app.setAppUserModelId`
- ICO icon format support

#### macOS

- Protocol URL handling via `open-url` event
- Different quit behavior (stays in dock)

#### Cross-Platform

- Electron's consistent API usage
- Path resolution for different filesystems

### Performance Considerations

#### Lazy Loading

- Windows created on demand
- Services initialized sequentially
- Resource cleanup on window close

#### Memory Management

- Proper window destruction
- AI model cleanup
- Process termination handling

### Logging & Monitoring

#### Application Events

```javascript
log.app("App Starting... Creating windows...");
log.app("🔄 Initializing auto-updater...");
log.app("🐘 Testing PostgreSQL connection...");
```

#### Error Tracking

- Comprehensive error logging
- User-friendly error messages
- Development vs production logging levels

---

## Dependencies

### Core Electron

- `electron`: Application framework
- `path`: File path utilities
- `os`: Operating system utilities

### Application Modules

- `./src/modules/ipc-handlers.js`: IPC communication
- `./src/modules/settings-handler.js`: Configuration management
- `./src/modules/ai-manager.js`: AI system orchestration
- `./src/modules/rag-handler.js`: Knowledge retrieval
- `./src/modules/action-handler.js`: Browser automation
- `./src/modules/auto-updater.js`: Update management
- `./src/modules/ably-handler.js`: Real-time messaging

---

## Usage Patterns

### Window Creation

```javascript
await createSecondWindow(url, {
  width: 1200,
  height: 800,
  autoHideMenuBar: true,
  frame: true,
  resizable: true
});
```

### Service Initialization

```javascript
const result = await initializeService();
if (result.status) {
  log.success("Service initialized");
} else {
  log.error("Service failed:", result.message);
}
```

---
