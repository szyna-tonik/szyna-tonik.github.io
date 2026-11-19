---
title: "Chandra vs LlamaParse for Chart Extraction: Accuracy, Units and Source Evidence"
description: "LlamaParse Agentic Plus has the higher chart score in the published ParseBench comparison with Chandra OCR 2."
published: "2026-09-08"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Chandra vs LlamaParse for Chart Extraction: Accuracy, Units and Source Evidence

LlamaParse Agentic Plus has the higher chart score in the published ParseBench comparison with Chandra OCR 2. That matters when an analyst needs numbers, series and units rather than a figure description. Start with that measured advantage, then check whether printed values, visual estimates and footnotes survive the complete application workflow.

*Published by LlamaIndex. Product facts reflect research through October 28, 2026. Examples below are hypothetical, not measured vendor outputs.*

## Where LlamaParse performs better on ParseBench

| Configuration | Overall | Tables | Charts | Visual grounding |
| --- | --- | --- | --- | --- |
| LlamaParse Agentic Plus | 86.69 | 93.27 | 92.19 | 75.43 |
| Chandra-ocr-2 | 70.59 | 89.20 | 62.77 | 51.18 |
| Datalab Accurate | 72.88 | 90.66 | 63.20 | 51.38 |

Agentic Plus scores 92.19 on charts, versus 62.77 for Chandra OCR 2 and 63.20 for Datalab Accurate. This supports prioritizing LlamaParse for a chart-heavy trial. It does not imply that Datalab cannot extract chart values or that every visual estimate will be exact.

Scores are out of 100 in the pinned ParseBench snapshot (commit 0ccc167, November 2, 2026), checked for this revision on November 4. ParseBench measures document parsing across five dimensions, not schema extraction or the percentage of error-free documents. LlamaIndex develops LlamaParse and publishes this benchmark. [Pinned results](https://github.com/run-llama/ParseBench/blob/0ccc16783612a8ff37e77139f5e799510cde47b6/leaderboard.csv), [evaluation code and methodology](https://github.com/run-llama/ParseBench).

## What does Chandra return for charts?

Chandra 2.5 introduced a consistent figure representation containing fields for alternative text, visible text, axes, data, diagram structure and description. Its announcement says chart values estimated from an axis are marked with `~`. These capabilities followed chart understanding in earlier releases; chart extraction should not be portrayed as missing from Datalab. [Chandra 2.5 release](https://www.datalab.to/blog/chandra-2-5), [Chandra 1.5 release](https://api.datalab.to/blog/chandra-1-5).

Those fields give downstream code predictable places to look for chart data. The harder integration work starts when a value reaches a spreadsheet: which year does it describe, what are its units, and was it printed or estimated? An approximation that works for a chart summary may be unsuitable for an accounting reconciliation.

## Printed numbers, visual estimates and calculations

Separate three categories before designing a score:

| Value category | What the document provides | Appropriate evaluation |
| --- | --- | --- |
| Printed value | A visible numeric label | Transcription and association accuracy |
| Axis-derived estimate | Position relative to a scale | Error tolerance appropriate to resolution and scale |
| Derived quantity | A value calculated from other values | Correct inputs, formula and explanation |

Keep the category with each extracted value so a downstream model can tell a published number from a visual approximation.

A useful output record includes the value, unit, series, period, page and a description of its evidence. When the value was estimated, retain that status rather than stripping it during normalization. When the source is ambiguous, uncertainty is preferable to unsupported precision.

## Worked example: a regional revenue chart

Imagine a hypothetical chart titled “Revenue by region, \$ millions.” It shows North America and Europe for 2024 and 2025. One bar has a printed label of 120; another has no label and appears close to 95 on the axis.

An extraction system could produce a neat table containing 120 and 95. That table still needs several checks. Does 120 belong to North America or Europe? Is 95 explicitly estimated? Has “millions” been preserved? Are the values for a fiscal year or a calendar year? Does a footnote say that 2024 was restated?

For the unlabeled bar, a suitable record might say “approximately 95 million,” linked to the chart’s page. For the printed label, the record should preserve 120 without inventing extra decimal places. If the footnote changes comparability, retain it alongside the values rather than leaving it in unrelated page text.

## How should chart extraction be scored fairly?

Start with the intended use. A chart used for search may need a faithful description and preserved image. A chart used for numerical analysis needs correctly associated values. A chart used for audited reporting may require printed evidence rather than estimates.

Then define a scoring policy before reviewing outputs:

1. Score printed numeric labels separately from visual estimates.
2. Accept equivalent table orientations and sensible series names.
3. Check units, multipliers and negative values independently.
4. Distinguish missing values from invented values.
5. Record whether chart images and source locations remain accessible.
6. Count document failures and incomplete charts, not only returned cells.

Datalab has publicly questioned aspects of ParseBench’s chart-estimation and formatting methodology. Investigating those vendor criticisms requires checking the disputed cases and scoring rules. In particular, does the score reflect the application’s needs, and are equivalent valid outputs treated consistently? [Datalab’s ParseBench critique](https://www.datalab.to/blog/why-we-built-omniparsebench).

For ParseBench, that means making the rubric, examples and accepted normalizations available for scrutiny, including cases raised by competitors.

## Which documents belong in a chart test set?

Include more than clean vertical bar charts. A practical test set should cover stacked bars, multiple axes, line charts, small multiples, negative values, crowded legends and figures with explanatory footnotes.

Stratify by source quality as well. A vector PDF, a low-resolution scan and a screenshot can contain the same chart but present very different evidence. Preserve the original input type in the test manifest instead of averaging those cases without explanation.

Use examples that represent business risk. For financial analysis, incorrect units may matter more than a stylistic description. For scientific search, omitting a confidence interval may change the interpretation. For operational dashboards, associating a series with the wrong region can be more damaging than a small visual estimation error.

Report these errors beside the average. An analyst needs to know whether the remaining mistakes concern small visual estimates or the units used in a financial model.

## Putting the chart output into an application

LlamaParse’s published chart-score advantage provides the reason to evaluate it first for numerical chart output. Inspect estimate markers, units and source evidence throughout the application, including transformations after parsing. Datalab’s structured figure output is a capability to test against that contract, not a substitute for the measured comparison.

Start with LlamaParse Agentic Plus for the chart-heavy evaluation, using its measured ParseBench advantage as the shortlist evidence. Then test the ten charts that feed an actual decision, including printed values, estimates, units and footnotes. Measure downstream answer correctness separately from the parsing score.
