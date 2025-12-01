---
sidebar_position: 1
title: Project Overview
description: High-level overview of SmartAdmin GenAI Delivery Service Assistant
---

# SmartAdmin – GenAI Delivery Service Assistant

## 1. Background & Problem Statement

In logistics operations, customer service agents frequently handle modification requests such as:
  
- Address updates  
- Rescheduling  
- Vehicle-type changes  
- Order detail corrections  

These tasks are usually **manual**, involving:
  
➡️ Reading customer messages  
➡️ Interpreting intent  
➡️ Retrieving order data  
➡️ Updating internal web-based systems  

As order volume increases, these workflows become:
  
❌ Hard to scale  
❌ Slow and inconsistent  
❌ Prone to human error  

Traditional improvements like manpower increase and SOPs do not solve these structural limitations.

---

## 2. Project Goal

This project explores whether **Large Language Models (LLMs)** can:
  
🧠 Interpret natural-language modification requests  
🔎 Validate decisions using internal rules and databases  
⚙️ Convert valid actions into safe, browser-based executions  
👨‍💼 With human supervision and audit logging  

It leads to the development of **SmartAdmin**, a research prototype that integrates:

> LLM-based reasoning + Retrieval-Augmented Generation (RAG) + Playwright automation + Safety validation + Human-in-the-loop governance

---

## 3. Research Questions

| RQ | Focus Area |
|----|------------|
| RQ1 | How accurately can LLMs interpret modification requests and generate correct structured actions? |
| RQ2 | What safety mechanisms (HITL, validation, logging) are needed for controlled automation? |
| RQ3 | Can AI-assisted automation improve workflow efficiency compared to manual execution? |

---

## 4. SmartAdmin – Proposed Solution Architecture

SmartAdmin follows a layered architecture:

| Layer | Key Function |
|-------|--------------|
| AI Interpretation | Converts request into structured JSON-based action plan |
| Knowledge Grounding | Uses RAG + PostgreSQL to verify rules & order validity |
| Human Governance (HITL) | Provides action preview, risk assessment, operator approval |
| Automation Execution | Executes browser-based actions via Playwright |
| Logging & Audit | Tracks decisions, approvals, executions, exceptions |

🛡️ Safety is ensured through:

- HITL approval for high-risk actions  
- Rule-based validation and policy enforcement  
- Audit logging for traceability  
- No fully autonomous actions  

---

## 5. Features & Capabilities

✔ Electron desktop interface  
✔ Structured AI action plans (JSON schema)  
✔ SOP retrieval via LanceDB + RAG  
✔ Action preview & confirmation  
✔ Browser automation using Playwright  
✔ Credential security via AES encryption  
✔ Real-time monitoring using Ably  

---

## 6. Why This Project is Significant

| Impact | Details |
|--------|---------|
| Academic Contribution | Demonstrates LLM + RPA integration with safety and validation |
| Industrial Value | Reduces manual repetitive tasks while keeping human control |
| Innovation | Combines RAG, safety governance, risk categorization and browser-based execution |
| Scalability | Supports multi-agent roles and enterprise policy alignment |

---
