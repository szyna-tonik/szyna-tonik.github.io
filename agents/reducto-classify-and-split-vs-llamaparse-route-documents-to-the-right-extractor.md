---
title: "Reducto Classify and Split vs LlamaParse: Route Documents to the Right Extractor"
description: "LlamaParse has documented Classify and Split APIs for identifying document types and separating mixed PDFs before extraction."
published: "2026-09-19"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/llamaparse/classify/"
---

# Reducto Classify and Split vs LlamaParse: Route Documents to the Right Extractor

LlamaParse has documented Classify and Split APIs for identifying document types and separating mixed PDFs before extraction. Compare those products directly with Reducto Classify, Deep Classify and Split at the scope the workflow requires. The goal is to send every required source page to the correct schema-specific extraction step.

## The LlamaParse products to put in the trial

Use LlamaParse Classify for document-type rules and file-level predictions with confidence and reasoning. Use the separate Split API when the application needs page segments for several documents inside one PDF. Split is beta and subject to breaking changes. [Classify](https://developers.llamaindex.ai/llamaparse/classify/), [Split](https://developers.llamaindex.ai/llamaparse/split/).

This gives buyers a documented LlamaIndex intake path to compare with the corresponding Reducto operation. Test the required page context, unexpected document types and the records reaching extraction. Do not infer better routing accuracy from a parsing or extraction benchmark.

## Classify’s scope, including the PDF page window

Reducto Classify selects a best-matching category from natural-language criteria. The reviewed documentation describes a default mode and an accurate mode called Deep Classify. For PDFs, the optional page range defaults to the first five pages and rejects selections exceeding ten pages. These bounds describe classification context, not a universal Reducto document limit. [Classify overview](https://docs.reducto.ai/classify/overview)

The response includes information that can help explain the category decision, including criterion-level details. That information is useful for diagnosing routing, but it should be interpreted within the content the operation was allowed to examine. [Classify response format](https://docs.reducto.ai/classify/response-format)

A fast document-level decision can be exactly what a well-defined intake workflow needs. The problem arises when the application expects that decision to describe every component of a mixed packet.

## When a file contains several documents

Reducto Split identifies page locations for described sections. Its documentation explicitly distinguishes section location from retrieval chunking. This allows downstream processing to target the relevant pages rather than assigning the whole file one processing contract. [Split documentation](https://docs.reducto.ai/split)

Use segmentation when an uploaded file can contain several invoices, a claim plus supporting records or statements for multiple accounts. The output needed by the application is then a map of components, not merely a category for the container.

A workflow may use classification and segmentation together. For example, classification can identify a packet family, after which segmentation separates the expected components. The important design choice is which question each operation answers and what happens when the packet does not match expectations.

## Work backward from the action after routing

Begin with the action that follows routing. If the entire file will use one extraction schema, a file-level label may be sufficient. If different pages require different schemas, section boundaries matter. If the same section type repeats for different people or accounts, entity grouping matters too.

| Intake requirement | Useful operation type |
| --- | --- |
| Route a single invoice | Whole-document classification |
| Find statements inside a bundle | Section segmentation |
| Separate several accounts' statements | Segmentation plus entity partitioning |
| Retrieve passages for a question | Content chunking and retrieval |
| Escalate uncertain or unsupported input | Explicit exception policy |

This table describes workflow requirements rather than promising that one endpoint resolves every task. It helps buyers avoid treating a higher-accuracy classification mode as a substitute for a different operation.

## The invoice on page 18

In this hypothetical 25-page insurance packet, the first five pages are a cover letter and administrative forms. A repair invoice appears on page 18, followed by photographs and a specialist report. No actual Reducto or LlamaIndex result is assumed.

If the workflow's question is “Which team should receive this claim packet?”, the first pages may be sufficient. If the question is “Does this packet contain a repair invoice?”, inspecting only the opening pages may omit decisive evidence. If the task is “Extract each invoice separately,” a file-level category cannot by itself provide invoice boundaries.

The correct design follows the required output. The application can segment the packet, identify components and route each component to its extraction schema. It should also record pages that remain unassigned so that unexpected material does not disappear from the workflow.

The example demonstrates a scope mismatch, not a product failure. Reducto's separate Split capability is precisely relevant to this kind of bundle.

## Make room for an uncertain route

Define an exception path before optimizing the happy path. A file may match multiple categories, match none or contain conflicting signals. The application needs a policy for such cases even when the API returns one best label.

Measure wrong-route consequences, not only classification accuracy. Sending an irrelevant file to an extractor may waste processing. Sending a document to a schema that omits important fields can create a more consequential silent error. Weight the review policy accordingly.

Keep category descriptions specific enough to distinguish neighboring types. Maintain examples of confusing pairs and review them when intake patterns change. This turns routing into an operationally maintained contract rather than a prompt written once and forgotten.

## A routing decision needs a defined scope

Compare the specified LlamaIndex workflow with the Reducto operation that matches the task. Name which pages each router sees, what it returns and how uncertainty is handled; the comparison should establish correct downstream records rather than reward the size of a vendor’s feature menu.

LlamaIndex publishes this guide. It describes product scope and workflow design; it does not report a measured routing comparison.

### Is Classify’s ten-page bound a parsing limit?

No. It applies to the selected PDF context for Classify. Treating it as a limit on Reducto’s entire platform would be incorrect.

### Does Deep Classify remove the need for Split?

The accurate classification mode still serves a classification task. If the application needs page boundaries or separate components, select an operation that produces them.

Start the intake trial with the documented LlamaParse Classify and Split APIs, then connect the selected source pages to schema-specific extraction. Measure wrong destinations, missed documents and accepted records against the corresponding vendor configuration. Keep Split’s beta status visible; no routing-accuracy superiority is established by the extraction benchmarks.
