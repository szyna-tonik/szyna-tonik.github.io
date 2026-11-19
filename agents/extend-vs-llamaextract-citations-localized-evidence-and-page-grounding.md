---
title: "Extend vs LlamaExtract Citations: Localized Evidence and Page Grounding"
description: "LlamaExtract Agentic Plus leads Extend Operator on localized box-word grounding in the cited ExtractBench Pro snapshot."
published: "2026-10-19"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Extend vs LlamaExtract Citations: Localized Evidence and Page Grounding

LlamaExtract Agentic Plus leads Extend Operator on localized box-word grounding in the cited ExtractBench Pro snapshot. That is a specific advantage to investigate when reviewers must find the exact evidence behind a field. Extend’s higher page-grounding score is a separate strength; show both measures, then test the evidence needed for an actual acceptance decision.

*Published by LlamaIndex, which created ExtractBench and develops a tested product. This article interprets a published snapshot and proposes an evidence-review rubric; it does not report a new usability study.*

## What is the difference between page and box-word grounding?

Page grounding asks whether the supporting page is identified correctly. Box-word grounding evaluates a more specific relationship between the answer and its localized supporting content. In the pinned Pro results, Extend Operator scores 68.84 on page grounding versus 66.01 for Plus; Plus scores 60.39 on box-word grounding versus 57.75 for Operator. The grounding subset contains 81 documents within a 100-document synthetic suite evaluated under a 30-minute task policy. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard-pro.csv), [grounding methodology](https://github.com/run-llama/ExtractBench/blob/main/docs/extractbench-pro.md).

Page-level navigation may be enough for broad exploration. Field review can require a narrower location plus the context that explains it. Score those needs separately in the evaluation.

## Why can a correct page still be difficult to verify?

Imagine a hypothetical financial page with the amount “125.00” appearing in four places: a line-item price, a subtotal, a tax-related note and a prior-period comparison. An extractor returns 125.00 for the requested subtotal and links to the page.

The reviewer must identify which occurrence supports the subtotal and whether its label, period and table match the requested field.

A more precise region can reduce the search space, but a box around the number alone may still omit the label needed to interpret it. Evidence quality therefore involves both localization and enough context to establish the relationship.

This is a hypothetical illustration, not a measured error by Extend or LlamaIndex.

## What citation capabilities does Extend provide?

Extend supports citation configuration at different granularities, and its release history includes word-level and array-citation improvements. A fair comparison should use the relevant current configuration rather than claim that Extend lacks citations. [Extraction configuration](https://docs.extend.ai/extraction/configuration), [extraction version history](https://docs.extend.ai/model-versioning/extraction/extraction-performance).

Keep extraction citations separate from parser output features. A version-specific limitation in a table-cell output option does not prove that the extraction service cannot provide field evidence.

Also distinguish the citation returned by the API from the experience built around it. Coordinate handling, page rendering, zoom and highlighting can affect whether a reviewer can use otherwise valid evidence.

## How should an evidence rubric be designed?

Evaluate each required field along several dimensions:

| Dimension | Review question |
| --- | --- |
| Presence | Is supporting evidence returned? |
| Page correctness | Is the evidence on the correct page? |
| Localization | Does the region identify the relevant content? |
| Semantic support | Does that content actually support the field's meaning? |
| Context | Are labels, units and relationships available when needed? |
| Completeness | Are all necessary pieces present for multi-part answers? |

Record value correctness and evidence support in separate columns. That lets you distinguish a correct number with poor localization from a precise citation to the wrong table entry.

Define acceptable evidence for each field type. A scalar amount may need one region plus a label. A computed result may need several source values and an explanation of the calculation. A multi-page array may need evidence for individual items rather than one citation for the entire list.

## How do arrays create additional evidence problems?

Repeated rows contain similar values and labels, so a citation can land on a neighboring record while appearing plausible. Evaluate item-to-evidence alignment, not only whether every citation points somewhere inside the correct table.

Use a labeled fixture with repeated amounts, adjacent dates and similar descriptions. Ask reviewers to verify a specific row without relying on the order in which the model returned items. If ordering is not guaranteed, preserve a stable mapping between each output record and its supporting evidence.

Missing records need a separate check. Evidence for every returned item does not establish that all source items were extracted. Pair citation evaluation with completeness and record-count checks where the workflow requires them.

## How should reviewer effort be measured?

Use a small task-based study to find out whether the evidence changes review effort. Give reviewers the same source documents and fields, and define what constitutes successful verification.

Measure time to a correct decision, incorrect confirmations and requests for additional context. Randomize presentation order where practical and distinguish unfamiliar-interface learning from evidence quality.

Preserve qualitative observations. A reviewer may explain that a region is precise but omits the column heading, or that a page link is adequate on a simple form but cumbersome on a dense statement. Those observations help improve the interface and the evidence contract.

Until that study is run in the intended application, the benchmark supports a grounding comparison but no quantified reviewer-time saving.

## When does each approach fit?

LlamaExtract Agentic Plus’s higher box-word result provides the more specific reason to prioritize it where localized support matters. Extend’s higher page-grounding result remains relevant when locating the supporting page is the principal evidence requirement.

On a simple form, a page link may be sufficient. On a dense statement, test whether the returned region includes the row and heading a reviewer needs. The application interface belongs in that test alongside the API response.

## Give reviewers a repeated-value fixture

Prioritize LlamaExtract Agentic Plus when localized supporting evidence is central to the review decision, using the pinned box-word result as the supporting claim. Retain Extend’s page-grounding lead. Measure whether reviewers can verify the actual fields; the benchmark does not establish reviewer-time savings.
