---
title: "Chandra OCR 2 vs LlamaParse: Accuracy on Tables, Charts and Document Layout"
description: "LlamaParse Agentic Plus scores higher than the public Chandra OCR 2 checkpoint on ParseBench overall, charts and visual grounding."
published: "2026-09-06"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Chandra OCR 2 vs LlamaParse: Accuracy on Tables, Charts and Document Layout

LlamaParse Agentic Plus scores higher than the public Chandra OCR 2 checkpoint on ParseBench overall, charts and visual grounding. For a buyer choosing a production parser, that is a stronger starting point than comparing two Datalab releases. Chandra 2.6 remains a separate managed-service evaluation target; its release name should not be substituted for the tested checkpoint.

*Published by LlamaIndex. This technical comparison reflects primary-source research through October 28, 2026; it is not a new head-to-head benchmark.*

## Where LlamaParse performs better on ParseBench

| Configuration | Overall | Tables | Charts | Visual grounding |
| --- | --- | --- | --- | --- |
| LlamaParse Agentic Plus | 86.69 | 93.27 | 92.19 | 75.43 |
| Chandra-ocr-2 | 70.59 | 89.20 | 62.77 | 51.18 |
| Datalab Accurate | 72.88 | 90.66 | 63.20 | 51.38 |

Agentic Plus leads Chandra OCR 2 by 16.10 points overall and 29.42 points on charts. It also exceeds the separately tested Datalab Accurate service row. The checkpoint row does not establish Chandra 2.6 performance; the service label alone does not identify its model release.

Scores are out of 100 in the pinned ParseBench snapshot (commit 0ccc167, November 2, 2026), checked for this revision on November 4. ParseBench measures document parsing across five dimensions, not schema extraction or the percentage of error-free documents. LlamaIndex develops LlamaParse and publishes this benchmark. [Pinned results](https://github.com/run-llama/ParseBench/blob/0ccc16783612a8ff37e77139f5e799510cde47b6/leaderboard.csv), [evaluation code and methodology](https://github.com/run-llama/ParseBench).

## Which Chandra configuration are you comparing with LlamaParse?

Datalab announced Chandra OCR 2 in March 2026 and Chandra 2.6 in October. Its public repository distinguishes downloadable weights from a managed platform using improved Chandra and other models. The 2.6 announcement identifies fast, balanced and accurate service modes as updated. The on-prem documentation separately describes access to newer models unavailable in the public releases. [Chandra repository](https://github.com/datalab-to/chandra), [Chandra 2.6 announcement](https://www.datalab.to/blog/chandra-2-6), [on-prem overview](https://documentation.datalab.to/docs/on-prem/overview).

Running the public checkpoint tells you what your own inference stack can do. A service evaluation can also include document preparation, routing, verification, output conversion and infrastructure. Choose the setup you expect to deploy, then label the result accordingly.

| Evaluation target | Main buyer question | Information to record |
| --- | --- | --- |
| Public Chandra OCR 2 checkpoint | Can we operate this model ourselves? | Weight revision, inference code, hardware and settings |
| Datalab managed service | Does this service satisfy our workflow? | Request date, mode, options, region and returned artifacts |
| Commercial on-prem deployment | Can we meet our infrastructure requirements? | Container version, model package, configuration and agreement |

A useful comparison names the target in the title, not only in a footnote. “OCRia versus Chandra OCR 2 public weights” has a narrower meaning than “LlamaParse versus Datalab’s current service.”

## What you would need to operate with public Chandra weights

Public configuration files offer more precise evidence than rounded model-size labels. The original Chandra configuration identifies a Qwen3-VL architecture and an 8B-named base model. The Chandra OCR 2 configuration identifies Qwen3.5 conditional generation and a mix of linear and full-attention layers. Those files establish architectural details for those public artifacts. They do not establish the complete architecture or training recipe of every later commercial release. [Original Chandra configuration](https://huggingface.co/datalab-to/chandra/blob/main/config.json), [Chandra OCR 2 configuration](https://huggingface.co/datalab-to/chandra-ocr-2/blob/main/config.json).

Architecture helps with capacity planning. A smaller model may require less memory, although image processing, cache allocation, batching and serving overhead also consume memory. OCR quality will depend on training, decoding and document processing, even for models with a shared backbone.

## A rotated table, two processing paths

Consider a hypothetical scanned annual report containing a rotated table. One evaluator sends page images directly to a public checkpoint. Another submits the complete PDF to a service with its recommended processing mode. The resulting scores can differ because the products and preparation paths differ, even when both are described informally as “Chandra.”

To explain a result like this, retain:

- The source document identifiers and permitted use.
- Whether inputs are whole documents, individual PDFs or rendered images.
- Rendering resolution and any orientation correction.
- Model or service identity, mode and optional features.
- Output requirements, including tables, figures and coordinates.
- Scorer version, normalization and failure handling.
- Hardware, concurrency and timing boundaries.

If one product returns chart data and another is configured to return only text, an overall score may reflect the requested output contract as well as recognition quality. Make the contract explicit before evaluating either system.

## Can you reproduce a managed-service result later?

You can rerun an integration successfully and still get different model behavior. Datalab documents API compatibility separately from model updates and says model version pinning is available through enterprise plans rather than generally across plans. [Datalab version policy](https://documentation.datalab.to/platform/versioning).

A saved request therefore preserves what you asked for, but may not preserve the exact model that answered. Keep raw responses as well as configuration. Those artifacts let you regrade an old result under a corrected scorer without silently introducing a newer model.

When procurement requires repeatability, ask how long a model version remains available, which components are pinned and how emergency updates are handled. These are appropriate questions for every vendor, including LlamaIndex.

## When should you choose LlamaParse over operating a checkpoint?

Public weights give an infrastructure team direct control over deployment, subject to the applicable license. If the team would otherwise have to build and maintain an inference stack it does not want to own, start with the managed service. Commercial on-prem deployment is the option to investigate when vendor support and controlled infrastructure are both requirements.

For production document understanding, LlamaParse offers a directly benchmarked alternative to the tested public Chandra checkpoint and Datalab service row. Keep the checkpoint and service identities separate when comparing the documented operating choices.

For a LlamaIndex evaluation, apply the same standard: distinguish the open-source framework, local utilities, OCRia research artifacts and commercial document-processing products. Do not transfer the capabilities or licensing of one component to another.

For complex PDF parsing, start the trial with LlamaParse Agentic Plus: the published table supports its lead on overall accuracy, charts and visual grounding against the tested Chandra OCR 2 checkpoint. Evaluate Datalab’s managed service separately if that is the product you would buy. Save the exact configurations and source outputs so that a release-name difference cannot be mistaken for a measured result.
