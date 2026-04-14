# Tasks

- [x] Task 1: Add New Endings Data: 在 `src/lib/gameData.ts` 的 `endings` 数组中新增 3 个结局对象（天才运营 Genius Operator，超人气管理 Super Popular Manager，天选背锅侠 The Chosen Scapegoat），并赋予 `imageUrl` (如 `/end_genius_op.png`, `/end_popular_mgr.png`, `/end_scapegoat.png`)。
- [x] Task 2: Refactor `determineEnding`: 重写 `determineEnding(state)` 函数。列出优先级表格，利用 `releaseConfidence`, `riskLevel`, `teamTrust`, `userImpact`, `chaosMeter` 和 `currentTime` 的组合条件，确保所有 13 个结局理论上都能被触发。避免某些结局因为条件太宽松而覆盖其他结局。
- [x] Task 3: Verify the logic: 确保代码保存并可编译，不会破坏现有的 TypeScript 类型。
- [x] Task 4: Generate Prompts: 在最后回复用户的消息中，编写中英文对应的 AI 绘图提示词（Prompts），包括原有的结局和新增的这 3 个结局，供用户拿去跑图。

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 3]