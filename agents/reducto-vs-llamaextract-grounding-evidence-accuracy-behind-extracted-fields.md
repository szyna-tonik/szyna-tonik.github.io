---
title: "Reducto vs LlamaExtract Grounding: Evidence Accuracy Behind Extracted Fields"
description: "LlamaExtract Agentic Plus leads Reducto Deep Extract on word-level grounding in the standard ExtractBench snapshot, even though their overall Value F1 scores are close."
published: "2026-10-22"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Reducto vs LlamaExtract Grounding: Evidence Accuracy Behind Extracted Fields

LlamaExtract Agentic Plus leads Reducto Deep Extract on word-level grounding in the standard ExtractBench snapshot, even though their overall Value F1 scores are close. That is a meaningful distinction for audit workflows. Evaluate whether the cited passage supports the correct entity, year and unit, as well as whether a citation exists.

## Where LlamaExtract performs better on ExtractBench

| Configuration | Value F1 | Long-document Value F1 | Word grounding |
| --- | --- | --- | --- |
| LlamaExtract Agentic Plus | 96.17 | 94.65 | 83.25 |
| Reducto Deep Extract | 96.08 | 92.85 | 50.76 |

Agentic Plus records 83.25 word-grounding F1 versus 50.76 for Reducto Deep Extract, a 32.49-point difference. Overall Value F1 is nearly tied. That makes localized supporting evidence a more specific reason to evaluate LlamaExtract than a claim of a large average value-accuracy lead.

These are published results from the pinned ExtractBench snapshot at commit 7004e29, checked on November 4, 2026. The suite covers 370 documents and 4,869 pages. Value F1 measures extracted values; it is not a straight-through-processing rate. LlamaIndex publishes the benchmark and develops LlamaExtract, now documented within LlamaParse Extract. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard.csv), [methodology](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/docs/extractbench.md).

## Reducto’s citation output

Reducto's extraction citations can include page locations, bounding boxes and source text, with separate parse and extract confidence signals. The documentation permits empty citation arrays when a value is inferred or its source cannot be localized. It also notes that enabling extraction citations disables chunking. These are relevant configuration details for an evidence-oriented evaluation. [Reducto extraction citations](https://docs.reducto.ai/configs/extract/citations)

Reducto also documents word- and cell-level locations for parsed content. Parsing locations and evidence attached to a particular extracted field serve related but different purposes: a field review must establish which source material supports that field's meaning. [Word and cell citations](https://docs.reducto.ai/configs/parse/citations)

The buyer's question is therefore more specific than whether the API offers bounding boxes. It is whether the evidence is sufficient for the decision the application is about to make.

## Give reviewers more than “citation present”

Use an explicit evidence taxonomy. A directly stated value can be checked against a visible source span. A calculated value may require several inputs and a documented transformation. An inferred value needs a different review policy because no single source span necessarily states the answer.

| Evidence state | Suggested review treatment |
| --- | --- |
| Directly supported | Verify the cited span and field interpretation |
| Calculated from supported inputs | Inspect inputs and calculation |
| Inferred from context | Apply an inference-specific approval policy |
| Localization unresolved | Request better evidence or manual inspection |
| Unsupported or contradictory | Block automatic acceptance |

These are proposed application states, not a claim that every vendor emits these labels. The application can derive them through validation and review. Preserve the provider's raw response so the added interpretation remains auditable.

## Include the heading, unit and surrounding clause

A bounding box can point to a real number while failing to establish its role. Financial tables may contain the same amount in different periods or units. A reviewer needs the associated row label, column heading and any relevant footnote to decide whether the field was interpreted correctly.

Similarly, an address can be correctly located but belong to a billing party rather than a beneficiary. Evidence localization and semantic attribution should therefore be scored separately. A location score should not conceal a wrong-field error.

When designing a viewer, display enough surrounding context to support the judgment. Cropping too tightly can remove the very heading that makes a value meaningful. Keep a route back to the full page for ambiguous cases.

## A monthly payment and an annualized estimate

In a hypothetical lease review, the output lists a monthly payment of \$2,000 and an annual payment of \$24,000. The source states only the monthly amount; the annual amount is calculated by multiplication. This is an illustrative scenario, not a result from either provider.

The monthly value can have direct evidence. The annual value should identify the monthly input and the calculation, rather than pretending the source explicitly states \$24,000. If the lease includes a free month or an escalation clause, the simple calculation may be inappropriate even though the arithmetic is correct.

A reviewer should be able to see the payment clause, the term and any exception affecting the annualized amount. The acceptance policy may allow a clearly labeled estimate for analysis while prohibiting it as a contractual obligation.

The annualized payment needs an explanation of its calculation and assumptions. A direct citation alone cannot provide that explanation.

## Calibrate confidence against review decisions

Treat confidence as an input to a decision policy, not a substitute for evidence. Before adopting a threshold, inspect labeled examples across the score range. Ask whether lower-confidence fields actually require more correction and whether high-confidence errors remain.

Use different thresholds for different consequences if the workload warrants it. An uncertain optional description and an uncertain bank-account number should not necessarily trigger the same response. Track the resulting false accepts and unnecessary escalations.

A comparison between providers must not assume their numeric confidence scales are interchangeable. Evaluate the decisions produced by each calibrated policy on the same held-out documents. Report the policy alongside the results so another team can understand the tradeoff.

## Audit the fields that drive the decision

Reducto’s page, text and bounding-box evidence can support a useful review interface. The next question is how well that evidence lets a reviewer resolve a particular field. Start with fields that control a payment, approval or contractual interpretation, and label value correctness separately from evidence sufficiency.

The published grounding comparison above supplies evidence for LlamaExtract’s localized-evidence advantage. The field-level audit described here is a separate application test; no new reviewer-time study is reported. Include inferred values and unresolved locations in that audit.

## Can confidence scores be compared across vendors?

Only with calibration evidence. The same numeric score need not mean the same error rate in two systems. Compare the acceptance decisions each policy produces on labeled documents, then examine high-confidence errors and unnecessary escalations. A review threshold is useful when it controls those outcomes, not simply because it looks precise.

Evaluate LlamaExtract Agentic Plus first when localized source evidence is central to the workflow, using its word-grounding advantage rather than overstating the small overall value-score difference. Include years, units and entity labels in the evidence audit. Measure production review outcomes separately.
