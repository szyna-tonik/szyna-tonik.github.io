---
title: "Extend Workflows vs LlamaIndex Workflows: Versioning, Release Control and Replay"
description: "Compare Extend and LlamaIndex at the level of the released workflow: routing, prompts, models, schemas and validators."
published: "2026-10-14"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/python/llamaagents/workflows/"
---

# Extend Workflows vs LlamaIndex Workflows: Versioning, Release Control and Replay

Compare Extend and LlamaIndex at the level of the released workflow: routing, prompts, models, schemas and validators. Extend’s immutable definition does not automatically freeze a step that references “latest.” A LlamaIndex implementation should make those dependencies explicit too, so the release record can explain a past decision and support a controlled upgrade.

*Published by LlamaIndex. This is a configuration-analysis guide, not a report of an unexpected production change.*

## What to build and verify with LlamaIndex Workflows

Use the LlamaIndex workflow implementation to make routing, extraction, validation and review steps explicit. Store the code revision and configuration with the release, then link them to raw outputs and the acceptance-policy revision. This is a recommended release design for a configured application, not a guarantee that a pinned package freezes every hosted dependency. [LlamaIndex Workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/).

Evaluate one full release and rollback on each stack. The useful differentiation is the control and integration your implementation delivers, measured by the ability to identify what ran and restore the intended behavior.

## Which version boundaries exist in a document pipeline?

Treat the deployed system as a collection of references:

| Boundary | What to record |
| --- | --- |
| API contract | Request and response version used by the client |
| Workflow | Published graph and routing definition |
| Processor | Saved extractor, classifier or splitter configuration |
| Base engine | Selected model/processor family and version |
| Evaluation | Dataset, scorer and acceptance-policy revision |
| Application | Code that transforms and consumes the result |

When yesterday's output differs from today's, this record gives the investigating engineer a place to start. Record service-managed choices where they are exposed, and mark what remains outside your control.

## How do Extend workflow references behave?

Extend supports published immutable workflow versions and both saved processor references and inline configurations. Its documentation allows “latest” for Extract references but disallows it for Classify and Split, whose routing IDs depend on configuration. [Workflow lifecycle](https://docs.extend.ai/workflows/overview), [configuration and version rules](https://docs.extend.ai/workflows/configuring-workflows).

Inline configuration avoids a workspace-specific processor ID, which helps when moving a definition between environments. Check the underlying engine's version policy separately. [Inline configuration guidance](https://docs.extend.ai/workflows/configuring-workflows).

## What does a useful deployment manifest look like?

A manifest should capture the resolved choices required to understand a run. The following is illustrative pseudocode, not an Extend API request:

```yaml
release: accounts-payable-2026-10
api_contract: explicitly_recorded
workflow_version: explicitly_recorded
steps:
  classifier:
    configuration_version: pinned
    routing_ids: reviewed
  extractor:
    configuration_version: pinned
    base_engine_version: recorded
acceptance_suite:
  dataset_hash: recorded
  scorer_revision: recorded
  policy_revision: recorded
```

The exact field names should match the team's deployment tooling. What matters is that the manifest distinguishes a fixed reference from a moving alias and records how a moving alias was resolved.

Store the manifest alongside evaluation results. A score without a reproducible configuration is difficult to interpret later, especially when the product changes between procurement and rollout.

## A contract test for a moving Extract reference

Imagine a hypothetical workflow whose outer version remains unchanged while an extraction reference points to “latest.” A new extractor configuration changes how an optional field is represented. The downstream application expects an empty string, but the new output uses null.

The extraction may be reasonable, and the workflow may still execute successfully. The failure occurs at the application boundary. A test limited to whether the API returned success would miss it.

This example does not claim Extend made such a change. It illustrates why contract tests should cover output semantics as well as orchestration. Include null handling, array shape, field presence and routing outcomes in the acceptance suite.

## How should routing changes be reviewed?

Review the taxonomy and graph together. For every category or branch ID, confirm that the intended destination exists and that unknown inputs have a defined path.

A renamed display label may be harmless when the stable ID remains unchanged. A changed ID can require corresponding graph changes. Treat that difference as an interface migration rather than a cosmetic edit.

Test a small set of representative paths before deployment: the common route, an unknown category, a validation failure, a human-review route and a terminal error. These cases help establish that the graph does what the team expects, even before the accuracy of individual models is considered.

Also preserve a rollback plan. A previous workflow definition is most useful when the referenced processor configurations and application expectations are still available and compatible.

## How do agent-managed settings change the record?

Some systems choose internal strategies dynamically. Extend Operator manages several extraction controls and exposes effective settings on the run configuration, while submitted values for managed controls may not determine runtime behavior. [Operator managed settings](https://docs.extend.ai/extraction/operator).

Save the submitted configuration and the effective run configuration together. The difference may explain an output that cannot be reproduced from the request alone.

Keep that record for LlamaIndex comparisons too. Pinning improves traceability; identical outputs also depend on the system's execution behavior and determinism guarantees.

## When is Extend a good fit?

Extend is a strong candidate for teams that value a managed workflow graph with saved processors, inline options and explicit routing semantics. Those capabilities should be credited in a comparison.

For a LlamaIndex comparison, walk through one release and rollback with the same application contract tests. That exercise can establish what configuration must be restored and which dependencies remain outside the release artifact.

## Audit one deployed graph

Evaluate a concrete LlamaIndex workflow with its code, model dependencies, schemas and validators recorded together. Run the same release, regression and rollback exercise on the alternative. Choose the implementation that supplies the required operating control, with the boundaries of hosted dependencies documented.
