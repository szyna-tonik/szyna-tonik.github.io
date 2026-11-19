---
title: "Extend Parse vs LlamaParse: Parsing Accuracy and the Parse 2.1 Version Gap"
description: "LlamaParse Agentic Plus leads Extend 2.0 in the published ParseBench results, including tables, charts and visual grounding."
published: "2026-10-07"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Extend Parse vs LlamaParse: Parsing Accuracy and the Parse 2.1 Version Gap

LlamaParse Agentic Plus leads Extend 2.0 in the published ParseBench results, including tables, charts and visual grounding. Extend Parse 2.1 is a newer evaluation target, so the 2.0 result is evidence for the tested configuration rather than a measured 2.1 outcome. Use the benchmark advantage to shortlist LlamaParse, then test the versions you intend to deploy.

*Published by LlamaIndex. This is a complete evaluation guide, not an announcement of newly measured Parse 2.1 results.*

## Where LlamaParse performs better on ParseBench

| Configuration | Overall | Tables | Charts | Visual grounding |
| --- | --- | --- | --- | --- |
| LlamaParse Agentic Plus | 86.69 | 93.27 | 92.19 | 75.43 |
| LlamaParse Agentic | 82.83 | 90.90 | 81.20 | 69.42 |
| Extend (2.0) | 73.50 | 85.26 | 76.02 | 69.79 |

Agentic Plus leads Extend 2.0 by 13.19 points overall. Agentic also scores higher overall. This table does not measure Extend Parse 2.1; the version gap is why the production trial below still matters.

Scores are out of 100 in the pinned ParseBench snapshot (commit 0ccc167, November 2, 2026), checked for this revision on November 4. ParseBench measures document parsing across five dimensions, not schema extraction or the percentage of error-free documents. LlamaIndex develops LlamaParse and publishes this benchmark. [Pinned results](https://github.com/run-llama/ParseBench/blob/0ccc16783612a8ff37e77139f5e799510cde47b6/leaderboard.csv), [evaluation code and methodology](https://github.com/run-llama/ParseBench).

## Why does the version distinction matter?

Extend dates Parse Performance 2.1.0 to September 24, 2026, with updates to table and control-selection models and text formatting. The pinned ParseBench leaderboard labels the relevant Extend entry as 2.0. Those two facts do not establish whether 2.1 would improve, match or regress on that benchmark. [Extend version history](https://docs.extend.ai/model-versioning/parse/parse-performance), [pinned ParseBench snapshot](https://github.com/run-llama/ParseBench/blob/9e19b669adb72560c115419266dc6c7c80cf1216/leaderboard.csv).

Version mismatches are easy to miss because product names often stay constant while their internal processing changes. A comparison should record both the marketed product and the actual engine/version requested. If a service chooses a default automatically, record the effective configuration returned by the service where available.

## What should a parser evaluation measure?

Begin with the job the parsed output must perform. A retrieval application needs content that can be found and interpreted correctly. A document viewer needs evidence locations. An extraction pipeline needs the relationships required by its schema.

| Requirement | Example test |
| --- | --- |
| Reading order | Does a two-column page preserve the intended sequence? |
| Table structure | Do headers remain associated with the correct values? |
| Content fidelity | Are important numbers and symbols retained accurately? |
| Visual interpretation | Are chart labels and values represented usefully? |
| Evidence | Can an answer be traced to the relevant source region? |
| Downstream utility | Can a fixed application answer the required questions? |

Score these requirements separately. A parser can retain every number while losing its table header. An unfamiliar output format, meanwhile, may work perfectly well in the application.

## How should you construct the test set?

Use three groups. First, draw a representative sample from expected production documents. Second, create a challenge set for rare but expensive failures. Third, retain a holdout that is not used while tuning configurations.

Label the properties that matter: scan quality, language, table density, page count, column layout, handwriting and chart presence. Those labels make the results diagnosable. If performance differs, the team can identify whether the difference concerns one document family or the full workload.

Keep source files unchanged across systems. Record their hashes and preserve page rendering settings if the evaluation uses images. Document transformations can otherwise become a hidden source of variation.

The holdout should remain a genuine final check. Repeatedly looking at its failures and changing the configuration turns it into another development set, even if its filename still says “holdout.”

## Test the relationship between the period and the revenue figure

Consider a hypothetical quarterly report containing two adjacent tables. Both include a column named “Revenue,” but one reports current-period results and the other historical results. A downstream question asks for current-period revenue in Europe.

A text-only check might confirm that the requested number appears somewhere in the output. A stronger check verifies the relationship among the table title, period, region and value. An evidence check then asks whether the application can show where that relationship appears in the document.

This hypothetical fixture tests table meaning as well as content presence; it is not an observed failure by either vendor. Mark the expected period, region and value together in the answer key.

## How should downstream question-answering results be interpreted?

Downstream answers depend on the answering model as well as the parsed content. Hold the question set, prompt, model and scoring rules fixed when comparing parsers.

Extend's RealDoc-Bench launch reports a historical per-field QA result of 95.7 for Parse 2, compared with 92.1 for LlamaIndex Agentic and 91.1 for Reducto Agentic. Those are vendor-published, task-specific results; they are not whole-question accuracy or ParseBench scores. [RealDoc-Bench launch](https://www.extend.ai/resources/parse-2-and-realdocbench-launch), [evaluation repository](https://github.com/extend-hq/realdoc-bench).

A buyer should not average those figures with another benchmark. Instead, inspect which task resembles the intended application and use that task to design a current comparison.

## When does each product deserve consideration?

Extend deserves consideration for its layout-oriented parsing approach and its documented specialized processing. A fair evaluation should use its suitable current settings rather than a deliberately weak configuration. [Parse 2 architecture overview](https://www.extend.ai/resources/parse-2-and-realdocbench-launch).

For LlamaParse, use the same relationship checks and application questions. Show the failed answers as well as the aggregate score so the team can judge whether a difference matters to its workload.

## Before changing the production parser

Evaluate LlamaParse first on the strength of the tested ParseBench results, then include the actual Extend Parse 2.1 configuration in the private trial if it is the purchasing alternative. Keep historical 2.0 and current 2.1 results separately labeled. Do not transfer a published score from one release to another.
