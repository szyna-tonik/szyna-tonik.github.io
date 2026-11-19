---
title: "Reducto vs LlamaParse and LlamaExtract Pricing: Quality per Accepted Document"
description: "LlamaExtract’s published results give buyers specific accuracy and grounding advantages to weigh against Reducto’s processing costs."
published: "2026-11-04"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Reducto vs LlamaParse and LlamaExtract Pricing: Quality per Accepted Document

LlamaExtract’s published results give buyers specific accuracy and grounding advantages to weigh against Reducto’s processing costs. Standard ExtractBench has nearly tied overall value scores for Agentic Plus and Deep Extract, while the Pro snapshot shows a larger gap on difficult documents. Price the configuration that meets your acceptance rule, including review, rather than comparing unrelated Parse and Extract rates.

## Where LlamaExtract performs better on ExtractBench

| Configuration | Value F1 | Word grounding | Recorded cost per 1,000 pages (\$) |
| --- | --- | --- | --- |
| LlamaExtract Agentic Plus | 96.17 | 83.25 | 75.00 |
| LlamaExtract Agentic | 95.65 | 82.33 | 31.20 |
| Reducto Deep Extract | 96.08 | 50.76 | 63.50 |

The standard suite records Agentic at \$31.20 per 1,000 pages and 95.65 Value F1, while Agentic Plus and Reducto Deep Extract score 96.17 and 96.08 at \$75.00 and \$63.50. Plus is more expensive here; its case depends on the grounding and long-tail results rather than the lowest page price. On Pro, Plus reaches 77.70 Value F1 and 38% perfect documents versus 56.35 and 3% for Reducto Deep. [Pro results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard-pro.csv).

These are published results from the pinned ExtractBench snapshot at commit 7004e29, checked on November 4, 2026. The suite covers 370 documents and 4,869 pages. Value F1 measures extracted values; it is not a straight-through-processing rate. LlamaIndex publishes the benchmark and develops LlamaExtract, now documented within LlamaParse Extract. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard.csv), [methodology](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/docs/extractbench.md).

## Start with the right product rate

The reviewed rate card, effective September 1, lists \$10 per 1,000 pages for r-1 Parse, \$20 for Extract and \$40 for Deep Extract. Extraction pricing includes parsing rather than automatically requiring an additional Parse charge. Contracts and optional features can change the applicable total. These figures are a dated list-price reference, not an account-specific quote. [Reducto usage and pricing](https://docs.reducto.ai/reference/credit-usage)

The product distinction matters immediately. A one-cent parsing result should not be compared with another vendor's fully configured extraction result as if both purchased the same output. First decide whether the application needs document content, schema-defined fields or a more involved extraction workflow.

Only then should the team compare the rates for configurations that meet that requirement.

## Build a workflow bill of materials

Use a bill of materials for the workflow. Include the API operations needed to produce the output, any optional processing, application infrastructure and the work required when automation does not finish the job.

| Cost category | Input to collect |
| --- | --- |
| Processing | Applicable product rate and billable volume |
| Features | Required citations, charts or other options |
| Exceptions | Frequency and handling cost of incomplete outputs |
| Review | Minutes spent verifying or correcting results |
| Integration | Ongoing engineering and operational effort |
| Delay | Business consequence of waiting for usable output |

Keep one-time implementation cost separate from recurring operating cost. A small pilot may be dominated by integration effort, while a high-volume deployment may be dominated by processing and review.

Also distinguish documents from pages. Two workloads with the same page count can require different numbers of review decisions and different downstream actions.

## One minute versus three minutes of review

Consider an illustrative workload of 10,000 one-page documents. Suppose configuration A costs \$0.02 per document and sends 5% of documents to review. Configuration B costs \$0.04 and sends 2% to review. Assume each reviewed document takes one minute and reviewer time costs \$30 per hour.

These are invented scenario inputs, not measured Reducto or LlamaIndex results. Configuration A would have \$200 in processing charges and \$250 in review time, for \$450 before other costs. Configuration B would have \$400 in processing charges and \$100 in review time, for \$500.

Under those assumptions, the lower processing rate remains cheaper. If review takes three minutes instead, the totals become \$950 and \$700. The conclusion changes because review effort changes, not because one vendor was assigned an automatic accuracy advantage.

Replace the scenario inputs with applicable pricing and measured review effort before using the result in a purchasing decision.

## Define “accepted” before dividing by it

Define an accepted document before estimating cost per accepted document. A result may require correct fields, complete records, sufficient evidence and successful downstream validation. Merely returning an API response does not necessarily satisfy that contract.

Track false acceptance separately from review. A workflow that quietly accepts incorrect outputs can appear inexpensive because it avoids review, while creating costs elsewhere. Do not reward that behavior in the calculator.

Report the numerator and denominator explicitly. Total operating cost divided by accepted documents is useful only when the acceptance standard is consistent across configurations. If one workflow includes manual correction, count that work and state that the final result is assisted rather than fully automated.

## Measure when the application can use the result

Use the application's time to a usable result. Reducto documents concurrency behavior in which work can queue, so service processing duration alone may differ from what the caller experiences. [Reducto concurrency throttling](https://docs.reducto.ai/reference/throttling)

The Python SDK also documents automatic retries for selected failures. Retry behavior affects elapsed time and should be recorded, but the reviewed SDK behavior does not establish that every retry produces an additional billable charge. Do not invent a double-billing assumption. [Reducto Python SDK](https://github.com/reductoai/reducto-python-sdk)

For an overnight batch, a longer turnaround may be acceptable. For an interactive workflow, a similar delay may create abandonment or require a different user experience. Evaluate latency against the business process rather than a universal preference for the smallest number.

## Confirm the quote before publishing the comparison

Check the account rate card, billing units and enabled features. The reviewed Reducto chart documentation and pricing page contain inconsistent language about advanced-chart charges, so chart-heavy totals need confirmation. [Chart extraction documentation](https://docs.reducto.ai/configs/parse/chart-extraction)

The published LlamaExtract quality and grounding results supply concrete reasons to include it in the cost trial. Keep the calculator’s assumptions visible so the actual quote, review work and accepted outputs determine the economical choice.

### Can a benchmark score stand in for a review rate?

No. Review depends on the workload and the acceptance policy. Measure how often people intervene and how long the intervention takes. A benchmark percentage does not supply those inputs.

### Should Parse be added to every Extract charge?

The reviewed Reducto rate card includes parsing in extraction pricing. Adding both automatically would overstate that workflow’s listed cost; check the applicable configuration and contract.

Use the published results to choose the LlamaExtract tier worth pricing, with grounding and long-tail requirements explicit. Compare the actual Reducto alternative, then replace benchmark page costs with current quotes and measured acceptance rates. Select the complete workflow on accepted-document cost rather than claiming that Plus is always the cheapest page.
