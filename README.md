# Skill Lab · 在线互动演示 1.0.0

保留 Lexie Skill Lab 的紧凑界面，用于 AI 简历作品集。纯静态网页，访客无需安装 Node.js、注册或提供 API 密钥。

## 先体验

选择 research-notes → 阅读 SKILL.md → 将“输出 3 条”改为“输出 5 条”并保存 → 本地检查 → 回放示例检查。

本地检查真实验证 YAML、名称、description、正文与文件结构，生成检查记录、产物和当次文件快照。它不执行任务、不调用模型、不执行脚本。示例回放由随包原始样例实际执行结构检查后生成，保留修改前的快照；不是 AI 实验录像，也不是现场模型生成。

## 上线

请阅读《先读我-GitHub-Pages上线.md》。上传本目录内容，使 index.html 位于仓库根目录。不要上传 ZIP 本身代替网页。

## 保存与备份

编辑和检查记录保存在当前浏览器的 localStorage，同一网站路径刷新和重新打开通常可保留。不同设备、浏览器、网址路径彼此独立；清除网站数据、隐私模式结束或浏览器策略可能移除数据。没有账号同步、云端数据库，也不会读取电脑上的旧版数据。

左下角“数据与备份”可以导出 JSON 工作区备份并恢复；同名 Skill / 同编号记录跳过，不覆盖。请定期下载备份。存储写入失败会报错，不会静默清空旧数据。

限制：最多 100 个 Skill、100 条检查历史、最近 30 次编辑备份；工作区 JSON 上限约 3 MB，实际还受浏览器配额影响。

## 导入与导出

支持 SKILL.md 单文件或文本 Skill ZIP。ZIP 压缩及解压后均最多 2 MB，最多 1000 个压缩条目；每个 Skill 最多 300 个文本文件，单文件约 500 KB。二进制图片/大型资源不适用于本演示版。GitHub 仓库请先下载 ZIP，再导入；无在线仓库下载功能。

支持导出单个 Skill ZIP、检查记录 ZIP 和完整工作区 JSON。导入不会执行任何脚本。原本本地完整版的模型调用、脚本执行、磁盘数据恢复功能不包含在这个静态演示中。

## 开发维护（访客不需要）

运行文件是 index.html、style.css、app.js、favicon.svg；无外部 CDN 依赖。源文件 app-source.mjs、store.mjs、core.mjs、seed.mjs、replay.mjs 和 vendor 一并提供。

测试：npm install 后运行 npm test。
重建：npx --yes --package=esbuild esbuild app-source.mjs --bundle --format=iife --target=es2022 --outfile=app.js

直接双击 HTML 在部分浏览器可以使用，但 file:// 存储行为不统一；正式体验请使用 GitHub Pages HTTPS 地址。

第三方依赖许可证在 vendor 中保留。页面不发送模型 API 请求；Skill 内容保存在访客自己的浏览器。历史更新日志中的 v0.x 内容描述本地版，演示版范围以本文为准。
