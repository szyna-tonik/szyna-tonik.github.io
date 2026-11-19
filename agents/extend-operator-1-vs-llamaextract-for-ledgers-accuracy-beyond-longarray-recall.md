---
title: "Extend Operator-1 vs LlamaExtract for Ledgers: Accuracy Beyond LongArray Recall"
description: "LlamaExtract Agentic Plus leads Extend Operator on Value F1 and perfect-document rate in ExtractBench Pro."
published: "2026-09-13"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Extend Operator-1 vs LlamaExtract for Ledgers: Accuracy Beyond LongArray Recall

LlamaExtract Agentic Plus leads Extend Operator on Value F1 and perfect-document rate in ExtractBench Pro. Those results give ledger buyers a more useful comparison than presenting Extend’s reported 99.3% LongArray score alone. LongArray tests long-list recovery under a different scorer; a production ledger also needs correct record identity, no extra rows and reconciled totals.

*Published by LlamaIndex.*

## Where LlamaExtract performs better on difficult documents

| Configuration | Value F1 | Perfect documents (%) | Box-word grounding | Page grounding |
| --- | --- | --- | --- | --- |
| LlamaExtract Agentic Plus | 77.70 | 38.00 | 60.39 | 66.01 |
| Extend Operator | 73.87 | 34.00 | 57.75 | 68.84 |

Agentic Plus leads by 3.83 Value F1 points, 4 percentage points in perfect documents and 2.64 points in box-word grounding. Extend leads page grounding by 2.83 points. This supports an accuracy-and-localized-evidence case for LlamaExtract, without claiming lower review cost or a LongArray win.

This is the pinned ExtractBench Pro snapshot at commit 7004e29, checked on November 4, 2026, with the 30-minute limit applied. Value results cover 100 synthetic long-tail documents; grounding uses an 81-document subset. Perfect documents means 100% Value F1 on the benchmark, not approval for an external business action. LlamaIndex publishes Pro and develops LlamaExtract. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard-pro.csv), [methodology](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/docs/extractbench-pro.md).

## What does LongArray measure?

LongArray-Extract contains 45 synthetic documents with 29,328 ground-truth rows across clinical, financial and legal examples. Its canonical scoring matches predicted and expected records, then measures correct data points against expected data points. The dataset documentation explicitly recommends comparing predicted record counts with target counts because accuracy alone does not penalize extra rows. [LongArray dataset and scoring](https://huggingface.co/datasets/Extend-AI/LongArray-Extract).

Extend's Operator-1 launch reports 99.3% on LongArray. That result should be read with the benchmark's definition rather than converted into a claim that 99.3% of documents are ready for automatic posting. [Operator-1 benchmark announcement](https://www.extend.ai/resources/introducing-operator-1).

For a ledger, recovered data points are only part of acceptance. Every returned transaction must also belong in the output, including legitimate repeated transactions.

## How can high recall coexist with an unusable ledger?

Imagine a hypothetical bank statement with 100 transactions. Each transaction contains a date, description and amount. A system returns all 100 records correctly, then appends ten duplicates.

Every expected transaction is present. A recall-oriented measure can remain perfect, but the output has 110 records. If downstream software sums every returned amount, the extra entries can change the result.

| Hypothetical output | Expected records recovered | Extra records | Record precision | Record recall |
| --- | --- | --- | --- | --- |
| A | 100 | 0 | 100% | 100% |
| B | 100 | 10 | 90.9% | 100% |

This simplified table treats each row as an exact record and uses ordinary record-level precision and recall. It is not a recreation of every detail in LongArray's data-point scorer. Its purpose is to show why a denominator based only on expected content cannot fully describe over-extraction.

Run the reverse case too: remove ten valid transactions. The remaining rows may all be correct even though the statement is incomplete.

## Which four checks should ledger extraction include?

### Are the values correct?

Compare important fields against labeled answers. Decide in advance how to handle date formats, whitespace, currency symbols and numerical rounding. A formatting difference may be harmless, while a changed sign can be financially significant.

Use field-specific rules. Treating every string difference as equally important obscures the difference between a shortened description and an incorrect amount.

### Are the record counts plausible?

Compare extracted counts with expected counts where available. When the document provides a transaction count, extract it independently and reconcile it with the returned list. When it does not, preserve a labeled count in the evaluation set.

A matching count is helpful but insufficient. One missing row and one extra row can cancel each other numerically. Count checks must accompany content matching.

### Which repeated records are legitimate?

Choose a record identity that reflects the workflow. A date and amount may be insufficient because two legitimate transactions can share them. A reference number may be missing or reused.

A useful evaluator distinguishes exact duplicates, legitimate repeated entries and uncertain matches. Automatically deleting every repeated value can create a new data-loss problem while appearing to repair over-extraction.

### Do the totals reconcile?

Compare opening balance, closing balance and signed movements where the statement supports that relationship. For invoices, compare line totals, taxes and stated totals using the document's rounding rules.

Keep the field and record checks even when the balance reconciles: two errors can offset each other.

## How should this change an Extend-versus-LlamaIndex evaluation?

Use a common acceptance contract for both systems. Specify which fields are required, which records belong in the output and which arithmetic relationships must hold. Then report field accuracy, record precision, record recall and accepted-document rate separately.

Include difficult examples deliberately: tables crossing page boundaries, repeated headers, subtotal lines, adjustments, canceled entries and inconsistent identifiers. Explain whether a subtotal should be a record or contextual information. Otherwise, systems may produce different outputs because the schema itself is ambiguous.

Apply the contract unchanged to LlamaIndex. If either system misses an adjustment or adds a subtotal as a transaction, preserve the output and show how the acceptance rule caught it. That gives the comparison something a headline score lacks: an auditable explanation of which records are usable.

## Where LongArray helps

LlamaExtract’s Pro results provide a direct product comparison that the standalone LongArray headline does not. LongArray’s disclosed scorer remains useful for designing repeated-record fixtures, provided the acceptance test also checks extra rows and document-level correctness.

LongArray gives teams a demanding recovery test with explicit scoring rules. Use it for that purpose, then add the acceptance checks for your own ledger.

## Add a reconciliation specification to the evaluation

Use LlamaExtract Agentic Plus’s Pro advantage as the starting evidence for the extraction trial, then check the workflow-specific requirement discussed above on a private labeled set. Preserve Extend’s higher page-grounding score. Do not translate a benchmark score into a production acceptance or review-savings claim.
