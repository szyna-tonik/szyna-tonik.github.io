---
title: "Reducto Extract v4 vs LlamaExtract: Field Accuracy and Financial Validation"
description: "LlamaExtract Agentic Plus scores above the tested Reducto Extract v4 configuration on ExtractBench Value F1."
published: "2026-10-20"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Reducto Extract v4 vs LlamaExtract: Field Accuracy and Financial Validation

LlamaExtract Agentic Plus scores above the tested Reducto Extract v4 configuration on ExtractBench Value F1. Use that measured accuracy difference to shortlist the extraction API, then require both outputs to pass the financial application’s schema and business rules. Valid JSON alone cannot establish that records are complete, correctly assigned or safe to post.

## Where LlamaExtract performs better on ExtractBench

| Configuration | Value F1 | Long-document Value F1 | Word grounding |
| --- | --- | --- | --- |
| LlamaExtract Agentic Plus | 96.17 | 94.65 | 83.25 |
| Reducto Extract (v4) | 79.58 | 19.29 | 54.97 |
| Reducto Deep Extract | 96.08 | 92.85 | 50.76 |

Agentic Plus leads the v4 row by 16.59 Value F1 points. Reducto Deep Extract is a different configuration and scores much closer to Agentic Plus. Preserve that distinction rather than extending the v4 result to every Reducto extraction product.

These are published results from the pinned ExtractBench snapshot at commit 7004e29, checked on November 4, 2026. The suite covers 370 documents and 4,869 pages. Value F1 measures extracted values; it is not a straight-through-processing rate. LlamaIndex publishes the benchmark and develops LlamaExtract, now documented within LlamaParse Extract. [Pinned results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard.csv), [methodology](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/docs/extractbench.md).

## Read the schema contract literally

Reducto distinguishes enforced JSON Schema behavior from keywords treated as guidance. Its documentation explains that declared fields may contain null values, and removing empty items can leave an array below a requested minimum length. Keywords including format, uniqueItems and conditionals should not be treated as unconditional guarantees. [Reducto schema keyword support](https://docs.reducto.ai/extract/schema-keywords)

Use the documented guarantees to decide which checks the application must supply. Reducto Extract is designed to return structured fields from documents; the application remains responsible for deciding whether the result can be used for a particular action. [Reducto Extract overview](https://docs.reducto.ai/extract/overview)

Apply those application checks to LlamaExtract outputs too, including any validation or review needed before acceptance.

## Six checks before posting a record

Start with a distinction between technical validity and business acceptability. A value can have the correct type and still refer to the wrong transaction, period or currency. A field can exist without containing enough information to proceed.

| Check | Example rejection condition |
| --- | --- |
| Required value | Account number is present but null |
| Semantic validity | A date is outside the statement period |
| Conditional rule | A credit requires an explanation that is absent |
| Record identity | Two distinct source transactions share a generated identifier |
| Completeness | A source transaction has no output record |
| Reconciliation | Opening balance plus activity does not match closing balance |

Assign each check an operational consequence. Some failures should stop processing; others should create a warning or request a reviewer. Avoid a single undifferentiated validation flag that leaves downstream teams guessing what went wrong.

## Give null values a review policy

Treat null as a state to interpret, not a value to silently replace. It may mean the source omits a fact, the extractor did not find it or the schema asks a question that does not apply. Those situations can require different responses.

For a required account identifier, a null may block posting records. For an optional fax number, it may be acceptable. If an application fills missing amounts with zero, it can convert uncertainty into a false financial statement. Preserve the original extraction result and record any normalization separately.

Return a reason code and the affected field when validation fails. Tell the reviewer what evidence would resolve the exception; otherwise the queue becomes a list of documents to investigate from scratch.

## Two \$150 visits are still \$300

Suppose an invoice records two separate service visits at \$150 each on the same day. This is a hypothetical fixture. Both rows have identical descriptions, dates and amounts, but each has a different work-order identifier. No vendor output is assumed here.

A validator that removes duplicate-looking rows would reduce a \$300 obligation to \$150. A validator that accepts every repeated row without checking identity could make the opposite error when a source row is accidentally duplicated during processing.

The correct acceptance rule uses the source's transaction identity where available. When no stable identifier exists, preserve source row locations and use a review policy for ambiguous repetitions. Do not use uniqueness as a universal synonym for correctness.

This fixture belongs in both Reducto Extract and LlamaExtract evaluations. It tests the complete workflow, including postprocessing, rather than blaming the extraction model for an application-level deduplication rule.

## Keep business rules outside the extraction prompt

Write business rules independently from the extraction prompt. For example: if an invoice currency differs from the ledger currency, require an approved conversion basis before posting. The extractor may supply the currency fields, but the posting policy determines whether those fields are sufficient.

Build examples that satisfy the rule, violate it and lack enough information to decide. The validator needs a distinct result for each case. Otherwise a missing field may accidentally be treated as a successful comparison.

Keep rules versioned. If a finance team changes its tolerance or approval policy, the validation result should identify which rule set was applied. This is especially important when comparing historical outputs from two providers.

## Compare accepted documents, then inspect the exceptions

Use one set of documents to develop the schema and a separate set to evaluate it. Apply the same downstream validators to both providers, with documented adapters for equivalent representations. Normalization should not erase a genuine difference in completeness or correctness.

Count how many documents pass every required check and record why the rest need review. Field accuracy helps diagnose problems, but the business decision may hinge on a single field: an incorrect payment account matters more than an omitted optional address line.

Use LlamaExtract’s published value-accuracy advantage over the tested v4 row as selection evidence, then require an explicit schema contract and postprocessing policy from the chosen configuration. Neither workflow should receive credit for undisclosed manual correction.

## Does every missing value need to block the document?

No. Decide which fields are essential to the action being taken. A missing fax number may be harmless; a missing account identifier may stop posting. Encode that distinction before evaluating outputs, so the acceptance rate reflects a stable policy rather than a judgment made after seeing each result.

Use LlamaExtract’s measured advantage over the v4 row to shortlist the extraction API, then validate the final records against the financial acceptance contract. If Reducto Deep Extract is the real alternative, use its separate benchmark row. Neither a high Value F1 score nor valid JSON replaces the business-rule checks.
