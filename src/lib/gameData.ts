import { GameEvent, Ending, GameState } from "./types";

export const initialGameState: GameState = {
  releaseConfidence: 80,
  riskLevel: 20,
  teamTrust: 80,
  userImpact: 10,
  chaosMeter: 10,
  currentTime: new Date(new Date().setHours(17, 42, 0, 0)),
};

export const gameEvents: GameEvent[] = [
  {
    id: "e1",
    title: "致命的 Staging 报错",
    titleEn: "Fatal Staging Error",
    description: "距离预定发版还有不到半小时，QA 突然跑过来说：『支付主流程在 Staging 环境偶尔会阻断，但没法稳定复现。』",
    descriptionEn: "Less than half an hour before the scheduled release, QA suddenly runs over: 'The main payment flow is occasionally blocked in Staging, but it cannot be stably reproduced.'",
    choices: [
      {
        id: "e1_c1",
        text: "推迟发版，全员排查直到复现修复。",
        textEn: "Postpone the release, everyone investigates until reproduced and fixed.",
        effect: { releaseConfidence: 10, riskLevel: -20, timeCost: 45, chaosMeter: -10 }
      },
      {
        id: "e1_c2",
        text: "给可疑代码加个 try-catch，直接硬上。",
        textEn: "Add a try-catch to the suspicious code and deploy anyway.",
        effect: { riskLevel: 30, releaseConfidence: -10, chaosMeter: 20, timeCost: 10 }
      },
      {
        id: "e1_c3",
        text: "赌一把！跟 QA 说：『线上环境和 Staging 不一样，先发再说。』",
        textEn: "Gamble! Tell QA: 'Production is different from Staging, let's just release it.'",
        effect: { userImpact: 20, riskLevel: 40, teamTrust: -15, chaosMeter: 30, timeCost: 5 }
      }
    ]
  },
  {
    id: "e2",
    title: "失踪的核心开发",
    titleEn: "The Missing Core Developer",
    description: "负责这次核心数据迁移的后端老哥突然离线了，而且他的迁移脚本说明里写着“执行前务必确认某某配置”。",
    descriptionEn: "The backend dev responsible for the core data migration suddenly went offline, and his migration script notes say 'make sure to confirm XYZ config before executing'.",
    choices: [
      {
        id: "e2_c1",
        text: "夺命连环 Call，打到他接为止，不接不发。",
        textEn: "Call him continuously until he answers, no release until then.",
        effect: { releaseConfidence: 20, riskLevel: -10, timeCost: 35 }
      },
      {
        id: "e2_c2",
        text: "自己看他写的烂代码，凭感觉执行。",
        textEn: "Read his messy code yourself and execute it based on feeling.",
        effect: { riskLevel: 40, chaosMeter: 30, timeCost: 15 }
      },
      {
        id: "e2_c3",
        text: "砍掉这个功能！回滚代码，只发其他模块。",
        textEn: "Cut this feature! Rollback the code and only release other modules.",
        effect: { releaseConfidence: -20, teamTrust: -10, userImpact: -10, timeCost: 25 }
      }
    ]
  },
  {
    id: "e3",
    title: "PM 的死亡凝视",
    titleEn: "Death Stare of the PM",
    description: "产品经理站到了你身后：『大老板今晚要看这个新功能演示，今天不管多晚都必须上。』",
    descriptionEn: "The Product Manager stands behind you: 'The big boss wants to see a demo of this new feature tonight, it must go live today no matter how late.'",
    choices: [
      {
        id: "e3_c1",
        text: "妥协：『行，那大家今晚都别走了，随时准备热修复。』",
        textEn: "Compromise: 'Fine, nobody goes home tonight, be ready for hotfixes.'",
        effect: { teamTrust: -20, timeCost: 0, chaosMeter: 15 }
      },
      {
        id: "e3_c2",
        text: "硬刚：『风险太高，出了线上事故你背锅吗？明早再发！』",
        textEn: "Push back: 'Risk is too high, will you take the blame for a production incident? We release tomorrow morning!'",
        effect: { teamTrust: 15, releaseConfidence: 10, timeCost: 5, chaosMeter: -5 }
      },
      {
        id: "e3_c3",
        text: "糊弄：『好好好，马上发。』然后偷偷加上 Feature Flag 只给大老板白名单开。",
        textEn: "Fake it: 'Okay okay, releasing now.' Then secretly add a Feature Flag only whitelisting the boss.",
        effect: { riskLevel: 20, chaosMeter: 20, timeCost: 15, userImpact: -10 }
      }
    ]
  },
  {
    id: "e4",
    title: "CI/CD 突然傲娇",
    titleEn: "CI/CD Suddenly Acts Up",
    description: "准备打生产包时，Jenkins/GitLab CI 突然排队卡死，前面有 5 个不知名任务在跑。",
    descriptionEn: "When preparing to build for production, Jenkins/GitLab CI suddenly queues up and gets stuck, with 5 unknown tasks running ahead.",
    choices: [
      {
        id: "e4_c1",
        text: "老老实实排队，顺便点个外卖。",
        textEn: "Wait patiently in the queue, and order some takeout.",
        effect: { timeCost: 40, chaosMeter: -5, teamTrust: 10 }
      },
      {
        id: "e4_c2",
        text: "动用管理员权限，把其他人的构建全踢了！",
        textEn: "Use admin privileges to kick out everyone else's builds!",
        effect: { teamTrust: -30, timeCost: 5, chaosMeter: 25 }
      },
      {
        id: "e4_c3",
        text: "等不及了，直接在本地打生产包用 SCP 传到服务器。",
        textEn: "Can't wait, build the production package locally and SCP it to the server.",
        effect: { riskLevel: 50, releaseConfidence: -30, chaosMeter: 40, timeCost: 15 }
      }
    ]
  },
  {
    id: "e5",
    title: "监控里的诡异 Warning",
    titleEn: "Creepy Warning in the Monitor",
    description: "灰度发布刚上了一台机器，错误日志里突然多出了一堆看不太懂的 Warning，但前端好像没受影响。",
    descriptionEn: "Canary release just hit one machine, and suddenly a bunch of incomprehensible Warnings appear in the error logs, but the frontend seems unaffected.",
    choices: [
      {
        id: "e5_c1",
        text: "立刻停止灰度，组织全员排查日志。",
        textEn: "Stop the canary release immediately, organize everyone to investigate the logs.",
        effect: { releaseConfidence: 15, timeCost: 45, chaosMeter: -10 }
      },
      {
        id: "e5_c2",
        text: "只要不是 Error 就当没看见，继续全量！",
        textEn: "As long as it's not an Error, ignore it, continue to full release!",
        effect: { riskLevel: 30, chaosMeter: 15, timeCost: 5 }
      },
      {
        id: "e5_c3",
        text: "把日志级别调成 Error，眼不见心不烦。",
        textEn: "Change the log level to Error, out of sight out of mind.",
        effect: { riskLevel: 45, teamTrust: -10, timeCost: 5, chaosMeter: 10 }
      }
    ]
  },
  {
    id: "e6",
    title: "客服群的警报",
    titleEn: "Alert from CS Group",
    description: "客服群里突然有人反馈：『有几个 VIP 客户说登录一直转圈圈。』这似乎跟你们刚发的代码有关。",
    descriptionEn: "Someone in the Customer Service group suddenly reports: 'A few VIP customers say the login keeps spinning.' This seems related to the code you just released.",
    choices: [
      {
        id: "e6_c1",
        text: "紧急回滚！保命要紧。",
        textEn: "Emergency rollback! Save our lives.",
        effect: { riskLevel: -30, releaseConfidence: -20, timeCost: 30, userImpact: 10 }
      },
      {
        id: "e6_c2",
        text: "让客服安抚客户说是『网络波动』，偷偷定位修复。",
        textEn: "Ask CS to tell customers it's 'network fluctuations' and secretly locate and fix the issue.",
        effect: { riskLevel: 20, teamTrust: -10, timeCost: 25, userImpact: 30 }
      },
      {
        id: "e6_c3",
        text: "直接重启相关服务，万能的重启能解决 90% 的问题。",
        textEn: "Just restart the related services, the almighty restart solves 90% of problems.",
        effect: { releaseConfidence: -10, chaosMeter: 20, timeCost: 10, userImpact: 15 }
      }
    ]
  },
  {
    id: "e7",
    title: "忘记确认的 Feature Flag",
    titleEn: "Forgotten Feature Flag",
    description: "突然想起来，某个高危功能的 Feature Flag 在生产环境好像忘了关。",
    descriptionEn: "Suddenly remembered that a Feature Flag for a high-risk feature was forgotten to be turned off in the production environment.",
    choices: [
      {
        id: "e7_c1",
        text: "立刻登入配置中心检查并修改，按规范走审批。",
        textEn: "Immediately log into the config center to check and modify, follow standard approval process.",
        effect: { riskLevel: -10, timeCost: 20, chaosMeter: -5 }
      },
      {
        id: "e7_c2",
        text: "直接拉个 DBA 老哥，改生产数据库的配置表。",
        textEn: "Grab a DBA bro directly and modify the config table in the production database.",
        effect: { riskLevel: 25, chaosMeter: 20, timeCost: 5 }
      },
      {
        id: "e7_c3",
        text: "算了，反正那个入口藏得很深，用户应该点不到。",
        textEn: "Forget it, the entrance is hidden deep anyway, users probably won't click it.",
        effect: { riskLevel: 35, userImpact: 20, timeCost: 0 }
      }
    ]
  },
  {
    id: "e8",
    title: "晚饭的诱惑",
    titleEn: "Temptation of Dinner",
    description: "时间越来越晚，大家肚子都饿得咕咕叫，外卖到了，但发版还在关键节点。",
    descriptionEn: "It's getting late, everyone's stomachs are growling, the takeout has arrived, but the release is still at a critical node.",
    choices: [
      {
        id: "e8_c1",
        text: "让大家先去吃热乎的饭，吃完再发。",
        textEn: "Let everyone eat hot food first, release after eating.",
        effect: { teamTrust: 30, timeCost: 45, releaseConfidence: 10 }
      },
      {
        id: "e8_c2",
        text: "边吃边发！键盘上全是油也无所谓。",
        textEn: "Eat while releasing! Who cares if the keyboard gets greasy.",
        effect: { riskLevel: 20, chaosMeter: 15, timeCost: 15 }
      },
      {
        id: "e8_c3",
        text: "『今天发不完谁也不许吃！』",
        textEn: "'No one eats until we finish releasing today!'",
        effect: { teamTrust: -40, timeCost: 5, chaosMeter: 10 }
      }
    ]
  },
  {
    id: "e9",
    title: "法务的最后通牒",
    titleEn: "Legal's Ultimatum",
    description: "法务部突然发难，说新版的用户隐私协议还没过审，但包含该协议的代码已经和本次发版的核心功能打包在一起了。",
    descriptionEn: "Legal department suddenly complains that the new user privacy agreement hasn't passed review, but the code containing it is already bundled with the core features of this release.",
    choices: [
      {
        id: "e9_c1",
        text: "暂停发布，把法务代码拆出来重新打包测试。",
        textEn: "Pause release, separate the legal code and repackage/retest.",
        effect: { timeCost: 60, releaseConfidence: 15, riskLevel: -10 }
      },
      {
        id: "e9_c2",
        text: "强行上线！业务增长更重要，法务有意见再说。",
        textEn: "Force it online! Business growth is more important, deal with legal later.",
        effect: { riskLevel: 50, chaosMeter: 30, teamTrust: -10, timeCost: 5 }
      },
      {
        id: "e9_c3",
        text: "联系法务老大和 VP 紧急拉群撕逼，要个特批。",
        textEn: "Contact the head of Legal and VP for an emergency group chat to argue for special approval.",
        effect: { teamTrust: -20, chaosMeter: 20, timeCost: 30 }
      }
    ]
  },
  {
    id: "e10",
    title: "神秘的内存泄漏",
    titleEn: "Mysterious Memory Leak",
    description: "最新的压测报告姗姗来迟：新版本在极端高并发下有缓慢的内存泄漏，但以目前的日常流量，可能撑三天才会 OOM (Out Of Memory)。",
    descriptionEn: "The latest stress test report arrives late: the new version has a slow memory leak under extreme high concurrency, but with current daily traffic, it might take 3 days to OOM.",
    choices: [
      {
        id: "e10_c1",
        text: "没关系，给运维配个凌晨定时重启脚本就行。",
        textEn: "No problem, just configure a scheduled restart script for operations at midnight.",
        effect: { chaosMeter: 25, riskLevel: 30, teamTrust: -15, timeCost: 10 }
      },
      {
        id: "e10_c2",
        text: "这绝不能忍！全员回滚排查，今晚找出泄漏点。",
        textEn: "Unacceptable! Full rollback and investigation, find the leak tonight.",
        effect: { timeCost: 120, releaseConfidence: 20, teamTrust: -30 }
      },
      {
        id: "e10_c3",
        text: "关闭导致泄漏的非核心模块，降级发布。",
        textEn: "Turn off the non-core module causing the leak, downgrade release.",
        effect: { userImpact: 35, riskLevel: -15, releaseConfidence: -10, timeCost: 20 }
      }
    ]
  },
  {
    id: "e11",
    title: "大客户的最后通牒",
    titleEn: "Key Account Ultimatum",
    description: "销售总监冲进来说：“如果今天不能修复那个报表 Bug，最大的金主就要退签！”但那个 Bug 的修复代码还没经过完整回归测试。",
    descriptionEn: "The Sales Director rushes in: 'If we can't fix that report Bug today, our biggest client will cancel the contract!' But the fix hasn't undergone full regression testing.",
    choices: [
      {
        id: "e11_c1",
        text: "为了大客户，硬上！出了问题连夜修。",
        textEn: "For the big client, push it hard! Fix issues overnight if they arise.",
        effect: { riskLevel: 40, teamTrust: -10, userImpact: -20, timeCost: 10 }
      },
      {
        id: "e11_c2",
        text: "坚守底线：“质量第一，未测代码绝不上线！”",
        textEn: "Hold the line: 'Quality first, untested code never goes live!'",
        effect: { teamTrust: 20, riskLevel: -10, userImpact: 30, timeCost: 15 }
      },
      {
        id: "e11_c3",
        text: "给大客户单独发个热更新分支，先稳住他们。",
        textEn: "Deploy a hotfix branch separately just for the big client to stabilize them first.",
        effect: { chaosMeter: 35, riskLevel: 25, timeCost: 40 }
      }
    ]
  },
  {
    id: "e12",
    title: "配置中心宕机",
    titleEn: "Config Center Down",
    description: "正准备通过 Feature Flag (功能开关) 逐步灰度放量时，发现公司的统一配置中心挂了，所有开关都处于未知状态。",
    descriptionEn: "Just about to gradually canary release via Feature Flags, when you find the company's unified config center is down, and all flags are in an unknown state.",
    choices: [
      {
        id: "e12_c1",
        text: "暂停发布，坐等基础架构团队把配置中心修好。",
        textEn: "Pause release, wait for the infra team to fix the config center.",
        effect: { timeCost: 50, releaseConfidence: -15, teamTrust: 10 }
      },
      {
        id: "e12_c2",
        text: "临时修改代码，把所有功能开关写死在前端再发一版。",
        textEn: "Temporarily modify code to hardcode all feature flags in the frontend and release again.",
        effect: { chaosMeter: 40, riskLevel: 20, timeCost: 35 }
      },
      {
        id: "e12_c3",
        text: "直接全量发布新代码，不搞灰度了，听天由命。",
        textEn: "Release the new code fully directly, skip the canary, leave it to fate.",
        effect: { riskLevel: 50, userImpact: 25, timeCost: 5, chaosMeter: 20 }
      }
    ]
  },
  {
    id: "e13",
    title: "形同虚设的代码审查",
    titleEn: "Meaningless Code Review",
    description: "你扫了一眼 Git 记录，发现一个实习生提了 5000 行代码的重构 PR，另一个实习生秒回了 'LGTM' (Looks Good To Me) 并直接合并了。",
    descriptionEn: "You glanced at the Git logs and found an intern submitted a 5000-line refactoring PR, another intern replied 'LGTM' instantly and merged it directly.",
    choices: [
      {
        id: "e13_c1",
        text: "立刻 Revert (撤销) 这个合并，重新打包！",
        textEn: "Revert this merge immediately, repackage!",
        effect: { timeCost: 45, teamTrust: -20, releaseConfidence: 20 }
      },
      {
        id: "e13_c2",
        text: "粗略看一眼代码，只要编译能过就先发。",
        textEn: "Skim the code roughly, as long as it compiles, release it.",
        effect: { riskLevel: 60, releaseConfidence: -30, chaosMeter: 20, timeCost: 10 }
      },
      {
        id: "e13_c3",
        text: "发！但让那两个实习生今晚留在公司随时准备背锅。",
        textEn: "Release! But keep those two interns at the company tonight ready to take the blame.",
        effect: { teamTrust: -40, riskLevel: 30, chaosMeter: 15, timeCost: 5 }
      }
    ]
  },
  {
    id: "e14",
    title: "被遗忘的环境变量",
    titleEn: "Forgotten Environment Variable",
    description: "生产环境的配置表里少了一个新的环境变量，测试环境一切正常，但只要一上线，核心接口必报 500 错误。",
    descriptionEn: "A new environment variable is missing from the production config. Testing was fine, but once live, core APIs return 500 errors.",
    choices: [
      {
        id: "e14_c1",
        text: "立刻拉起审批流程，按照规范补齐变量后再发。",
        textEn: "Immediately start the approval process to add the variable formally before releasing.",
        effect: { timeCost: 30, releaseConfidence: 15, riskLevel: -10 }
      },
      {
        id: "e14_c2",
        text: "直接让运维通过命令行手动注入，跳过审批。",
        textEn: "Ask DevOps to manually inject it via command line, skipping approvals.",
        effect: { chaosMeter: 25, riskLevel: 20, timeCost: 5 }
      },
      {
        id: "e14_c3",
        text: "快速修改代码，给这个变量加个硬编码的默认值。",
        textEn: "Quickly modify code to add a hardcoded default for this variable.",
        effect: { riskLevel: 35, releaseConfidence: -15, teamTrust: -10, timeCost: 15 }
      }
    ]
  },
  {
    id: "e15",
    title: "前端缓存作祟",
    titleEn: "Frontend Cache Troubles",
    description: "新版的 UI 已经发布，但你发现大量用户手机上还缓存着旧版的 JS 文件，导致页面点击按钮毫无反应。",
    descriptionEn: "The new UI is live, but you realize many users have old JS cached, making button clicks unresponsive.",
    choices: [
      {
        id: "e15_c1",
        text: "紧急发布一个带强制刷新逻辑的补丁版本。",
        textEn: "Emergency release of a patch with force-refresh logic.",
        effect: { timeCost: 40, riskLevel: 10, userImpact: 20 }
      },
      {
        id: "e15_c2",
        text: "联系 CDN 供应商紧急刷新全网节点缓存。",
        textEn: "Contact CDN provider to urgently flush nodes worldwide.",
        effect: { chaosMeter: 20, timeCost: 20, releaseConfidence: -10 }
      },
      {
        id: "e15_c3",
        text: "发个公告，让用户手动清除浏览器缓存。",
        textEn: "Issue an announcement asking users to clear their browser cache manually.",
        effect: { userImpact: 40, teamTrust: -20, riskLevel: -5, timeCost: 5 }
      }
    ]
  },
  {
    id: "e16",
    title: "云服务商的“惊喜”",
    titleEn: "Surprise from the Cloud Provider",
    description: "在部署的关键时刻，云服务商（AWS/阿里云）发邮件说当前机房网络波动，预计 2 小时后恢复。",
    descriptionEn: "At the critical moment of deployment, the cloud provider (AWS/Aliyun) emails that the current data center has network fluctuations, expecting recovery in 2 hours.",
    choices: [
      {
        id: "e16_c1",
        text: "等！安全第一，等网络稳定再继续发布。",
        textEn: "Wait! Safety first, wait for the network to stabilize.",
        effect: { timeCost: 120, releaseConfidence: 10, riskLevel: -10 }
      },
      {
        id: "e16_c2",
        text: "赌一把，强行跨区推镜像，可能会丢包失败。",
        textEn: "Gamble, force image push across regions, might fail due to packet loss.",
        effect: { riskLevel: 45, chaosMeter: 35, timeCost: 15 }
      },
      {
        id: "e16_c3",
        text: "紧急启动异地多活灾备方案，把流量切到备用机房发版。",
        textEn: "Emergency launch of multi-region active-active disaster recovery, route traffic to backup data center.",
        effect: { teamTrust: 20, chaosMeter: 40, releaseConfidence: -20, timeCost: 60 }
      }
    ]
  },
  {
    id: "e17",
    title: "神秘的“祖传代码”报错",
    titleEn: "Mysterious Legacy Code Error",
    description: "你修改了登录逻辑，结果触发了一段三年前离职老哥写的、没有任何注释的祖传代码，报了一个不知名的错误。",
    descriptionEn: "You modified the login logic, triggering an undocumented legacy code written by a dev who left 3 years ago, throwing an unknown error.",
    choices: [
      {
        id: "e17_c1",
        text: "把那段代码直接注释掉，只要能跑通主流程就行。",
        textEn: "Just comment out that code, as long as the main flow works.",
        effect: { riskLevel: 60, releaseConfidence: -30, chaosMeter: 25, timeCost: 10 }
      },
      {
        id: "e17_c2",
        text: "全员加班，把这段祖传代码彻底重构掉。",
        textEn: "Everyone works overtime to completely refactor this legacy code.",
        effect: { timeCost: 90, teamTrust: -25, releaseConfidence: 20, riskLevel: -10 }
      },
      {
        id: "e17_c3",
        text: "回滚你自己的修改，这功能今天不上了。",
        textEn: "Rollback your own changes, this feature won't go live today.",
        effect: { userImpact: -15, teamTrust: 10, releaseConfidence: -20, timeCost: 20 }
      }
    ]
  },
  {
    id: "e18",
    title: "竞争对手突然发大招",
    titleEn: "Competitor Drops a Bombshell",
    description: "市场部传来噩耗：死对头公司刚才发布了和你们一模一样的新功能。老板要求你们必须在今晚反击上线！",
    descriptionEn: "Marketing brings bad news: the rival company just released the exact same new feature. The boss demands you counter-launch tonight!",
    choices: [
      {
        id: "e18_c1",
        text: "“收到！”跳过剩余的自动化测试，全军突击！",
        textEn: "'Roger!' Skip the remaining automated tests, full assault!",
        effect: { riskLevel: 50, chaosMeter: 40, releaseConfidence: -30, timeCost: 5 }
      },
      {
        id: "e18_c2",
        text: "按原定节奏来，质量比速度更重要，绝不自乱阵脚。",
        textEn: "Stick to the original pace, quality over speed, never panic.",
        effect: { teamTrust: 25, userImpact: 20, timeCost: 30, chaosMeter: -10 }
      },
      {
        id: "e18_c3",
        text: "赶紧临时加一个敷衍的弹窗功能，证明我们也有。",
        textEn: "Quickly add a superficial popup feature to prove we have it too.",
        effect: { userImpact: 35, riskLevel: 30, chaosMeter: 20, timeCost: 20 }
      }
    ]
  },
  {
    id: "e19",
    title: "运维大叔的失误",
    titleEn: "DevOps Uncle's Mistake",
    description: "运维老哥不小心敲错命令，把预发布环境（Staging）的数据库给清空了，现在没法进行最后的验证了。",
    descriptionEn: "The DevOps guy accidentally typed the wrong command and cleared the Staging database. No way to do final verification now.",
    choices: [
      {
        id: "e19_c1",
        text: "没测试就没测试吧，开发环境过了，直接上生产！",
        textEn: "No testing is fine, dev environment passed, straight to production!",
        effect: { riskLevel: 60, releaseConfidence: -40, chaosMeter: 30, timeCost: 5 }
      },
      {
        id: "e19_c2",
        text: "暂停一切，等他从备份恢复预发布数据再继续。",
        textEn: "Pause everything, wait for him to restore Staging data from backup.",
        effect: { timeCost: 80, releaseConfidence: 10, chaosMeter: -5 }
      },
      {
        id: "e19_c3",
        text: "把一部分生产流量导到测试机，用真用户做验证（大胆的灰度）。",
        textEn: "Route some production traffic to the test server, verify with real users (bold canary).",
        effect: { userImpact: 40, riskLevel: 45, chaosMeter: 50, timeCost: 20 }
      }
    ]
  },
  {
    id: "e20",
    title: "过期的证书",
    titleEn: "Expired Certificate",
    description: "HTTPS 证书突然过期了，浏览器开始给所有访问页面的用户疯狂弹红色的不安全警告。",
    descriptionEn: "HTTPS certificate suddenly expired, browsers start throwing red insecure warnings to all visitors.",
    choices: [
      {
        id: "e20_c1",
        text: "手忙脚乱去买新证书、配 Nginx，发版延后。",
        textEn: "Frantically buy a new cert, configure Nginx, delay the release.",
        effect: { timeCost: 60, riskLevel: -20, chaosMeter: 20 }
      },
      {
        id: "e20_c2",
        text: "让用户点击“继续访问”，先发版，证书下周再说。",
        textEn: "Let users click 'Continue anyway', release first, deal with cert next week.",
        effect: { userImpact: 80, teamTrust: -20, riskLevel: 30, timeCost: 5 }
      },
      {
        id: "e20_c3",
        text: "用免费的 Let's Encrypt 临时签发一个顶上。",
        textEn: "Use free Let's Encrypt to temporarily issue one.",
        effect: { chaosMeter: 15, releaseConfidence: 10, timeCost: 25 }
      }
    ]
  },
  {
    id: "e21",
    title: "设计师的“像素级”强迫症",
    titleEn: "Designer's Pixel OCD",
    description: "UI 设计师在走查时发现，首页的一个主要按钮偏离了 2 个像素，坚决要求重新打个包。",
    descriptionEn: "UI designer finds a main button on the homepage is off by 2 pixels, and strongly demands a rebuild.",
    choices: [
      {
        id: "e21_c1",
        text: "“好的好的。”重新走一遍漫长的 CI/CD。",
        textEn: "'Okay okay.' Go through the long CI/CD pipeline again.",
        effect: { timeCost: 45, teamTrust: 10, chaosMeter: -5 }
      },
      {
        id: "e21_c2",
        text: "“2 像素没人看得出来，发！”",
        textEn: "'Nobody will notice 2 pixels, ship it!'",
        effect: { teamTrust: -15, releaseConfidence: 5, timeCost: 5 }
      },
      {
        id: "e21_c3",
        text: "直接在生产环境的热更新代码里加一行 CSS 覆盖。",
        textEn: "Just add a line of CSS override in the production hot-update code.",
        effect: { riskLevel: 25, chaosMeter: 15, timeCost: 10 }
      }
    ]
  },
  {
    id: "e22",
    title: "诡异的第三方库冲突",
    titleEn: "Weird Third-Party Lib Conflict",
    description: "引入的新依赖包和系统原有的老包版本冲突，导致控制台狂报红，虽然页面暂时没挂，但随时可能崩溃。",
    descriptionEn: "A new dependency conflicts with an old package, causing the console to spam red errors. The page hasn't crashed yet, but could at any moment.",
    choices: [
      {
        id: "e22_c1",
        text: "不管了，只要用户能点动就行。",
        textEn: "Whatever, as long as the user can click it.",
        effect: { riskLevel: 55, chaosMeter: 25, releaseConfidence: -20, timeCost: 5 }
      },
      {
        id: "e22_c2",
        text: "立刻降级回退第三方包，宁可不上新特性。",
        textEn: "Downgrade the third-party package immediately, better to not ship the new feature.",
        effect: { releaseConfidence: 15, userImpact: -15, riskLevel: -10, timeCost: 30 }
      },
      {
        id: "e22_c3",
        text: "尝试用 Webpack/Vite 魔法强行抹平冲突，不管后果。",
        textEn: "Try to use Webpack/Vite magic to force-smooth the conflict, regardless of consequences.",
        effect: { chaosMeter: 40, riskLevel: 30, timeCost: 25 }
      }
    ]
  },
  {
    id: "e23",
    title: "老板的临时视察",
    titleEn: "Boss's Surprise Inspection",
    description: "大老板突然发消息：“我正在试用刚发的版本，怎么感觉首页有点卡？”其实你们还没全量发布，他点的是旧版。",
    descriptionEn: "The big boss messages: 'I'm trying the new version, why is the homepage laggy?' Actually you haven't fully released it, he's using the old version.",
    choices: [
      {
        id: "e23_c1",
        text: "耐心解释：“老板，新版还没上呢，马上就好。”",
        textEn: "Explain patiently: 'Boss, the new version isn't live yet, almost done.'",
        effect: { teamTrust: 10, timeCost: 15, chaosMeter: -5 }
      },
      {
        id: "e23_c2",
        text: "慌了神，立刻催全员：“别管流程了，赶紧把新版推上去！”",
        textEn: "Panic, rush everyone: 'Ignore the process, push the new version up NOW!'",
        effect: { riskLevel: 45, chaosMeter: 35, timeCost: 5, releaseConfidence: -15 }
      },
      {
        id: "e23_c3",
        text: "假装没看到消息，静音手机，专心发版。",
        textEn: "Pretend you didn't see it, mute phone, focus on the release.",
        effect: { teamTrust: -25, riskLevel: 10, timeCost: 5 }
      }
    ]
  },
  {
    id: "e24",
    title: "数据库锁表了！",
    titleEn: "Database Table Locked!",
    description: "在执行一个看似简单的 Alter Table 时，数据库突然死锁，所有生产环境的写操作全挂了！",
    descriptionEn: "While executing a seemingly simple Alter Table, the DB suddenly deadlocks, all production writes are down!",
    choices: [
      {
        id: "e24_c1",
        text: "立刻 Kill 掉那个进程，放弃修改表结构。",
        textEn: "Kill the process immediately, give up on modifying the table structure.",
        effect: { riskLevel: -20, releaseConfidence: -30, chaosMeter: 10, timeCost: 15 }
      },
      {
        id: "e24_c2",
        text: "死等！祈祷锁能自己解开。",
        textEn: "Wait! Pray the lock resolves itself.",
        effect: { userImpact: 60, chaosMeter: 40, timeCost: 45 }
      },
      {
        id: "e24_c3",
        text: "主库挂了切备库，强行把流量打到从库上读写分离。",
        textEn: "Master is dead, switch to slave, force traffic to replica with read-write split.",
        effect: { riskLevel: 65, chaosMeter: 50, teamTrust: -15, timeCost: 25 }
      }
    ]
  },
  {
    id: "e25",
    title: "核心 API 鉴权失效",
    titleEn: "Core API Auth Failure",
    description: "测试发现，新上线的用户鉴权接口由于拼写错误，导致随便传个 Token 都能拿到管理员权限。",
    descriptionEn: "Testing found the newly launched auth API has a typo, allowing any random Token to get admin access.",
    choices: [
      {
        id: "e25_c1",
        text: "紧急拉闸，全服停机维护，修好再开。",
        textEn: "Emergency shutdown, full server maintenance, reopen when fixed.",
        effect: { userImpact: 70, riskLevel: -40, releaseConfidence: 20, timeCost: 60 }
      },
      {
        id: "e25_c2",
        text: "趁没人发现，偷偷发个 Hotfix 覆盖掉。",
        textEn: "While no one notices, secretly deploy a Hotfix to overwrite it.",
        effect: { riskLevel: 30, chaosMeter: 20, timeCost: 15 }
      },
      {
        id: "e25_c3",
        text: "把鉴权模块退回上一版本，新功能裸奔跑一晚。",
        textEn: "Rollback auth module to previous version, let new features run unprotected overnight.",
        effect: { riskLevel: 80, releaseConfidence: -50, teamTrust: -20, timeCost: 10 }
      }
    ]
  },
  {
    id: "e26",
    title: "不兼容的 iOS 版本",
    titleEn: "Incompatible iOS Version",
    description: "有人随手拿了一台三年前的 iPhone 测试，发现新页面直接白屏了。但数据显示这类机型只占用户的 1%。",
    descriptionEn: "Someone casually tested on a 3-year-old iPhone and found the new page is completely white. But data shows these devices are only 1% of users.",
    choices: [
      {
        id: "e26_c1",
        text: "“1% 的用户也是用户！全员排查兼容性问题！”",
        textEn: "'1% of users are still users! Everyone investigate compatibility!'",
        effect: { timeCost: 90, teamTrust: -30, releaseConfidence: 20, riskLevel: -10 }
      },
      {
        id: "e26_c2",
        text: "“时代在进步，他们该换手机了，发版！”",
        textEn: "'Times change, they should buy new phones, ship it!'",
        effect: { userImpact: 25, riskLevel: 10, releaseConfidence: 10, timeCost: 5 }
      },
      {
        id: "e26_c3",
        text: "给旧机型强行塞一个丑陋的降级静态页面。",
        textEn: "Force an ugly degraded static page for old devices.",
        effect: { userImpact: 15, chaosMeter: 15, timeCost: 30 }
      }
    ]
  },
  {
    id: "e27",
    title: "代码分支合错了",
    titleEn: "Wrong Branch Merged",
    description: "你震惊地发现，刚才打的生产包里，竟然混入了一个下个月才打算上的“未完成大促销活动”代码。",
    descriptionEn: "You are shocked to discover the production build just included an 'unfinished major promo event' code meant for next month.",
    choices: [
      {
        id: "e27_c1",
        text: "硬着头皮上，立刻去生产配置中心把活动的入口关死。",
        textEn: "Bite the bullet, immediately go to production config to disable the event entrance.",
        effect: { riskLevel: 45, chaosMeter: 30, timeCost: 15 }
      },
      {
        id: "e27_c2",
        text: "立刻停止发布，Git Reset 回退分支重新合并打包。",
        textEn: "Stop release immediately, Git Reset branch, merge and build again.",
        effect: { timeCost: 50, releaseConfidence: 15, chaosMeter: -10 }
      },
      {
        id: "e27_c3",
        text: "索性直接通知运营部：“惊不惊喜？活动提前开始了！”",
        textEn: "Just inform Marketing: 'Surprise! The event started early!'",
        effect: { teamTrust: -35, userImpact: 40, riskLevel: 50, chaosMeter: 60, timeCost: 5 }
      }
    ]
  },
  {
    id: "e28",
    title: "突然的离职交接",
    titleEn: "Sudden Resignation Handover",
    description: "关键时刻，旁边的高级开发默默递过来一个 U 盘：“哥，我今天 last day，剩下的代码都在这了，你自己看吧。”",
    descriptionEn: "At the critical moment, the senior dev hands you a USB drive: 'Bro, today is my last day, the remaining code is here, figure it out.'",
    choices: [
      {
        id: "e28_c1",
        text: "求他留下来陪着发完这一版，请他吃海底捞。",
        textEn: "Beg him to stay and finish this release with you, offer to buy him Haidilao.",
        effect: { teamTrust: 30, releaseConfidence: 10, timeCost: 20 }
      },
      {
        id: "e28_c2",
        text: "自己硬看他留下的“屎山”代码，凭感觉推进。",
        textEn: "Read his 'spaghetti' code yourself and push forward on intuition.",
        effect: { riskLevel: 50, chaosMeter: 40, timeCost: 35 }
      },
      {
        id: "e28_c3",
        text: "直接把他的功能全部砍掉，今天绝不碰他写的代码。",
        textEn: "Cut all his features entirely, absolutely not touching his code today.",
        effect: { userImpact: -20, releaseConfidence: -15, teamTrust: -10, timeCost: 15 }
      }
    ]
  },
  {
    id: "e29",
    title: "苹果应用商店审核被拒",
    titleEn: "App Store Rejection",
    description: "就在 Web 端马上发完的时候，移动端传来噩耗：iOS App 被拒了！原因是不符合某项奇葩的新规。",
    descriptionEn: "Just as Web is almost done, mobile brings bad news: iOS App rejected! Reason is non-compliance with a weird new rule.",
    choices: [
      {
        id: "e29_c1",
        text: "不管 iOS，Web 端和安卓端先照常上线！",
        textEn: "Ignore iOS, Web and Android go live as usual!",
        effect: { userImpact: 40, riskLevel: 20, teamTrust: 10, timeCost: 5 }
      },
      {
        id: "e29_c2",
        text: "为了保持全端一致性，所有端全部停止发布。",
        textEn: "To maintain cross-platform consistency, stop all releases.",
        effect: { releaseConfidence: -20, teamTrust: -15, timeCost: 30 }
      },
      {
        id: "e29_c3",
        text: "连夜修改 iOS 代码，尝试走紧急加急审核通道。",
        textEn: "Modify iOS code overnight, try to use the emergency expedited review channel.",
        effect: { chaosMeter: 35, timeCost: 120, riskLevel: -10 }
      }
    ]
  },
  {
    id: "e30",
    title: "机房突然停电",
    titleEn: "Data Center Power Outage",
    description: "这不是演习！公司的老机房所在大楼突然拉闸停电，连 UPS 备用电源也只够撑 15 分钟了。",
    descriptionEn: "This is not a drill! The old data center building suddenly lost power, and the UPS backup will only last 15 minutes.",
    choices: [
      {
        id: "e30_c1",
        text: "生死时速！在 15 分钟内疯狂敲代码把所有数据备份到云端！",
        textEn: "Life or death! Frantically type code in 15 minutes to back up all data to the cloud!",
        effect: { riskLevel: 80, chaosMeter: 70, teamTrust: 30, timeCost: 10 }
      },
      {
        id: "e30_c2",
        text: "拔掉网线，直接宣告发布失败，大家各回各家。",
        textEn: "Pull the plug, declare the release a failure, everyone go home.",
        effect: { releaseConfidence: -50, userImpact: 60, timeCost: 5 }
      },
      {
        id: "e30_c3",
        text: "冲进机房，用自带的柴油发电机手动发电（物理硬核上线）。",
        textEn: "Rush into the data center and manually generate power with a diesel generator (hardcore physical release).",
        effect: { chaosMeter: 100, teamTrust: -20, riskLevel: 50, timeCost: 45 }
      }
    ]
  }
];

export const endings: Ending[] = [
  {
    id: "end_cowboy",
    title: "硬发赌徒 Ship It Gambler",
    titleEn: "Ship It Gambler",
    description: "你无视了所有风险，凭着一身胆量把代码硬怼上了生产环境。系统居然奇迹般地没崩，但你知道，这只是一颗还没爆炸的定时炸弹。",
    descriptionEn: "You ignored all risks and forcefully pushed code to production with pure guts. Miraculously, the system didn't crash, but you know it's a ticking time bomb.",
    imageUrl: "硬发赌徒.png"
  },
  {
    id: "end_burnout",
    title: "熬夜救世主 Midnight Rescuer",
    titleEn: "Midnight Rescuer",
    description: "你用生命在填坑，不仅逼疯了自己，也逼疯了团队。虽然最终勉强上线，但周一估计会收到好几封辞职信。",
    descriptionEn: "You filled the gaps with your life, driving yourself and your team crazy. Although you barely released it, expect several resignation letters on Monday.",
    imageUrl: "熬夜救世主.png"
  },
  {
    id: "end_hacked",
    title: "周五纵火犯 Friday Night Arsonist",
    titleEn: "Friday Night Arsonist",
    description: "你成功地在周五晚上搞垮了生产环境。客服电话被打爆，大老板深夜被惊醒，而你，正在准备你的简历。",
    descriptionEn: "You successfully crashed the production environment on a Friday night. Customer service lines exploded, the big boss woke up at midnight, and you are preparing your resume.",
    imageUrl: "周五纵火犯.png"
  },
  {
    id: "end_chaos",
    title: "灾难调度员 Chaos Dispatcher",
    titleEn: "Chaos Dispatcher",
    description: "你的每次决策都在制造新的混乱，发版过程堪比好莱坞灾难片。最终大家都在一团乱麻中麻木了。",
    descriptionEn: "Every decision you made created new chaos, making the release process akin to a Hollywood disaster movie. Everyone became numb in the mess.",
    imageUrl: "灾难调度员.png"
  },
  {
    id: "end_loop",
    title: "时间循环者 Infinite Looper",
    titleEn: "Infinite Looper",
    description: "已经过了午夜，你还在修 Bug，修好一个又出一个。发版成了一个永远无法到达的彼岸。",
    descriptionEn: "It's past midnight, and you are still fixing Bugs, fixing one only spawns another. Releasing became an unreachable shore.",
    imageUrl: "时间循环者.png"
  },
  {
    id: "end_perfect",
    title: "冷静指挥官 Calm Commander",
    titleEn: "Calm Commander",
    description: "在极致的高压下，你依然保持了惊人的冷静。风险被化解，团队对你心服口服，这是一个教科书般的发版之夜。",
    descriptionEn: "Under extreme high pressure, you maintained astonishing calmness. Risks were mitigated, the team is thoroughly convinced. A textbook release night.",
    imageUrl: "冷静指挥官.png"
  },
  {
    id: "end_apathy",
    title: "警报免疫者 Alert Numbed",
    titleEn: "Alert Numbed",
    description: "你对所有的警报 and 风险都视而不见，成功培养出了一支同样麻木的团队。系统千疮百孔，但只要还能跑，就假装看不见。",
    descriptionEn: "You turned a blind eye to all alerts and risks, successfully fostering an equally numb team. The system is riddled with holes, but if it runs, you pretend not to see.",
    imageUrl: "警报免疫者.png"
  },
  {
    id: "end_executive",
    title: "需求献祭者 Scope Sacrificer",
    titleEn: "Scope Sacrificer",
    description: "为了能早点下班，你毫不犹豫地砍掉了所有有风险的功能。PM 气得跳脚，但你成功保卫了你的周末。",
    descriptionEn: "To get off work early, you unhesitatingly axed all risky features. PM is furious, but you successfully defended your weekend.",
    imageUrl: "需求献祭者.png"
  },
  {
    id: "end_rollback",
    title: "回滚先知 Rollback Prophet",
    titleEn: "Rollback Prophet",
    description: "只要一有风吹草动，你的第一反应就是回滚。虽然保证了绝对的安全，但这个迭代等于什么都没做。",
    descriptionEn: "At the slightest sign of trouble, your first reaction is to rollback. Although absolute safety is guaranteed, this iteration effectively achieved nothing.",
    imageUrl: "回滚先知.png"
  },
  {
    id: "end_delayed",
    title: "延期保守派 The Safe Delayer",
    titleEn: "The Safe Delayer",
    description: "你评估了所有的风险后，果断按下了暂停键。虽然要面对各方的压力，但你坚信这是最负责任的决定。",
    descriptionEn: "After evaluating all risks, you decisively pressed pause. Despite pressure from all sides, you firmly believe this is the most responsible decision.",
    imageUrl: "延期保守派.png"
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
