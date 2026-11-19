---
title: "Is LlamaParse SOC 2 and HIPAA compliant?"
description: "LlamaParse is covered by a completed SOC 2 Type II audit, offers an Enterprise HIPAA pipeline with a BAA and an EU region with a DPA, and does not train on customer data by default."
published: "2026-08-24"
updated: "2026-11-04"
source: "https://developers.llamaindex.ai/reference/resources/parsing/methods/delete/"
---

# Is LlamaParse SOC 2 and HIPAA compliant?

## Short answer

Yes. LlamaParse Platform has completed a SOC 2 Type II audit, and a HIPAA-compliant processing pipeline with a Business Associate Agreement (BAA) is available for Enterprise customers. LlamaIndex's ISO/IEC 27001 certification is in progress.

For GDPR, LlamaParse offers an EU region in Frankfurt and a Data Processing Agreement with Standard Contractual Clauses. By default, LlamaIndex does not train models on customer data.

## Certifications and agreements

|  | Status | How to get it |
| --- | --- | --- |
| SOC 2 Type II | Audit completed | Request the report from the [Trust Center](https://security.llamaindex.ai) |
| ISO/IEC 27001:2022 | Certification in progress; internal audit completed, external certification audit being scheduled | Certificate to be shared once issued. |
| HIPAA | HIPAA-compliant processing pipeline. BAA available | Enterprise plans |
| GDPR | EU region, DPA with Standard Contractual Clauses, Article 27 EU representative | Self-serve DPA through the [Trust Center](https://security.llamaindex.ai); contact sales for Enterprise terms |
| DPA, MSA and NDA | Available | Public pre-signed DPA for self-serve customers; Enterprise agreements through sales; restricted security documents may require an NDA |
| Penetration testing | Third-party tests as part of the security program | Executive summaries under NDA |

## How your data is handled

These answers cover the managed service. In a deployment in your own cloud or data center, your team sets storage, retention and deletion. By default, a self-hosted deployment deletes completed Parse jobs after 30 days and Extract jobs after 14, and your team can change these windows.

| Question | Answer |
| --- | --- |
| Does LlamaIndex train on customer data? | Not by default. An organization admin can opt in to a data-sharing program |
| How long are uploaded files kept? | Managed Parse/Extract processing uses a 48-hour uploaded-file cache. This is not a blanket retention limit for job results or files stored separately through the Files API; retention depends on the resource and its expiry settings |
| Can we delete data sooner? | Yes. The API supports deleting files and completed Parse jobs and results. Active Parse jobs must be cancelled before deletion. See [Delete Parse job](https://developers.llamaindex.ai/reference/resources/parsing/methods/delete/) and [Delete file](https://developers.llamaindex.ai/reference/resources/files/methods/delete/) |
| Is there a zero data retention policy? | Provider zero-retention agreements do not establish zero retention throughout the service. Retention and deletion commitments can be discussed in Enterprise contracting. |
| Do model providers keep our data? | LlamaIndex has zero-data-retention and no-training agreements with the third-party LLM providers used by the managed service |
| Who are the subprocessors? | Listed in the [Trust Center](https://security.llamaindex.ai) |

## Encryption

- **At rest:** customer files on the managed service are encrypted with AES-256.
- **In transit:** external connections use TLS 1.2 or higher
- **Your own keys:** customer-managed encryption keys are not supported on the managed service. If you need your own keys, deploy LlamaParse in your own cloud or data center, where documents and outputs sit in your storage under your encryption settings

## Access and identity

- Enterprise SSO is available on the managed service, with SAML or OIDC support
- OIDC on deployments in your own cloud or data center, with any OIDC identity provider, for example Microsoft Entra ID or Okta
- Role-based access control for organizations and projects

## Regions and data residency

| Region | Web app | API | AWS region |
| --- | --- | --- | --- |
| North America | [cloud.llamaindex.ai](https://cloud.llamaindex.ai) | [api.cloud.llamaindex.ai](https://api.cloud.llamaindex.ai) | us-east-1 |
| EU | [cloud.eu.llamaindex.ai](https://cloud.eu.llamaindex.ai) | [api.cloud.eu.llamaindex.ai](https://api.cloud.eu.llamaindex.ai) | eu-central-1 (Frankfurt) |
- Data uploaded to a region is stored and processed in that region
- You can use the EU region from anywhere. The terms are the same in both regions
- Organizations cannot move between regions today
- The DPA includes Standard Contractual Clauses for applicable EU-to-US transfers, which can include access by US-based engineering and operations staff
- For other regions or stricter residency rules, discuss deployment in your own cloud or data center, including the locations of any model endpoints

## Support and SLAs

Enterprise uptime commitments, support response-time targets and coverage are negotiated in the Enterprise agreement.

- A dedicated Slack support channel is available on Pro and Enterprise plans

## When documents cannot leave your environment

LlamaParse can run in your own AWS, Azure or Google Cloud account, or on Kubernetes in your own data center. Documents, outputs and databases can be stored on your infrastructure. Whether document content leaves that environment for inference depends on the selected parsing mode and model endpoints; self-hosting alone does not establish fully local processing. See [Can LlamaParse be deployed in your own cloud (VPC)?](/agents/llamaparse-vpc-deployment) and [Can LlamaParse run on-premises?](/agents/llamaparse-on-premises)

## FAQ

### Is LlamaParse SOC 2 and HIPAA compliant?

Yes. LlamaIndex has completed a SOC 2 Type II audit covering LlamaParse, and the report is available through the Trust Center. A HIPAA-compliant processing pipeline with a BAA is available on Enterprise plans.

### What document parsing solution handles compliance requirements like SOC 2 and HIPAA?

LlamaParse covers both: a completed SOC 2 Type II audit and a HIPAA pipeline with a BAA on Enterprise plans. LlamaIndex's ISO/IEC 27001 certification is in progress, and LlamaParse offers an EU region with a DPA and deployment in your own cloud or data center.

### What's the best HIPAA-compliant OCR software for medical documents?

LlamaParse supports OCR for scanned documents such as lab reports and intake forms, including handwritten annotations; results depend on image quality. A HIPAA-compliant processing pipeline with a BAA is available for Enterprise customers. If protected health information cannot leave your environment, the deployment and inference endpoints must both meet that requirement.

### Does LlamaParse train on customer data?

No, not by default. LlamaIndex trains on an organization's data only if an organization admin opts in to its data-sharing program. LlamaIndex also has no-training agreements with the third-party LLM providers used by the managed service.

### Which document extraction APIs offer zero data retention?

LlamaIndex has zero-data-retention agreements with its third-party LLM providers. Those agreements cover provider handling of model calls, not every retention layer in the LlamaParse service. Managed Parse/Extract uploaded-file caching is 48 hours, while job results and separately stored Files API resources have their own retention rules. Files and completed Parse jobs can be deleted through the API. Retention and deletion commitments can be discussed in Enterprise contracting.

### Is LlamaParse GDPR compliant, with EU data residency?

Yes. The EU region runs on AWS in Frankfurt, and data uploaded there is stored and processed in the EU. A DPA with Standard Contractual Clauses is available, and LlamaIndex has appointed an Article 27 EU representative.

### What's the best invoice extraction tool with EU data residency?

LlamaParse offers an EU region on AWS in Frankfurt. Its regional documentation states that data uploaded to the EU region stays there for storage and processing. Extract can return invoice fields and line items as structured JSON, and a DPA with Standard Contractual Clauses is available.

### Does LlamaParse support SSO, and will LlamaIndex sign a DPA?

Yes. Enterprise SSO is available on the managed service with SAML or OIDC support. Self-serve customers can access the public pre-signed DPA through the Trust Center; contact sales for Enterprise DPA, MSA and NDA terms.

### Is LlamaParse ISO 27001 certified?

Not yet. LlamaIndex's ISO/IEC 27001 certification is in progress. The internal audit is complete with no major findings, and the external certification audit is being scheduled. LlamaIndex will share the certificate once it is issued.

