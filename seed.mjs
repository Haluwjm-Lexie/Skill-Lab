export const seedSkills=[
  {
    "id": "research-notes",
    "files": {
      "SKILL.md": "---\nname: research-notes\ndescription: 把资料整理成可验证的研究笔记\n---\n# research-notes\n\n## 输入\n用户提供的资料与研究问题。\n\n## 步骤\n1. 阅读 references/template.md。\n2. 区分事实、推断和待验证内容。\n3. 按模板整理笔记，不编造资料中没有的信息。\n\n## 输出要求\n输出 3 条要点，每条附一个验证方法。\n",
      "references/template.md": "# 结果模板\n\n## 核心要点\n\n## 证据与来源\n\n## 待验证事项\n"
    },
    "source": "内置示例"
  },
  {
    "id": "resume-review",
    "files": {
      "SKILL.md": "---\nname: resume-review\ndescription: 根据岗位要求检查简历表达\n---\n# resume-review\n\n## 输入\n简历片段与目标岗位要求。\n\n## 步骤\n1. 提取岗位能力要求。\n2. 匹配已有经历。\n3. 提出具体改写建议，不虚构数据或工作经历。\n\n## 输出要求\n给出 3 条建议，每条包含原句、修改方向和理由。\n",
      "references/template.md": "# 结果模板\n\n## 核心要点\n\n## 证据与来源\n\n## 待验证事项\n"
    },
    "source": "内置示例"
  },
  {
    "id": "article-to-cards",
    "files": {
      "SKILL.md": "---\nname: article-to-cards\ndescription: 将文章整理成便于复习的学习卡片\n---\n# article-to-cards\n\n## 输入\n一篇文章。\n\n## 步骤\n1. 提取核心概念与关键事实。\n2. 写成问题和答案。\n3. 标记需要补充信息的地方。\n\n## 输出要求\n输出 5 张卡片，语言简洁，不添加原文没有的事实。\n",
      "references/template.md": "# 结果模板\n\n## 核心要点\n\n## 证据与来源\n\n## 待验证事项\n"
    },
    "source": "内置示例"
  }
];
