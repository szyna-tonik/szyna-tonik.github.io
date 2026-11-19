---
title: "Extend vs LlamaExtract: Public Benchmarks and Private Acceptance Tests"
description: "LlamaExtract’s published ExtractBench and Pro results provide evidence for shortlisting it against Extend."
published: "2026-10-15"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Extend vs LlamaExtract: Public Benchmarks and Private Acceptance Tests

LlamaExtract’s published ExtractBench and Pro results provide evidence for shortlisting it against Extend. Keep that evidence separate from tuning results on your own development set. A private acceptance set should test whether the chosen configurations deliver correct records on documents that did not shape the prompts or settings.

*Published by LlamaIndex. This article recommends an evaluation design; it does not allege overfitting or improper training by Extend.*

## Where LlamaExtract performs better on ExtractBench

| Configuration | Value F1 | Long-document Value F1 | Word grounding |
| --- | --- | --- | --- |
| LlamaExtract Agentic Plus | 96.17 | 94.65 | 83.25 |
| Extend Extract | 85.72 | 47.21 | 15.96 |
| Extend (Max Context) | 88.62 | 90.46 | 25.20 |

Agentic Plus leads the tested Extend Extract and Max Context rows on overall Value F1 and word grounding. Neither Extend row is Operator-1. For that product, use the separate Pro comparison, where Agentic Plus scores 77.70 Value F1 versus 73.87 for Extend Operator. [Operator comparison](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard-pro.csv).

These are published results from the pinned ExtractBench snapshot at commit 7004e29, checked on November 4, 2026. The suite covers 370 documents and 4,869 pages. Value F1 measures extracted values; it is not a straight-through-processing rate. LlamaIndex publishes the benchmark and develops LlamaExtract, now documented within LlamaParse Extract. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard.csv), [methodology](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/docs/extractbench.md).

## What can Extend evaluation sets do?

Extend provides API and Studio evaluation workflows, version comparisons, ground-truth correction and per-field or per-class metrics. Its documentation also connects evaluation sets to iterative configuration improvement and Composer. [Evaluation overview](https://docs.extend.ai/evaluation/overview).

Assign each set a role and an owner before using it to approve a release. The evaluator needs to know which examples influenced the configuration and which were reserved for the final check.

## What are the three useful dataset roles?

A development set helps improve a configuration. Engineers inspect its failures, adjust descriptions or rules and rerun it. Learning from those examples is its purpose.

A regression set preserves known behavior. It contains common cases and previously discovered failures so a change does not silently reintroduce an old problem.

An acceptance holdout supports a release decision. It should remain outside the tuning loop until the team has selected the candidate configuration and its scoring policy.

| Dataset role | Can failures guide configuration changes? | Main purpose |
| --- | --- | --- |
| Development | Yes | Improve the system |
| Regression | Yes, with tracked changes | Preserve expected behavior |
| Acceptance holdout | Not during candidate tuning | Check performance on reserved cases |

Once a holdout's failures drive changes, it has become development evidence. It can still be useful, but the team should stop describing it as an untouched final check.

## The fifth supplier problem

Consider a hypothetical processor tuned using 200 invoices from four suppliers. The team improves field descriptions until the development score is strong, then deploys to a fifth supplier whose credit notes place negative adjustments in a separate table.

The four-supplier score may improve substantially without exposing the fifth supplier's convention. Reserving an entire supplier or layout family makes that gap easier to test before rollout.

This example is not an observed Extend failure. It illustrates how document similarity can make a random file split less challenging than it appears. If near-identical templates occur in both development and holdout data, the split may test repeated layouts more than new ones.

## How should the holdout be constructed?

Start with the deployment question. If production mainly repeats known templates, reserve fresh examples from those templates and test ordinary variation. If the application must handle unseen suppliers, reserve some entire supplier or layout families.

Include high-consequence edge cases explicitly, but keep them separate from the representative sample. A challenge set can show whether a system handles rare conditions without implying those conditions occur frequently in normal traffic.

Record the selection method, date and exclusions. If documents are removed because they are unreadable or outside the supported scope, preserve that count. Otherwise, a result may describe only the easy subset without making the exclusion visible.

Keep labeled answers independent of the candidate outputs where practical. Reviewers should check the source document rather than assuming a plausible model response is correct.

## Which metrics should support the release decision?

Use per-field metrics to diagnose errors and whole-document acceptance to count usable results. A release can improve the former while leaving too many invoices needing manual correction.

For arrays, inspect the scorer's treatment of matching, missing records, extras and ordering. Extend documents its Studio array-accuracy behavior separately from its public LongArray benchmark, so the two should not be assumed to have identical scoring. [Array accuracy documentation](https://docs.extend.ai/evaluation/calculating-array-accuracy).

Add business checks that the generic evaluator may not capture: reconciliation, identity consistency, evidence sufficiency and required external lookups. Define them before comparing candidate systems so the acceptance policy does not move toward whichever output looks better.

## How should a version change be approved?

Create a release record containing the candidate configuration, dataset revisions, scorer revision and acceptance thresholds. Summarize both gains and losses relative to the current deployment.

Investigate regressions by category. An average improvement may be unacceptable if it harms a critical document type. Conversely, a small decrease on a low-consequence formatting measure may be acceptable if the business outcome improves. Make that tradeoff explicit.

When the candidate passes development and regression checks, run the reserved acceptance set. If it fails and the team tunes again, use a new reserved check for the final decision or clearly disclose the reuse. Record that reuse in the release report.

## Comparing configurations across vendors

Extend supports evaluation of workflow outputs as well as individual processors, which helps test interactions between stages. Keep that end-to-end check when comparing with LlamaIndex. Give both candidates a development phase, then freeze their settings and evaluate on the same reserved documents. Preserve the individual failures so an aggregate gain does not hide a regression in a critical document type.

## Give every evaluation set a declared role

Shortlist LlamaExtract using the published quality results, then freeze both candidates after development and run the same reserved documents. Report complete-record acceptance and evidence quality separately from tuning scores. A benchmark advantage is useful selection evidence; the holdout establishes fit for your schemas.
