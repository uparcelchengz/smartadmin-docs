---
sidebar_position: 6
title: Action Scripts and Playwright Integration
description: Using Action Scripts with Playwright and API operations in SmartAdmin application
---

# Action Scripts and Playwright Integration in SmartAdmin

## Overview

SmartAdmin implements a powerful action script management system that extends far beyond browser automation. While primarily powered by Playwright for browser operations, the action scripts are **full JavaScript modules** capable of executing **any Node.js operations** including API calls, file system operations, database queries, and complex business logic.

## Architecture

### **Core Components**

#### 1. **Action Handler** `action-handler.js`
- **Primary Controller**: Manages action script lifecycle
- **File Operations**: Create, read, update, delete action scripts
- **Script Execution**: Runs any valid JavaScript/Node.js code
- **Multi-Purpose**: Supports both browser automation and API operations

#### 2. **Action Play Handler** `actionplay-handler.js`
- **Execution Engine**: Runs action scripts in Node.js environment
- **Context Management**: Provides browser contexts when needed
- **API Integration**: Full access to Node.js modules and external APIs
- **Flexible Runtime**: Supports any JavaScript operation

#### 3. **Action Functions Registry** `action-functions.js`
- **Function Library**: Reusable utility functions for any type of operation
- **API Utilities**: HTTP clients, authentication helpers
- **Database Access**: Direct database connection utilities
- **Cross-Integration**: Access to all SmartAdmin modules

## Action Script Capabilities

### **1. Browser Automation (Playwright)**
```javascript
export async function runAction(page, params = {}, projectFunctions = {}) {
    // Traditional Playwright browser automation
    await page.goto(params.url);
    await page.fill('#username', params.username);
    await page.click('#login-button');
}
```

### **2. API Calls and HTTP Operations**
```javascript
export async function runAction(page, params = {}, projectFunctions = {}) {
    const { logAction, notify } = projectFunctions;
    
    // RESTful API calls
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${params.apiKey}`
        },
        body: JSON.stringify({
            username: params.username,
            email: params.email
        })
    });
    
    const result = await response.json();
    
    if (response.ok) {
        logAction(`User created successfully: ${result.id}`);
        notify('Success', `User ${params.username} created`);
    } else {
        throw new Error(`API Error: ${result.message}`);
    }
    
    return result;
}
```

### **3. Database Operations**
```javascript
export async function runAction(page, params = {}, projectFunctions = {}) {
    const { logAction } = projectFunctions;
    const { Pool } = require('pg');
    
    // Direct database operations
    const pool = new Pool({
        host: params.dbHost,
        user: params.dbUser,
        password: params.dbPassword,
        database: params.dbName,
        port: 5432,
    });
    
    try {
        const client = await pool.connect();
        
        // Execute custom SQL queries
        const result = await client.query(`
            UPDATE users 
            SET status = $1, last_updated = NOW() 
            WHERE department = $2
        `, [params.newStatus, params.department]);
        
        logAction(`Updated ${result.rowCount} user records`);
        
        client.release();
        return { success: true, updatedRows: result.rowCount };
    } finally {
        await pool.end();
    }
}
```

### **4. File System Operations**
```javascript
export async function runAction(page, params = {}, projectFunctions = {}) {
    const fs = require('fs').promises;
    const path = require('path');
    const { logAction } = projectFunctions;
    
    // File system operations
    const reportData = await generateReport(params);
    const fileName = `report_${new Date().toISOString().split('T')[0]}.json`;
    const filePath = path.join(params.outputDir, fileName);
    
    await fs.writeFile(filePath, JSON.stringify(reportData, null, 2));
    
    logAction(`Report saved to: ${filePath}`);
    
    // Email the report
    await sendEmailWithAttachment(params.emailTo, filePath);
    
    return { filePath, recordCount: reportData.length };
}
```

### **5. Hybrid Browser + API Operations**
```javascript
export async function runAction(page, params = {}, projectFunctions = {}) {
    const { logAction, notify } = projectFunctions;
    
    // 1. Browser automation to extract data
    await page.goto(params.webUrl);
    await page.fill('#search', params.searchTerm);
    await page.click('#search-btn');
    
    const extractedData = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.result-item'))
            .map(el => ({
                title: el.querySelector('.title').textContent,
                price: el.querySelector('.price').textContent
            }));
    });
    
    // 2. API calls to process the data
    for (const item of extractedData) {
        const response = await fetch('https://api.inventory.com/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: item.title,
                price: parseFloat(item.price.replace('$', '')),
                source: 'web_scraping',
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            logAction(`Saved item: ${item.title}`);
        }
    }
    
    notify('Sync Complete', `Processed ${extractedData.length} items`);
    return { processedCount: extractedData.length };
}
```

### **6. Complex Business Logic**
```javascript
export async function runAction(page, params = {}, projectFunctions = {}) {
    const { logAction, sendMessageToUser } = projectFunctions;
    
    // Multi-step business process automation
    try {
        // Step 1: Validate user permissions via API
        const authCheck = await fetch(`https://api.company.com/auth/check`, {
            headers: { 'Authorization': `Bearer ${params.token}` }
        });
        
        if (!authCheck.ok) {
            throw new Error('Unauthorized operation');
        }
        
        // Step 2: Process batch operations
        const results = [];
        for (const operation of params.operations) {
            switch (operation.type) {
                case 'api_call':
                    const apiResult = await processAPIOperation(operation);
                    results.push(apiResult);
                    break;
                    
                case 'browser_action':
                    await page.goto(operation.url);
                    const browserResult = await executeBrowserSteps(page, operation.steps);
                    results.push(browserResult);
                    break;
                    
                case 'database_update':
                    const dbResult = await executeDatabaseUpdate(operation);
                    results.push(dbResult);
                    break;
            }
            
            // Progress update
            sendMessageToUser(`Completed operation ${results.length}/${params.operations.length}`);
        }
        
        // Step 3: Generate summary report
        const report = await generateOperationReport(results);
        await saveReportToCloud(report, params.reportConfig);
        
        return { 
            success: true, 
            operationsCompleted: results.length,
            reportId: report.id 
        };
        
    } catch (error) {
        logAction(`Business process failed: ${error.message}`);
        throw error;
    }
}
```

## Extended Project Functions for API Operations

### **Enhanced Function Registry**
```javascript
// From action-functions.js - Extended for API operations
const actionFunctionRegistry = {
    // HTTP Client utilities
    httpGet: async (url, headers = {}) => {
        const response = await fetch(url, { headers });
        return await response.json();
    },
    
    httpPost: async (url, data, headers = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify(data)
        });
        return await response.json();
    },
    
    // Database utilities
    queryDatabase: async (query, params = []) => {
        // Access to SmartAdmin's database handler
        const { executeQuery } = require('../database-handler');
        return await executeQuery(query, params);
    },
    
    // File operations
    readFile: async (filePath) => {
        const fs = require('fs').promises;
        return await fs.readFile(filePath, 'utf-8');
    },
    
    writeFile: async (filePath, content) => {
        const fs = require('fs').promises;
        await fs.writeFile(filePath, content);
    },
    
    // Email utilities
    sendEmail: async (to, subject, body, attachments = []) => {
        // Integration with email service
        return await emailService.send({ to, subject, body, attachments });
    },
    
    // Encryption/Security
    encrypt: (data, key) => encrypt(data, key),
    decrypt: (data, key) => decrypt(data, key),
    generateHash: (data) => crypto.createHash('sha256').update(data).digest('hex'),
    
    // External API integrations
    slackNotify: async (webhook, message) => {
        await fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: message })
        });
    },
    
    // Data processing utilities
    csvToJson: (csvData) => csvParser(csvData),
    jsonToCsv: (jsonData) => jsonToCsv(jsonData),
    xmlToJson: (xmlData) => xmlParser(xmlData)
};
```

## Action Script Types

### **1. Pure API Actions** (No Browser Required)
```javascript
// API-only action - page parameter ignored
export async function runAction(page, params = {}, projectFunctions = {}) {
    const { httpPost, logAction } = projectFunctions;
    
    // Sync data between systems via API
    const sourceData = await httpGet(`${params.sourceApi}/data`);
    const transformedData = transformData(sourceData, params.mapping);
    
    const result = await httpPost(`${params.targetApi}/bulk-import`, {
        data: transformedData,
        options: { validate: true, skipDuplicates: true }
    });
    
    logAction(`Synced ${result.imported} records, skipped ${result.skipped}`);
    return result;
}

export const parameters = [
    { name: 'sourceApi', type: 'text', label: 'Source API URL', required: true },
    { name: 'targetApi', type: 'text', label: 'Target API URL', required: true },
    { name: 'apiKey', type: 'password', label: 'API Key', required: true }
];
```

### **2. Database-Only Actions**
```javascript
export async function runAction(page, params = {}, projectFunctions = {}) {
    const { queryDatabase, logAction, sendEmail } = projectFunctions;
    
    // Generate and email reports directly from database
    const reportQuery = `
        SELECT 
            u.username, 
            COUNT(o.id) as order_count,
            SUM(o.total) as total_value
        FROM users u 
        LEFT JOIN orders o ON u.id = o.user_id 
        WHERE o.created_at >= $1 
        GROUP BY u.id, u.username
        ORDER BY total_value DESC
    `;
    
    const reportData = await queryDatabase(reportQuery, [params.startDate]);
    
    const csvReport = jsonToCsv(reportData);
    await writeFile(`/tmp/sales_report_${Date.now()}.csv`, csvReport);
    
    await sendEmail(
        params.emailRecipients,
        `Sales Report - ${params.startDate}`,
        'Please find the attached sales report.',
        [`/tmp/sales_report_${Date.now()}.csv`]
    );
    
    logAction(`Report generated and emailed to ${params.emailRecipients.length} recipients`);
    return { recordCount: reportData.length };
}
```

### **3. Microservice Integration Actions**
```javascript
export async function runAction(page, params = {}, projectFunctions = {}) {
    const { httpPost, notify, logAction } = projectFunctions;
    
    // Orchestrate multiple microservices
    const services = [
        { name: 'user-service', url: params.userServiceUrl },
        { name: 'order-service', url: params.orderServiceUrl },
        { name: 'notification-service', url: params.notificationServiceUrl }
    ];
    
    const results = {};
    
    for (const service of services) {
        try {
            // Health check
            const healthCheck = await httpGet(`${service.url}/health`);
            
            if (healthCheck.status === 'healthy') {
                // Execute service-specific operations
                const operation = await executeServiceOperation(service, params);
                results[service.name] = { success: true, data: operation };
                logAction(`${service.name}: Operation completed successfully`);
            } else {
                results[service.name] = { success: false, error: 'Service unhealthy' };
            }
        } catch (error) {
            results[service.name] = { success: false, error: error.message };
            logAction(`${service.name}: Failed - ${error.message}`);
        }
    }
    
    // Aggregate results and notify
    const successCount = Object.values(results).filter(r => r.success).length;
    notify('Service Operations Complete', `${successCount}/${services.length} services processed successfully`);
    
    return results;
}
```

## Runtime Environment

### **Full Node.js Access**
Action scripts run in the full Node.js environment with access to:
- **All Node.js built-in modules** (`fs`, `path`, `crypto`, `http`, etc.)
- **npm packages** (can require any installed package)
- **SmartAdmin modules** (database, AI system, etc.)
- **Environment variables** and system resources
- **File system** read/write operations
- **Network operations** (HTTP/HTTPS, TCP, etc.)

### **Dynamic Module Loading**
```javascript
export async function runAction(page, params = {}, projectFunctions = {}) {
    // Dynamic require based on runtime needs
    const moduleToUse = params.useAdvancedCrypto ? 'node-forge' : 'crypto';
    const cryptoLib = require(moduleToUse);
    
    // Conditional API client loading
    if (params.cloudProvider === 'aws') {
        const AWS = require('aws-sdk');
        const s3 = new AWS.S3();
        // AWS operations
    } else if (params.cloudProvider === 'azure') {
        const { BlobServiceClient } = require('@azure/storage-blob');
        // Azure operations
    }
}
```

## Security Considerations

### **Execution Environment**
- **Sandboxing**: Scripts run in the main Node.js process (full access)
- **Input Validation**: Parameter validation through UI and script logic
- **Error Handling**: Comprehensive try-catch blocks for safety
- **Resource Limits**: Manual resource management (no automatic limits)

### **Best Practices**
1. **Input Sanitization**: Always validate external inputs
2. **Error Boundaries**: Wrap operations in try-catch blocks
3. **Resource Cleanup**: Close connections, files, and handles
4. **Credential Management**: Use environment variables or secure storage
5. **Audit Logging**: Log all significant operations

This comprehensive action script system transforms SmartAdmin into a **universal automation platform** capable of handling any JavaScript-based operation, from simple API calls to complex multi-system orchestration workflows. The flexibility of pure JavaScript execution means virtually any Node.js-compatible operation can be automated through SmartAdmin's action system.