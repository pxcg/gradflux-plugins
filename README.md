# GradFlux 插件

GradFlux 官方可选插件与 Skills 的发布来源。

## 在 GradFlux 中添加

在设置 → 插件 → 市场来源中添加：

```text
https://github.com/pxcg/gradflux-plugins.git
```

当前可选插件为 [GradFlux Data](plugins/data/README.md)（`data`，1.0.2）：10 个数据分析 Skill。随包 `gradflux-skills` 继续由应用交付，不在这里重复安装。GitHub 插件尚未发布。

公开仓库可通过同一 HTTPS 地址匿名访问。MCP 精选目录单独维护在 [mcp/](mcp/README.md)，不与插件清单混合。

## 插件组织

插件放在 `plugins/<插件名称>/`，使用 `.gradflux-plugin/plugin.json` 清单，Skill 放在插件的 `skills/` 中，必要脚本与插件一起交付。市场入口为 `.gradflux-plugin/marketplace.json`。

每个插件使用自己的版本；已发布版本修改内容时必须增加版本。需要执行代码的插件应说明实际依赖，使用系统、项目或虚拟环境中的工具，不要求固定的 GradFlux 共享依赖包。

这里不维护占位或演示插件；每个公开条目必须完成实际安装、使用与卸载验证后再加入目录。
