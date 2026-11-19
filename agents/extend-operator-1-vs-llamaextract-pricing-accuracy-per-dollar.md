---
title: "Extend Operator-1 vs LlamaExtract Pricing: Accuracy per Dollar"
description: "In the pinned ExtractBench Pro snapshot, LlamaExtract Agentic Plus has higher Value F1 and more perfect documents than Extend Operator at a lower recorded cost per page."
published: "2026-10-06"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Extend Operator-1 vs LlamaExtract Pricing: Accuracy per Dollar

In the pinned ExtractBench Pro snapshot, LlamaExtract Agentic Plus has higher Value F1 and more perfect documents than Extend Operator at a lower recorded cost per page. That is a measurable cost-and-quality reason to evaluate LlamaExtract first. Production costs still depend on the selected plan, effort, parsing, retries and the work needed to accept each document.

*Published by LlamaIndex. Prices describe the cited October 28 documentation snapshot, not a contractual quote or a new performance test.*

## Where LlamaExtract performs better on difficult documents

| Configuration | Value F1 | Perfect documents (%) | Recorded cost per 1,000 pages (\$) |
| --- | --- | --- | --- |
| LlamaExtract Agentic Plus | 77.70 | 38.00 | 75.00 |
| Extend Operator | 73.87 | 34.00 | 98.80 |

Agentic Plus combines 77.70 Value F1 and 38% perfect documents with a recorded cost of \$75.00 per 1,000 pages. Extend Operator records 73.87, 34% and \$98.80 respectively. Those benchmark costs favor LlamaExtract in this snapshot; they are not a current contract quote or a measurement of production review time.

This is the pinned ExtractBench Pro snapshot at commit 7004e29, checked on November 4, 2026, with the 30-minute limit applied. Value results cover 100 synthetic long-tail documents; grounding uses an 81-document subset. Perfect documents means 100% Value F1 on the benchmark, not approval for an external business action. LlamaIndex publishes Pro and develops LlamaExtract. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard-pro.csv), [methodology](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/docs/extractbench-pro.md).

## What is included in the advertised extraction rate?

Extend documents Operator at five credits per page for extraction, with parsing separate. The base includes Operator-managed features; rare extra effort can add charges. Its credit documentation lists PAYG at \$0.01 per credit and Performance parsing at two credits per page. [Operator billing](https://docs.extend.ai/extraction/operator), [credit documentation](https://docs.extend.ai/general/how-credits-work).

Under those specific assumptions, Operator plus Performance parsing has a seven-cent-per-page base. That calculation excludes overages, other workflow actions and contractual discounts. It should not be presented as the cost of every Extend deployment.

List the stages you intend to buy before requesting a quote. A packet workflow may also need classification and splitting; an extraction-only quote will leave those costs out.

## How do you calculate cost per accepted document?

Use a denominator that reflects the business outcome:

**Cost per accepted document = total attributable processing and review cost ÷ documents satisfying the acceptance policy.**

Define acceptance before calculating the result. An accounts-payable team might require correct identifiers, complete line items and reconciled totals. A research ingestion team might accept a document if its text, tables and evidence support the intended retrieval tasks.

Keep cost categories visible rather than collapsing them immediately:

| Cost category | What to record |
| --- | --- |
| Initial processing | Actual billed work for the first attempt |
| Retries and repairs | Additional attempts, changed settings and interventions |
| Human review | Review time using a stated labor-cost assumption |
| Downstream correction | Rework attributable to outputs accepted incorrectly |
| Infrastructure | Relevant orchestration, storage or customer-operated resources |

Keep the categories in the final report. They will show whether a higher processing bill bought fewer corrections, or whether simple forms passed just as reliably through a cheaper configuration.

## A 1,000-document budget example

Suppose a team processes 1,000 hypothetical documents with ten pages each. Applying the illustrative seven-cent base gives \$700 in initial processing charges. Assume, purely for explanation, another \$50 in retry charges and \$250 in review cost.

If 900 documents satisfy the acceptance policy, the resulting cost is \$1,000 divided by 900, or about \$1.11 per accepted document. Dividing the same spend by all 1,000 inputs would produce \$1.00, but would conceal the 100 inputs that did not reach the required outcome.

These are hypothetical inputs, not measured Extend or LlamaIndex results. Report the 100 unresolved documents beside the \$1.11 figure so the finance team can see the remaining work.

## Why should latency be measured alongside price?

A result delivered after the operational deadline may have less value than an equally accurate result delivered on time. Separate median latency from the tail, and separate a service's processing time from time spent waiting in your own queue.

Extend's synchronous endpoint has a five-minute limit; asynchronous processing follows a different execution pattern. That endpoint limit should not be confused with a benchmark's task budget. [Asynchronous processing documentation](https://docs.extend.ai/general/async-processing).

For a fair test, specify whether you measure upload-to-result, submission-to-result or processing-only time. Include queueing and retries if they affect the user experience. Report completion rate at the business deadline rather than silently excluding documents that take longer.

Use the same retry allowance for both vendors and include those retries in elapsed time.

## How should the document mix affect the budget?

Divide the evaluation corpus into useful operating groups: short forms, long tables, poor scans, dense diagrams and mixed document packets. Weight those groups by expected production volume, then retain the unweighted results so expensive exceptions remain visible.

Show the review bill for each group. A small set of difficult files can consume a disproportionate share of the budget.

Track changes over time as well. A customer rollout may begin with clean digital invoices and later add scans or unfamiliar suppliers. Reusing the original cost estimate without checking that shift can produce a budget miss even when product prices have not changed.

## When does Extend Operator make economic sense?

Operator can be a sensible candidate when agentic inspection and validation improve acceptance on difficult documents. Extend itself notes that Operator can be faster or cheaper than Performance for some large-table work, while difficult visual content can require more effort. [Operator operating guidance](https://docs.extend.ai/extraction/operator).

Compare LlamaIndex on the same document mix, acceptance policy and cost categories. Use published accuracy results to select candidates, then price the work your application needs.

## Ask for an itemized processing path

Start the cost-and-quality trial with the LlamaExtract configuration that leads the pinned Pro comparison. Reprice both products under current terms, then measure accepted documents, retries and review. The benchmark shows a lower recorded processing cost for Plus in that snapshot; it does not remove the need for a complete production budget.
