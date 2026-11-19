---
title: "Reducto r-1 vs LlamaParse: Parsing Accuracy, Charts and Configuration"
description: "LlamaParse Agentic Plus leads both the Reducto r-1 and Reducto Agentic rows on ParseBench overall."
published: "2026-09-16"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Reducto r-1 vs LlamaParse: Parsing Accuracy, Charts and Configuration

LlamaParse Agentic Plus leads both the Reducto r-1 and Reducto Agentic rows on ParseBench overall. That gives buyers a measured reason to evaluate LlamaParse first for complex PDF understanding. Keep the Reducto configurations distinct: an r-1 request, a legacy parsing request and a request with advanced chart processing are different evaluation targets.

## Where LlamaParse performs better on ParseBench

| Configuration | Overall | Tables | Charts | Visual grounding |
| --- | --- | --- | --- | --- |
| LlamaParse Agentic Plus | 86.69 | 93.27 | 92.19 | 75.43 |
| Reducto (Agentic) | 70.87 | 80.20 | 72.37 | 68.71 |
| Reducto (r-1) | 61.49 | 85.00 | 2.74 | 57.31 |

Agentic Plus leads Reducto Agentic by 15.82 points overall and 19.82 points on charts. The r-1 row has a different output configuration and should not be presented as Reducto with every optional chart feature enabled. Use the Agentic row as additional context rather than collapsing both into a single Reducto score.

Scores are out of 100 in the pinned ParseBench snapshot (commit 0ccc167, November 2, 2026), checked for this revision on November 4. ParseBench measures document parsing across five dimensions, not schema extraction or the percentage of error-free documents. LlamaIndex develops LlamaParse and publishes this benchmark. [Pinned results](https://github.com/run-llama/ParseBench/blob/0ccc16783612a8ff37e77139f5e799510cde47b6/leaderboard.csv), [evaluation code and methodology](https://github.com/run-llama/ParseBench).

## The model behind the request

Reducto introduced r-1 as a unified full-page parsing model, replacing multiple calls used in its earlier general parsing pipeline. The launch describes handling layout, tables and grounding together, while retaining optional specialized processing. Its improvement claims are comparisons with Reducto's own earlier system, rather than evidence of superiority over LlamaParse. [Reducto r-1 announcement](https://reducto.ai/blog/parse-r-1-model)

Configuration matters because the documented routes do not all select the same system. The r-1 guide requires V3 and an explicit `settings.model: "r-1"` selection for API use; omitting the selection uses legacy Parse. New Studio pipelines default to r-1. Record the request rather than assuming a Studio screenshot identifies an API experiment. [Reducto r-1 guide](https://docs.reducto.ai/parse/r-1)

The architectural change is a reason to rerun the evaluation. It does not tell you whether the new configuration meets your output requirements.

## Save enough information to explain the result

Create a manifest before running documents. It should identify the source file by hash, the request configuration, the evaluation date and the exact downstream task. Preserve the raw response as well as any normalized representation used for scoring.

| Record | Why it matters |
| --- | --- |
| API generation and model selection | Identifies the system actually invoked |
| Prompts and optional augmentations | Distinguishes base processing from extra work |
| Table, image and citation settings | Defines the output being purchased |
| Source file and preprocessing | Prevents a rendering difference from becoming a model claim |
| Completion status and elapsed time | Keeps missing results visible |
| Application acceptance checks | Connects parsing to business use |

For LlamaParse, record the parsing configuration and downstream transformations too. Save what each system received and what the application ultimately consumed.

## Check output compatibility before migrating

Do not assume every legacy option has identical meaning. Reducto publishes a compatibility matrix: some processing becomes native, while some output features are unsupported. The matrix specifically identifies `jsonbbox` table output and `track_offsets` as unsupported for r-1. Compatibility should therefore be part of migration testing, separate from content accuracy. [r-1 configuration compatibility](https://docs.reducto.ai/configs/parse/r-1-configuration-compatibility)

An application may depend on offsets for text highlighting even when the extracted words are correct. Another may require merged-cell structure rather than a flat list of values. Write these requirements down before choosing a scoring function. Otherwise a parser can appear to improve while breaking an integration that the evaluation never checked.

## A 40-page report with a specific question

For a hypothetical evaluation, a procurement team uses a 40-page annual report. The application must answer which business segment grew fastest and show the supporting table cells. No vendor results are assumed in this example.

The team creates three test arms: explicitly selected r-1, a documented legacy configuration and its selected LlamaParse configuration. Each receives the identical PDF. The team records whether every relevant table appears, whether segment names remain attached to the correct values and whether supporting evidence can be displayed.

Next, the team asks the same downstream questions using the same answer-generation setup. If an answer is wrong, it traces the error back through retrieval, table interpretation and parsing. This avoids assigning every application error to the parser. If an answer is correct but its supporting evidence points to the wrong cell, it fails the grounding requirement.

The decision may differ by task. A configuration that works for search may still fall short when the interface must display supporting cells.

## Score failures as well as completed documents

Use separate measures for content correctness, structural fidelity, evidence quality and completion coverage. Report how many documents produced usable outputs before averaging accuracy over those outputs. Keep unsupported inputs and timeouts in the report rather than quietly removing them.

Measure time from the application's submission boundary to a usable result. If upload is excluded, say so. If optional processing is enabled for only one arm, disclose that difference and explain why it is necessary for the task. A second, capability-matched experiment may be needed to distinguish configuration cost from product performance.

Inspect representative failures manually. A table score alone may not reveal whether the error changed a material financial conclusion or merely altered formatting that the application ignores.

## Choosing a configuration

An older Reducto benchmark is relevant to r-1 only if the run actually used r-1. Reducto’s current unified model deserves a fresh evaluation on complex documents; an old legacy-pipeline result cannot settle that decision.

Optional processing belongs in the comparison when the application needs it. Enable the features required to produce usable output, record their cost, and explain any differences between configurations. Disabling a legitimate feature simply to make the requests look alike can make the comparison less useful.

Evaluate LlamaParse Agentic Plus first for the tested complex-PDF quality requirements. Keep Reducto Agentic, native r-1 and any r-1 advanced-chart configuration as separately named alternatives. Save request manifests and outputs so that the published advantage is not expanded into a claim about an untested configuration.
