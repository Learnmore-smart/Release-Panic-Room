# Tasks

- [x] Task 1: Initialize Next.js project: 创建 Next.js (App Router) + TypeScript + Tailwind CSS 项目，清理默认代码，配置暗色主题和核心字体。
- [x] Task 2: Define Game Data Models: 使用 TypeScript 接口定义游戏状态（GameState）、事件（GameEvent）、选项（Choice）、选项效果（Effect）以及结局（Ending）。
- [x] Task 3: Create Game Content Library: 编写 8-10 个真实的发布前事件数据（如监控警告、高优 Bug、核心同事离线等），以及 8-10 个不同结局的数据（如“冷静指挥官”、“周五纵火犯”等）。
- [x] Task 4: Implement Game Engine/State Management: 实现自定义 Hook (`useGame`) 或 Context，管理核心状态值（发布信心、风险值、团队信任、用户影响、混乱值）、当前时间（从 17:42 开始推进）、事件进度和结局计算逻辑。
- [x] Task 5: Build Landing Page (Home): 构建具有冲击力的大字号标题、副标题和“开始这一局” CTA 按钮的首页，营造战情室氛围。
- [x] Task 6: Build Main Game Screen Layout: 开发游戏主页面，包括顶部状态看板（State Dashboard）和时间线组件。
- [x] Task 7: Build Event Card Component: 开发事件卡片交互，展示事件标题、描述、3 个选项，并实现选择后的即时反馈（短评）与延迟切换下一题的微动效。
- [x] Task 8: Build Result Page & Share Card: 构建最终结算页面，展示角色称号、个性化总结、决策点评，并实现适合截图的“结果卡”组件。
- [x] Task 9: Polish UI/UX & Polish Visuals: 根据 frontend-design 和 frontend-skill 指南，优化排版、深色主题细节、加入微动画（数字变化、状态闪动），确保移动端和桌面端可用，并撰写 README.md。

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 2]
- [Task 5] depends on [Task 1]
- [Task 6] depends on [Task 4]
- [Task 7] depends on [Task 6], [Task 3]
- [Task 8] depends on [Task 4], [Task 3]
- [Task 9] depends on all previous tasks
