# MCP directory

`catalog.json.gz` is an automatically synchronized, complete latest-version snapshot
of the [Official MCP Registry](https://registry.modelcontextprotocol.io).
Server metadata remains in its upstream `server.json` format. It is not a set of
GradFlux plugins and does not install or execute any server during synchronization.

Run `node mcp/sync.mjs` with Node 24. The GitHub workflow runs hourly and can also
be dispatched manually. It follows all cursors and replaces the snapshot only
after a successful complete fetch. A failed job leaves the previous snapshot
intact and fails visibly in GitHub Actions. Full synchronization also removes
deleted/unlisted entries; no second incremental ledger is maintained.

GitHub Pages serves `https://pxcg.github.io/gradflux-plugins/mcp/catalog.json.gz`.
Only the generated catalog is deployed; large snapshots are not committed to Git.
The desktop reads this public compressed file. It never contacts the
upstream registry on each user's search or page change. `syncedAt` is the time of
the last successful complete fetch, not a guarantee of current service availability.
GitHub scheduled jobs may be delayed or disabled under GitHub's scheduling rules.

Registry metadata is dedicated to CC0 under the
[Registry terms](https://modelcontextprotocol.io/registry/terms-of-service).
This does not change the licenses of MCP packages or linked icons, or the terms
of remote services. This repository is not endorsed by the Official MCP Registry.
Sync code in this directory is licensed under Apache-2.0 (see ../plugins/data/LICENSE).
