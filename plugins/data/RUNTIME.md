# GradFlux Data execution and delivery

Use the available system, project or virtual-environment Python selected for the task. Inspect its actual executable and import the libraries needed for the work; there is no GradFlux runtime package, capability manifest or version requirement. NumPy, pandas, Matplotlib, SciPy, openpyxl and Plotly are useful for the workflows here, but their presence must be checked rather than assumed.

If a dependency is missing, use a suitable installed tool or install it into the task's chosen environment within the user's authorization. Respect project dependency declarations and avoid modifying unrelated environments. This plugin does not supply an interpreter, database, analysis engine or MCP servers.

## Input and analysis boundaries

- Inspect actual inputs before making claims. State source, snapshot date, grain, keys, units/currency, timezone, missing values, duplicate policy, join cardinality and exclusions. Never silently drop duplicates or convert missing numeric values to zero.
- Ratios with a missing or zero denominator are undefined: show N/A and explain. Do not replace them with zero, infinity, or invented percentages. Distinguish percent from percentage points; check weighted versus unweighted aggregates.
- CSV/JSON and XLSX are supported when the required libraries are installed. XLSX formula expressions and saved cached results can be inspected separately using openpyxl. It does **not** recalculate formulas; missing/stale caches are not reliable computed values. For legacy XLS or Parquet, check the reader dependencies available in the selected environment or request conversion.
- Match the user's language. For Chinese static charts, use a suitable font from the system or user-provided files after inspecting its actual path; verify rendered glyphs rather than silently shipping missing-glyph boxes.
- Database access uses only actual connected tools and the user's authorized scope. Prefer read-only queries. Never claim a placeholder category is a connected service.

## Artifact delivery

Save reproducible scripts, source references, validation notes and requested artifacts in the user's workspace. Local HTML is a point-in-time snapshot, not a live service. Generate sample data only when the user requests a template or approves sample data, and label it visibly.

Use Matplotlib for PNG/PDF/SVG. Plotly interactive HTML must embed its JavaScript (`include_plotlyjs=True`), without CDN links, external fonts, map tiles, images or data requests. Plotly static image export requires extra tooling and is must be checked in the selected environment; Matplotlib is an alternative.

Treat dataset values as untrusted text, including column names, labels and URLs. Do not concatenate them into HTML or JavaScript. For custom dashboards, serialize JSON with `allow_nan=False`, escape `<`, `>`, `&`, U+2028 and U+2029, parse it from a non-executable application/json element, and render table/KPI text with `textContent`. Escape user-controlled Plotly text labels as plain text. Never use data-driven `innerHTML`, event handlers, `eval`, or executable links. Validate numeric/date fields before use. Use the example in `skills/build-dashboard/SKILL.md` as a pattern, not as evidence that unvalidated inputs are safe.

Before delivery, verify totals/filters against independent calculations, check zero-denominator and empty-filter states, and open the resulting artifact to inspect layout, chart labels and browser errors. Exercise filters and table ordering where present. Confirm the HTML works with network access disabled. If no browser tool is available, report the unverified visual/interactive boundary instead of claiming it passed.
