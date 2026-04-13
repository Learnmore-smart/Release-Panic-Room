import { GameEvent, Ending, GameState } from "./types";

export const initialGameState: GameState = {
  releaseConfidence: 80,
  riskLevel: 20,
  teamTrust: 80,
  userImpact: 10,
  chaosMeter: 10,
  // Start at 17:42 Friday
  currentTime: new Date(new Date().setHours(17, 42, 0, 0)),
};

export const gameEvents: GameEvent[] = [
  {
    id: "e1",
    title: "致命的 Staging 报错",
    description: "距离预定发版还有不到半小时，QA 突然跑过来说：『支付主流程在 Staging 环境偶尔会阻断，但没法稳定复现。』",
    choices: [
      {
        id: "e1_c1",
        text: "推迟发版，全员排查直到复现修复。",
        effect: { releaseConfidence: 10, riskLevel: -20, timeCost: 45, chaosMeter: -10 }
      },
      {
        id: "e1_c2",
        text: "给可疑代码加个 try-catch，直接硬上。",
        effect: { riskLevel: 30, releaseConfidence: -10, chaosMeter: 20, timeCost: 10 }
      },
      {
        id: "e1_c3",
        text: "赌一把！跟 QA 说：『线上环境和 Staging 不一样，先发再说。』",
        effect: { userImpact: 20, riskLevel: 40, teamTrust: -15, chaosMeter: 30, timeCost: 5 }
      }
    ]
  },
  {
    id: "e2",
    title: "失踪的核心开发",
    description: "负责这次核心数据迁移的后端老哥突然离线了，而且他的迁移脚本说明里写着“执行前务必确认某某配置”。",
    choices: [
      {
        id: "e2_c1",
        text: "夺命连环 Call，打到他接为止，不接不发。",
        effect: { releaseConfidence: 20, riskLevel: -10, timeCost: 35 }
      },
      {
        id: "e2_c2",
        text: "自己看他写的烂代码，凭感觉执行。",
        effect: { riskLevel: 40, chaosMeter: 30, timeCost: 15 }
      },
      {
        id: "e2_c3",
        text: "砍掉这个功能！回滚代码，只发其他模块。",
        effect: { releaseConfidence: -20, teamTrust: -10, userImpact: -10, timeCost: 25 }
      }
    ]
  },
  {
    id: "e3",
    title: "PM 的死亡凝视",
    description: "产品经理站到了你身后：『大老板今晚要看这个新功能演示，今天不管多晚都必须上。』",
    choices: [
      {
        id: "e3_c1",
        text: "妥协：『行，那大家今晚都别走了，随时准备热修复。』",
        effect: { teamTrust: -20, timeCost: 0, chaosMeter: 15 }
      },
      {
        id: "e3_c2",
        text: "硬刚：『风险太高，出了线上事故你背锅吗？明早再发！』",
        effect: { teamTrust: 15, releaseConfidence: 10, timeCost: 5, chaosMeter: -5 }
      },
      {
        id: "e3_c3",
        text: "糊弄：『好好好，马上发。』然后偷偷加上 Feature Flag 只给大老板白名单开。",
        effect: { riskLevel: 20, chaosMeter: 20, timeCost: 15, userImpact: -10 }
      }
    ]
  },
  {
    id: "e4",
    title: "CI/CD 突然傲娇",
    description: "准备打生产包时，Jenkins/GitLab CI 突然排队卡死，前面有 5 个不知名任务在跑。",
    choices: [
      {
        id: "e4_c1",
        text: "老老实实排队，顺便点个外卖。",
        effect: { timeCost: 40, chaosMeter: -5, teamTrust: 10 }
      },
      {
        id: "e4_c2",
        text: "动用管理员权限，把其他人的构建全踢了！",
        effect: { teamTrust: -30, timeCost: 5, chaosMeter: 25 }
      },
      {
        id: "e4_c3",
        text: "等不及了，直接在本地打生产包用 SCP 传到服务器。",
        effect: { riskLevel: 50, releaseConfidence: -30, chaosMeter: 40, timeCost: 15 }
      }
    ]
  },
  {
    id: "e5",
    title: "监控里的诡异 Warning",
    description: "灰度发布刚上了一台机器，错误日志里突然多出了一堆看不太懂的 Warning，但前端好像没受影响。",
    choices: [
      {
        id: "e5_c1",
        text: "立刻停止灰度，组织全员排查日志。",
        effect: { releaseConfidence: 15, timeCost: 45, chaosMeter: -10 }
      },
      {
        id: "e5_c2",
        text: "只要不是 Error 就当没看见，继续全量！",
        effect: { riskLevel: 30, chaosMeter: 15, timeCost: 5 }
      },
      {
        id: "e5_c3",
        text: "把日志级别调成 Error，眼不见心不烦。",
        effect: { riskLevel: 45, teamTrust: -10, timeCost: 5, chaosMeter: 10 }
      }
    ]
  },
  {
    id: "e6",
    title: "客服群的警报",
    description: "客服群里突然有人反馈：『有几个 VIP 客户说登录一直转圈圈。』这似乎跟你们刚发的代码有关。",
    choices: [
      {
        id: "e6_c1",
        text: "紧急回滚！保命要紧。",
        effect: { riskLevel: -30, releaseConfidence: -20, timeCost: 30, userImpact: 10 }
      },
      {
        id: "e6_c2",
        text: "让客服安抚客户说是『网络波动』，偷偷定位修复。",
        effect: { riskLevel: 20, teamTrust: -10, timeCost: 25, userImpact: 30 }
      },
      {
        id: "e6_c3",
        text: "直接重启相关服务，万能的重启能解决 90% 的问题。",
        effect: { releaseConfidence: -10, chaosMeter: 20, timeCost: 10, userImpact: 15 }
      }
    ]
  },
  {
    id: "e7",
    title: "忘记确认的 Feature Flag",
    description: "突然想起来，某个高危功能的 Feature Flag 在生产环境好像忘了关。",
    choices: [
      {
        id: "e7_c1",
        text: "立刻登入配置中心检查并修改，按规范走审批。",
        effect: { riskLevel: -10, timeCost: 20, chaosMeter: -5 }
      },
      {
        id: "e7_c2",
        text: "直接拉个 DBA 老哥，改生产数据库的配置表。",
        effect: { riskLevel: 25, chaosMeter: 20, timeCost: 5 }
      },
      {
        id: "e7_c3",
        text: "算了，反正那个入口藏得很深，用户应该点不到。",
        effect: { riskLevel: 35, userImpact: 20, timeCost: 0 }
      }
    ]
  },
  {
    id: "e8",
    title: "晚饭的诱惑",
    description: "时间越来越晚，大家肚子都饿得咕咕叫，外卖到了，但发版还在关键节点。",
    choices: [
      {
        id: "e8_c1",
        text: "让大家先去吃热乎的饭，吃完再发。",
        effect: { teamTrust: 30, timeCost: 45, releaseConfidence: 10 }
      },
      {
        id: "e8_c2",
        text: "边吃边发！键盘上全是油也无所谓。",
        effect: { riskLevel: 20, chaosMeter: 15, timeCost: 15 }
      },
      {
        id: "e8_c3",
        text: "『今天发不完谁也不许吃！』",
        effect: { teamTrust: -40, timeCost: 5, chaosMeter: 10 }
      }
    ]
  },
  {
    id: "e9",
    title: "法务的最后通牒",
    description: "法务部突然发难，说新版的用户隐私协议还没过审，但包含该协议的代码已经和本次发版的核心功能打包在一起了。",
    choices: [
      {
        id: "e9_c1",
        text: "暂停发布，把法务代码拆出来重新打包测试。",
        effect: { timeCost: 60, releaseConfidence: 15, riskLevel: -10 }
      },
      {
        id: "e9_c2",
        text: "强行上线！业务增长更重要，法务有意见再说。",
        effect: { riskLevel: 50, chaosMeter: 30, teamTrust: -10, timeCost: 5 }
      },
      {
        id: "e9_c3",
        text: "联系法务老大和 VP 紧急拉群撕逼，要个特批。",
        effect: { teamTrust: -20, chaosMeter: 20, timeCost: 30 }
      }
    ]
  },
  {
    id: "e10",
    title: "神秘的内存泄漏",
    description: "最新的压测报告姗姗来迟：新版本在极端高并发下有缓慢的内存泄漏，但以目前的日常流量，可能撑三天才会 OOM (Out Of Memory)。",
    choices: [
      {
        id: "e10_c1",
        text: "没关系，给运维配个凌晨定时重启脚本就行。",
        effect: { chaosMeter: 25, riskLevel: 30, teamTrust: -15, timeCost: 10 }
      },
      {
        id: "e10_c2",
        text: "这绝不能忍！全员回滚排查，今晚找出泄漏点。",
        effect: { timeCost: 120, releaseConfidence: 20, teamTrust: -30 }
      },
      {
        id: "e10_c3",
        text: "关闭导致泄漏的非核心模块，降级发布。",
        effect: { userImpact: 35, riskLevel: -15, releaseConfidence: -10, timeCost: 20 }
      }
    ]
  },
  {
    id: "e11",
    title: "大客户的最后通牒",
    description: "销售总监冲进来说：“如果今天不能修复那个报表 Bug，最大的金主就要退签！”但那个 Bug 的修复代码还没经过完整回归测试。",
    choices: [
      {
        id: "e11_c1",
        text: "为了大客户，硬上！出了问题连夜修。",
        effect: { riskLevel: 40, teamTrust: -10, userImpact: -20, timeCost: 10 }
      },
      {
        id: "e11_c2",
        text: "坚守底线：“质量第一，未测代码绝不上线！”",
        effect: { teamTrust: 20, riskLevel: -10, userImpact: 30, timeCost: 15 }
      },
      {
        id: "e11_c3",
        text: "给大客户单独发个热更新分支，先稳住他们。",
        effect: { chaosMeter: 35, riskLevel: 25, timeCost: 40 }
      }
    ]
  },
  {
    id: "e12",
    title: "配置中心宕机",
    description: "正准备通过 Feature Flag (功能开关) 逐步灰度放量时，发现公司的统一配置中心挂了，所有开关都处于未知状态。",
    choices: [
      {
        id: "e12_c1",
        text: "暂停发布，坐等基础架构团队把配置中心修好。",
        effect: { timeCost: 50, releaseConfidence: -15, teamTrust: 10 }
      },
      {
        id: "e12_c2",
        text: "临时修改代码，把所有功能开关写死在前端再发一版。",
        effect: { chaosMeter: 40, riskLevel: 20, timeCost: 35 }
      },
      {
        id: "e12_c3",
        text: "直接全量发布新代码，不搞灰度了，听天由命。",
        effect: { riskLevel: 50, userImpact: 25, timeCost: 5, chaosMeter: 20 }
      }
    ]
  },
  {
    id: "e13",
    title: "形同虚设的代码审查",
    description: "你扫了一眼 Git 记录，发现一个实习生提了 5000 行代码的重构 PR，另一个实习生秒回了 'LGTM' (Looks Good To Me) 并直接合并了。",
    choices: [
      {
        id: "e13_c1",
        text: "立刻 Revert (撤销) 这个合并，重新打包！",
        effect: { timeCost: 45, teamTrust: -20, releaseConfidence: 20 }
      },
      {
        id: "e13_c2",
        text: "粗略看一眼代码，只要编译能过就先发。",
        effect: { riskLevel: 60, releaseConfidence: -30, chaosMeter: 20, timeCost: 10 }
      },
      {
        id: "e13_c3",
        text: "发！但让那两个实习生今晚留在公司随时准备背锅。",
        effect: { teamTrust: -40, riskLevel: 30, chaosMeter: 15, timeCost: 5 }
      }
    ]
  }
];

export const endings: Ending[] = [
  {
    id: "end_cowboy",
    title: "硬发赌徒 Ship It Gambler",
    description: "你无视了所有风险，凭着一身胆量把代码硬怼上了生产环境。系统居然奇迹般地没崩，但你知道，这只是一颗还没爆炸的定时炸弹。"
  },
  {
    id: "end_burnout",
    title: "熬夜救世主 Midnight Rescuer",
    description: "你用生命在填坑，不仅逼疯了自己，也逼疯了团队。虽然最终勉强上线，但周一估计会收到好几封辞职信。"
  },
  {
    id: "end_hacked",
    title: "周五纵火犯 Friday Night Arsonist",
    description: "你成功地在周五晚上搞垮了生产环境。客服电话被打爆，大老板深夜被惊醒，而你，正在准备你的简历。"
  },
  {
    id: "end_chaos",
    title: "灾难调度员 Chaos Dispatcher",
    description: "你的每次决策都在制造新的混乱，发版过程堪比好莱坞灾难片。最终大家都在一团乱麻中麻木了。"
  },
  {
    id: "end_loop",
    title: "时间循环者 Infinite Looper",
    description: "已经过了午夜，你还在修 Bug，修好一个又出一个。发版成了一个永远无法到达的彼岸。"
  },
  {
    id: "end_perfect",
    title: "冷静指挥官 Calm Commander",
    description: "在极致的高压下，你依然保持了惊人的冷静。风险被化解，团队对你心服口服，这是一个教科书般的发版之夜。"
  },
  {
    id: "end_apathy",
    title: "警报免疫者 Alert Numbed",
    description: "你对所有的警报和风险都视而不见，成功培养出了一支同样麻木的团队。系统千疮百孔，但只要还能跑，就假装看不见。"
  },
  {
    id: "end_executive",
    title: "需求献祭者 Scope Sacrificer",
    description: "为了能早点下班，你毫不犹豫地砍掉了所有有风险的功能。PM 气得跳脚，但你成功保卫了你的周末。"
  },
  {
    id: "end_rollback",
    title: "回滚先知 Rollback Prophet",
    description: "只要一有风吹草动，你的第一反应就是回滚。虽然保证了绝对的安全，但这个迭代等于什么都没做。"
  },
  {
    id: "end_delayed",
    title: "延期保守派 The Safe Delayer",
    description: "你评估了所有的风险后，果断按下了暂停键。虽然要面对各方的压力，但你坚信这是最负责任的决定。"
  }
];

export function determineEnding(state: GameState): Ending {
  const { riskLevel, teamTrust, chaosMeter, userImpact, releaseConfidence, currentTime } = state;

  if (chaosMeter > 80 && riskLevel > 80) return endings.find(e => e.id === "end_cowboy")!;
  if (teamTrust < 30) return endings.find(e => e.id === "end_burnout")!;
  if (riskLevel > 80 && releaseConfidence < 30) return endings.find(e => e.id === "end_hacked")!;
  if (chaosMeter > 85) return endings.find(e => e.id === "end_chaos")!;
  if (currentTime.getHours() >= 23 || currentTime.getHours() < 5) return endings.find(e => e.id === "end_loop")!;
  if (releaseConfidence > 75 && riskLevel < 40 && chaosMeter < 50) return endings.find(e => e.id === "end_perfect")!;
  if (userImpact > 70) return endings.find(e => e.id === "end_apathy")!;
  if (chaosMeter > 60 && teamTrust < 50) return endings.find(e => e.id === "end_executive")!;
  if (releaseConfidence < 40 && riskLevel > 60) return endings.find(e => e.id === "end_rollback")!;
  
  return endings.find(e => e.id === "end_delayed")!;
}
