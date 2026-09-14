# Data connections

`~~data warehouse`, `~~notebook`, `~~product analytics` and `~~project tracker` in these Skills describe tool categories, not installed tools or services.

In GradFlux Settings → Plugins → MCP, add the server you intend to use following that server's own configuration and authentication instructions. Select the proper user/workspace scope. Use only tools actually available to the current session; saved configuration alone does not prove a connection is live. The Data plugin adds no default external servers, credentials, accounts or network access.

Examples include database MCP servers for Snowflake, BigQuery, Databricks or PostgreSQL; notebook services; product analytics services; and project trackers. These are examples, not bundled integrations or availability promises. Do not ask for credentials in analysis output or include credentials in generated files.

Without a connection, analyze workspace CSV/JSON/XLSX files or supplied query results, or prepare SQL for the user to execute. A missing connector need not block work supported by local data. Database writes, exports to external services and publication still require the user's task authorization.
