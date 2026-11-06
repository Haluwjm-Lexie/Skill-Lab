# 将 Skill Lab 放到 GitHub Pages

这是专门做好的在线互动演示版。你原本电脑上的 Skill Lab 完整版继续保留。

1. 解压本压缩包，打开里面的 skill-lab 文件夹，确认看到 index.html、app.js、style.css 等文件。
2. 登录自己的 GitHub，点击右上角“＋”→ New repository。
3. 仓库名称建议 skill-lab，选择 Public，创建仓库。若已有同名仓库，请先确认里面是否有其他作品，不要覆盖。
4. 在新仓库页面选择 uploading an existing file（或 Add file → Upload files）。把 skill-lab 文件夹里面的全部文件和子文件夹拖进去。注意上传的是里面的内容，不是外层文件夹或 ZIP。提交后，仓库第一页应该直接看见 index.html。
5. 点击仓库 Settings → 左侧 Pages。
6. 在 Build and deployment 中：Source 选 Deploy from a branch；Branch 选 main；目录选 /(root)，点击 Save。
7. 等待 GitHub 构建完成，在 Pages 页面点击 Visit site。首次发布可能需要几分钟；如失败，查看仓库 Actions 的报错。以 GitHub 显示的实际网站地址为准。
8. 打开网站，改一个示例要求并保存，做一次本地检查；刷新后确认修改和“实验历史”仍在。用手机打开同一网站确认布局。
9. 在 AI 简历网站的作品介绍旁加入“在线体验”按钮，链接填刚才 GitHub 显示的实际网站地址。

访客不会看到你电脑里的 Skill 或密钥。本包仅有公开示例和代码；不要往仓库加旧版 .local、个人备份、API 密钥、node_modules 或私人任务内容。

访客的数据各自保存在浏览器，彼此不共享。换设备不会自动同步；左下角“数据与备份”可自行导出和恢复 JSON。

更新时上传新的网页文件到同一仓库和路径，通常不影响该网址下浏览器保存的数据；清理浏览器或更改网站路径会影响数据可见性，请先备份。

没有接入大模型，因而不消耗你的 DeepSeek / Codex 额度。“回放示例检查”是已完成的结构检查记录，不是 AI 生成结果。

GitHub 官方发布源说明：
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
