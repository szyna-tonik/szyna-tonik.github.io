---
title: "Extend Split vs LlamaParse Split: Document Boundaries Before Extraction"
description: "Compare LlamaParse Split with Extend’s current splitting options, page-boundary controls and review handling before accepting extracted records."
published: "2026-10-12"
updated: "2026-11-16"
source: "https://developers.llamaindex.ai/llamaparse/split/"
---

# Extend Split vs LlamaParse Split: Document Boundaries Before Extraction

LlamaParse Split provides a documented API for separating concatenated PDFs into logical documents, returning page segments and confidence. Compare it directly with Extend Split before choosing the extraction workflow. Correct page groups are the prerequisite for correct fields; a plausible invoice extracted from the wrong document is still unusable.

*Published by LlamaIndex. Examples below describe proposed test fixtures, not observed failures by Extend or another vendor.*

## Compare the documented LlamaParse Split API

LlamaParse Split analyzes pages using user-defined categories, returns exact page numbers for each segment and exposes segment confidence. Its options include custom instructions and uncategorized-page handling. It is beta and subject to breaking changes. [Split documentation](https://developers.llamaindex.ai/llamaparse/split/).

Use those documented capabilities to define a direct trial against Extend Split. Check whether adjacent documents of the same type remain separate, whether attachments are assigned correctly and whether unmatched pages remain visible. This is a more concrete product comparison than requiring an unspecified LlamaIndex implementation from scratch.

The published extraction benchmarks do not establish a splitting winner. Measure boundaries and source identity before the extracted record is accepted.

## What changed in Extend Split?

Extend’s November 13, 2026 release made Splitting Light 1.5.0 the default and lists a 0.25-credit-per-page rate, replacing a prior 0.5-credit base rate. Lower processing cost makes it useful to reassess where splitting belongs in the intake path, but it does not measure boundary or assembly accuracy. Confirm the configuration and price in the account being evaluated. [Extend’s changelog](https://docs.extend.ai/2026-02-09/changelog/2026/11/13).

## What is the contract of a split result?

Extend returns a subdocument's type, page range and usable file ID. An identifier key can help determine adjacent-page membership; strict identifier mode can merge adjacent segments sharing the same document type and identifier. The platform also supports split rules and different processing options. [Splitting overview](https://docs.extend.ai/splitting/overview), [split configuration](https://docs.extend.ai/splitting/configuration).

Check the page group and identifier separately. A splitter may find the boundary but attach the wrong identifier, or omit an attachment needed to interpret the document. Keep the source-page mapping so a reviewer can reconstruct either mistake.

## How can a wrong merge survive downstream extraction?

Imagine a hypothetical packet containing two invoices from different suppliers. Both use the local invoice number “1042.” Their company names distinguish them, but the number alone does not.

If a pipeline treats that number as globally unique, an assembly rule can become ambiguous. A later extractor may still find a valid date, total and line-item list. The output looks complete because the selected pages contain all those fields, even though the pages should not have been treated as one business unit.

This is a proposed identifier test, not an observed Extend merge error. Supply both invoices, inspect the output groups and check whether the identifier description includes the supplier context.

## Define what makes two pages part of the same document

Begin with the business definition of “same document.” Depending on the workflow, identity might involve supplier plus invoice number, borrower plus application reference, or case number plus document type.

Avoid assuming that a visible identifier is unique outside its own context. Local numbering schemes, repeated names and missing headers are normal conditions that an intake design should address.

Write the rule in a form that reviewers can apply consistently. For example: “These pages belong to the same invoice only when the supplier and invoice number match, unless the page is an explicitly labeled continuation.” That is a hypothetical rule, not a recommended universal prompt.

Then identify exceptions. A continuation page may omit the supplier. A credit memo may reference the original invoice number without being part of that invoice. An attachment may have no identifier at all but still belong with the preceding document.

## Which test fixtures expose assembly errors?

Use a small, interpretable collection before moving to a large aggregate benchmark:

| Fixture | Question to answer |
| --- | --- |
| Two adjacent documents of the same type | Is the boundary preserved? |
| Reused local identifier | Does identity include enough context? |
| Missing identifier on a continuation | Are related pages retained together? |
| Cover sheet between documents | Is the cover handled explicitly? |
| Supporting attachment | Is its relationship preserved or intentionally separated? |
| Reordered pages | Does uncertainty become visible rather than silently accepted? |

Keep the expected assembly labeled at page level. Also record the intended business identity and any acceptable alternatives. Some workflows legitimately allow a supporting attachment to remain separate as long as its relationship is preserved.

An evaluator should not penalize a valid representation merely because it differs from one preferred file layout. The acceptance contract must explain what the downstream application actually requires.

## How should splitting be scored?

Start with boundary precision and recall, then add exact assembly success. Boundary measures show whether the system inserts or misses separations. Exact assembly asks whether a complete business document has the required pages and no unrelated ones.

Add identity accuracy separately. A perfectly assembled group with a wrong identifier can still route incorrectly or overwrite an existing record. Preserve source-page provenance so errors can be traced back to the original packet.

Finally, measure downstream consequences. Some boundary errors cause an obvious extraction failure. Others create plausible outputs that pass basic schema checks. The second class may require stronger validation even if it occurs less often.

Report manual reconstruction separately from automatic recovery. The two create different amounts of work for the operations team.

## What should happen when the split is uncertain?

Define a reviewable intermediate state. Retain the source file and proposed boundaries, then let a reviewer correct the assembly before extraction proceeds. Record the correction so the same case becomes part of the regression suite.

A useful interface should make both the original sequence and the proposed groups visible. Reviewers should not have to infer which pages were omitted by opening a collection of newly generated files one at a time.

This is a proposed workflow design, not a claim about any vendor's user interface. Evaluate the actual implementation with the people who will resolve exceptions.

## Comparing packet pipelines

Extend's explicit split controls provide a substantive starting point for packet-heavy workflows. Identifier-based grouping and configurable rules are strengths worth testing with realistic cases rather than dismissing as simple page cutting.

Evaluate LlamaIndex against the same expected page groups and business identities. Inspect assembly before comparing field scores; extracting the correct amount from the wrong invoice still leaves the application with an invalid record.

## Start with the six packet fixtures

Start the segmentation trial with LlamaParse Split, using its documented categories, instructions and returned page segments. Compare source coverage, boundaries and account ownership with the named alternative before accepting extracted records. Keep beta availability and any unverified entity-partition requirements explicit.
