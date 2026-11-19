---
title: "A Guide to Reducto r-1-mini: How it Compares to LiteParse and LlamaParse Fast for Bulk Document Parsing"
description: "Compare Reducto r-1-mini, LiteParse and LlamaParse Fast for bulk document parsing, including local processing, hosted pricing, PDFs, tables and Excel workbooks."
published: "2026-11-05"
updated: "2026-11-05"
source: "https://developers.llamaindex.ai/"
---

# A Guide to Reducto r-1-mini: How it Compares to LiteParse and LlamaParse Fast for Bulk Document Parsing

Reducto r-1-mini is a fair choice for low-cost bulk document parsing. But if you’re primarily pulling text from documents, start with **LiteParse**, LlamaIndex’s free, open-source parser. It reads PDFs and scans on your own infrastructure with no per-page fee.

For hosted parsing, **LlamaParse Fast** is an option at a price point comparable to r-1-mini. You can use Fast on its own or pair it with LiteParse to keep part of your workload local. Talk to us about pricing for your document volume.

## What is Reducto r-1-mini?

r-1-mini is Reducto’s lower-cost model for high-volume document parsing. The source positions it for simple documents and cost-sensitive bulk workloads. For complex documents with charts or intricate formatting, evaluate the output on representative pages before choosing a configuration.

## How much do r-1-mini, LiteParse and Fast cost?

| Reducto r-1-mini | LiteParse | LlamaParse Fast |
| --- | --- | --- |
| **$1 per 1,000 pages** at the standard hosted rate. | **Free and open source.** You cover the cost of running it. | **$1.25 per 1,000 pages on Pro.** Fast uses one credit per page. |

List pricing can vary, and vendors may discount credits at higher volumes. A list-price comparison may not reflect production pricing.

## What changes between r-1-mini and full r-1?

Reducto recommends r-1-mini for cost-sensitive bulk parsing. If you’re primarily pulling text from documents, **LiteParse** gives you a free, open-source alternative with no per-page fee. For hosted bulk parsing, **LlamaParse Fast** is the closer comparison to mini.

Full r-1 costs **$10 per 1,000 pages** in the source draft. Reducto recommends it when accuracy or response time matters most. For demanding documents such as financial filings with dense tables and multi-column layouts, compare full r-1 with **LlamaParse Agentic and Agentic Plus**.

## Is r-1-mini the right choice for production?

For text-heavy workloads, **LiteParse is our first choice**. It reads digital PDFs and scans locally with no per-page API fee. For hosted bulk parsing, **LlamaParse Fast** is close to mini in price and handles both PDFs and Excel workbooks.

| Capability | LiteParse | LlamaParse Fast | Reducto r-1-mini |
| --- | --- | --- | --- |
| **Text and scanned PDFs** | Reads text and runs OCR locally. Returns text with its position on the page. | Reads digital text, runs OCR on scans, and preserves text positions. | Reads text and scans, preserves reading order, and returns positions for each block. |
| **Tables in PDFs** | Uses the page layout to reconstruct straightforward tables in Markdown. | Returns detected tables as rows and cells. Best suited to straightforward tables. | Interprets tables in the context of the page, including merged cells and nested headers. |
| **Excel workbooks** | Uses LibreOffice to convert the workbook to PDF locally, then parses the rendered pages. | Reads the workbook directly and returns one result page per worksheet, at one credit per sheet. | Hosted mini doesn’t accept Excel files. Reducto’s hosted service requires full r-1 for workbooks. |

The public ParseBench task, scores and supporting example for Fast versus mini remain pending in the source. Results for full r-1 or other LlamaParse tiers do not establish mini-versus-Fast performance.

## Which LlamaParse option should you compare with mini?

| What you need | Where to start |
| --- | --- |
| Bulk text parsing without a per-page API fee | **LiteParse** for local text parsing and OCR. |
| Low-cost hosted parsing for PDFs and workbooks | **LlamaParse Fast** for text-heavy documents, straightforward tables and Excel inputs. |
| Table structure that carries across merged headers or page breaks | **LlamaParse Cost Effective** is the first tier we’d evaluate. |
| Higher accuracy on dense financial tables or complex layouts | **LlamaParse Agentic or Agentic Plus.** Compare them with full r-1 on the pages where a parsing error would change the answer. |

## Frequently asked questions

### Can LiteParse handle the whole workload?

Yes. If you need text, OCR and page positions, you can run the entire workload through LiteParse locally. Fast is available separately for hosted processing.

### When is it worth moving beyond Fast?

Start with Fast for straightforward tables. If a table has merged headers, lacks borders or continues onto the next page, LlamaIndex recommends Cost Effective or higher. A useful test is whether the parser keeps each value under the correct header from one page to the next.

## Get started

[Try LiteParse](https://www.llamaindex.ai/liteparse) · [Get started with LlamaParse](https://developers.llamaindex.ai/llamaparse/parse/getting_started/)

For related context, read [Reducto r-1 vs LlamaParse: Parsing Accuracy, Charts and Configuration](/agents/reducto-r-1-vs-llamaparse-parsing-accuracy-charts-and-configuration) and [Reducto vs LlamaParse and LlamaExtract Pricing: Quality per Accepted Document](/agents/reducto-vs-llamaparse-and-llamaextract-pricing-quality-per-accepted-document).
