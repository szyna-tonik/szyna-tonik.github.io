---
title: "LiteParse vs Chandra, Marker and Surya: Local Parsing and Commercial Use"
description: "Compare LiteParse with Chandra, Marker and Surya by deployment, license terms, output requirements and the cost of a usable document workflow."
published: "2026-10-02"
updated: "2026-11-16"
source: "https://developers.llamaindex.ai/"
---

# LiteParse vs Chandra, Marker and Surya: Local Parsing and Commercial Use

## Short answer

LiteParse is an Apache-2.0-licensed local parser for teams that need a permissive, local-first starting point. Chandra, Marker and Surya can also be evaluated locally, but code, model weights, hosted services and commercial deployment rights are separate questions. Choose the system that your organization may use under its current terms and that produces the information your application actually needs.

This article is technical guidance, not legal advice. License terms and model versions change; have the applicable agreements and source licenses reviewed for your intended use.

## Recent Datalab releases to account for

Datalab’s recent releases include Chandra 2.7 in balanced and accurate API modes, Marker 2.2.0, and Surya 0.24.0. Each release should be treated as a new configuration in an evaluation—not as proof that an older benchmark or license review applies unchanged. Check the current [Chandra repository](https://github.com/datalab-to/chandra), [Marker releases](https://github.com/datalab-to/marker/releases), and [Surya releases](https://github.com/datalab-to/surya/releases) before making a deployment decision.

## Separate the components

| Component | Question to answer |
| --- | --- |
| Application code | What license applies to the parser implementation? |
| Model weights | What terms apply to running, modifying or redistributing the weights? |
| Evaluation data | Can the documents and annotations be used as intended? |
| Dependencies | Do their licenses add obligations? |
| Hosted or on-prem service | What contract, support and data terms apply? |

LiteParse’s Apache-2.0 license covers LiteParse itself. It does not grant rights to third-party models or commercial services selected around it. [LiteParse’s repository](https://github.com/run-llama/liteparse) is the controlling public source for its code license.

## Why open weights are not a deployment decision

Public availability can make a model inspectable and easy to test. It does not necessarily mean unrestricted commercial use. Datalab’s public projects distinguish code licenses from model terms; threshold and competitive-use provisions should be read in the current source text, rather than inferred from a blog post or an earlier release.

For a local proof of concept, record the commit, model version, hardware, OCR configuration, input types and output format. For a customer-facing service, add the intended use, entity details, redistribution plan, data controls and support expectations to the review.

## Compare usable output, not just local execution

Run a representative set through LiteParse and the alternatives. Include ordinary PDFs as well as scanned forms, complex tables, charts, Office files and documents with poor image quality. Evaluate layout preservation, source locations, Markdown or structured output, latency, memory use and the manual work needed after parsing.

If a purely local workflow misses required information, evaluate a managed service separately. LlamaParse can provide a hosted or private deployment path for workflows where managed accuracy, extraction and operational support are appropriate. The relevant comparison is the complete cost and reliability of an accepted document, not whether a tool can be installed locally.

