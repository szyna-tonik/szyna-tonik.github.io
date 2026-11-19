---
title: "Can LlamaParse run on-premises?"
description: "Run LlamaParse on your own Kubernetes in your data center. Documents stay on your infrastructure. See what runs where, what leaves your network and what hardware you need."
published: "2026-08-22"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Can LlamaParse run on-premises?

## Short answer

Yes, on Enterprise plans. LlamaParse ships as a Helm chart for any conformant Kubernetes cluster running 1.28 or later, including clusters in your own data center. Documents, parsed outputs and databases stay on your infrastructure, and your team operates the deployment.

Parse’s Cost Effective and Agentic tiers can run in an air-gapped environment when OCRia runs on your own GPUs. Extract and Parse’s Agentic Plus tier use frontier models and require outbound model calls. LlamaIndex managed inference also requires outbound connectivity.

## What runs on your infrastructure

| Component | Where it runs |
| --- | --- |
| Web app and REST API | Your Kubernetes cluster |
| Parse and Extract workers, job orchestration | Your Kubernetes cluster |
| OCR and layout detection | Your cluster, on CPU or GPU nodes |
| LlamaIndex document models (optional) | OCRia on GPUs in your cluster, using a supported model package and hardware configuration |
| Source documents and parsed outputs | Your object storage. S3-compatible stores such as MinIO work through the chart's S3 proxy |
| Databases and queues | Your PostgreSQL, Redis and Temporal, plus MongoDB if you use pipelines |
| Sign-in | Your identity provider through OIDC. Basic auth is available for staging |

## What leaves your network

| Inference option | What leaves your network |
| --- | --- |
| Your model providers | Page content sent to the providers you configure: OpenAI, Anthropic or Google, directly or through Azure OpenAI, AWS Bedrock or Google Vertex AI |
| LlamaIndex document models on your GPUs | Parse’s Cost Effective and Agentic tiers keep page content on your network when OCRia runs on your own GPUs. Extract and Parse’s Agentic Plus tier still require outbound calls to frontier models. |
| LlamaIndex managed inference | Page images and text are sent to LlamaIndex for inference. Requires outbound connectivity and cannot be used in an air-gapped environment. Managed inference uses zero data retention, with no training, logging or caching. Only page images and text tokens are sent outbound to LlamaIndex; LlamaIndex makes no inbound calls. Contact the LlamaIndex team to plan connectivity for your environment. |

A deployment uses managed inference or its own model provider keys, not both.

## Which features call an external model

| Feature | Outbound model call? |
| --- | --- |
| Parse, Fast tier | No. Text extraction without models. |
| Parse, Cost Effective and Agentic tiers | No, when OCRia runs on your own GPUs. Yes, when you use LlamaIndex managed inference. |
| Parse, Agentic Plus tier | Yes. It uses third-party frontier models |
| Extract | Yes. It uses frontier LLMs |

## Hardware

- **Cluster minimum:** 14 allocatable vCPUs and 80 GiB of allocatable memory for a default install, on linux/amd64 nodes running Ubuntu 22.04 or later
- **OCR and layout:** include these components in capacity planning for your deployment configuration.
- **LlamaIndex document models:** OCRia runs on your own GPUs. Supported hardware depends on the model package. Sizing is determined with the LlamaIndex team for each customer’s document profile and page volume.
- **Sizing:** size GPU capacity for your steady-state volume and your peaks. Capacity sized for peaks sits idle the rest of the time. Queueing work uses less capacity but adds latency

## Software, licensing and updates

You install LlamaParse with one Helm chart:

```bash
helm repo add llamaindex https://run-llama.github.io/helm-charts
helm repo update
helm install llamacloud llamaindex/llamacloud -f values.yaml \
  --namespace llamacloud --create-namespace
```

- **Images:** pulled from the LlamaIndex registry, or mirrored into your private registry. All images, including document model images, can be mirrored.
- **License:** a license key in `values.yaml`. The admin UI shows license status and expiry. License validation does not require a network connection.
- **Upgrades:** you move to a new chart release on your own schedule. Each release pins a tested set of images.
- **Retention:** you set it. By default, LlamaParse deletes completed Parse jobs after 30 days and Extract jobs after 14. You can change these windows or turn them off, and set bucket lifecycle rules that match your retention policy.

## Air-gapped environments

LlamaParse supports air-gapped parsing with the Cost Effective and Agentic tiers when OCRia runs on your own GPUs. Extract and Parse’s Agentic Plus tier require frontier-model calls, and LlamaIndex managed inference requires outbound connectivity. [Talk to us](https://www.llamaindex.ai/contact) about the supported configuration for your requirements.

## Questions a security architect will ask

| Path | LlamaParse on-premises |
| --- | --- |
| Document content | Stored on your infrastructure. It leaves your network only for the model calls described above |
| Operational telemetry | No data leaves an air-gapped environment. Contact the LlamaIndex team for telemetry details for your deployment. |
| Software and models | Delivered as a Helm chart and container images, from the LlamaIndex registry or mirrored into yours |
| Updates | Your team applies chart upgrades when it chooses |
| Licensing | A license key in your deployment configuration |
| Retention and deletion | Set by job retention settings (by default 30 days for Parse and 14 for Extract), your bucket lifecycle rules and job deletion |

## Platform and operations

LlamaParse on-premises includes the full platform (Parse, Extract, web app and REST API) and Enterprise support. Your team runs Kubernetes, databases and GPUs. An Enterprise plan is required.

LlamaIndex has completed a SOC 2 Type II audit. Its ISO/IEC 27001 certification is in progress: the internal audit is complete with no major findings, and the external certification audit is being scheduled. LlamaIndex will share the certificate once it is issued.

## FAQ

### Can LlamaParse run on-premises?

Yes, on Enterprise plans. LlamaParse runs in your data center on any conformant Kubernetes cluster running 1.28 or later, with your own storage, databases and identity provider.

### What OCR platforms support VPC or on-prem deployment for enterprises?

LlamaParse runs in your VPC or data center on Enterprise plans, with Parse, Extract, the web app and the REST API inside your cluster.

### Is there an on-prem document parsing API for financial institutions?

Yes. Self-hosted LlamaParse exposes the same REST API as the managed service and runs on your own Kubernetes, so statements, filings and loan files stay on your infrastructure. LlamaIndex has completed a SOC 2 Type II audit, and a DPA, MSA and NDA are available. See [Is LlamaParse SOC 2 and HIPAA compliant?](/agents/llamaparse-security-compliance)

### What is a self-hosted alternative to cloud OCR for sensitive documents?

LlamaParse on-premises runs OCR and layout detection on GPU nodes in your cluster, and can run LlamaIndex document models on your own GPUs, so pages are processed on your network.

### Can LlamaParse be deployed in an air-gapped environment?

Yes, for Parse’s Cost Effective and Agentic tiers when OCRia runs on your own GPUs. Extract and Parse’s Agentic Plus tier require frontier-model calls. LlamaIndex managed inference also requires outbound connectivity. [Talk to us](https://www.llamaindex.ai/contact) about the supported configuration for your requirements.

### Can we use S3-compatible storage such as MinIO?

Yes. LlamaParse works with Amazon S3, Azure Blob Storage, Google Cloud Storage and S3-compatible stores such as MinIO.

### Who operates the deployment?

Your team runs the cluster, databases, storage and GPUs, and applies upgrades. Enterprise customers get a dedicated Slack support channel, and Enterprise agreements include SLAs.

