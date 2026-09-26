# Curated MCP directory

`curated.json` is the single reviewed source served to GradFlux Discover.
It contains public vendor-hosted Streamable HTTP endpoints, not executable
plugins or a mirror of the entire MCP Registry. GF remains responsible for
configuration, credentials, authorization and connections. No vendor tools run
while publishing or reviewing the directory.

## Update and publish

Edit the catalog through a reviewed commit. Keep `id` stable, increment `revision`
when an endpoint or authentication requirement changes, and update `updatedAt`
when the directory is reviewed. A revision is a **configuration revision**, not
a vendor server version. `authentication` is setup guidance, never evidence of a
successful sign-in. The documented account/plan limits still apply.

The publish workflow deploys only `mcp/curated.json` to GitHub Pages on a relevant
push to main or manual dispatch. The desktop URL is
`https://pxcg.github.io/gradflux-plugins/mcp/curated.json`.
There is no hourly Registry download or automatic promotion of upstream entries.
Small JSON is committed directly; no gzip generation, hashes or second snapshot.

The weekly/manual Hermes review workflow compares `optional-mcps/` with the Git
commit in `hermes-ref.txt`, and uploads a diff and upstream commit as an Actions
artifact. It cannot edit this catalog, create configurations or deploy Pages.
After reviewing changes against current vendor documentation and GF authentication
support, edit selected entries and advance the reference in the same reviewed
commit. A failing fetch/diff fails the job rather than accepting an empty result.

## Selection evidence (2026-09-26)

Candidates came from [Hermes optional-mcps](https://github.com/NousResearch/hermes-agent/tree/7dc796463d543a57270779b7f71f37f18b6faa5e/optional-mcps).
Each entry's `documentationUrl` identifies its current vendor contract:

- Notion, Linear, Sentry: public remote MCP with native OAuth/DCR. GF uses its
  own `GradFlux` client identity and existing OAuth owner. Real account approval
  and vendor-specific end-to-end operation are not certified by inclusion.
- Context7: documented anonymous tier at `/mcp`; optional API keys/higher limits
  remain the user's existing configuration responsibility.
- DeepWiki: public repository access without an account.
- GitHub is kept in GF's existing PAT connector, not duplicated here.
- Canva is deferred: current vendor docs require app access/redirect approval;
  Hermes's older generic DCR assumption is insufficient for GradFlux.
- Figma is deferred: Hermes documents a client-name workaround; GradFlux does not
  impersonate another product. Gmail/platform gateways are not public endpoints
  established by this review. Local server packages remain manually configurable
  in GF, but are outside this first curated remote catalog.

Names, descriptions and publisher labels are display metadata, not a verified
badge or an availability guarantee. Recommendations are editorial selection.
Categories are not inferred from service names; no category UI is added here.

## Attribution

Selection/configuration references: Hermes Agent, MIT, copyright 2025 Nous Research;
see `HERMES-LICENSE`. Descriptions here are independently written.
Notion, Context7 and DeepWiki icon URLs come from their public website icon links.
Linear and Sentry use the mature Simple Icons marks (as Hermes does), hosted by
Simple Icons; brands remain their owners' trademarks. No private hostname is
sent to a favicon lookup service. Service and icon usage terms remain applicable.
