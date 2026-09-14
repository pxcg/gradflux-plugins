# GradFlux Data

GradFlux 官方可选数据分析插件：探索数据、编写 SQL、统计分析、制作图表和离线交互看板，并检查分析质量。插件不随应用安装；其工作流基于 Anthropic Data，来源与修改见 [NOTICE.md](NOTICE.md)。

在 GradFlux 设置的插件市场中添加 `https://github.com/pxcg/gradflux-plugins.git`，然后安装 **data**。私有测试期间需要仓库访问权限及本机 Git 凭据。插件标识为 `data@gradflux-plugins`，各 Skill 使用实际显示的插件命名空间调用。

| Skill | 用途 |
| --- | --- |
| analyze | 回答数据问题、分解分析和组织报告 |
| explore-data | 数据形态、缺失、重复及分布探索 |
| write-query | 按实际数据库方言编写 SQL |
| sql-queries | SQL 模式、性能与方言参考 |
| create-viz | 制作静态或交互图表 |
| data-visualization | 图表选择、样式、可访问性与代码模式 |
| build-dashboard | 制作离线 HTML 看板 |
| statistical-analysis | 描述统计、趋势、异常与假设检验 |
| validate-data | 方法、口径、计算、图表与交付检查 |
| data-context-extractor | 提炼企业数据口径、实体及查询知识，保存为项目 Skill |

代码执行需要支持 `data` 能力的 GradFlux 工作环境（1.1 起），首次使用前按 [运行指引](RUNTIME.md) 查询；不复制 Python 到插件、不向公共环境安装包。支持 CSV、JSON、XLSX 数据分析，不承诺 XLS 或 Excel 公式重算。离线看板使用内嵌 Plotly；静态输出使用 Matplotlib。

[数据连接](CONNECTORS.md)由用户配置，插件不默认安装外部 MCP。没有数据库连接时也能处理本地数据。`data-context-extractor` 只负责数据领域知识，不替代通用 `skill-creator`；项目知识保存到 `.gradflux/skills/<name>/`。
