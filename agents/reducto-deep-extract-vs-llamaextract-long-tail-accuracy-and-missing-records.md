---
title: "Reducto Deep Extract vs LlamaExtract: Long-Tail Accuracy and Missing Records"
description: "LlamaExtract Agentic Plus has higher Value F1 and many more perfect documents than Reducto Deep in the pinned ExtractBench Pro results."
published: "2026-09-18"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Reducto Deep Extract vs LlamaExtract: Long-Tail Accuracy and Missing Records

LlamaExtract Agentic Plus has higher Value F1 and many more perfect documents than Reducto Deep in the pinned ExtractBench Pro results. On standard ExtractBench, their overall value scores are much closer. That contrast matters for buyers whose expensive failures come from unusual documents, missing records and cross-page dependencies rather than ordinary forms.

## Where LlamaExtract performs better on ExtractBench

| Configuration | Value F1 | Long-document Value F1 | Word grounding |
| --- | --- | --- | --- |
| LlamaExtract Agentic Plus | 96.17 | 94.65 | 83.25 |
| Reducto Deep Extract | 96.08 | 92.85 | 50.76 |

Standard ExtractBench Value F1 is close: 96.17 versus 96.08, only 0.09 points. That small average difference alone is a weak reason to choose a vendor; the grounding and long-tail results are more useful distinctions.

These are published results from the pinned ExtractBench snapshot at commit 7004e29, checked on November 4, 2026. The suite covers 370 documents and 4,869 pages. Value F1 measures extracted values; it is not a straight-through-processing rate. LlamaIndex publishes the benchmark and develops LlamaExtract, now documented within LlamaParse Extract. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard.csv), [methodology](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/docs/extractbench.md).

## Where LlamaExtract performs better on difficult documents

| Configuration | Value F1 | Perfect documents (%) | Box-word grounding | Page grounding |
| --- | --- | --- | --- | --- |
| LlamaExtract Agentic Plus | 77.70 | 38.00 | 60.39 | 66.01 |
| Reducto Deep | 56.35 | 3.00 | 42.20 | 62.38 |

On Pro, Agentic Plus leads by 21.35 Value F1 points and 35 percentage points in perfect documents. That is a concrete long-tail advantage. It is not a measured missing-row recovery rate for the synthetic bank-statement fixture below.

This is the pinned ExtractBench Pro snapshot at commit 7004e29, checked on November 4, 2026, with the 30-minute limit applied. Value results cover 100 synthetic long-tail documents; grounding uses an 81-document subset. Perfect documents means 100% Value F1 on the benchmark, not approval for an external business action. LlamaIndex publishes Pro and develops LlamaExtract. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard-pro.csv), [methodology](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/docs/extractbench-pro.md).

## The boundary of Deep Extract’s verification loop

Reducto Deep Extract uses an iterative verification process that can revise extracted output against instructions such as row counts and totals. Its documentation also identifies a boundary: the loop can verify only information available in the parsed representation. Information absent from Parse is outside that loop's view. This is a documented architectural constraint, not evidence that omissions occur frequently. [Deep Extract documentation](https://docs.reducto.ai/configs/extract/deep-extract)

The model versions must also be explicit. The reviewed registry identifies Deep Extract v3 as default and v4 as alpha, separately from standard Extract. Enabling Deep Extract overrides the standard extraction-model selection. A comparison should name the selected Deep Extract version rather than describing every extraction run as the same product. [Reducto model versions](https://docs.reducto.ai/reference/model-versions)

Inspect the handoff between the source pages, parsed content and extracted records. Looking only at the final JSON can leave the cause of an omission hidden.

## Where the expected total comes from matters

Reconciliation checks relationships among values. Its strength depends on where the expected relationship comes from. Summing extracted line items and comparing that sum with an independently verified source total is stronger than comparing two totals generated from the same incomplete record set.

A self-consistent output may still be incomplete if all of its checks share the same missing information. Conversely, a mismatch can be valuable: it tells the workflow to stop, investigate or request review. The objective should be reliable acceptance decisions, not forcing every document to produce a confident answer.

Design checks with independent evidence wherever possible. Source page counts, labeled record identifiers, externally supplied transaction counts and human-verified totals can each reveal a different class of omission.

## Build a source inventory

Use a labeled source inventory. Each required item needs a stable identifier, a source location and its expected output representation. For a statement, the inventory might include transactions, opening and closing balances, fees and continuation-page records.

| Measure | Question it answers |
| --- | --- |
| Item recall | Did all required source records appear? |
| Field correctness | Are values correct within recovered records? |
| Duplicate handling | Were repeated records preserved or incorrectly added? |
| Evidence coverage | Can each accepted record be traced to the source? |
| Document acceptance | Did the workflow correctly accept or escalate the file? |

Keep document completion coverage separate. A system that declines a difficult statement should not receive the same interpretation as one that returns an incomplete statement without a warning. The former creates review work; the latter can let an incomplete record proceed.

## A synthetic five-row omission

In a synthetic test fixture, a six-page statement contains 120 transactions. A labeled fixture records all 120 transaction IDs. To demonstrate the evaluation method, deliberately remove a block of five transactions from an intermediate representation. This is a synthetic fault injection, not an observed Reducto or LlamaExtract failure.

An extractor operating on that altered representation may produce 115 well-formed records. Every amount it returns could be correct. A field-accuracy calculation over only those returned records could look excellent while the record inventory exposes the omission immediately.

Now add an independently verified closing balance and fee total. The workflow should check whether the extracted transactions reconcile to those source facts. If they do not, the correct result is an exception requiring investigation. If they happen to reconcile because offsetting entries were removed, the independent transaction inventory still detects the missing records.

Keep synthetic fault-injection results separate from runs on unmodified documents. Preserve raw outputs in both, so a deliberately removed block cannot be mistaken for a vendor error.

## Keep the test independent of prompt tuning

Use the same source documents, field definitions and acceptance rules. Give each system the information it would receive in production. If the schema includes an expected row count, disclose where that count came from and provide it consistently.

Include long tables, repeated transactions, continuation rows and irrelevant appendices. Choose them because they represent the workload, not because they were selected after one vendor failed. Freeze the test set before tuning prompts on a separate development set.

For each run, preserve the source, request, model configuration, raw output and validation report. Review omissions at the stage where they arise. A wrong final value may result from parsing, extraction, normalization or application logic; a useful report distinguishes these causes.

## Decide what happens when the checks disagree

Deep Extract already supports iterative checking and re-extraction on complex documents. The existence of a verification loop is therefore a poor basis for claiming that LlamaIndex is different. The useful comparison is what each workflow does when the records, totals and source coverage disagree.

A correct escalation can protect an application, but it still consumes review time. Report it separately from an incomplete output that was accepted without warning. The operating policy should explain which files proceed automatically, which receive another processing step and which go to a person.

Start the difficult-document trial with LlamaExtract Agentic Plus, whose Pro value accuracy and perfect-document rate provide the stronger long-tail evidence. Keep the near-tie on standard ExtractBench visible. Test the independently labeled missing-record fixtures separately before claiming recovery-rate superiority.
