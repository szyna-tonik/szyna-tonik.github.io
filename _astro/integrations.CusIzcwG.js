var e=`from llama_cloud import LlamaCloud

client = LlamaCloud()

file = client.files.create(
    file="document.pdf",
    purpose="parse"
)

result = client.parsing.parse(
    file_id=file.id,
    tier="agentic",
    version="latest",
    expand=["markdown"]
)

print(result.markdown.pages[0].markdown)`,t=`import LlamaCloud from '@llamaindex/llama-cloud';


const client = new LlamaCloud();

const file = await client.files.create({
  file: fs.createReadStream('document.pdf'),
  purpose: 'parse',
});

const result = await client.parsing.parse({
  file_id: file.id,
  tier: 'agentic',
  version: 'latest',
  expand: ['markdown'],
});

const [page] = result.markdown?.pages ?? [];

if (page?.success) {
  console.log(page.markdown);
}`,n=`# Upload the document
curl -X POST \\
  https://api.cloud.llamaindex.ai/api/v1/beta/files \\
  -H 'Accept: application/json' \\
  -H "Authorization: Bearer $LLAMA_CLOUD_API_KEY" \\
  -F 'purpose=parse' \\
  -F 'file=@document.pdf;type=application/pdf'

# Start a Parse job with the returned file id
curl -X POST \\
  'https://api.cloud.llamaindex.ai/api/v2/parse' \\
  -H 'Accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $LLAMA_CLOUD_API_KEY" \\
  --data '{
    "file_id": "<file_id>",
    "tier": "agentic",
    "version": "latest"
  }'

# Fetch the markdown once the job completes
curl -X GET \\
  'https://api.cloud.llamaindex.ai/api/v2/parse/<job_id>?expand=markdown' \\
  -H 'Accept: application/json' \\
  -H "Authorization: Bearer $LLAMA_CLOUD_API_KEY"`,r={llamaparse:[{key:`sdk`,name:`SDK`,lead:`Parse and extract from your own code, in Python or TypeScript.`,tabs:{Python:e,TypeScript:t}},{key:`api`,name:`API`,lead:`Call the platform over the REST API, from any language.`,tabs:{"REST API":n}},{key:`agents`,name:`MCP & Agents`,lead:`Give Claude Code, Codex or any MCP client the platform as tools, with plugins and skills.`,tabs:{MCP:`# One server for Parse, Classify, Extract, Split and Index
# Claude Code
claude mcp add --transport http llamaparse https://mcp.llamaindex.ai/mcp

# Codex
codex mcp add llamaparse --url https://mcp.llamaindex.ai/mcp

# Cursor, VS Code and other MCP clients: add it to the MCP config
{
  "mcpServers": {
    "llamaparse": {
      "type": "http",
      "url": "https://mcp.llamaindex.ai/mcp"
    }
  }
}

# Sign in on first use, or send an API key:
# --header "Authorization: Bearer $LLAMA_CLOUD_API_KEY"
# Docs: https://developers.llamaindex.ai/llamaparse/for-agents/mcp/`,Plugins:`# Claude Code: add the marketplace, then enable a plugin
/plugin marketplace add run-llama/llamaparse-agent-plugins
/llamaparse-mcp:llamaparse-mcp

# Codex: add the marketplace, then enable the plugins
# you want through Codex's plugin management
codex plugin marketplace add run-llama/llamaparse-agent-plugins

# llamaparse: cloud parsing, needs an API key
# llamaparse-mcp: a skill plus the LlamaParse MCP (sign in on first use)
# llamaparse-mcp-eu: the same for accounts in Europe
# liteparse: local parsing, no authentication
# Docs: https://developers.llamaindex.ai/llamaparse/for-agents/skills/`,Skills:`# Install both LlamaParse skills with the skills CLI
npx skills add run-llama/llamaparse-agent-skills

# or one of them
npx skills add run-llama/llamaparse-agent-skills --skill llamaparse
npx skills add run-llama/llamaparse-agent-skills --skill liteparse

# llamaparse: cloud parsing, needs LLAMA_CLOUD_API_KEY and Node 18+
# liteparse: local parsing, no API key
# Docs: https://developers.llamaindex.ai/llamaparse/for-agents/skills/`}}],parse:[{key:`sdk`,name:`SDK`,lead:`Parse from your own code, in Python or TypeScript.`,tabs:{Python:e,TypeScript:t}},{key:`api`,name:`API`,lead:`Parse over the REST API v2, from any language.`,tabs:{"REST API":n}},{key:`agents`,name:`MCP & Agents`,lead:`The Parse MCP server, and the LlamaParse plugin and skill for coding agents.`,tabs:{MCP:`# Parse tools only: parseFile, parseWithLiteParse, estimateFileComplexity
# Claude Code
claude mcp add --transport http llamaparse-parse https://mcp.llamaindex.ai/parse/mcp

# Codex
codex mcp add llamaparse-parse --url https://mcp.llamaindex.ai/parse/mcp

# Cursor, VS Code and other MCP clients: add it to the MCP config
{
  "mcpServers": {
    "llamaparse-parse": {
      "type": "http",
      "url": "https://mcp.llamaindex.ai/parse/mcp"
    }
  }
}

# Sign in on first use, or send an API key:
# --header "Authorization: Bearer $LLAMA_CLOUD_API_KEY"
# Docs: https://developers.llamaindex.ai/llamaparse/for-agents/mcp/`,Plugins:`# Claude Code: add the marketplace, then enable a plugin
/plugin marketplace add run-llama/llamaparse-agent-plugins
/llamaparse:llamaparse
/llamaparse-mcp:llamaparse-mcp

# Codex: add the marketplace, then enable the plugins
# you want through Codex's plugin management
codex plugin marketplace add run-llama/llamaparse-agent-plugins

# llamaparse: the Parse skill, needs an API key
# llamaparse-mcp: a skill plus the LlamaParse MCP (sign in on first use)
# Docs: https://developers.llamaindex.ai/llamaparse/for-agents/skills/`,Skills:`# Teach your coding agent to parse documents with Parse
npx skills add run-llama/llamaparse-agent-skills --skill llamaparse

# Needs LLAMA_CLOUD_API_KEY, Node 18+ and npm
# Docs: https://developers.llamaindex.ai/llamaparse/for-agents/skills/`}}],extract:[{key:`sdk`,name:`SDK`,lead:`Run Extract with a Pydantic or Zod schema, in Python or TypeScript.`,tabs:{Python:`from pydantic import BaseModel, Field
from llama_cloud import LlamaCloud

class Resume(BaseModel):
    name: str = Field(description="Full name of candidate")
    email: str = Field(description="Email address")
    skills: list[str] = Field(description="Technical skills")

client = LlamaCloud()

file = client.files.create(
    file="resume.pdf",
    purpose="extract"
)

job = client.extract.run(
    file_input=file.id,
    configuration={
        "data_schema": Resume.model_json_schema(),
        "tier": "agentic",
    },
)

print(job.extract_result)`,TypeScript:`import LlamaCloud from '@llamaindex/llama-cloud';



const ResumeSchema = z.object({
  name: z.string().describe('Full name of candidate'),
  email: z.string().describe('Email address'),
  skills: z.array(z.string()).describe('Technical skills'),
});

const client = new LlamaCloud();

const file = await client.files.create({
  file: fs.createReadStream('resume.pdf'),
  purpose: 'extract',
});

let job = await client.extract.run({
  file_input: file.id,
  configuration: {
    data_schema: z.toJSONSchema(ResumeSchema) as LlamaCloud.Extract.ExtractConfiguration['data_schema'],
    tier: 'agentic',
  },
});

console.log(job.extract_result);`}},{key:`api`,name:`API`,lead:`Run Extract over the REST API v2, from any language.`,tabs:{"REST API":`# Upload the document
curl -X 'POST' \\
  'https://api.cloud.llamaindex.ai/api/v1/beta/files' \\
  -H 'Content-Type: multipart/form-data' \\
  -H "Authorization: Bearer $LLAMA_CLOUD_API_KEY" \\
  -F 'file=@resume.pdf' \\
  -F purpose='extract'

# Run Extract with an inline JSON schema
curl -X 'POST' \\
  'https://api.cloud.llamaindex.ai/api/v2/extract?project_id={PROJECT_ID}' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $LLAMA_CLOUD_API_KEY" \\
  -d '{
    "file_input": "{FILE_ID}",
    "configuration": {
      "tier": "agentic",
      "data_schema": {
        "type": "object",
        "properties": {
          "name": { "type": "string", "description": "Full name of candidate" },
          "email": { "type": "string", "description": "Email address" },
          "skills": { "type": "array", "items": { "type": "string" }, "description": "Technical skills" }
        }
      }
    }
  }'`}},{key:`agents`,name:`MCP & Agents`,lead:`The Extract MCP server, and the LlamaParse MCP plugin for coding agents.`,tabs:{MCP:`# Extract tools only: schema templates, extraction configurations, extractFile
# Claude Code
claude mcp add --transport http llamaparse-extract https://mcp.llamaindex.ai/extract/mcp

# Codex
codex mcp add llamaparse-extract --url https://mcp.llamaindex.ai/extract/mcp

# Pin one saved extraction configuration: the agent runs extractFile with it
{
  "mcpServers": {
    "extract-folder-1": {
      "type": "http",
      "url": "https://mcp.llamaindex.ai/extract/EXTRACT_CONFIG_ID/mcp"
    }
  }
}

# Docs: https://developers.llamaindex.ai/llamaparse/for-agents/mcp/`,Plugins:`# Claude Code: add the marketplace, then enable a plugin
/plugin marketplace add run-llama/llamaparse-agent-plugins
/llamaparse-mcp:llamaparse-mcp

# Codex: add the marketplace, then enable the plugins
# you want through Codex's plugin management
codex plugin marketplace add run-llama/llamaparse-agent-plugins

# llamaparse-mcp bundles a skill with the LlamaParse MCP,
# Extract tools included (sign in on first use)
# Docs: https://developers.llamaindex.ai/llamaparse/for-agents/skills/`}}],liteparse:[{key:`sdk`,name:`SDK`,lead:`Parse locally from Python, TypeScript or the lit command line.`,tabs:{Python:`# pip install liteparse
from liteparse import LiteParse

parser = LiteParse()
result = parser.parse("document.pdf")

# Full document text
print(result.text)

# Per-page data
for page in result.pages:
    print(f"Page {page.page_num}: {len(page.text_items)} text items")`,TypeScript:`// npm install @llamaindex/liteparse
import { LiteParse } from "@llamaindex/liteparse";

const parser = new LiteParse({ ocrEnabled: true });
const result = await parser.parse("document.pdf");

// Full document text with layout preserved
console.log(result.text);

// Per-page data
for (const page of result.pages) {
  console.log(\`Page \${page.pageNum}: \${page.textItems.length} text items\`);
}`,CLI:`npm i -g @llamaindex/liteparse

# Parse a PDF and print text to stdout
lit parse document.pdf

# Render to Markdown (headings, tables, lists, images, links)
lit parse document.pdf --format markdown -o output.md

# Structured JSON with bounding boxes
lit parse document.pdf --format json -o output.json

# Parse a whole folder
lit batch-parse ./pdfs ./outputs`}},{key:`agents`,name:`MCP & Agents`,lead:`The LiteParse plugin and skill for Claude Code, Codex and other coding agents.`,tabs:{Plugins:`# Claude Code: add the marketplace, then enable a plugin
/plugin marketplace add run-llama/llamaparse-agent-plugins
/liteparse:liteparse

# Codex: add the marketplace, then enable the plugins
# you want through Codex's plugin management
codex plugin marketplace add run-llama/llamaparse-agent-plugins

# liteparse: parse PDFs, Office docs and images locally,
# no authentication
# Docs: https://developers.llamaindex.ai/llamaparse/for-agents/skills/`,Skills:`# Give Claude Code, Cursor or Codex local document parsing
npx skills add run-llama/llamaparse-agent-skills --skill liteparse

# The skill drives the lit CLI, so install it too (Node 18+)
npm i -g @llamaindex/liteparse

# No API key: everything runs on your machine
# Docs: https://developers.llamaindex.ai/liteparse/guides/agent-skill/`}}]};function i(e){return Object.fromEntries((r[e]||[]).map(t=>[`${e}-${t.key}`,t.tabs]))}document.querySelectorAll(`.integ__ways`).forEach(e=>{let t=[...e.querySelectorAll(`[role=tab]`)];if(!t.length)return;let n=e=>document.getElementById(e.getAttribute(`aria-controls`));function r(e,r){t.forEach((t,r)=>{let i=r===e,a=n(t);if(t.setAttribute(`aria-selected`,i),t.tabIndex=i?0:-1,a.setAttribute(`aria-hidden`,!i),i){a.removeAttribute(`inert`);let e=a.querySelector(`.tab[aria-selected="true"]`);e&&e.click()}else a.setAttribute(`inert`,``)}),r&&t[e].focus()}t.forEach((e,t)=>e.addEventListener(`click`,()=>{e.getAttribute(`aria-selected`)!==`true`&&r(t)})),e.addEventListener(`keydown`,e=>{let n=t.findIndex(e=>e.getAttribute(`aria-selected`)===`true`),i=t.length;[`ArrowDown`,`ArrowRight`].includes(e.key)&&(e.preventDefault(),r((n+1)%i,!0)),[`ArrowUp`,`ArrowLeft`].includes(e.key)&&(e.preventDefault(),r((n-1+i)%i,!0))}),t.slice(1).forEach(e=>n(e).setAttribute(`inert`,``))});export{i as t};