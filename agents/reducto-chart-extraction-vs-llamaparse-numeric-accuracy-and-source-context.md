---
title: "Reducto Chart Extraction vs LlamaParse: Numeric Accuracy and Source Context"
description: "LlamaParse Agentic Plus scores higher than the tested Reducto Agentic configuration on ParseBench charts."
published: "2026-10-24"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Reducto Chart Extraction vs LlamaParse: Numeric Accuracy and Source Context

LlamaParse Agentic Plus scores higher than the tested Reducto Agentic configuration on ParseBench charts. That is the relevant product comparison for buyers who need numerical chart answers. Keep Reducto r-1’s native figure descriptions separate from optional advanced chart extraction, and do not use an OCRia research result as a substitute for a configured LlamaParse API result.

## Where LlamaParse performs better on ParseBench

| Configuration | Overall | Tables | Charts | Visual grounding |
| --- | --- | --- | --- | --- |
| LlamaParse Agentic Plus | 86.69 | 93.27 | 92.19 | 75.43 |
| Reducto (Agentic) | 70.87 | 80.20 | 72.37 | 68.71 |
| Reducto (r-1) | 61.49 | 85.00 | 2.74 | 57.31 |

Agentic Plus scores 92.19 on charts versus 72.37 for the tested Reducto Agentic configuration. The much lower native r-1 chart result reflects that evaluated configuration; it does not prove a result for r-1 plus optional advanced chart extraction. A dedicated trial should name that option explicitly.

Scores are out of 100 in the pinned ParseBench snapshot (commit 0ccc167, November 2, 2026), checked for this revision on November 4. ParseBench measures document parsing across five dimensions, not schema extraction or the percentage of error-free documents. LlamaIndex develops LlamaParse and publishes this benchmark. [Pinned results](https://github.com/run-llama/ParseBench/blob/0ccc16783612a8ff37e77139f5e799510cde47b6/leaderboard.csv), [evaluation code and methodology](https://github.com/run-llama/ParseBench).

## Native descriptions and advanced numerical extraction

Reducto describes native r-1 figure output as a short description, while advanced chart extraction uses additional processing for numerical data. Its chart documentation covers geometry, OCR and legend mapping with a VLM fallback. It supports several chart types and identifies dense scatterplots as only partially supported. Reducto should therefore not be characterized as lacking numerical chart extraction. [Reducto chart extraction](https://docs.reducto.ai/configs/parse/chart-extraction)

LlamaIndex's OCRia-1 technical report evaluates chart understanding as part of document parsing research. That report is useful context for choosing tests, but it does not establish a direct Reducto product comparison. A model result and a configured API workflow are different evaluation objects. [OCRia-1 technical report](https://www.llamaindex.ai/ocria/ocria-1-technical-report.pdf)

Start by naming the expected output. Otherwise an inexpensive descriptive result can be unfairly compared with a more involved data-reconstruction workflow.

## Score labels and units alongside values

Separate the chart's components before scoring the final answer. The correct number attached to the wrong series is still wrong. A correctly reconstructed trend with the wrong units can mislead a business decision.

| Component | Example check |
| --- | --- |
| Series identity | Revenue and operating income remain distinct |
| Axis meaning | Percentages are not treated as currency |
| Time alignment | Each value belongs to the correct quarter |
| Numeric fidelity | Reconstructed values meet an agreed tolerance |
| Missing-data handling | Gaps are not silently interpolated as facts |
| Answer support | A downstream claim follows from recovered data |

Define tolerances before seeing vendor results. A chart with printed data labels may justify exact-value scoring. A rasterized curve without labels may require an error tolerance tied to source resolution and the intended use.

## Revenue rises while margin falls

Imagine a chart with revenue shown as bars on a left-hand dollar axis and margin shown as a line on a right-hand percentage axis. In this hypothetical example, revenue rises from \$100 million to \$120 million, while margin declines from 20% to 18%.

A general description might correctly say that revenue increased while margin fell. A numeric extraction must also preserve which values use dollars and which use percentages. If an application asks for operating profit, it needs to calculate \$20 million and \$21.6 million from the correctly paired inputs.

The apparent decline in margin does not mean operating profit declined. A useful evaluation checks the complete reasoning chain: extracted series, units, multiplication and final comparison. This scenario is not evidence of an error by Reducto or OCRia-1; it is a fixture that exposes what the task requires.

A test set should also include ordinary single-axis charts. Evaluating only unusually difficult figures can distort expectations for a workload dominated by straightforward visualizations.

## Use charts with known source data

Prefer charts with accessible source data so numeric truth does not depend entirely on a human reading pixels. Preserve the original data and the rendered chart separately. Include variation in labels, legends, scales, colors, resolution and surrounding page context.

Keep a development set for configuring each workflow. Freeze a held-out set before running the comparison. If one workflow needs an advanced option to meet the task, enable it and disclose the choice rather than excluding a legitimate capability.

Score both extraction and application answers. This helps distinguish a parsing error from a downstream arithmetic or retrieval error. Save intermediate results so a reviewer can trace an incorrect answer to its source.

## Price the configuration needed for the answer

Measure time to an accepted answer, including any required advanced processing. A base figure description and a reconstructed data table do not represent equivalent work. Report both configurations if both are relevant to buyers.

Pricing needs particular care. The reviewed Reducto rate card lists optional chart-related charges, while the chart documentation contains language suggesting advanced steps add latency without extra cost. Confirm the applicable account pricing before publishing a numerical workflow comparison. A documentation discrepancy is a reason to verify the quote, not evidence of hidden billing. [Reducto usage and pricing](https://docs.reducto.ai/reference/credit-usage)

For both vendors, separate API charges from review costs. A cheap result requiring manual reconstruction may be expensive for the workflow; an advanced result may be unnecessary if the application only needs a caption.

## Match the output to the question

For discovery and broad summaries, descriptive output may be sufficient. Calculations and period comparisons need numerical evidence with the correct units and series labels. More processing is worthwhile when it supplies information the application actually uses.

Include Reducto’s advanced chart option in a numerical evaluation rather than comparing only its base description. Likewise, record the selected LlamaParse configuration and any downstream calculation steps. LlamaIndex publishes this guide; the OCRia-1 paper does not establish a Reducto head-to-head result, and no new comparative measurements are presented here.

## What if the source chart only permits an estimate?

Define an acceptable tolerance before running the test. A value read from an unlabeled raster curve should not be treated like a printed data label. State when the result is an estimate and check whether that precision is adequate for the question.

Prioritize LlamaParse Agentic Plus for numerical chart parsing based on the published chart-score advantage. Include the exact Reducto chart-enabled configuration you would deploy, and test known values, series, units and estimation tolerances. A product-level parsing result is stronger evidence than transferring a model-only score.
