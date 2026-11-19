---
title: "Extend Operator-1 vs LlamaExtract: Higher Value F1 and More Perfect Documents"
description: "LlamaExtract Agentic Plus leads Extend Operator on Value F1 and perfect-document rate in the pinned ExtractBench Pro results."
published: "2026-09-11"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Extend Operator-1 vs LlamaExtract: Higher Value F1 and More Perfect Documents

LlamaExtract Agentic Plus leads Extend Operator on Value F1 and perfect-document rate in the pinned ExtractBench Pro results. It also leads on localized box-word grounding, while Extend leads on page grounding. Buyers prioritizing complete, correct records have a concrete reason to evaluate LlamaExtract first, with the evidence trade-off visible beside the advantage.

*Publisher disclosure: LlamaIndex develops products evaluated here and created ExtractBench. This article interprets published results; it does not report a new customer-workload test.*

## What does the published comparison show?

The pinned leaderboard reports these results under its 30-minute policy:

| Measure | LlamaExtract Agentic Plus | Extend Operator |
| --- | --- | --- |
| Value F1 | 77.70 | 73.87 |
| Perfect documents | 38% | 34% |
| Box-word grounding | 60.39 | 57.75 |
| Page grounding | 66.01 | 68.84 |

Read each column against the work it measures. Value F1 evaluates extracted content. Perfect-document rate counts documents achieving complete value accuracy under the benchmark. Page grounding and box-word grounding assess different levels of supporting evidence. The comparison uses 100 synthetic documents for value results and an 81-document grounding subset; timeout and failure handling also affect the result. [Pinned leaderboard](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard-pro.csv), [benchmark methodology](https://github.com/run-llama/ExtractBench/blob/main/docs/extractbench-pro.md).

A higher average field score can still leave many documents needing review. Likewise, a correct page citation may send a reviewer to a dense page without identifying the relevant passage.

## Why does whole-document success matter?

Consider a hypothetical invoice workflow that exports a supplier, invoice number, currency, tax, total and every line item. If five header fields are correct but one line item is assigned to the wrong cost center, the document may still require intervention.

The accounting team needs to know how many invoices can proceed safely. Set an acceptance rule for the whole invoice: required values present, no unexpected records, totals reconciled and evidence available for exceptions.

Perfect-document rate gets closer to that unit of work. Even a benchmark-perfect extraction may still need an external vendor lookup or duplicate-payment check before payment.

## Where does Extend perform well?

The same Pro snapshot gives Extend the higher overall page-grounding result. It also reports stronger document-convention results: 99.64 Value F1 for Extend versus 97.45 for Plus, with perfect-document rates of 27.27% and 22.73%, respectively. Category results should be read with their sample sizes rather than generalized to every document family. [Published category results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard-pro.csv).

Operator-1 can inspect documents, search, execute code and validate results. Those agentic capabilities make it a relevant comparator for difficult extraction. [Operator-1 introduction](https://www.extend.ai/resources/introducing-operator-1).

Extend’s document-convention result is a relevant exception to LlamaExtract’s overall Pro lead. Keep it visible when the private workload is dominated by that category; the overall and category results answer different questions.

## Build a comparison around the invoices you need to accept

Start with a representative sample, then add a separate challenge set. The representative sample estimates everyday performance. The challenge set tests expensive failure modes such as cross-page records, repeated values, unusual conventions and ambiguous evidence.

Keep the same schema and acceptance rules across systems. Record product versions, parser settings, extraction settings, document hashes, time limits and retry policies. Separate an initial unsuccessful run from any repaired result. If human changes are allowed, report their time and cost.

Evaluate at three levels:

1. **Fields:** Which values are wrong, missing or unexpectedly added?
2. **Documents:** Which files satisfy every required acceptance condition?
3. **Operations:** Which accepted outputs arrive within the workload's time and cost constraints?

Report evidence quality separately. A reviewer who must search a long page for the right number has a different experience from one shown the exact supporting text. Measure that experience rather than assuming every citation is equally helpful.

## When is LlamaIndex the stronger starting point?

For buyers prioritizing the tested combination of hard-document value accuracy, complete extractions and box-word evidence, the published Pro results provide a concrete reason to evaluate LlamaExtract Agentic Plus first. They do not establish that it wins on every form, language or customer schema.

Retain Extend in a convention-heavy or page-evidence trial while using LlamaExtract’s overall value and perfect-document advantages as the shortlist evidence. Keep the tested names attached to the results: older Extend Extract and Max Context rows cannot stand in for Operator-1.

## Start with the documents that still need manual correction

For difficult extraction where value accuracy, complete documents and localized evidence matter, evaluate LlamaExtract Agentic Plus first: the pinned Pro results support that choice. Retain Extend’s page-grounding and document-convention strengths in the comparison, then measure corrections and accepted documents on the schema you will deploy.
