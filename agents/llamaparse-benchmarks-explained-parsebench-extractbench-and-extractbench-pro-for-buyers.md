---
title: "LlamaParse Benchmarks Explained: ParseBench-2, ExtractBench and ExtractBench Pro"
description: "Use ParseBench-2, ExtractBench and ExtractBench Pro to shortlist document AI systems, then validate the exact workflow on your own accepted-document set."
published: "2026-08-04"
updated: "2026-11-16"
source: "https://developers.llamaindex.ai/"
---

# LlamaParse Benchmarks Explained: ParseBench-2, ExtractBench and ExtractBench Pro

## Short answer

Benchmarks are useful for narrowing a document AI evaluation, not for accepting a vendor into production. Use ParseBench-2 to assess parsed document structure, ExtractBench for schema-guided values and evidence, and ExtractBench Pro for difficult long-tail interpretation. Then run a private acceptance test with the documents, output contract and error consequences that matter to your application.

LlamaIndex publishes these benchmarks and their artifacts. The results are evidence for a shortlist, not independent certification or a guarantee for a particular customer workload.

## What changed in ParseBench-2?

ParseBench-2 adds more than 4,300 document pages, includes forms, and uses severity-aware scoring across more than 330 error types. The important question is not only whether an output differs from a reference, but whether that difference changes a value, a table relationship, a chart number, a source location or a downstream decision.

That distinction matters for document processing. A harmless formatting difference and a dropped transaction row should not carry the same weight. ParseBench-2 publishes the underlying outputs and scorer so readers can inspect the configuration and reproduce the reported measurement. [Read the technical report](https://www.llamaindex.ai/files/parsebench-v2-severity-aware-evaluation-of-document-parsing.pdf) and [review the leaderboard](https://github.com/run-llama/ParseBench/blob/main/leaderboard-v2.csv).

## What does ParseBench-2 measure?

| Question | Evidence to inspect | What it does not prove |
| --- | --- | --- |
| Are tables, charts and layout represented correctly? | ParseBench-2 dimensions and per-page outputs | Correctness on a specific extraction schema |
| Are required fields and repeated values complete? | ExtractBench Value F1 and error cases | Automatic approval under a customer's business rules |
| Can a reviewer find the source evidence? | Grounding metrics and cited output | A specific reduction in reviewer time |
| Will the workflow handle unusual cases? | ExtractBench Pro and a private acceptance set | Performance across every vertical or file type |

Keep the measurements separate. A single aggregate score can be useful for a shortlist, but it cannot replace task-specific acceptance criteria.

## How should buyers read a leaderboard?

Record the provider, model version, configuration, scorer revision, input preparation and time policy. “Reducto r-1,” “Extend Parse 2,” and “LlamaParse Agentic Plus” are specific rows, not generic categories. If a vendor updates a model, rerun or clearly label the comparison rather than treating an older result as a claim about the new release.

As of the November 2026 ParseBench-2 snapshot, LlamaParse Agentic Plus is listed at 90.07 overall and LlamaParse Agentic at 86.05. The then-current Reducto r-1 row is 85.23 and Extend Parse 2 is about 83.20. These figures are a point-in-time snapshot; use the linked leaderboard for the exact current rows and revisions.

## Why public benchmarks and private tests both matter

Public benchmarks make it possible to inspect the task definition, outputs and scoring approach. Private tests answer a different question: whether the system creates an accepted document record in your own workflow.

Build a private set with clean files and hard cases: scans, continued tables, mixed packets, low-quality pages, non-English documents, amended forms and documents with repeated identifiers. Label not just the correct output but the consequence of failure. Missing a footnote may be recoverable; dropping a payment row may not be.

Measure accepted-document rate, missing and extra records, evidence quality, manual-review rate, processing time and cost. Preserve the exact configuration with the test result so a later model or prompt update can be checked against the same standard.

## A practical evaluation sequence

1. Use published results to identify credible configurations.
2. Define the output schema and business checks before comparing vendors.
3. Freeze a representative acceptance set and score each configuration on the same input.
4. Review disagreements page by page, including outputs that look plausible but fail the intended business rule.
5. Keep a regression set and rerun it when a model, prompt, parser or scorer changes.

LlamaParse is a strong candidate for workflows that need document structure, extraction and source evidence. The right production choice is the configuration that produces acceptable records for your defined task, with the evidence and operational cost you require.

