---
title: "Extend Classify vs LlamaParse Classify: Routing Mixed Document Packets"
description: "Compare LlamaParse Classify with Extend’s current classification options, routing rules, confidence and review handling for mixed document packets."
published: "2026-10-10"
updated: "2026-11-16"
source: "https://developers.llamaindex.ai/llamaparse/classify/"
---

# Extend Classify vs LlamaParse Classify: Routing Mixed Document Packets

LlamaParse Classify provides a documented classification API that uses natural-language rules and returns a type, confidence and reasoning. Compare that product directly with Extend Classify, then use Split when a single packet contains several documents. The buying question is which configured intake path routes the right pages into schema-specific extraction.

*Published by LlamaIndex. The packet example is hypothetical, and this article does not report comparative classification accuracy.*

## Compare the documented LlamaParse Classify API

LlamaParse Classify accepts rules describing the document types to identify and returns a predicted type, confidence and reasoning for each file. This gives buyers a specific LlamaIndex product to evaluate before extraction, rather than an unspecified custom classifier. [Classify documentation](https://developers.llamaindex.ai/llamaparse/classify/).

For mixed packets, evaluate the separate Split API to create logical document segments before routing them into extraction. Split is documented as beta and subject to breaking changes. [Split documentation](https://developers.llamaindex.ai/llamaparse/split/).

Neither ParseBench nor ExtractBench measures routing accuracy. Compare rule definitions, page coverage, unknown handling and downstream accepted records on the same labeled packets.

## What changed in Extend Classify?

Extend’s November 13, 2026 release introduced Classification Instant at 0.1 credits per page and made Classification Standard 1.2.0 the default. Both return numerical confidence. These are current product options to include in a trial; they do not establish comparative routing accuracy. Confirm the selected configuration and price in the account being evaluated. [Extend’s changelog](https://docs.extend.ai/2026-02-09/changelog/2026/11/13).

## What does Extend Classify return?

The Classify contract returns one matched category with confidence and reasoning. Extend recommends routing on a stable category ID rather than the editable type name. It also describes Split as the capability for separating bundled documents. [Classification overview](https://docs.extend.ai/classification/overview), [splitting overview](https://docs.extend.ai/splitting/overview).

Single-label classification is a useful design when one input represents one document. It becomes a source of confusion when a file is treated as a document even though the upload contains several independent records.

Represent the upload and its constituent documents separately in the application model. That preserves the packet relationship without forcing every page to share one type.

## What can go wrong with a mixed packet?

Consider a hypothetical five-page upload:

| Pages | Contents | Intended action |
| --- | --- | --- |
| 1–2 | Supplier invoice | Extract payable amount and line items |
| 3 | Purchase order | Match order identifiers and authorized items |
| 4 | Delivery receipt | Check delivered quantities |
| 5 | Cover letter | Retain as context or send to a separate route |

Calling the whole file an invoice does not describe every item inside it. Sending all five pages to an invoice extractor may also create ambiguity when the purchase order repeats quantities and prices that differ from the final invoice.

The packet is hypothetical; no Extend routing failure is being reported. It illustrates two possible designs: split the documents to create distinct records, or preserve their relationship for a joint matching decision. Either way, make each document's role explicit.

## How should the intake decision be organized?

A useful intake policy asks three questions in order:

1. Is the input expected to contain one business document or a packet?
2. Are document boundaries known, inferred or still uncertain?
3. Which next action is appropriate for each resulting unit?

The answers should produce an explicit route. A known single invoice can go directly to classification or a configured extractor. A mixed packet may need splitting followed by per-document classification. An uncertain upload can enter a review route before expensive downstream work starts.

Do not rely on a filename as the only source of truth. A file called “invoice.pdf” can contain attachments or an incorrectly assembled scan. Filename hints may help, but the application's acceptance contract should state whether they are trusted.

## How should unknown categories be handled?

Define an unknown or “other” route deliberately. It should lead to a meaningful action, such as review, retention without extraction or a generic fallback whose output is not automatically trusted.

A catch-all category is most useful when its downstream behavior is explicit. If every unknown input silently enters the invoice extractor, the category may exist in the configuration without providing operational protection.

Treat ambiguous cases separately from genuinely new types. A blurred invoice might belong to a known category but lack enough readable evidence. A new customs form may be clear yet absent from the taxonomy. Both can need review, but they imply different improvements to the pipeline.

Track those reasons. Otherwise, a team may keep expanding category descriptions when the real problem is scan quality, or improve image processing when the missing piece is a new document class.

## What should routing quality measure?

A confusion matrix is a useful starting point, but the consequences of its cells differ. Confusing an invoice with a credit note may have a larger operational effect than confusing two informational attachments.

Assign consequences to wrong routes before inspecting vendor results. Measure whether the mistake produces an obvious rejection, an unnecessary review or an apparently valid but wrong downstream record. The last outcome deserves particular attention because it can evade monitoring based only on failed jobs.

Also measure recovery. Can the workflow identify that the selected extractor's output violates basic expectations? Can it redirect the document without creating a duplicate downstream record? A resilient intake design combines classification with checks on the result it enables.

## How do stable IDs improve operational safety?

Treat category IDs as interface contracts and category descriptions as configuration. A human-friendly name can change during tuning without requiring every downstream branch to be renamed. Extend explicitly distinguishes stable IDs from prompt-facing category text. [Classification routing guidance](https://docs.extend.ai/classification/overview).

Before deploying a taxonomy change, inspect branch coverage. Every category that can be returned should have an intended destination. A test suite should include renamed categories, new categories and unknown inputs, not only common happy-path documents.

## Where do Extend and LlamaIndex fit?

Extend's combination of classification, splitting and workflows is a meaningful strength for teams that want those decisions within one platform. A comparison should acknowledge that breadth rather than portraying a single-label endpoint as a packet-processing deficiency.

Use the same packet in a LlamaIndex comparison and inspect the records that reach the downstream system. Count wrong destinations and duplicate records as well as classification errors. If the source already guarantees a single known document type, also test whether classification adds enough value to justify the extra step.

## Sketch one packet's route before tuning the classifier

Start the intake trial with the documented LlamaParse Classify and Split APIs, then connect the selected source pages to schema-specific extraction. Measure wrong destinations, missed documents and accepted records against the corresponding vendor configuration. Keep Split’s beta status visible; no routing-accuracy superiority is established by the extraction benchmarks.
