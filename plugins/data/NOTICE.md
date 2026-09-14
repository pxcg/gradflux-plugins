# Source and modifications

GradFlux Data is adapted from Anthropic's `knowledge-work-plugins/data` at commit `8f877b63d26c68c0c5528e82892fe32d016a8ddc`:
https://github.com/anthropics/knowledge-work-plugins/tree/8f877b63d26c68c0c5528e82892fe32d016a8ddc/data

The upstream Apache License 2.0 is retained in LICENSE. Original authorship belongs to Anthropic and its contributors. GradFlux adaptation: 2026-09-14. This is a GradFlux product adaptation, not an Anthropic-endorsed release. The GF plugin's 1.0.0 version is independent of the upstream plugin version.

All ten upstream Skills, the four data-context reference files and its packaging script are retained. Every Skill is modified to reference the shared GF execution/data-handling contract. Product references and supported format descriptions are adapted. Changes by area:

- `analyze`, `explore-data`, `write-query`, `sql-queries`, `statistical-analysis`, `validate-data`: retain original analysis, dialect, statistical and validation workflows; add shared runtime, data quality and capability boundaries.
- `create-viz`, `data-visualization`: retain chart selection, style and accessibility guidance; replace the small seaborn usage with Matplotlib equivalents already provided by the environment; explicitly embed Plotly JavaScript for interactive output.
- `build-dashboard`: retain requirement gathering, layout, CSS, responsive design and performance guidance. Replace the Chart.js CDN implementation examples with an offline Plotly example, safe JSON/text handling, coordinated filters and table sorting. Sample data now requires user intent. This resolves the original CDN/offline contradiction rather than adding another chart engine.
- `data-context-extractor`: retain specialist schema discovery, entity/metric interviews and reference templates; write project Skills under `.gradflux/skills/`. ZIP is an optional portable copy, not a GF installation claim. Packaging rejects symlinks and output inside the source, checks actual frontmatter, and fixes hidden-parent paths so `.gradflux/skills` contents are not skipped.
- `README.md`, `CONNECTORS.md`, plugin manifest: replace Claude installation/connection instructions with GF instructions; no upstream `.mcp.json` external services are bundled. Add `RUNTIME.md` to use the GF-injected read-only workspace query and existing tools.

No Python interpreter, third-party library bundle, database credentials, dataset or network service is shipped inside this plugin. Runtime capabilities and actual tool availability determine what can execute.
