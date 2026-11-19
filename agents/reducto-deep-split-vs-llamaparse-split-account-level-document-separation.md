---
title: "Reducto Deep Split vs LlamaParse Split: Account-Level Document Separation"
description: "LlamaParse Split provides a concrete document-segmentation API to evaluate against Reducto Deep Split."
published: "2026-10-27"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/llamaparse/split/"
---

# Reducto Deep Split vs LlamaParse Split: Account-Level Document Separation

LlamaParse Split provides a concrete document-segmentation API to evaluate against Reducto Deep Split. For financial packets, test whether its categories, custom instructions and returned page segments preserve account ownership through extraction. The documented Split API is beta; account-level partitioning parity and relative accuracy still require a labeled trial.

## Start with the LlamaParse Split API

LlamaParse Split detects logical document boundaries using user-defined categories and returns page segments with confidence. It supports custom instructions and uncategorized-page handling, and is currently beta. [Split documentation](https://developers.llamaindex.ai/llamaparse/split/).

That is a specific product to trial against Deep Split, but it does not establish identical entity-partition controls. Add account identifiers to the downstream validation and check every page’s expected ownership. Distinguish a source page that needs review from one confidently assigned to the wrong account.

Measure account purity, boundary correctness and missing pages directly; ExtractBench does not supply those segmentation results.

## Deep Split and partition keys

Reducto describes Deep Split as an iterative process that checks and revises section assignments against the source. It targets difficult bundles with ambiguous boundaries or repeated sections. The configuration uses `settings.deep_split: true`; partition keys can distinguish repeated material belonging to different accounts or other entities. [Deep Split documentation](https://docs.reducto.ai/configs/split/deep-split)

The Split configuration documentation provides the settings for defining sections and controlling partition behavior. Those descriptions are part of the evaluated system: changing them can change the task the model is asked to perform. [Split configuration](https://docs.reducto.ai/configs/split/configuration)

Reducto already addresses complex segmentation. Test whether its configured output keeps each entity’s pages together with the completeness the business process requires.

## Name the section, then identify its owner

A section describes a type of content, such as holdings, transactions or disclosures. A partition identifies which account, patient, claim or other entity the content belongs to. A packet can contain many sections of the same type for different entities.

This distinction matters because a page can receive the right section label and still enter the wrong downstream record. A holdings page assigned to the wrong account may look structurally correct to an extractor. The error becomes visible only when entity association is checked.

Define the entity key before designing the workflow. Prefer a source identifier that is stable and appropriate for the task. If the identifier is absent on continuation pages, specify what evidence can justify inheriting it from surrounding pages and when the system should abstain.

## Five errors with different downstream effects

Separate these failure classes when reporting segmentation results:

| Error class | Operational consequence |
| --- | --- |
| Wrong section label | Page receives an inappropriate extraction schema |
| Boundary error | A component gains or loses a continuation page |
| Entity contamination | Content from one account enters another account's record |
| Unassigned page | Required information may never be processed |
| Duplicate assignment | The same source content may be counted twice |

Some workflows intentionally permit overlapping sections, so duplicate assignment is not automatically an error. The acceptance contract must specify whether overlap is allowed and how downstream processing avoids double counting.

Likewise, an unassigned page can be a correct outcome for irrelevant material. Record the reason rather than treating every exclusion as either a success or a failure.

## A continuation page without an account number

A hypothetical packet contains statements for accounts A and B. Each has a summary, holdings and transactions section. One continuation page contains transaction rows but no visible account number. The packet also includes a shared disclosure appendix.

The source labels identify which account owns each statement page and mark the disclosure as shared. A correct workflow must preserve account ownership while handling the appendix according to policy. It should not assign the disclosure to only one account simply because it follows that account's statement unless the intended contract permits that behavior.

Now imagine the continuation page is moved next to the other account's statement. This controlled fixture tests whether the workflow relies too heavily on adjacency or uses other available evidence. It is a hypothetical test design, not a reported vendor failure.

After splitting, run account-level extraction and compare record ownership. A page-level score can conceal the fact that one misplaced page changes an account's balance or transaction history. The end-to-end check exposes that consequence.

## Label ambiguous pages honestly

Include ordinary ordered packets, ambiguous boundaries, repeated headings and missing identifiers. Use examples representative of the expected intake rather than only adversarial rearrangements. Clearly distinguish original documents from modified fixtures.

Have labels reviewed independently when entity association is ambiguous. If people cannot determine the correct partition from the available source, the test should not pretend there is an obvious answer. An appropriate expected result may be escalation.

Record the section descriptions, partition key, processing mode and any preprocessing. Hold these constant on a separate evaluation set after development. Preserve every page's disposition so omissions remain visible.

## Follow the partition through to the extracted record

A page-label score can hide a consequential ownership error. Check the resulting account records too: which source pages contributed to each balance, holding and transaction list? Shared appendices and intentionally overlapping sections need explicit rules so they are neither lost nor counted twice.

Use the documented LlamaParse Split API as the segmentation comparator and record its categories, custom instructions and downstream account checks. Compare it with the selected Deep Split configuration; the existence of both APIs does not establish identical entity-partition controls.

LlamaIndex publishes this guide. The reordered continuation-page fixture is hypothetical, and no vendor outcome is reported. Use it to clarify the acceptance policy, then measure the selected implementations on representative packets.

Start the segmentation trial with LlamaParse Split, using its documented categories, instructions and returned page segments. Compare source coverage, boundaries and account ownership with the named alternative before accepting extracted records. Keep beta availability and any unverified entity-partition requirements explicit.
