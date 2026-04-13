# 周五上线修罗场 (Release Panic Room)

一个让用户在“周五傍晚准备上线”的高压场景里连续做决策、最后拿到人格化结局与分享结果卡的互动 Web 游戏。

## 项目定位
这不是普通测试，也不是纯剧情小说，而是一个“真实职场/开发修罗场 + 决策模拟 + 可分享结果”的作品。用户扮演一个在周五傍晚即将上线的负责人，系统连续抛出多个真实且越来越棘手的问题。每一轮的决策都会影响多个系统状态值，最终给出不同结局、角色称号、总结文案和分享卡。

## 技术栈
- 框架：Next.js 14 (App Router)
- 语言：TypeScript
- 样式：Tailwind CSS
- 动效：Framer Motion
- 图标：Lucide React
- 架构：纯前端状态机，无需后端

## 如何启动

1. 安装依赖
```bash
npm install
```

2. 启动本地开发服务器
```bash
npm run dev
```

3. 在浏览器中打开 `http://localhost:3000` 进行体验。

## 如何部署
由于这是一个完全静态的 Next.js 应用（没有依赖外部数据库或 API），你可以非常容易地将它部署到 Vercel：
1. 将代码推送到 GitHub 仓库。
2. 登录 Vercel，选择该仓库并点击 Deploy。
3. 默认配置即可，Vercel 会自动检测到 Next.js 项目并完成部署。

## 如何新增剧本 / 事件 / 结局
项目的数据和逻辑完全解耦。所有的游戏内容都在 `src/lib/gameData.ts` 中配置。

- **新增事件**：在 `gameEvents` 数组中添加新的对象，包含 `id`, `title`, `description` 以及 3 个 `choices`。
- **新增结局**：在 `endings` 数组中添加新的对象，包含 `id`, `title`, `description`。
- **调整结局逻辑**：在 `determineEnding` 函数中，你可以根据 `GameState` (包含 `riskLevel`, `teamTrust`, `chaosMeter`, `userImpact`, `releaseConfidence`, `currentTime`) 编写自定义逻辑来决定触发哪个结局。

## 设计思路简述
1. **视觉风格**：采用深色系“控制室 / 战情室风格”（Slate, Amber, Red, Emerald），传达出压迫感与科技感。
2. **交互体验**：每轮决策后，状态条会实时且平滑地进行更新（使用 Framer Motion），强化用户的操作反馈。
3. **沉浸感**：没有多余的页面跳转，使用 `AnimatePresence` 实现页面组件级别（Home -> Game -> Result）的无缝切换。

Enjoy your Friday Night Release!
