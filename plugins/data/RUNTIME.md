# GradFlux Data execution and delivery

Before executing Python, use the current **Node executable** and **Workspace runtime query** paths injected by GF into the Skill context:

```text
'<Node executable>' '<Workspace runtime query>' data
```

These are placeholders for the injected absolute paths, not literal commands. Quote paths for the active shell. Parse the returned JSON: `python` is the executable to use; `root` is the managed runtime root; `capabilities` must contain `data`; `bundleVersion` identifies the installed environment. `data` is the shared PDF/font resource directory, **not** an input dataset or this plugin's directory. Do not guess executable paths, use `python` from PATH, or copy paths from another machine. If injected paths are absent, explain that the current GF host needs updating; do not invent them.

The query is read-only. A missing environment or missing `data` capability requires the user to update/install the work environment in GradFlux Settings. Do not continue using a PDF-only environment. GradFlux Data requires runtime 1.1 or later within the GF-supported runtime series, with `data` capability. The capability check is authoritative.

Use the returned Python for every script and package check. Included libraries are NumPy, pandas, Matplotlib, SciPy, openpyxl and Plotly. Do not run pip into the managed runtime. If the task needs another dependency, report it; use an explicitly authorized workspace-local environment or an available connector, without changing the shared environment. This plugin does not supply its own runtime, database, analysis engine, or MCP servers.

## Input and analysis boundaries

- Inspect actual inputs before making claims. State source, snapshot date, grain, keys, units/currency, timezone, missing values, duplicate policy, join cardinality and exclusions. Never silently drop duplicates or convert missing numeric values to zero.
- Ratios with a missing or zero denominator are undefined: show N/A and explain. Do not replace them with zero, infinity, or invented percentages. Distinguish percent from percentage points; check weighted versus unweighted aggregates.
- CSV/JSON and XLSX are supported by the included stack. XLSX formula expressions and saved cached results can be inspected separately using openpyxl. It does **not** recalculate formulas; missing/stale caches are not reliable computed values. Legacy XLS and Parquet are not included capabilities: request conversion or identify the needed additional dependency.
- Match the user's language. For Chinese static charts, use a suitable font under the returned shared `data` directory after inspecting it; verify rendered glyphs rather than silently shipping missing-glyph boxes.
- Database access uses only actual connected tools and the user's authorized scope. Prefer read-only queries. Never claim a placeholder category is a connected service.

## Artifact delivery

Save reproducible scripts, source references, validation notes and requested artifacts in the user's workspace. Local HTML is a point-in-time snapshot, not a live service. Generate sample data only when the user requests a template or approves sample data, and label it visibly.

Use Matplotlib for PNG/PDF/SVG. Plotly interactive HTML must embed its JavaScript (`include_plotlyjs=True`), without CDN links, external fonts, map tiles, images or data requests. Plotly static image export requires extra tooling and is not promised by this environment; use Matplotlib instead.

Treat dataset values as untrusted text, including column names, labels and URLs. Do not concatenate them into HTML or JavaScript. For custom dashboards, serialize JSON with `allow_nan=False`, escape `<`, `>`, `&`, U+2028 and U+2029, parse it from a non-executable application/json element, and render table/KPI text with `textContent`. Escape user-controlled Plotly text labels as plain text. Never use data-driven `innerHTML`, event handlers, `eval`, or executable links. Validate numeric/date fields before use. Use the example in `skills/build-dashboard/SKILL.md` as a pattern, not as evidence that unvalidated inputs are safe.

Before delivery, verify totals/filters against independent calculations, check zero-denominator and empty-filter states, and open the resulting artifact to inspect layout, chart labels and browser errors. Exercise filters and table ordering where present. Confirm the HTML works with network access disabled. If no browser tool is available, report the unverified visual/interactive boundary instead of claiming it passed.
