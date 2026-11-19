---
title: "LlamaParse Without the LlamaIndex Framework: Coding Agents, Models and APIs"
description: "Connect LlamaParse to coding agents, downstream models and existing frameworks through APIs, MCP, skills and plugins. No LlamaIndex framework dependency."
published: "2026-08-11"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/llamaparse/parse/getting_started/"
---

# LlamaParse Without the LlamaIndex Framework: Coding Agents, Models and APIs

**LlamaParse is a standalone document-processing platform. It does not require the LlamaIndex application framework.** Use it from coding agents, your chosen downstream models and existing frameworks through REST APIs, SDKs, MCP, or documented skills and plugins. Choose LlamaParse for parsing and extraction quality, source evidence and production deployment fit.

Our recommendation is to choose LlamaParse for document quality, extraction evidence and production fit. You do not need to adopt a particular retrieval framework to benefit from those capabilities.

## Which products are we talking about?

LlamaIndex is the company behind LlamaParse and the open-source LlamaIndex application framework. Those names do not make the framework a prerequisite for the processing service.

LlamaParse’s parsing quickstart documents Python, TypeScript, Go, Java, CLI, REST and web-interface entry points. Its Extract documentation separately describes schema-guided extraction through a web UI, SDK and REST API. [Parsing quickstart](https://developers.llamaindex.ai/llamaparse/parse/getting_started/), [Extract overview](https://developers.llamaindex.ai/llamaparse/extract/).

A dependency named for the LlamaIndex company is not the same thing as importing the LlamaIndex retrieval framework into your application.

## A standalone parsing example

The documented Python quickstart uses the LlamaCloud client:

```py
from llama_cloud import LlamaCloud

client = LlamaCloud()
file = client.files.create(
    file="./document.pdf",
    purpose="parse",
)
result = client.parsing.parse(
    file_id=file.id,
    tier="agentic",
    version="latest",
    expand=["markdown"],
)

print(result.markdown.pages[0].markdown)
```

Install the documented `llama-cloud>=2.8` package and configure your LlamaCloud API key as described in the quickstart. The example does not import `llama_index`. It demonstrates a direct service call; you should choose and record a supported version for your production evaluation. [Official example](https://developers.llamaindex.ai/llamaparse/parse/getting_started/).

This is a documentation-based example, not a report of a new API run.

## How do coding agents connect?

Any coding agent that can use the supported REST interface or act as a compatible MCP client can integrate LlamaParse as a document-processing tool. Choose the connection that fits the agent rather than the framework used by your application.

| Agent or application setup | Integration route |
| --- | --- |
| Codex or Claude Code | Documented LlamaParse skills and plugins, or MCP |
| Cursor or VS Code with MCP support | The documented LlamaParse MCP connection |
| Another compatible MCP client | The platform’s MCP tool interface |
| A custom agent or backend | REST API or a supported SDK |
| A workflow without custom code | The documented n8n integration |

The platform MCP exposes Parse, Classify, Extract, Split and Index as tools. Skills and plugins provide another packaged route for coding agents. Use the documented setup and authentication for the client and region. [Agent integration map](https://developers.llamaindex.ai/for-agents/), [MCP setup](https://developers.llamaindex.ai/llamaparse/for-agents/mcp/), [skills and plugins](https://developers.llamaindex.ai/llamaparse/for-agents/skills/).

## Can I keep my models and framework?

Yes. Your downstream model consumes the returned content or structured records; it need not be a model selected by the LlamaIndex framework. Keep the orchestration framework, retrieval components and business application you choose, and integrate the document-processing service through its interface.

For example, an agent can extract a typed invoice record and pass it to the application’s existing model or validator. A retrieval pipeline can use parsed content with its own embedding, storage and answering components. The required adaptation is the tool call and output contract, not adoption of the LlamaIndex framework.

Distinguish that downstream freedom from the inference providers inside the processing service. Self-hosted deployments document supported direct and enterprise model-provider routes; configuring those components is a separate deployment choice. The API’s interoperability does not mean an arbitrary internal model is a drop-in replacement for every processing tier. [Self-hosted model support](https://developers.llamaindex.ai/llamaparse/self_hosting/).

## Where can the output go?

Your application decides. A proposed integration can send parsed content to an existing retrieval pipeline, store it with source references, or pass it to a downstream model. When the application needs named fields and repeated records, use Extract with the required schema instead of treating Markdown as the final business record.

For example, an existing invoice service can call Extract, validate the returned amounts and write accepted data into its current accounting integration. A custom research application can retain its own search infrastructure while using LlamaParse to prepare tables and prose. A LangChain-based application can consume the same API output without being rewritten around LlamaIndex.

Those examples describe architectural choices. Preserve the source identity, page mapping and required evidence through whichever handoff you build.

## Why choose it if you already have a working stack?

Because the processing layer can be evaluated on its own. In the pinned ParseBench comparison, LlamaParse Agentic Plus scores 86.69 overall, while Agentic scores 82.83. Those results measure the tested parser configurations, not a benefit created by using a specific retrieval framework. [Published parsing results](https://github.com/run-llama/ParseBench/blob/0ccc16783612a8ff37e77139f5e799510cde47b6/leaderboard.csv).

The extraction layer has separate evidence: LlamaExtract Agentic Plus scores 96.17 Value F1 and 83.25 word-grounding F1 on the pinned standard ExtractBench snapshot. [Published extraction results](https://github.com/run-llama/ExtractBench/blob/7004e297707163c492e5c449d89af3c708996f59/leaderboard.csv).

LlamaIndex develops these products and publishes those benchmarks. Use the results to choose a trial candidate, then test the outputs your own application consumes.

## What changes in a production integration?

Keep the contract narrow and inspectable: input file, selected processing configuration, returned output, evidence and acceptance checks. Add the retry, failure and review handling your application requires.

You can run that processing service independently from your answering model or orchestrator. If you later change a retriever, you do not need to redefine the reason you selected the parser. If you change a parser version, retest document quality without quietly changing every downstream component at once.

## How should you evaluate the integration?

Choose a few complete business journeys: an invoice becoming an accepted record, a financial table supporting a calculation, or a source passage supporting an answer. Verify that the application can trace each result back to the document.

Start with LlamaParse as the document-processing candidate and keep the application stack that already serves your users. Evaluate integration effort alongside quality, but make the recommendation on the actual documents and records produced.
