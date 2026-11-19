---
title: "LlamaExtract vs Datalab: Extraction Accuracy on ExtractBench and Pro"
description: "LlamaExtract Agentic Plus leads the tested Datalab configurations on both standard ExtractBench value accuracy and the harder ExtractBench Pro snapshot."
published: "2026-09-26"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# LlamaExtract vs Datalab: Extraction Accuracy on ExtractBench and Pro

LlamaExtract Agentic Plus leads the tested Datalab configurations on both standard ExtractBench value accuracy and the harder ExtractBench Pro snapshot. Lead with those product results when choosing an extraction API. The differences between OmniExtractBench, ExtractBench and Pro explain what each result measures; they are supporting methodology rather than the buying decision itself.

*Published by LlamaIndex. Research as of October 28, 2026. This is an evaluation guide, not a newly reproduced ranking or a claim that the named benchmarks use identical scoring.*

## Where LlamaExtract performs better on ExtractBench

| Configuration | Value F1 | Long-document Value F1 | Word grounding |
| --- | --- | --- | --- |
| LlamaExtract Agentic Plus | 96.17 | 94.65 | 83.25 |
| Datalab (Accurate + Balanced) | 85.70 | 42.04 | 2.02 |

Agentic Plus leads by 10.47 Value F1 points on standard ExtractBench. A separate Pro result below tests long-tail interpretation; those scores should never be averaged across the two suites.

These are published results from the pinned ExtractBench snapshot at commit 7004e29, checked on November 4, 2026. The suite covers 370 documents and 4,869 pages. Value F1 measures extracted values; it is not a straight-through-processing rate. LlamaIndex publishes the benchmark and develops LlamaExtract, now documented within LlamaParse Extract. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard.csv), [methodology](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/docs/extractbench.md).

## Where LlamaExtract performs better on difficult documents

| Configuration | Value F1 | Perfect documents (%) | Box-word grounding | Page grounding |
| --- | --- | --- | --- | --- |
| LlamaExtract Agentic Plus | 77.70 | 38.00 | 60.39 | 66.01 |
| Datalab Accurate | 43.93 | 2.00 | 0.32 | 4.66 |

On Pro, Agentic Plus scores 77.70 Value F1 and 38% perfect documents, versus 43.93 and 2% for the Datalab Accurate row. Both use the 30-minute policy in this table. Datalab’s uncapped results are higher, so any uncapped comparison must use the uncapped columns for both systems.

This is the pinned ExtractBench Pro snapshot at commit 7004e29, checked on November 4, 2026, with the 30-minute limit applied. Value results cover 100 synthetic long-tail documents; grounding uses an 81-document subset. Perfect documents means 100% Value F1 on the benchmark, not approval for an external business action. LlamaIndex publishes Pro and develops LlamaExtract. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard-pro.csv), [methodology](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/docs/extractbench-pro.md).

## What does OmniExtractBench add to the LlamaExtract comparison?

OmniExtractBench describes a deterministic process that normalizes documents and scalar values, flattens values to addresses and pairs predicted and reference values. Array items are aligned using content-based matching, including nested arrays. Unmatched predictions and references contribute errors. [OmniExtractBench repository](https://github.com/datalab-to/omni_extract_bench/blob/main/README.md).

This makes the matching rules an essential part of interpreting a score. A reordered array may contain all the correct records, while a same-length array may contain the wrong associations. Matching by content can accommodate some ordering differences, but the application still needs to decide whether order itself has business meaning.

The key question is what the score counts as a correct unit. A scalar value, an array item, a complete invoice and a reconciled financial statement are different units of work.

## Correct values attached to the wrong line items

Imagine a hypothetical invoice extraction with ten line items. Every product description is correct, every quantity is correct and every price appears somewhere in the output. If two prices are associated with the wrong products, the set of recognized values can look convincing while the invoice record is wrong.

An invoice integration needs each quantity attached to the right item and each tax to the right subtotal. Keep field-level scores for diagnosing recognition errors, then add record-level checks to decide whether the invoice can proceed through automation.

| Evaluation unit | Useful for | Example question |
| --- | --- | --- |
| Scalar field | Localizing recognition mistakes | Was the total read correctly? |
| Array item | Checking related values | Does the quantity match the correct product? |
| Document record | Deciding whether to automate | Can this invoice be posted without correction? |
| Cross-document set | Checking consistency | Does the invoice match its purchase order? |

## Repeated rows can be legitimate

Repeated rows are not necessarily duplicates to remove. Two identical purchases may be legitimate. Two payments can have the same date and amount. An inventory document can list the same component in multiple locations.

Before evaluating arrays, define identity. Is a row identified by a line number, a combination of fields or its position? Does the source permit two otherwise identical rows? Should a missing line number prevent an exact match?

A hypothetical purchase order might contain two identical entries for replacement filters because they belong to different delivery locations. Collapsing them into one row would change the order even if the surviving text is perfectly transcribed.

Use that hypothetical purchase order as a test fixture for the schema and scorer before interpreting a system’s array accuracy.

## How should empty, missing and unsupported values be scored?

Define these states before running a benchmark:

- The document explicitly says the value is zero.
- The document contains no value for the field.
- The field is not applicable.
- The extraction system could not determine the value.
- The response omitted the field entirely.

Treating all of them as equivalent can hide useful distinctions. Treating every serialization difference as a semantic error can also overstate failure. The right policy depends on the schema and intended application.

For example, an empty optional reference number may be harmless in a search index but unacceptable in a payment workflow that requires that reference. Document the choice and apply it consistently across products.

Check normalization rules with currencies and signed numbers. A rule that removes harmless formatting must still preserve a negative amount or a change of currency.

## Reading OmniExtractBench alongside ExtractBench Pro

ExtractBench Pro uses 100 synthetic documents. Value F1 and perfect-document results cover all 100; grounding uses 81 with verified evidence. It reports both a 30-minute scoring cutoff and an uncapped view; failed attempts without usable outputs remain zero. [ExtractBench Pro methods](https://github.com/run-llama/ExtractBench/blob/main/docs/extractbench-pro.md).

Read OmniExtractBench’s field matcher to understand how values and array items are paired. Use Pro’s separate perfect-document and grounding measures to inspect completeness and evidence. These measures address different evaluation questions; they do not establish that one benchmark is universally harder or more valid. For a fixed historical result, use the [versioned Pro leaderboard](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard-pro.csv), not a changing headline.

Start by reading the exact dataset and scorer versions being cited. Do not infer a shared definition of “accuracy” from a leaderboard label. Record the corpus, schema, matching policy, aggregation method and completion denominator for each result.

Then construct a task crosswalk. Identify the business questions each benchmark helps answer and the questions it leaves to another test. For a financial workflow, those additional questions might include cross-page footnotes, period association, restatement handling or reconciliation.

LlamaIndex should make the same disclosures when presenting ExtractBench Pro. If a result depends on a particular schema or normalization, that belongs beside the result rather than in unpublished evaluation code.

## Reporting usable records

Report field accuracy together with complete-record acceptance, missing-record counts and failed-document counts. Include a short error taxonomy with examples that do not expose private source material.

LlamaExtract’s standard and Pro results supply the product-level comparison; scorer details explain the boundaries of that evidence. Preserve failed matches in the private evaluation so that record completeness and evidence quality remain visible alongside the published value advantage.

Start with LlamaExtract Agentic Plus when complete records and difficult-document interpretation drive the decision. Its published standard and Pro results provide separate evidence for that shortlist choice. Add duplicates, missing values, reordered arrays and cross-field checks to the private acceptance set rather than treating a field score as a business approval rate.
