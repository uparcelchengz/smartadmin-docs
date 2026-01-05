# PDFFlipBook Component - Usage Guide

## Installation

First, install the required dependencies:

```bash
npm install
```

This will install:
- `react-pdf` - React component for PDF rendering
- `pdfjs-dist` - PDF.js library for parsing PDFs

## Basic Usage

### 1. Place Your PDF File

Put your PDF file in the `static` folder:

```
static/
  pdf/
    research-proposal.pdf
    user-guide.pdf
```

### 2. Import the Component in Your Markdown

At the top of your `.md` or `.mdx` file:

```markdown
---
sidebar_position: 1
title: Your Page Title
---

import PDFFlipBook from '@site/src/components/PDFFlipBook';
```

### 3. Use the Component

**Simple usage (just PDF file):**

```markdown
<PDFFlipBook file="/pdf/research-proposal.pdf" />
```

**With a title:**

```markdown
<PDFFlipBook 
  file="/pdf/research-proposal.pdf" 
  title="SmartAdmin Research Proposal"
/>
```

**With custom width:**

```markdown
<PDFFlipBook 
  file="/pdf/research-proposal.pdf" 
  title="Research Documentation"
  width={900}
/>
```

## Full Example

```markdown
---
sidebar_position: 1
title: Be part of the research
slug: /extra/research
---

import PDFFlipBook from '@site/src/components/PDFFlipBook';

# Your Help is Needed: Be Part of the Research!

## Research Documentation

Please review the full research proposal below:

<PDFFlipBook 
  file="/pdf/research-proposal.pdf" 
  title="SmartAdmin Research Proposal"
/>

## How to Participate

After reviewing the document above, please follow these steps:

1. Test the SmartAdmin App
2. Provide feedback
3. Fill out the consent form
```

## Component Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `file` | string | Yes | - | Path to PDF file (relative to `static` folder) |
| `title` | string | No | - | Optional title displayed above the PDF |
| `width` | number | No | 800 | Width of the PDF page in pixels |

## Features

✅ **Navigation Controls:**
- Previous/Next page buttons
- First/Last page buttons
- Page number display
- Direct page input

✅ **SmartAdmin Theme Integration:**
- Purple gradient styling
- Matches your existing design
- Smooth animations and hover effects

✅ **Responsive Design:**
- Works on desktop and mobile
- Adjusts to screen size
- Touch-friendly controls

✅ **Loading States:**
- Loading spinner while PDF loads
- Error messages if PDF fails to load

## Tips

1. **File paths:** Always start with `/` for files in the `static` folder
   - ✅ Correct: `/pdf/document.pdf`
   - ❌ Wrong: `pdf/document.pdf`

2. **File organization:** Keep PDFs organized in subdirectories:
   ```
   static/
     pdf/
       research/
         proposal.pdf
         consent-form.pdf
       guides/
         user-manual.pdf
   ```

3. **Mobile optimization:** For better mobile experience, use smaller widths:
   ```markdown
   <PDFFlipBook 
     file="/pdf/document.pdf" 
     width={600}
   />
   ```

4. **Performance:** Compress large PDFs before uploading to improve load times

## Troubleshooting

**PDF not loading?**
- Check file path is correct (starts with `/`)
- Verify file exists in `static` folder
- Check browser console for errors

**PDF too small/large?**
- Adjust the `width` prop
- Default is 800px

**Build errors?**
- Run `npm install` to ensure dependencies are installed
- Clear cache: `npm run clear`
- Rebuild: `npm run build`

## Example with Multiple PDFs

```markdown
## Research Documents

### Research Proposal
<PDFFlipBook 
  file="/pdf/research-proposal.pdf" 
  title="Full Research Proposal"
/>

### Consent Form
<PDFFlipBook 
  file="/pdf/consent-form.pdf" 
  title="Participant Consent Form"
  width={700}
/>

### User Guide
<PDFFlipBook 
  file="/pdf/user-guide.pdf" 
  title="SmartAdmin User Guide"
/>
```
