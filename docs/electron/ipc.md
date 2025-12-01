---
sidebar_position: 2
title: IPC Handlers
description: Detailed design of the Electron IPC handlers in SmartAdmin application
---

# IPC Handlers

## Overview

The `ipc-handlers.js` module serves as the central communication bridge between the main Electron process and renderer processes. It manages all Inter-Process Communication (IPC) channels, handling everything from window management to AI interactions, settings, automation, and user authentication.

## Architecture

### Core Components

```javascript
// Global state management
let chatHistory = [];
const MAX_HISTORY_LENGTH = 10;
let chatSettings = {
    maxTokens: 512,
    temperature: 0.7,
    topK: 20,
    topP: 0.7,
    repeatPenalty: 1.1,
    stopOnNewlineCount: 0,
};
```

### Registration Function

```javascript
function registerIpcHandlers(ipcMain, context)
```

**Parameters:**
- `ipcMain`: Electron's main process IPC interface
- `context`: Application context containing window references and creation functions

**Context Object Structure:**
```javascript
const context = {
    mainWindow,
    createSecondWindow,
    createSettingsWindow,
    createActionScriptWindows,
    getSettingsWindow,
    getSecondWindow,
    getNotificationWindow,
    myScreen
};
```

## IPC Handler Categories

### 1. Window Management Handlers

#### Open Second Window
```javascript
ipcMain.on('open-second-window', async (event, arg) => {})
```
- **Purpose**: Opens auxiliary window for external content
- **Parameters**: `arg` (string) - URL to load
- **Returns**: `{ status: 'success' }`
- **Use Cases**: Admin dashboard, external websites, ban notifications

#### Close Second Window
```javascript
ipcMain.on('close-second-window', async (event) => {})
```
- **Purpose**: Safely closes the second window
- **Parameters**: None
- **Returns**: `{ status: 'success' }`

#### Open Settings Window
```javascript
ipcMain.on('open-settings-window', async (event) => {})
```
- **Purpose**: Opens configuration management interface
- **Parameters**: None
- **Returns**: `{ status: 'success' }`

#### Open Action Script Window
```javascript
ipcMain.on('open-action-script-window', async (event) => {})
```
- **Purpose**: Opens browser automation script manager
- **Parameters**: None
- **Returns**: `{ status: 'success' }`

#### Show Dialog Windows
```javascript
ipcMain.on('show-open-dialog', async (event, arg) => {})
```
- **Purpose**: Displays native file/folder selection dialogs
- **Parameters**: `arg` (object) - Dialog options
- **Returns**: `{ status: 'success'|'error', data?: OpenDialogReturnValue, message?: string }`

### 2. Chat & AI Interaction Handlers

#### Send Message
```javascript
ipcMain.handle('send-message', async (event, message) => {})
```
- **Purpose**: Processes user messages and generates AI responses
- **Parameters**: `message` (string) - User input
- **Returns**: `{ success: boolean, response?: string, error?: string }`

**Features:**
- Chat history management (last 20 messages)
- AI system initialization check
- RAG-enhanced responses
- Special action triggers (BIBLE_LESSON)
- Error handling with user notifications

#### Clear Chat History
```javascript
ipcMain.handle('clear-chat-history', async (event) => {})
```
- **Purpose**: Resets conversation history
- **Parameters**: None
- **Returns**: `{ success: boolean, error?: string }`
- **Additional**: Checks user session status

### 3. Settings Management Handlers

#### Get Settings
```javascript
ipcMain.handle('get-settings', async (event) => {})
```
- **Purpose**: Retrieves current application configuration
- **Parameters**: None
- **Returns**: Settings object with `LlamaModelExists` status
- **Features**: Includes model availability status

#### Save Settings
```javascript
ipcMain.handle('save-settings', async (event, newSettings) => {})
```
- **Purpose**: Persists configuration changes
- **Parameters**: `newSettings` (object) - Updated settings
- **Returns**: `{ success: boolean, settings?: object, error?: string }`
- **Features**: 
  - AI type change detection
  - Automatic AI reinitialization
  - Filters out computed fields

#### Reset Settings
```javascript
ipcMain.handle('reset-settings', async (event) => {})
```
- **Purpose**: Restores default configuration
- **Parameters**: None
- **Returns**: `{ success: boolean, settings?: object, error?: string }`

#### Get Default Settings
```javascript
ipcMain.handle('get-default-settings', async (event) => {})
```
- **Purpose**: Retrieves factory defaults
- **Parameters**: None
- **Returns**: `{ success: boolean, settings?: object, error?: string }`

#### Import/Export Settings
```javascript
ipcMain.handle('export-settings', async (event) => {})
ipcMain.handle('import-settings', async (event) => {})
```
- **Export**: Saves settings to JSON file
- **Import**: Loads settings from JSON file
- **Features**: File validation, user cancellation handling

### 4. File System Handlers

#### Folder/File Dialogs
```javascript
ipcMain.handle('show-folder-dialog', async (event) => {})
ipcMain.handle('show-file-dialog', async (event, options) => {})
```
- **Purpose**: Native folder/file selection interfaces
- **Features**: Smart parent window detection, customizable options

#### Path Validation
```javascript
ipcMain.handle('validate-path', async (event, filePath) => {})
```
- **Purpose**: Validates file/directory existence and properties
- **Returns**: `{ exists: boolean, isFile?: boolean, isDirectory?: boolean, size?: number, modified?: Date, error?: string }`

#### Open Folders
```javascript
ipcMain.handle('open-folder', async (event, folderType) => {})
ipcMain.handle('open-settings-folder', async (event) => {})
```
- **Purpose**: Opens directories in system file explorer
- **Features**: Settings folder shortcuts, custom path support

### 5. Application Lifecycle Handlers

#### Quit Application
```javascript
ipcMain.on('app-quit', (event) => {})
```
- **Purpose**: Gracefully shuts down application
- **Parameters**: None
- **Features**: Synchronous IPC for immediate response

#### Restart Application
```javascript
ipcMain.handle('app-restart', async (event) => {})
```
- **Purpose**: Restarts application with current settings
- **Parameters**: None
- **Returns**: `{ success: boolean, error?: string }`

#### Version Management
```javascript
ipcMain.handle('check-current-version', async (event) => {})
ipcMain.handle('check-for-updates', async (event) => {})
```
- **Current Version**: Returns app version info
- **Update Check**: Manual update verification
- **Features**: Development mode detection, automatic vs manual checks

### 6. Browser Automation (Action) Handlers

#### Get Actions
```javascript
ipcMain.handle('get-actions', async (event) => {})
```
- **Purpose**: Retrieves all available automation scripts
- **Returns**: `{ success: boolean, actions?: array, error?: string }`
- **Features**: Serializes action data for IPC transfer

#### Create Actions
```javascript
ipcMain.handle('create-actions', async (event, args) => {})
ipcMain.handle('create-blank-action', async (event, args) => {})
```
- **Create Actions**: Starts Playwright codegen for script recording
- **Create Blank**: Creates template-based script with parameters
- **Parameters**: `{ url, filename, scriptDetails }`

#### Action Management
```javascript
ipcMain.handle('update-action', async (event, args) => {})
ipcMain.handle('delete-action', async (event, args) => {})
ipcMain.handle('run-action', async (event, args) => {})
```
- **Update**: Modifies action metadata
- **Delete**: Removes action script file
- **Run**: Executes automation with parameters

#### Code Editing
```javascript
ipcMain.handle('read-action-code', async (event, args) => {})
ipcMain.handle('update-action-code', async (event, args) => {})
```
- **Read**: Retrieves script source code
- **Update**: Saves modified script code
- **Features**: Automatic action refresh after updates

#### Parameter Management
```javascript
ipcMain.handle('extract-action-parameters', async (event, args) => {})
ipcMain.handle('get-project-functions', async (event) => {})
```
- **Extract Parameters**: Analyzes script for parameter definitions
- **Project Functions**: Lists available utility functions

### 7. User Authentication Handlers

#### Uparcel Login
```javascript
ipcMain.handle('uparcel-login', async (event, loginData) => {})
```
- **Purpose**: Handles user authentication
- **Parameters**: `{ username, password, method }`
- **Returns**: `{ success: boolean, message?: string, session?: object }`
- **Features**: Session management, success notifications

#### Session Management
```javascript
ipcMain.handle('read-user-session', async (event) => {})
ipcMain.on('open-login-window', async (event) => {})
```
- **Read Session**: Retrieves current user session
- **Login Window**: Opens authentication interface

#### External URLs
```javascript
ipcMain.on('open-external-url', (event, url) => {})
```
- **Purpose**: Opens URLs in system default browser
- **Features**: Security validation, error handling

### 8. Notification System Handlers

#### Notification Window Management
```javascript
ipcMain.handle('change-notification-size', async (event, size, timeout) => {})
ipcMain.on('close-notification-window', (event) => {})
```
- **Change Size**: Adjusts notification dimensions and position
- **Close**: Manually closes notification with timer cleanup
- **Features**: Auto-close timers, screen positioning

#### Custom Notifications
```javascript
ipcMain.on('show-custom-notification', (event, options) => {})
```
- **Purpose**: Displays system notifications
- **Features**: Dynamic module loading, customizable options

### 9. Development Tools

#### DL Code Download
```javascript
ipcMain.handle('download-dlcode', async (event, dlcode) => {})
```
- **Purpose**: Downloads and extracts development code packages
- **Parameters**: `dlcode` (string) - Download code identifier
- **Features**: Code package management for development

## Error Handling Patterns

### Standard Error Response
```javascript
try {
    // Handler logic
    return { success: true, data: result };
} catch (error) {
    log.error('Handler failed:', error);
    return { success: false, error: error.message };
}
```

### Window Context Safety
```javascript
const senderWindow = BrowserWindow.fromWebContents(event.sender);
const parentWindow = getSettingsWindow() || mainWindow;
```

### Resource Cleanup
```javascript
// Timer management
if (notificationTimer) {
    clearTimeout(notificationTimer);
    notificationTimer = null;
}

// Window state validation
if (window && !window.isDestroyed()) {
    window.close();
}
```

## Security Considerations

### Parameter Validation
- Input sanitization for file paths
- URL validation for external links
- JSON structure validation for imported settings

### Window Context Isolation
- Proper parent window binding for dialogs
- Secure window reference management
- IPC channel isolation per window type

### File System Security
- Path traversal prevention
- File existence validation
- Permissions checking

## Performance Optimizations

### Chat History Management
```javascript
// Limit chat history to prevent memory bloat
if (chatHistory.length > MAX_HISTORY_LENGTH * 2) {
    chatHistory = chatHistory.slice(-MAX_HISTORY_LENGTH * 2);
}
```

### Lazy Module Loading
```javascript
// Dynamic imports for optional features
import('./os-notification.js').then(({ showCustomNotification }) => {
    showCustomNotification(options);
});
```

### Action Refresh Strategy
- Automatic refresh after action modifications
- Serialization filtering for IPC transfer
- Efficient action discovery

## Usage Examples

### Opening Second Window
```javascript
// From renderer process
const result = ipcRenderer.invoke('open-second-window', 'https://example.com');
```

### Sending Chat Message
```javascript
// From renderer process
const response = await ipcRenderer.invoke('send-message', 'Hello AI!');
if (response.success) {
    console.log('AI Response:', response.response);
}
```

### Running Action Script
```javascript
// From renderer process
const result = await ipcRenderer.invoke('run-action', {
    filename: 'my-script.js',
    action: actionDetails,
    parameters: { url: 'https://example.com', delay: 1000 }
});
```

### Managing Settings
```javascript
// Get current settings
const settings = await ipcRenderer.invoke('get-settings');

// Update settings
const result = await ipcRenderer.invoke('save-settings', {
    ...settings,
    agentType: 'openrouter',
    temperature: 0.8
});
```

## Dependencies

### Core Electron APIs
- `dialog`: File/folder dialogs
- `shell`: External URL handling, folder opening
- `BrowserWindow`: Window management
- `app`: Application lifecycle

### Internal Modules
- `./colors-log.js`: Enhanced logging system
- `./settings-handler.js`: Configuration persistence
- `./ai-manager.js`: AI system orchestration
- `./action-handler.js`: Browser automation management
- `./auto-updater.js`: Update system
- `./uparceluser-handler.js`: User authentication

### File System
- `node:path`: Path manipulation
- `fs`: File operations
- `fs/promises`: Async file operations

This comprehensive IPC handler system provides a secure, efficient, and feature-rich communication layer that enables the SmartAdmin application's distributed architecture while maintaining proper separation between main and renderer processes.