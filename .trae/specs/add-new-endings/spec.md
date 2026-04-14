# 增加新结局：天才运营、超人气管理及隐藏款 (Add New Endings Spec)

## Why
为了增加游戏的重玩价值和趣味性，丰富最终的结算反馈，让玩家的各种奇葩决策都有归宿。特别是补充运营视角和管理视角的结局，以及增加彩蛋隐藏结局，并确保所有的结局判定逻辑都是严密、可被触发的。

## What Changes
- 在 `endings` 数组中新增至少 3 个结局：
  - **天才运营 (Genius Operator)**：虽然技术上一塌糊涂，但靠运营手段和话术硬生生把事故包装成了“限时活动”。
  - **超人气管理 (Super Popular Manager)**：发布虽然延期，但团队士气极高，大家都被你的领袖魅力折服。
  - **天选背锅侠 (The Chosen Scapegoat)** [隐藏款]：所有的指标都在中等偏下，明明不是你的错，最后黑锅全扣在你头上。
- 更新 `determineEnding` 逻辑，**确保所有 13 个结局都有独立的、可触发的阈值条件**，而不是永远走不到某个分支。
- 整理并输出生成这些结局图片的 AI 绘图提示词 (Prompts) 供用户使用。

## Impact
- Affected code: `src/lib/gameData.ts` (增加结局定义，重构判断逻辑)

## ADDED Requirements
### Requirement: 新增结局数据
系统 SHALL 包含新的结局对象，包括 title、description 和对应的 imageUrl 占位符。

### Requirement: 结局判定逻辑重构
系统 SHALL 通过重构 `determineEnding`，使得每个结局（包括原有的和新增的）都有一个确定的、非重叠的优先级判定逻辑。

### Requirement: 图片提示词提供
完成代码修改后，在最终的回复中向用户提供用于生成这些人格图片的高质量 Prompts。
