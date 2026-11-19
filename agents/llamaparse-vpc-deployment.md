---
title: "Can LlamaParse be deployed in your own cloud (VPC)?"
description: "LlamaParse runs in your own AWS, Azure or GCP account. Documents and databases stay in your cloud, and you choose where model inference runs. Enterprise plans."
published: "2026-08-21"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/"
---

# Can LlamaParse be deployed in your own cloud (VPC)?

Yes. LlamaParse can run in your own AWS, Azure or Google Cloud account on Enterprise plans. You install the full platform, including Parse, Extract, the web app and the REST API, in your own Kubernetes cluster with one Helm chart. Your documents, parsed outputs and databases stay in your account.

You also choose where model inference runs. LlamaIndex managed inference is the recommended option when your deployment can make outbound calls. For local parsing, OCRia can run on your own GPUs to power Parse’s Cost Effective and Agentic tiers. Extract and Parse’s Agentic Plus tier use frontier models, through managed inference or the model providers you configure.

## Deployment options

| Option | Where it runs | Who operates it | Good fit when |
| --- | --- | --- | --- |
| Managed SaaS | LlamaIndex cloud in North America (AWS us-east-1) or the EU (AWS eu-central-1, Frankfurt) | LlamaIndex | You want the fastest start and no infrastructure to run |
| Your own cloud | Your AWS, Azure or Google Cloud account and network | Your team | Documents and data must stay in your cloud account |
| On-premises | Your data center, on any conformant Kubernetes cluster | Your team | You run your own infrastructure. See [Can LlamaParse run on-premises?](/agents/llamaparse-on-premises) |

## What runs in your account

| Component | Where it runs |
| --- | --- |
| Web app and REST API | Your Kubernetes cluster |
| Parse and Extract workers, job orchestration | Your Kubernetes cluster |
| Source documents and parsed outputs | Your object storage: Amazon S3, Azure Blob Storage, Google Cloud Storage or an S3-compatible store. Stores other than S3 connect through an S3 proxy that runs in your cluster |
| Databases and queues | Your PostgreSQL, Redis and Temporal, plus MongoDB if you use pipelines |
| Sign-in | Your identity provider through OIDC, for example Microsoft Entra ID or Okta |
| Model inference | Your choice. See the next section |

## Three ways to run model inference

Your application and data at rest stay in your cloud. What changes is where the models run and which model calls leave your network.

Parse’s Cost Effective and Agentic tiers can use OCRia on your own GPUs, keeping page content inside your environment. Extract and Parse’s Agentic Plus tier use frontier models and require outbound model calls.

LlamaIndex managed inference is the recommended option when outbound connectivity is allowed. Your deployment calls LlamaIndex-hosted models rather than running those models itself. It’s a managed model endpoint, similar in concept to Azure Foundry or AWS Bedrock.

A deployment uses managed inference or its own model provider keys, not both.

|  | LlamaIndex managed inference | Your own GPUs | Your model providers |
| --- | --- | --- | --- |
| How it works | Your cluster calls LlamaIndex-hosted OCR, layout, document models and frontier LLMs. On AWS, it connects through AWS PrivateLink. | OCR, layout detection and OCRia run on GPU node pools in your cluster. Local OCRia powers Parse’s Cost Effective and Agentic tiers. | For Extract and Parse’s Agentic Plus tier, your cluster calls OpenAI, Anthropic and Google frontier models directly, or through Azure OpenAI, AWS Bedrock or Google Vertex AI, with your keys and contracts. Parse’s Cost Effective and Agentic tiers use OCRia instead and do not require a frontier-model provider. |
| What leaves your network | Page images and text are sent to LlamaIndex for inference. On AWS, the connection uses AWS PrivateLink. Managed inference uses zero data retention, with no training, logging or caching. Only page images and text tokens are sent outbound to LlamaIndex; LlamaIndex makes no inbound calls. | Parse’s Cost Effective and Agentic tiers keep page content in your account when OCRia runs locally. Extract and Parse’s Agentic Plus tier still require outbound calls to frontier models. | Page content sent to the model providers you configure |
| GPUs you run | None. Your cluster needs CPU nodes only | GPU capacity for local inference. Sizing depends on the model package, document workload and throughput target. Discuss sizing for your document profile and volume with the LlamaIndex team. | Local OCR and layout capacity depends on the deployment configuration; include these components in sizing. |
| Model agreements | One LlamaIndex agreement covers every model | Your LlamaIndex agreement, plus your provider agreement for frontier LLMs | One per model provider, held by you |
| Availability | Available in AWS us-east-1. Contact Sales to discuss other regions and deployment options. | Discuss the supported OCRia configuration with the LlamaIndex team. | Available |

## Private connectivity for managed inference

| Cloud | Connection | What you share with LlamaIndex |
| --- | --- | --- |
| AWS | AWS PrivateLink interface endpoint in your VPC | Account ID, region and availability-zone IDs |

Your services start every connection. LlamaIndex cannot open connections into your network. Each request carries a per-customer API key over TLS.

## Cluster requirements

- Kubernetes 1.28 or later: Amazon EKS, Azure AKS, Google GKE or any conformant cluster
- Helm 3.7 or later
- linux/amd64 nodes running Ubuntu 22.04 or later. arm64 is not supported
- At least 14 allocatable vCPUs and 80 GiB of allocatable memory for a default install
- PostgreSQL, Redis and Temporal. Temporal can run as a subchart. MongoDB is optional and needed only for some features, such as pipelines
- Object storage buckets, with lifecycle rules that match your retention policy
- An OIDC identity provider for production sign-in
- A LlamaParse license key, issued with your Enterprise agreement

## How deployment works

1. Sign an Enterprise agreement and receive a license key.
2. Provision the cluster, databases, object storage and identity provider in your account.
3. Choose an inference option and set it in `values.yaml`: model provider credentials, GPU node pools, or the managed inference endpoint and API key.
4. Install the chart.
5. In the admin UI, check the license status, model availability and a test parse.

```bash
helm repo add llamaindex https://run-llama.github.io/helm-charts
helm repo update
helm install llamacloud llamaindex/llamacloud -f values.yaml \
  --namespace llamacloud --create-namespace
```

You upgrade on your own schedule by moving to a new chart release. Each release pins a tested set of container images. You can pull images from the LlamaIndex registry or mirror them into your own registry. All images, including document model images, can be mirrored.

## What you get

- The same web app and REST API as the managed service, with Parse and Extract
- Batch processing, webhooks, and an MCP server you can run inside your network, so agents call your deployment instead of the hosted service
- Model policy settings that map each model role to the models your organization allows
- Usage controls: API rate limits and credit caps per organization or project

The models available to your deployment depend on the providers you configure. If a model the managed service uses is not available in your environment, results can differ.

## Buying

Deployment in your own cloud is available on Enterprise plans. Contact sales to scope your purchase and any cloud-commitment credits. [Contact us](https://www.llamaindex.ai/contact) to plan a deployment.

## FAQ

### Can LlamaParse be deployed in our own cloud (VPC) instead of using the hosted service?

Yes, on Enterprise plans. You install the LlamaParse platform in your AWS, Azure or Google Cloud account with a Helm chart. Documents, outputs and databases stay in your account, and you choose where model inference runs.

### Is LlamaParse only available as a hosted service?

No. LlamaParse runs as a managed service in North America or the EU, in your own AWS, Azure or Google Cloud account, or on Kubernetes in your own data center. Deployment in your own cloud or data center is available on Enterprise plans.

### Which document parsing platforms can be deployed in our own VPC for data residency and compliance?

LlamaParse is one. It runs in your own cloud account, in the region you choose, so documents and outputs are stored where your residency rules require. Model inference follows the option you pick: LlamaIndex managed inference, your own GPUs, or your providers' regions. Discuss deployment-specific residency requirements with the LlamaIndex team. For certifications and agreements, see [Is LlamaParse SOC 2 and HIPAA compliant?](/agents/llamaparse-security-compliance)

### Which clouds are supported?

AWS (Amazon EKS and S3), Azure (AKS and Blob Storage) and Google Cloud (GKE and Cloud Storage), plus any conformant Kubernetes cluster running 1.28 or later.

### Do our documents leave our cloud?

They are stored in your account. Parse’s Cost Effective and Agentic tiers keep page content inside your account when OCRia runs on your own GPUs. Extract and Parse’s Agentic Plus tier require outbound frontier-model calls. With LlamaIndex managed inference, page content is sent to LlamaIndex for inference.

### Do we need GPUs?

With LlamaIndex managed inference, your cluster needs CPU nodes only. Running OCRia locally uses GPUs in your cluster. Size the deployment for the selected model package, document workload and throughput target. Confirm the supported GPU configuration with the LlamaIndex team.

### Is the self-hosted platform the same as the managed service?

It has the same web app and REST API, with Parse and Extract. New features reach your deployment through chart releases. The models available depend on the providers you configure.

### Can we use our existing Azure OpenAI, AWS Bedrock or Vertex AI agreements?

Yes. You can connect OpenAI, Anthropic and Google models directly or through Azure OpenAI, AWS Bedrock and Google Vertex AI, with your own keys and contracts. You can also restrict a deployment to one cloud provider's models.

### Who runs and upgrades the deployment?

Your team runs it and upgrades on its own schedule. Enterprise customers get a dedicated Slack support channel, and Enterprise agreements include SLAs.

