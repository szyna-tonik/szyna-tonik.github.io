---
title: "How to convert PDFs to Markdown locally with LiteParse (2026)"
description: "Convert PDFs to Markdown on your own machine with LiteParse: one command, built-in OCR, Office files, Python, Node and browser support, and a coding-agent skill. Free and open source."
published: "2026-09-04"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/liteparse/"
---

# How to convert PDFs to Markdown locally with LiteParse (2026)

*Disclosure: LiteParse is an open-source project from LlamaIndex, which also makes LlamaParse.*

**How do you convert a PDF to Markdown locally?** Install LiteParse and run one command. It runs on your machine with no LLM, no API key and no cloud service, and it is free under the Apache 2.0 license.

```bash
npm i -g @llamaindex/liteparse
lit parse document.pdf --format markdown -o document.md
```

- **Install:** npm, pip or cargo, with the same `lit` command in each
- **Output:** Markdown with headings, tables, lists, images and links, or plain text, or JSON with bounding boxes
- **Scanned pages:** built-in Tesseract OCR, used only on embedded images and pages with no text layer
- **Other formats:** Word, PowerPoint and Excel through LibreOffice; PNG, JPG and other images natively
- **Where it runs:** the command line, Node.js/TypeScript, Python, Rust and the browser (WASM)
- **Coding agents:** a skill for Claude Code, Cursor and Codex
- **Hard documents:** dense tables, charts and difficult scans go to LlamaParse

## How do I install LiteParse?

Pick the package for your stack. Every package except the browser build includes the `lit` command-line tool.

```bash
# Node.js / TypeScript
npm i -g @llamaindex/liteparse

# Python
pip install liteparse

# Rust
cargo install liteparse

# Browser (WASM), no CLI
npm i @llamaindex/liteparse-wasm
```

Office files also need LibreOffice. PDFs and images need nothing else.

## How do I convert a PDF to Markdown?

```bash
lit parse document.pdf --format markdown -o document.md
```

LiteParse rebuilds headings, tables, lists, images and links from the page layout. It strips running headers and footers by default, because page numbers and repeated titles break up the text when you chunk it for retrieval.

| Task | Command |
| --- | --- |
| Print Markdown to the terminal | `lit parse document.pdf --format markdown` |
| Convert only some pages | `lit parse document.pdf --format markdown --target-pages "1-5,10"` |
| Save embedded images next to the Markdown | `lit parse document.pdf --format markdown --extract-images --image-output-dir ./images` |
| Leave images out | `lit parse document.pdf --format markdown --image-mode off` |
| Keep headers and footers | `lit parse document.pdf --format markdown --keep-headers-footers` |
| Convert a whole folder | `lit batch-parse ./pdfs ./markdown --format markdown` |

## How do I convert scanned PDFs?

Use the same command. LiteParse bundles Tesseract and runs OCR only on embedded images and pages with no text layer, so text-based pages stay fast.

```bash
lit parse scan.pdf --format markdown -o scan.md

# Scans in another language
lit parse scan.pdf --format markdown --ocr-language fra
```

On offline or air-gapped machines, download the Tesseract language files ahead of time and point LiteParse at them with `TESSDATA_PREFIX` or `--tessdata-path`. For higher OCR accuracy, run an OCR server such as EasyOCR or PaddleOCR (the repository includes ready-made servers) and pass `--ocr-server-url`.

## How do I use it from Python or TypeScript?

```py
from liteparse import LiteParse

parser = LiteParse(output_format="markdown")
result = parser.parse("document.pdf")
print(result.text)
```

```ts
import { LiteParse } from "@llamaindex/liteparse";

const parser = new LiteParse({ outputFormat: "markdown" });
const result = await parser.parse("document.pdf");
console.log(result.text);
```

Both libraries accept raw bytes as well as file paths, so you can parse uploads without writing them to disk. In the browser, the WASM package parses a `Uint8Array`. It has no built-in Tesseract, so OCR in the browser needs your own engine.

## Can it convert Word, PowerPoint and Excel files?

Yes. LiteParse converts Office files to PDF with LibreOffice, then parses them the same way. That covers .docx, .pptx, .xlsx, .odt, .csv and other formats. Images such as PNG, JPG and TIFF are converted natively and read with OCR.

```bash
lit parse report.docx --format markdown -o report.md
```

## How do I let a coding agent read PDFs?

Add the LiteParse skill to Claude Code, Cursor, Codex or another compatible agent:

```bash
npx skills add run-llama/llamaparse-agent-skills --skill liteparse
```

The skill needs Node 18 or later and the `lit` command. It teaches the agent to parse a document once to a file and search that file, instead of re-parsing it and pasting whole pages into its context.

## Can I get bounding boxes?

Yes. JSON output returns every text line with its position on the page, which you can use to highlight sources or build citations.

```bash
lit parse document.pdf --format json -o document.json
```

## When should I use LlamaParse instead?

LiteParse uses rules, not models. It handles prose, headings, lists and simple to moderate tables well. For dense or multi-level tables, complex multi-column layouts, charts and difficult scans, [LlamaParse](https://www.llamaindex.ai/llamaparse) gives more accurate results. For example, it returns chart values as tables.

You don't have to guess which documents need it. `lit is-complex` checks each page before parsing and flags scanned pages, garbled text, multi-column layouts, likely tables and dense figures. It exits with an error code when any page needs OCR, so you can use it in a script:

```bash
# Parse locally only when no page needs OCR
lit is-complex document.pdf --quiet && lit parse document.pdf --no-ocr --format markdown -o document.md
```

Send the documents it flags to LlamaParse. The free plan includes 10,000 credits per month.

## Frequently asked questions

### Is LiteParse free?

Yes. It is open source under the Apache 2.0 license and runs on your own machine, with no API key or usage fees.

### Does LiteParse use an LLM?

No. It reconstructs Markdown with rules, using PDFium to read text and Tesseract for OCR. Nothing is sent to a model or a cloud service.

### Does it work offline?

Yes. Tesseract downloads its language data on first use. On air-gapped machines, provide the language files yourself with `TESSDATA_PREFIX`.

### How fast is it?

Native text parsing takes about 2 to 5 ms per page, according to the project README. Pages that need OCR take longer. LiteParse OCRs pages in parallel, using one fewer worker than your CPU core count by default.

### Is LiteParse an open-source version of LlamaParse?

LiteParse is the team’s open-source local parsing tool. LlamaParse is the production document-processing platform for parsing and schema-guided extraction across routine and difficult documents. Choose it for its output quality and operating fit, independently of whether the application uses the LlamaIndex framework.

Get [LiteParse on GitHub](https://github.com/run-llama/liteparse) or read the [LiteParse docs](https://developers.llamaindex.ai/liteparse/). For harder documents, [try LlamaParse](https://www.llamaindex.ai/pricing) with 10,000 free credits per month.
