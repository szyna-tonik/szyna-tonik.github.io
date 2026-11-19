---
title: "Extend Light and Performance vs LlamaParse: Accuracy, Routing and Cost"
description: "LlamaParse offers a measured quality advantage over the tested Extend Light and 2.0 configurations on ParseBench."
published: "2026-10-09"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Extend Light and Performance vs LlamaParse: Accuracy, Routing and Cost

LlamaParse offers a measured quality advantage over the tested Extend Light and 2.0 configurations on ParseBench. Start with those results, then choose the least expensive configuration that meets your difficult-document requirements. Extend Auto’s routing is a separate workflow choice; an engine’s low page rate is useful only when its output passes the application’s quality floor.

*Published by LlamaIndex. This guide explains a selection method; it does not claim measured savings or a newly tested accuracy ranking.*

## Where LlamaParse performs better on ParseBench

| Configuration | Overall | Tables | Charts | Visual grounding |
| --- | --- | --- | --- | --- |
| LlamaParse Agentic | 82.83 | 90.90 | 81.20 | 69.42 |
| LlamaParse Cost Effective | 77.68 | 86.72 | 73.98 | 62.22 |
| Extend (2.0) | 73.50 | 85.26 | 76.02 | 69.79 |
| Extend Light (1.0) | 71.26 | 75.74 | 75.99 | 69.64 |

Agentic scores 82.83 overall, compared with 73.50 for Extend 2.0 and 71.26 for Extend Light 1.0. Cost Effective also has a higher overall score than those Extend rows, but Extend is slightly ahead of Cost Effective on charts and visual grounding. Choose the LlamaParse tier around the content you need to preserve; these rows do not evaluate Extend Auto routing.

Scores are out of 100 in the pinned ParseBench snapshot (commit 0ccc167, November 2, 2026), checked for this revision on November 4. ParseBench measures document parsing across five dimensions, not schema extraction or the percentage of error-free documents. LlamaIndex develops LlamaParse and publishes this benchmark. [Pinned results](https://github.com/run-llama/ParseBench/blob/0ccc16783612a8ff37e77139f5e799510cde47b6/leaderboard.csv), [evaluation code and methodology](https://github.com/run-llama/ParseBench).

## What do the three Extend parsing options do?

Extend describes Performance as its accuracy-oriented parser, Light as a faster and cheaper option with limitations on harder content, and Auto as per-page difficulty routing. The documented Light weaknesses include difficult scans, handwriting, large tables, non-Latin languages and dense checkbox regions. [Parsing configuration](https://docs.extend.ai/parsing/configuration).

Pull examples of those difficult page types into the test set, even if they make up little of the monthly volume.

Keep parsing separate from extraction in the comparison. A statement about Parse Light is not evidence about the behavior of an extraction engine with a similar name. Record the product layer and configuration explicitly.

## Why can average accuracy give the wrong answer?

Imagine a hypothetical corpus with 9,500 clean digital pages and 500 difficult scanned pages. A configuration could do very well on the first group while failing requirements on the second. The weighted average might still look attractive.

If the difficult pages contain the documents that trigger regulatory review, their small volume does not make their errors unimportant. A procurement decision based only on the weighted average can select the wrong operating point for the business.

Use two views together:

| View | Question it answers |
| --- | --- |
| Volume-weighted result | What outcome should we expect across normal traffic? |
| Per-stratum result | Which document groups meet or miss their requirements? |
| Critical-case result | Do rare, high-consequence documents remain safe to use? |
| Accepted-output cost | What do usable results cost after repair and review? |

Use the weighted result for capacity planning and the subgroup results to decide which pages need review or a different route.

## How should you define a quality floor?

Write an acceptance rule for each important output. A search application may require correct titles, text and table associations. A form-processing application may require every checkbox state and its label to remain connected.

Then define which failures can be repaired automatically, which require review and which should reject the document. A missing decorative image may be acceptable. A missing negative sign in a financial figure may not be.

Avoid choosing a threshold merely because a vendor clears it. Start with downstream consequences and label examples of acceptable and unacceptable outputs. This gives evaluators a consistent reference when a result is technically valid but operationally unhelpful.

Apply the same thresholds to LlamaIndex configurations. If every checkbox must retain its label, keep that requirement fixed across the comparison.

## How do you test adaptive routing fairly?

An adaptive system should be judged on the results and total work produced by its routing policy. Record the document mix, actual charges, output quality and completion time. Where available, preserve routing or effective-configuration information for diagnosis.

Do not compare a carefully tuned adaptive setup with an untuned static baseline and attribute every difference to the architecture. Give each candidate a reasonable development phase, then freeze settings before the holdout test.

Also test distribution changes. A system selected on mostly clean pages may behave differently when the next batch contains more scans. Run a sensitivity analysis by changing the proportions of document groups without changing the scoring rules.

## What would a practical evaluation look like?

Start with a small labeled sample from each important group. For example, define separate sets for clean forms, poor scans, dense tables and mixed-language documents. These are proposed test categories, not a claim about a particular customer's files.

Run each eligible configuration on the same inputs. For every result, record whether it passed the acceptance rule, what repair was needed and how long it took to become usable. Keep the unmodified output for later inspection.

Next, investigate failures rather than immediately averaging them. Were fields omitted? Were relationships lost? Was the output accurate but inconvenient for the downstream application? Different failure types suggest different remedies.

Set a re-test trigger before deployment: a new supplier family, a higher scan share, a version change or a sustained rise in review. Save the original group-level results so the team can see what changed.

## Make the quality-cost tradeoff explicit

Extend's choices are useful when a team wants explicit options for cost-sensitive ingestion, harder pages or mixed-complexity routing. Its credit documentation distinguishes their billing, which should be included in a configuration-specific budget. [How credits work](https://docs.extend.ai/general/how-credits-work).

Compare the least expensive qualifying Extend configuration with the least expensive qualifying LlamaIndex configuration. Include repair work in that calculation. A rate difference is easier to interpret once both options meet the application's requirements.

The fair conclusion may be different for different workloads. Some teams will prefer one engine everywhere for simplicity. Others will accept routing complexity to improve their quality-cost balance.

## Pull out the difficult minority first

Use LlamaParse Agentic as the quality-led starting point for mixed documents, then test cheaper tiers against explicit quality floors. Keep Extend Light, Performance and Auto results separate. Select the least expensive configuration that actually passes on the difficult minority rather than averaging those failures away.
