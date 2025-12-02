---
sidebar_position: 2
title: OpenRouter API Integration
description: Using OpenRouter as an AI provider in SmartAdmin application
---

# OpenRouter API Integration in SmartAdmin

## Overview
- Handler: `openrouter-handler.js`
- Model Tested: `nvidia/nemotron-nano-9b-v2:free`
- Supported Models: Various models listed on [OpenRouter Models](https://openrouter.ai/models)
- Configuration: API key and model selection via settings (`settings-handler.js`)
- Advantages:
    - Access to a variety of open-source models
    - Competitive pricing and free tier options
    - Flexibility in model selection

## Setting Up OpenRouter in SmartAdmin

1. **Obtain an API Key**:
   - Sign up at [OpenRouter](https://openrouter.ai/) and generate an API key.
2. **Configure SmartAdmin**:
    - Open SmartAdmin settings.
    - Navigate to the `AI Configuration` section.
    - Enter your OpenRouter API key.
    - Choose your desired model from the available or manually type it.

<div style={{textAlign: 'center'}}>
  <img src="https://github.com/uparcelchengz/smartadmin-docs/blob/main/docs/assets/openrouter.png?raw=true" alt="OpenRouter Settings" style={{width: '400px', maxWidth: '100%'}} />
</div>