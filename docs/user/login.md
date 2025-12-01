---
sidebar_position: 1
title: Login System
description: Detailed design of the login process in SmartAdmin application
---

# User Login System

<div style={{textAlign: 'center'}}>
  <img src="https://github.com/uparcelchengz/smartadmin-docs/blob/main/docs/assets/loginpage.png?raw=true" alt="login page" style={{width: '300px', maxWidth: '100%'}} />
</div>

## Core Components

### Login Interface (`src/pages/login.html/js`)
```javascript
async function handleLogin(event) {
    const loginData = {
        username: usernameInput.value,
        password: passwordInput.value,
        method: loginMethodSelect.value // 'standard' or 'admin'
    };
    
    const result = await window.electronAPI.uparcelLogin(loginData);
    if (result.success) {
        window.close(); // Close login window
    }
}
```

### Backend Authentication (`src/modules/uparceluser-handler.js`)
```javascript
async function authenticateUser(loginData) {
    // 1. Query user from PostgreSQL database
    // 2. Verify password with bcrypt
    // 3. Check role-based access (admin vs standard)
    // 4. Create user session
    // 5. Return authentication result
}
```

---

## Session Management

### Session Creation & Storage
```javascript
const session = {
    id: generateSessionId(),
    userId: user.id,
    username: user.username,
    role: user.role,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    isValid: true
};

await saveUserSession(session); // Save locally
```

### Session Validation
```javascript
async function validateUserSession() {
    const session = await readUserSession();
    
    if (!session || new Date() > new Date(session.expiresAt)) {
        return { isValid: false };
    }
    
    return { isValid: true, user: session };
}
```

---

## IPC Integration

### Main Handlers
```javascript
// Login authentication
ipcMain.handle('uparcel-login', async (event, loginData) => {
    const result = await authenticateUser(loginData);
    if (result.success) {
        mainWindow.webContents.send('user-authenticated', result.session);
    }
    return result;
});

// Session management
ipcMain.handle('read-user-session', async () => await readUserSession());
ipcMain.handle('logout-user', async () => await clearUserSession());
```

---

## Application Integration

### Startup Flow
```javascript
app.on('ready', async () => {
    const session = await validateUserSession();
    
    if (session.isValid) {
        currentUser = session.user;
        log.auth(`Session restored for ${session.user.username}`);
    } else {
        showLoginWindow(); // Force login
    }
});
```

---

## Key Files
- **UI**: `src/pages/login.html/js/css`
- **Backend**: `src/modules/uparceluser-handler.js`
- **IPC**: `src/modules/ipc-handlers.js` (login handlers)
- **Preload**: `src/preload/login.js`

---

## Database Schema
```sql
users: id, username, email, password_hash, status, role
user_sessions: session_id, user_id, created_at, expires_at
user_bans: user_id, ban_type, reason, banned_date, expires_at
```

---
