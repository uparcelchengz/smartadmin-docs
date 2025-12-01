---
sidebar_position: 2
title: Login with Browser
description: Using external browser for user authentication in SmartAdmin application
---

# SmartAdmin Browser Login

## Overview

The SmartAdmin browser login feature is **highly dependent** on the **SmartAdmin Login Assistant Chrome Extension** - a separate project that enables seamless browser-to-desktop authentication integration.

---

## Dependency Architecture

```
Browser (Chrome Extension) ←→ SmartAdmin Desktop App
         ↓                            ↑
    Deep Link Protocol          Protocol Handler
    smartadmin://login?...      app.setAsDefaultProtocolClient()
```

---

## Browser Extension Integration

### Extension Project Details

- **Name**: SmartAdmin Login Assistant
- **Repository**: [GitHub - smartadmin-login-assistant 📄](https://github.com/uparcelchengz/smartadmin-app-login-extension)
- **Browser Webpage**: [SmartAdmin Login Assistant 🌐](https://uparcelchengz.github.io/smartadmin/extension/)

![browserPage](../assets/browserpage.png)

## Extension Compatibility

- Compatible with [Chromium-based browsers](https://chromewebstore.google.com/detail/smartadmin-login-assistan/iphehogkekejaflgknaofmndmihgcfle) & [Firefox](https://addons.mozilla.org/en-US/firefox/addon/smartadmin-login-assistant/)
<div style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'}}>
  <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{width: '400px', height: '200px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e0e0e0'}}>
      <img src="https://uparcelchengz.github.io/smartadmin/extension/screenshots/install_chrome.jpg" alt="Chrome Extension" style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} />
    </div>
    <p>Chrome Web Store</p>
  </div>
  <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{width: '400px', height: '200px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e0e0e0'}}>
      <img src="https://uparcelchengz.github.io/smartadmin/extension/screenshots/install_firefox.png" alt="Firefox Addon" style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} />
    </div>
    <p>Firefox Add-ons</p>
  </div>
</div>

<div style={{display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px', flexWrap: 'wrap'}}>
  <a href="https://uparcelchengz.github.io/smartadmin/extension/install.html" 
     target="_blank" 
     style={{
       backgroundColor: '#007bff',
       color: 'white',
       padding: '12px 24px',
       borderRadius: '6px',
       textDecoration: 'none',
       fontWeight: 'bold',
       fontSize: '16px',
       boxShadow: '0 2px 8px rgba(0, 123, 255, 0.3)',
       transition: 'all 0.2s ease',
       display: 'inline-block',
       border: 'none'
     }}
     onMouseOver={(e) => {
       e.target.style.color = '#f8f9fa';
       e.target.style.transform = 'translateY(-1px)';
       e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
     }}
     onMouseOut={(e) => {
       e.target.style.color = 'white';
       e.target.style.transform = 'translateY(0)';
       e.target.style.boxShadow = '0 2px 8px rgba(0, 123, 255, 0.3)';
     }}>
    🚀 Get the Browser Extension Now!
  </a>
  
  <a href="https://uparcelchengz.github.io/smartadmin/extension/" 
     target="_blank" 
     style={{
       backgroundColor: '#6c757d',
       color: 'white',
       padding: '12px 24px',
       borderRadius: '6px',
       textDecoration: 'none',
       fontWeight: 'bold',
       fontSize: '16px',
       boxShadow: '0 2px 8px rgba(108, 117, 125, 0.3)',
       transition: 'all 0.2s ease',
       display: 'inline-block',
       border: 'none'
     }}
     onMouseOver={(e) => {
       e.target.style.color = '#f8f9fa';
       e.target.style.transform = 'translateY(-1px)';
       e.target.style.boxShadow = '0 4px 12px rgba(108, 117, 125, 0.4)';
     }}
     onMouseOut={(e) => {
       e.target.style.color = 'white';
       e.target.style.transform = 'translateY(0)';
       e.target.style.boxShadow = '0 2px 8px rgba(108, 117, 125, 0.3)';
     }}>
    🌐 Check out Extension HomePage
  </a>
</div>
