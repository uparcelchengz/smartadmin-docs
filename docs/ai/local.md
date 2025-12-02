---
sidebar_position: 1
title: Local LLaMA Models
description: Running local LLaMA models in SmartAdmin application
---

# Local LLaMA Models in SmartAdmin

## Overview

- Handler: `llm-handler.js`
- Integration: Uses `node-llama-cpp` for local model execution
- Model Format: GGUF format models (`.gguf` files)
- Configuration: Configurable via `settings-handler.js`
- Advantages:
    - Complete privacy and offline operation
    - No API costs
    - Customizable models selection

## Downloading GGUF Models

You can download GGUF format models from Hugging Face or other model repositories. Some popular models include:

- [Llama 2 GGUF Models on Hugging Face](https://huggingface.co/models?search=llama-2&sort=downloads&file_type=gguf)
- [Alpaca GGUF Models on Hugging Face](https://huggingface.co/models?search=alpaca&sort=downloads&file_type=gguf)

Ensure you have the necessary rights to use the models you download.

> You may also create or train your own GGUF models and use them with SmartAdmin. (Highly advanced)

