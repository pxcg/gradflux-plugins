# GradFlux 插件

GradFlux 官方可选插件与 Skills 的发布来源。

## 在 GradFlux 中添加

在设置 → 插件 → 市场来源中添加：

```text
https://github.com/pxcg/gradflux-plugins.git
```

当前目录为空，这是有效的市场状态。随包 `gradflux-skills` 继续由应用交付，不在这里重复安装。Data 和 GitHub 插件尚未发布。

测试期间仓库保持私有，访问需 GitHub 授权与本机 Git 凭据；公开后同一 HTTPS 地址可匿名使用，无须更改市场地址。

## 插件组织

后续插件放在 `plugins/<插件名称>/`，使用 `.gradflux-plugin/plugin.json` 清单，Skill 放在插件的 `skills/` 中，必要脚本与插件一起交付。市场入口为 `.gradflux-plugin/marketplace.json`。

每个插件使用自己的版本；已发布版本修改内容时必须增加版本。需要工作环境的插件须注明兼容要求，Python 等大型依赖由 [GradFlux 工作环境](https://github.com/pxcg/gradflux-runtimes) 单独交付，不重复塞进插件。

这里不维护占位或演示插件；每个公开条目必须完成实际安装、使用与卸载验证后再加入目录。
