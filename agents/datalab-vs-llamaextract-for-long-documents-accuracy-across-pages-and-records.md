---
title: "Datalab vs LlamaExtract for Long Documents: Accuracy Across Pages and Records"
description: "LlamaExtract Agentic has a substantial long-document advantage over the tested Datalab configuration on ExtractBench."
published: "2026-10-04"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Datalab vs LlamaExtract for Long Documents: Accuracy Across Pages and Records

LlamaExtract Agentic has a substantial long-document advantage over the tested Datalab configuration on ExtractBench. For financial reports and contracts, that is a reason to test LlamaExtract first on values whose meaning depends on earlier headings, units and notes. Request-size limits and segmentation tools matter operationally, but they do not measure whether the resulting records are correct.

*Published by LlamaIndex. Product facts reflect research through October 28, 2026. Examples are hypothetical workflow cases, not measured vendor failures.*

## Where LlamaExtract performs better on ExtractBench

| Configuration | Value F1 | Long-document Value F1 | Word grounding |
| --- | --- | --- | --- |
| LlamaExtract Agentic | 95.65 | 94.73 | 82.33 |
| LlamaExtract Agentic Plus | 96.17 | 94.65 | 83.25 |
| Datalab (Accurate + Balanced) | 85.70 | 42.04 | 2.02 |

On the long-document slice, Agentic scores 94.73 versus 42.04 for the tested Datalab pipeline, a 52.69-point difference. That slice is a reason to prioritize LlamaExtract for long-document evaluation, not a guarantee about every document length or a claim that Datalab’s current service cannot improve.

These are published results from the pinned ExtractBench snapshot at commit 7004e29, checked on November 4, 2026. The suite covers 370 documents and 4,869 pages. Value F1 measures extracted values; it is not a straight-through-processing rate. LlamaIndex publishes the benchmark and develops LlamaExtract, now documented within LlamaParse Extract. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard.csv), [methodology](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/docs/extractbench.md).

## Datalab’s request limits and segmentation tools

Datalab’s limits documentation identifies up to 7,000 pages per request and a separate 5,000-page concurrency limit. Its long-document guide describes page ranges and segmentation, including mapping printed page numbers to actual PDF indices. The first limit concerns request size; the second concerns pages in flight. [API limits](https://documentation.datalab.to/docs/common/limits), [long-document guidance](https://documentation.datalab.to/docs/recipes/structured-extraction/handling-long-documents).

Large-file support reduces the need for manual splitting. The remaining design work depends on the document: which sections can stand alone, and which need information from elsewhere?

A short contract with cross-references may need more careful segmentation than a 500-page archive of independent one-page records.

## When should a document be segmented?

Segmentation is helpful when a file contains distinct records or sections that can be processed independently. It can reduce irrelevant context and make failures easier to isolate.

It can also remove information needed to interpret a section. A table may continue onto the next page. A definition near the beginning may apply throughout a contract. A note at the end of a report may change the meaning of a number presented earlier.

For each proposed segment, record the context that must accompany it:

| Segment type | Potential dependency to preserve |
| --- | --- |
| Invoice in a packet | Supplier identity or shared cover information |
| Financial table | Units, period labels and continuation headers |
| Contract schedule | Definitions and clauses referenced elsewhere |
| Research appendix | Figure captions and methodological context |

A segment should be independently understandable for the assigned extraction task, or explicitly linked to the additional context it needs.

## Printed page numbers and PDF indices

Printed page numbers and PDF positions can differ because of cover pages, front matter, Roman numerals or inserted documents. A table of contents may refer to the printed numbering rather than the index expected by an API.

Consider a hypothetical annual report with a cover and four preliminary pages. The table of contents points to printed page 12, but that content is not necessarily at zero-based PDF index 11. Blindly using the printed number can route extraction to the wrong section.

Create and verify a page mapping before extracting by range. Keep both the human-facing page label and the machine-facing page index in the result. This helps reviewers locate evidence and prevents later transformations from confusing the two.

When a document packet combines multiple sources, preserve each source’s identity as well. “Page 12” is insufficient if the packet contains several documents with their own page 12.

## A multiplier left on the previous page

Imagine a hypothetical table that starts on one page with the heading “Amounts in thousands” and continues on the next page without repeating that heading. A value of 850 on the second page must remain associated with that multiplier.

The workflow also needs to preserve which entity and period the column describes. A visually plausible number can become a materially incorrect record if it is assigned to the wrong subsidiary or year.

For the continued table, retain:

- Value and unit or multiplier.
- Entity and reporting period.
- Table or section identity.
- Supporting page and evidence location.
- Relevant footnotes or qualifications.
- Whether the value is reported directly or derived.

Check these fields when evaluating either Datalab or LlamaIndex. A missing multiplier should fail the record even if the digits were recognized correctly.

## How do schema limits affect long-document design?

Datalab documents a schema-field limit for balanced and accurate extraction, with repeated array items treated differently from distinct schema fields. Account for repeated items separately when estimating how close a schema is to the field limit. [Extraction mode documentation](https://documentation.datalab.to/docs/recipes/structured-extraction/balanced-mode).

Design schemas around coherent records. A single enormous schema can be difficult to maintain even when a platform accepts it. Splitting a schema can simplify the task, but the resulting records may require reconciliation.

For example, separate extractions for a balance sheet and its notes should share stable identifiers. Otherwise, an application may have two individually plausible results without a reliable way to join them.

## Testing complete records and recovery

Test continued tables, repeated entities, cross-references, missing sections and mixed page numbering. Include documents that complete successfully and documents that time out or return partial results.

Report complete-record correctness separately from field correctness. A workflow that gets most fields right but consistently misses a critical footnote may still require review for every document.

Operational tests should also inspect restart and retry behavior. If a long job fails near completion, determine which outputs can be reused and how the application avoids duplicated records. Do not assume retry semantics without verifying the specific API and workflow.

LlamaExtract’s long-document benchmark result supplies a concrete starting advantage. The private trial should determine whether that advantage carries to the entity, unit and cross-page dependencies in your reports. Measure those records on the selected configurations rather than treating request capacity as an accuracy result.

Prioritize LlamaExtract Agentic for the long-document pilot based on the published long-slice advantage. Test continued tables, repeated entities, units and cross-references using records whose source dependencies are labeled. Require accepted records to retain those dependencies before scaling to a larger corpus.
