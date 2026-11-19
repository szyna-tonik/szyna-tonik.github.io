---
title: "Best document parsers for RAG in 2026"
description: "LlamaParse is our overall recommendation for RAG document ingestion. Compare parsing evidence, deployment and cost with a standalone API for your existing stack."
published: "2026-08-30"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/llamaparse/"
---

# Best document parsers for RAG in 2026

*Disclosure: LlamaIndex makes LlamaParse and LiteParse and built ParseBench. This comparison uses published parsing results and linked project documentation. Parsing scores measure document conversion, not retrieval or answer accuracy.*

**What is the best PDF parser for RAG?** Our overall recommendation is LlamaParse, based on its parsing quality, source structure and choice of deployment options. Agentic Plus leads this ParseBench comparison at 86.69 overall; Agentic scores 82.83 at a recorded \$12.50 per 1,000 pages. LlamaParse works with your chosen retriever, model and framework, and also supports document processing beyond RAG, including extraction for insurance and financial workflows.

- **Most accurate managed parser:** LlamaParse Agentic Plus, 86.69 overall and 92.19 on charts
- **Best value for mixed PDFs:** LlamaParse Agentic, 82.83 at \$12.50 per 1,000 pages
- **Free and local:** LiteParse, PyMuPDF4LLM or Docling
- **Scanned PDFs:** LlamaParse Agentic
- **Coding agents and lightweight first passes:** LiteParse
- **Must run in your own cloud:** LlamaParse BYOC or Reducto Full VPC

## Why prioritize LlamaParse in a RAG ingestion trial?

The pinned ParseBench results support a clear parsing-quality case. LlamaParse Agentic scores 82.83 overall, versus 73.50 for Extend 2.0 and 70.87 for Reducto Agentic. Agentic Plus adds a chart result of 92.19, versus 76.02 and 72.37 for those same competitor rows. For a corpus whose answers depend on chart values and table context, those are concrete reasons to start the ingestion trial with LlamaParse. [Pinned results](https://github.com/run-llama/ParseBench/blob/0ccc16783612a8ff37e77139f5e799510cde47b6/leaderboard.csv).

Then hold chunking, embeddings and retrieval settings constant and measure the questions your users actually ask. A parsing advantage is evidence for selecting an ingestion candidate; it is not a measured RAG answer-accuracy uplift.

## How do document parsers for RAG compare?

The table uses the [ParseBench leaderboard](https://github.com/run-llama/ParseBench/blob/0ccc16783612a8ff37e77139f5e799510cde47b6/leaderboard.csv) at commit 0ccc167 (November 2, 2026). Overall, tables and charts are scores on a 0–100 scale. API costs reflect the **benchmark configuration**, converted to dollars per 1,000 pages, rather than a vendor's cheapest advertised tier. Local processing costs depend on hardware and throughput.

| Parser or configuration | Type | Overall | Tables | Charts | Cost per 1,000 pages | Deployment or license |
| --- | --- | --- | --- | --- | --- | --- |
| [LlamaParse Agentic Plus](https://developers.llamaindex.ai/llamaparse/) | Commercial API | 86.69 | 93.27 | 92.19 | \$56.25 | Hosted; enterprise self-hosting |
| [LlamaParse Agentic](https://developers.llamaindex.ai/llamaparse/) | Commercial API | 82.83 | 90.90 | 81.20 | \$12.50 | Hosted; enterprise self-hosting |
| [LlamaParse Cost Effective](https://developers.llamaindex.ai/llamaparse/) | Commercial API | 77.68 | 86.72 | 73.98 | \$3.75 | Hosted; enterprise self-hosting |
| [Extend 2.0](https://docs.extend.ai/) | Commercial API | 73.50 | 85.26 | 76.02 | \$25.00 | Hosted; BYOC |
| [Reducto Agentic](https://docs.reducto.ai/) | Commercial API | 70.87 | 80.20 | 72.37 | \$47.60 | Hosted; hybrid and Full VPC |
| [MinerU2.5-Pro-2605-1.2B](https://github.com/opendatalab/MinerU) | Open-weight pipeline | 69.27 | 77.61 | 59.12 | Hardware-dependent | License has additional terms |
| [Mistral OCR 4](https://docs.mistral.ai/capabilities/document_ai/basic_ocr) | Commercial API | 58.38 | 74.03 | 1.86 | \$4.00 | Hosted configuration |
| [Azure Document Intelligence Layout](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/) | Cloud service | 56.76 | 85.97 | 1.27 | \$10.00 | Hosted; supported containers |
| [PyMuPDF4LLM](https://github.com/pymupdf/pymupdf4llm) | Local library | 50.47 | 56.93 | 1.63 | Hardware-dependent | AGPL or commercial |
| [Google Cloud Document AI](https://cloud.google.com/document-ai) | Cloud service | 48.66 | 54.95 | 1.59 | \$10.00 | Hosted |
| [Amazon Textract](https://docs.aws.amazon.com/textract/) | Cloud service | 48.31 | 84.46 | 4.47 | \$15.00 | Hosted |
| [LiteParse, no OCR](https://github.com/run-llama/liteparse) | Local library | 36.90\* | 42.40\* | 1.80\* | Hardware-dependent | Apache 2.0 |
| [Docling](https://github.com/docling-project/docling) | Local library | Not available | Not available | Not available | Hardware-dependent | MIT code; check selected models |
| [Marker](https://github.com/datalab-to/marker) | Local model pipeline | Not available | Not available | Not available | Hardware-dependent | Apache 2.0 code; restricted weights |
| [Unstructured OSS](https://github.com/Unstructured-IO/unstructured) | Local library | Not available | Not available | Not available | Hardware-dependent | Apache 2.0 |

*LiteParse's no-OCR scores are submitted and unverified. “Not available” means no comparable public score exists for that tool's default setup.*

## What do these results measure?

ParseBench evaluates roughly 2,000 human-verified enterprise pages across tables, charts, content faithfulness, semantic formatting and visual grounding. Overall is the mean of those five dimensions, not the share of RAG questions answered correctly. The [repository](https://github.com/run-llama/ParseBench) provides evaluation code, pipeline definitions and links to published outputs. These results help shortlist parsers by the document content they preserve.

## What makes a parser good for RAG?

Look for five things in its output:

- **Reading order:** paragraphs stay together across columns instead of becoming interleaved sentences.
- **Table structure:** headers, values and merged cells retain their relationships.
- **Usable figure content:** charts contribute searchable labels, descriptions or values to a text-based index.
- **Headings:** sections remain identifiable so chunking can preserve their context.
- **Source locations:** page numbers and bounding boxes let users inspect the evidence behind an answer.

A financial table needs its year headers attached to each value. Retrieving the numbers alone can still support the wrong answer.

## Which managed parsers should you evaluate?

### LlamaParse

[LlamaParse](https://www.llamaindex.ai/llamaparse) converts documents into structured content through a standalone API that works with any LLM or framework. Agentic is a practical starting tier for mixed PDFs, scoring 82.83 overall at \$12.50 per 1,000 benchmark pages. Agentic Plus improves tables and charts; Cost Effective reduces the page price. You still choose how to chunk and retrieve the output. For example, a LangChain pipeline can parse with LlamaParse, split by Markdown headings and index the chunks in its existing vector store.

### Reducto

[Reducto](https://docs.reducto.ai/) combines parsing with configurable chunking and deployment options. Its Agentic row scores 70.87 overall and 72.37 on charts, making it worth evaluating when figures must become retrievable content. The benchmark cost is \$47.60 per 1,000 pages for that configuration. Compare the exact parsing mode and returned chunks rather than applying a cheaper product's list price to this score. Its [deployment documentation](https://docs.reducto.ai/onprem/enterprise_deployment_options) distinguishes hybrid from Full VPC deployments. See [LlamaParse vs Reducto](https://www.llamaindex.ai/compare/llamaparse-vs-reducto).

### Extend

[Extend](https://docs.extend.ai/) includes parsing within a broader document workflow platform. The Extend 2.0 configuration scores 73.50 overall and 76.02 on charts, at a benchmark cost of \$25 per 1,000 pages. It belongs on a shortlist when parsing feeds document review or extraction workflows as well as retrieval. These results apply to the Extend 2.0 configuration. For deployment-sensitive work, its BYOC and hybrid options have different inference boundaries. See [LlamaParse vs Extend](https://www.llamaindex.ai/compare/llamaparse-vs-extend-ai).

### Mistral OCR

[Mistral OCR](https://docs.mistral.ai/capabilities/document_ai/basic_ocr) is an OCR-first API for turning documents into text and structured output. The OCR 4 row scores 58.38 overall at \$4 per 1,000 pages, with 74.03 on tables and 1.86 on charts. That makes its low price more relevant to text-heavy documents than to recovering chart values. The leaderboard has a separate Annotation configuration; do not combine that configuration's scores with the standard OCR row's cost.

## Which local parsers are worth trying?

### Docling

[Docling](https://github.com/docling-project/docling) is an open-source document conversion toolkit. Its document representation preserves structure and provenance, and its [hierarchical and hybrid chunkers](https://docling-project.github.io/docling/concepts/chunking/) help turn that structure into retrieval units. The code is MIT licensed; check model licenses separately. No comparable ParseBench score is available for its default setup, so test it on your own documents. See [LlamaParse vs Docling](https://www.llamaindex.ai/compare/llamaparse-vs-docling).

### PyMuPDF4LLM

[PyMuPDF4LLM](https://github.com/pymupdf/pymupdf4llm) is a practical baseline for born-digital PDFs. It scores 50.47 overall and 56.93 on tables, but only 1.63 on charts. Use it when extracting embedded text is the main job, then inspect reading order and headers on harder pages. Its packaging has moved into `pymupdf`; consult the current installation instructions. Check the AGPL or commercial license before incorporating it into a product.

### Marker, including Datalab's model options

[Marker](https://github.com/datalab-to/marker) produces Markdown, JSON, HTML and chunks from a local model pipeline. It is worth evaluating for scans and structured documents when you can operate the inference stack. Datalab also develops Chandra-ocr-2, a separate model with a 70.59 overall and 89.20 table score; those results do not describe Marker. Marker code is Apache 2.0; its model weights have separate commercial conditions. Treat the local software and Datalab's managed service as different configurations.

### MinerU

[MinerU](https://github.com/opendatalab/MinerU) offers model-based conversion for documents with substantial layout and OCR requirements. Its verified MinerU2.5-Pro configuration scores 69.27 overall and 59.12 on charts. That is evidence for the named model configuration, not every release or CPU backend. Budget for model inference and benchmark throughput on your hardware. The repository license adds commercial thresholds and online-service attribution requirements to Apache 2.0 terms.

### Unstructured OSS

[Unstructured's open-source library](https://github.com/Unstructured-IO/unstructured) partitions files into elements and supports chunking, including grouping by title. It fits pipelines that need a common ingestion interface for several file types. PDF strategy matters: fast text extraction and higher-resolution layout processing are different paths. No ParseBench score is listed for the OSS library here. Its hosted platform has different processing capabilities, so do not use hosted benchmark claims to describe the local package. See [LlamaParse vs Unstructured](https://www.llamaindex.ai/compare/llamaparse-vs-unstructured).

### LiteParse

[LiteParse](https://github.com/run-llama/liteparse) is LlamaIndex's Apache 2.0 local parser, with a Rust core, a CLI and bindings for several runtimes. It provides Markdown and spatial output without a cloud API or LLM call. Its submitted no-OCR score is 36.90 overall. Use it for a lightweight first pass on simpler documents, or to identify pages that need heavier processing. Its complexity check can support routing, but it does not prove that a page was parsed correctly.

## What about Azure, Google and AWS?

### Azure Document Intelligence

[Azure Layout](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/) scores 56.76 overall and 85.97 on tables. Its 1.27 chart score is a limitation for text-based RAG that needs chart data. It is worth considering when Azure integration or supported container deployment is a key requirement. Confirm the model version available in your chosen deployment. See [LlamaParse vs Azure Document Intelligence](https://www.llamaindex.ai/compare/llamaparse-vs-azure-document-intelligence).

### Google Document AI

[Google Document AI](https://cloud.google.com/document-ai) integrates with Google Cloud document workflows. The leaderboard row is Google's Layout Parser, run April 8, 2026, and scores 48.66 overall and 54.95 on tables. Processor version, region and output structure matter when selecting a deployment. See [LlamaParse vs Document AI](https://www.llamaindex.ai/compare/llamaparse-vs-document-ai).

### Amazon Textract

[Textract](https://docs.aws.amazon.com/textract/) scores 84.46 on tables but 4.47 on charts, with 48.31 overall. It is useful to evaluate for AWS workflows centered on OCR, forms and tables. PrivateLink provides private access to the hosted service; it does not install Textract in your account. Add your own transformation and chunking for retrieval. See [LlamaParse vs Amazon Textract](https://www.llamaindex.ai/compare/llamaparse-vs-amazon-textract).

## Which parser should you choose for your documents?

| Your corpus or constraint | Start with | What to validate |
| --- | --- | --- |
| Overall RAG document ingestion | LlamaParse | Content, tables, charts and source references |
| Scans and mixed layouts | LlamaParse Agentic | OCR and structure on the representative corpus |
| Financial tables, charts and difficult context | LlamaParse Agentic Plus | Units, labels, relationships and evidence |
| Lower processing budget | Compare LlamaParse Cost Effective and Agentic | Quality floor and cost per usable document |
| LangChain, a custom retriever or another framework | LlamaParse standalone API | Output and source references into the existing pipeline |
| Word, PowerPoint and Excel alongside PDFs | LlamaParse | Per-format requirements and supported configuration |
| Customer-cloud processing | LlamaParse BYOC | Model dependencies and data boundaries |
| Open-source local execution is mandatory | LiteParse; compare other local tools | Full processing and operating requirements |

These recommendations keep LlamaParse as the overall production starting point and separate mandatory constraints from quality rankings. ParseBench measures parsing, not retrieval performance or a scan-only test; validate end-to-end answers with the rest of the RAG pipeline held constant.

## Frequently asked questions

### Is Docling good enough for RAG?

Evaluate Docling when local open-source execution is a requirement. For the overall production choice, start with LlamaParse’s published parsing evidence and compare the actual output on scans, spanning table headers, charts and multi-column pages. Local execution alone does not establish equivalent ingestion quality.

### Do I need OCR for RAG?

You need OCR when useful text exists only as pixels. Mixed PDFs may need OCR for some pages even if other pages have an embedded text layer.

### Should tables be Markdown, HTML or JSON?

Markdown works for simple rectangular tables. HTML can preserve row and column spans; structured JSON is useful when you need cell relationships and coordinates. Preserve those relationships when chunking.

### Can I send PDFs straight to GPT or Gemini?

Yes, especially for a small number of direct questions. Compare parsing quality and operational effort before building a reusable ingestion pipeline; see [Related article](/agents/llamaparse-vs-gpt-claude-and-gemini-for-pdf-parsing-2026).

### Is LlamaParse only for LlamaIndex users?

No. Its API output can feed LangChain, a custom retriever or another framework. You can keep your existing embedding model, vector database and answering model.

### How should I test a parser on my own documents?

Create questions whose answers depend on prose, tables, scans and figures. Change only the parser, keeping the rest of the RAG pipeline fixed, and measure retrieval of supporting evidence, answer correctness, citation quality, cost and latency.

[Try LlamaParse](https://www.llamaindex.ai/pricing) with 10,000 free credits per month, or start locally with [LiteParse](https://github.com/run-llama/liteparse).
