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
  },
  {
    id: "e14",
    title: "被遗忘的环境变量",
    description: "生产环境的配置表里少了一个新的环境变量，测试环境一切正常，但只要一上线，核心接口必报 500 错误。",
    choices: [
      {
        id: "e14_c1",
        text: "立刻拉起审批流程，按照规范补齐变量后再发。",
        effect: { timeCost: 30, releaseConfidence: 15, riskLevel: -10 }
      },
      {
        id: "e14_c2",
        text: "直接让运维通过命令行手动注入，跳过审批。",
        effect: { chaosMeter: 25, riskLevel: 20, timeCost: 5 }
      },
      {
        id: "e14_c3",
        text: "快速修改代码，给这个变量加个硬编码的默认值。",
        effect: { riskLevel: 35, releaseConfidence: -15, teamTrust: -10, timeCost: 15 }
      }
    ]
  },
  {
    id: "e15",
    title: "前端缓存作祟",
    description: "新版的 UI 已经发布，但你发现大量用户手机上还缓存着旧版的 JS 文件，导致页面点击按钮毫无反应。",
    choices: [
      {
        id: "e15_c1",
        text: "紧急发布一个带强制刷新逻辑的补丁版本。",
        effect: { timeCost: 40, riskLevel: 10, userImpact: 20 }
      },
      {
        id: "e15_c2",
        text: "联系 CDN 供应商紧急刷新全网节点缓存。",
        effect: { chaosMeter: 20, timeCost: 20, releaseConfidence: -10 }
      },
      {
        id: "e15_c3",
        text: "发个公告，让用户手动清除浏览器缓存。",
        effect: { userImpact: 40, teamTrust: -20, riskLevel: -5, timeCost: 5 }
      }
    ]
  },
  {
    id: "e16",
    title: "云服务商的“惊喜”",
    description: "在部署的关键时刻，云服务商（AWS/阿里云）发邮件说当前机房网络波动，预计 2 小时后恢复。",
    choices: [
      {
        id: "e16_c1",
        text: "等！安全第一，等网络稳定再继续发布。",
        effect: { timeCost: 120, releaseConfidence: 10, riskLevel: -10 }
      },
      {
        id: "e16_c2",
        text: "赌一把，强行跨区推镜像，可能会丢包失败。",
        effect: { riskLevel: 45, chaosMeter: 35, timeCost: 15 }
      },
      {
        id: "e16_c3",
        text: "紧急启动异地多活灾备方案，把流量切到备用机房发版。",
        effect: { teamTrust: 20, chaosMeter: 40, releaseConfidence: -20, timeCost: 60 }
      }
    ]
  },
  {
    id: "e17",
    title: "神秘的“祖传代码”报错",
    description: "你修改了登录逻辑，结果触发了一段三年前离职老哥写的、没有任何注释的祖传代码，报了一个不知名的错误。",
    choices: [
      {
        id: "e17_c1",
        text: "把那段代码直接注释掉，只要能跑通主流程就行。",
        effect: { riskLevel: 60, releaseConfidence: -30, chaosMeter: 25, timeCost: 10 }
      },
      {
        id: "e17_c2",
        text: "全员加班，把这段祖传代码彻底重构掉。",
        effect: { timeCost: 90, teamTrust: -25, releaseConfidence: 20, riskLevel: -10 }
      },
      {
        id: "e17_c3",
        text: "回滚你自己的修改，这功能今天不上了。",
        effect: { userImpact: -15, teamTrust: 10, releaseConfidence: -20, timeCost: 20 }
      }
    ]
  },
  {
    id: "e18",
    title: "竞争对手突然发大招",
    description: "市场部传来噩耗：死对头公司刚才发布了和你们一模一样的新功能。老板要求你们必须在今晚反击上线！",
    choices: [
      {
        id: "e18_c1",
        text: "“收到！”跳过剩余的自动化测试，全军突击！",
        effect: { riskLevel: 50, chaosMeter: 40, releaseConfidence: -30, timeCost: 5 }
      },
      {
        id: "e18_c2",
        text: "按原定节奏来，质量比速度更重要，绝不自乱阵脚。",
        effect: { teamTrust: 25, userImpact: 20, timeCost: 30, chaosMeter: -10 }
      },
      {
        id: "e18_c3",
        text: "赶紧临时加一个敷衍的弹窗功能，证明我们也有。",
        effect: { userImpact: 35, riskLevel: 30, chaosMeter: 20, timeCost: 20 }
      }
    ]
  },
  {
    id: "e19",
    title: "运维大叔的失误",
    description: "运维老哥不小心敲错命令，把预发布环境（Staging）的数据库给清空了，现在没法进行最后的验证了。",
    choices: [
      {
        id: "e19_c1",
        text: "没测试就没测试吧，开发环境过了，直接上生产！",
        effect: { riskLevel: 60, releaseConfidence: -40, chaosMeter: 30, timeCost: 5 }
      },
      {
        id: "e19_c2",
        text: "暂停一切，等他从备份恢复预发布数据再继续。",
        effect: { timeCost: 80, releaseConfidence: 10, chaosMeter: -5 }
      },
      {
        id: "e19_c3",
        text: "把一部分生产流量导到测试机，用真用户做验证（大胆的灰度）。",
        effect: { userImpact: 40, riskLevel: 45, chaosMeter: 50, timeCost: 20 }
      }
    ]
  },
  {
    id: "e20",
    title: "过期的证书",
    description: "HTTPS 证书突然过期了，浏览器开始给所有访问页面的用户疯狂弹红色的不安全警告。",
    choices: [
      {
        id: "e20_c1",
        text: "手忙脚乱去买新证书、配 Nginx，发版延后。",
        effect: { timeCost: 60, riskLevel: -20, chaosMeter: 20 }
      },
      {
        id: "e20_c2",
        text: "让用户点击“继续访问”，先发版，证书下周再说。",
        effect: { userImpact: 80, teamTrust: -20, riskLevel: 30, timeCost: 5 }
      },
      {
        id: "e20_c3",
        text: "用免费的 Let's Encrypt 临时签发一个顶上。",
        effect: { chaosMeter: 15, releaseConfidence: 10, timeCost: 25 }
      }
    ]
  },
  {
    id: "e21",
    title: "设计师的“像素级”强迫症",
    description: "UI 设计师在走查时发现，首页的一个主要按钮偏离了 2 个像素，坚决要求重新打个包。",
    choices: [
      {
        id: "e21_c1",
        text: "“好的好的。”重新走一遍漫长的 CI/CD。",
        effect: { timeCost: 45, teamTrust: 10, chaosMeter: -5 }
      },
      {
        id: "e21_c2",
        text: "“2 像素没人看得出来，发！”",
        effect: { teamTrust: -15, releaseConfidence: 5, timeCost: 5 }
      },
      {
        id: "e21_c3",
        text: "直接在生产环境的热更新代码里加一行 CSS 覆盖。",
        effect: { riskLevel: 25, chaosMeter: 15, timeCost: 10 }
      }
    ]
  },
  {
    id: "e22",
    title: "诡异的第三方库冲突",
    description: "引入的新依赖包和系统原有的老包版本冲突，导致控制台狂报红，虽然页面暂时没挂，但随时可能崩溃。",
    choices: [
      {
        id: "e22_c1",
        text: "不管了，只要用户能点动就行。",
        effect: { riskLevel: 55, chaosMeter: 25, releaseConfidence: -20, timeCost: 5 }
      },
      {
        id: "e22_c2",
        text: "立刻降级回退第三方包，宁可不上新特性。",
        effect: { releaseConfidence: 15, userImpact: -15, riskLevel: -10, timeCost: 30 }
      },
      {
        id: "e22_c3",
        text: "尝试用 Webpack/Vite 魔法强行抹平冲突，不管后果。",
        effect: { chaosMeter: 40, riskLevel: 30, timeCost: 25 }
      }
    ]
  },
  {
    id: "e23",
    title: "老板的临时视察",
    description: "大老板突然发消息：“我正在试用刚发的版本，怎么感觉首页有点卡？”其实你们还没全量发布，他点的是旧版。",
    choices: [
      {
        id: "e23_c1",
        text: "耐心解释：“老板，新版还没上呢，马上就好。”",
        effect: { teamTrust: 10, timeCost: 15, chaosMeter: -5 }
      },
      {
        id: "e23_c2",
        text: "慌了神，立刻催全员：“别管流程了，赶紧把新版推上去！”",
        effect: { riskLevel: 45, chaosMeter: 35, timeCost: 5, releaseConfidence: -15 }
      },
      {
        id: "e23_c3",
        text: "假装没看到消息，静音手机，专心发版。",
        effect: { teamTrust: -25, riskLevel: 10, timeCost: 5 }
      }
    ]
  },
  {
    id: "e24",
    title: "数据库锁表了！",
    description: "在执行一个看似简单的 Alter Table 时，数据库突然死锁，所有生产环境的写操作全挂了！",
    choices: [
      {
        id: "e24_c1",
        text: "立刻 Kill 掉那个进程，放弃修改表结构。",
        effect: { riskLevel: -20, releaseConfidence: -30, chaosMeter: 10, timeCost: 15 }
      },
      {
        id: "e24_c2",
        text: "死等！祈祷锁能自己解开。",
        effect: { userImpact: 60, chaosMeter: 40, timeCost: 45 }
      },
      {
        id: "e24_c3",
        text: "主库挂了切备库，强行把流量打到从库上读写分离。",
        effect: { riskLevel: 65, chaosMeter: 50, teamTrust: -15, timeCost: 25 }
      }
    ]
  },
  {
    id: "e25",
    title: "核心 API 鉴权失效",
    description: "测试发现，新上线的用户鉴权接口由于拼写错误，导致随便传个 Token 都能拿到管理员权限。",
    choices: [
      {
        id: "e25_c1",
        text: "紧急拉闸，全服停机维护，修好再开。",
        effect: { userImpact: 70, riskLevel: -40, releaseConfidence: 20, timeCost: 60 }
      },
      {
        id: "e25_c2",
        text: "趁没人发现，偷偷发个 Hotfix 覆盖掉。",
        effect: { riskLevel: 30, chaosMeter: 20, timeCost: 15 }
      },
      {
        id: "e25_c3",
        text: "把鉴权模块退回上一版本，新功能裸奔跑一晚。",
        effect: { riskLevel: 80, releaseConfidence: -50, teamTrust: -20, timeCost: 10 }
      }
    ]
  },
  {
    id: "e26",
    title: "不兼容的 iOS 版本",
    description: "有人随手拿了一台三年前的 iPhone 测试，发现新页面直接白屏了。但数据显示这类机型只占用户的 1%。",
    choices: [
      {
        id: "e26_c1",
        text: "“1% 的用户也是用户！全员排查兼容性问题！”",
        effect: { timeCost: 90, teamTrust: -30, releaseConfidence: 20, riskLevel: -10 }
      },
      {
        id: "e26_c2",
        text: "“时代在进步，他们该换手机了，发版！”",
        effect: { userImpact: 25, riskLevel: 10, releaseConfidence: 10, timeCost: 5 }
      },
      {
        id: "e26_c3",
        text: "给旧机型强行塞一个丑陋的降级静态页面。",
        effect: { userImpact: 15, chaosMeter: 15, timeCost: 30 }
      }
    ]
  },
  {
    id: "e27",
    title: "代码分支合错了",
    description: "你震惊地发现，刚才打的生产包里，竟然混入了一个下个月才打算上的“未完成大促销活动”代码。",
    choices: [
      {
        id: "e27_c1",
        text: "硬着头皮上，立刻去生产配置中心把活动的入口关死。",
        effect: { riskLevel: 45, chaosMeter: 30, timeCost: 15 }
      },
      {
        id: "e27_c2",
        text: "立刻停止发布，Git Reset 回退分支重新合并打包。",
        effect: { timeCost: 50, releaseConfidence: 15, chaosMeter: -10 }
      },
      {
        id: "e27_c3",
        text: "索性直接通知运营部：“惊不惊喜？活动提前开始了！”",
        effect: { teamTrust: -35, userImpact: 40, riskLevel: 50, chaosMeter: 60, timeCost: 5 }
      }
    ]
  },
  {
    id: "e28",
    title: "突然的离职交接",
    description: "关键时刻，旁边的高级开发默默递过来一个 U 盘：“哥，我今天 last day，剩下的代码都在这了，你自己看吧。”",
    choices: [
      {
        id: "e28_c1",
        text: "求他留下来陪着发完这一版，请他吃海底捞。",
        effect: { teamTrust: 30, releaseConfidence: 10, timeCost: 20 }
      },
      {
        id: "e28_c2",
        text: "自己硬看他留下的“屎山”代码，凭感觉推进。",
        effect: { riskLevel: 50, chaosMeter: 40, timeCost: 35 }
      },
      {
        id: "e28_c3",
        text: "直接把他的功能全部砍掉，今天绝不碰他写的代码。",
        effect: { userImpact: -20, releaseConfidence: -15, teamTrust: -10, timeCost: 15 }
      }
    ]
  },
  {
    id: "e29",
    title: "苹果应用商店审核被拒",
    description: "就在 Web 端马上发完的时候，移动端传来噩耗：iOS App 被拒了！原因是不符合某项奇葩的新规。",
    choices: [
      {
        id: "e29_c1",
        text: "不管 iOS，Web 端和安卓端先照常上线！",
        effect: { userImpact: 40, riskLevel: 20, teamTrust: 10, timeCost: 5 }
      },
      {
        id: "e29_c2",
        text: "为了保持全端一致性，所有端全部停止发布。",
        effect: { releaseConfidence: -20, teamTrust: -15, timeCost: 30 }
      },
      {
        id: "e29_c3",
        text: "连夜修改 iOS 代码，尝试走紧急加急审核通道。",
        effect: { chaosMeter: 35, timeCost: 120, riskLevel: -10 }
      }
    ]
  },
  {
    id: "e30",
    title: "机房突然停电",
    description: "这不是演习！公司的老机房所在大楼突然拉闸停电，连 UPS 备用电源也只够撑 15 分钟了。",
    choices: [
      {
        id: "e30_c1",
        text: "生死时速！在 15 分钟内疯狂敲代码把所有数据备份到云端！",
        effect: { riskLevel: 80, chaosMeter: 70, teamTrust: 30, timeCost: 10 }
      },
      {
        id: "e30_c2",
        text: "拔掉网线，直接宣告发布失败，大家各回各家。",
        effect: { releaseConfidence: -50, userImpact: 60, timeCost: 5 }
      },
      {
        id: "e30_c3",
        text: "冲进机房，用自带的柴油发电机手动发电（物理硬核上线）。",
        effect: { chaosMeter: 100, teamTrust: -20, riskLevel: 50, timeCost: 45 }
      }
    ]
  }
];

export const endings: Ending[] = [
  {
    id: "end_cowboy",
    title: "硬发赌徒 Ship It Gambler",
    description: "你无视了所有风险，凭着一身胆量把代码硬怼上了生产环境。系统居然奇迹般地没崩，但你知道，这只是一颗还没爆炸的定时炸弹。",
    imageUrl: "硬发赌徒.png"
  },
  {
    id: "end_burnout",
    title: "熬夜救世主 Midnight Rescuer",
    description: "你用生命在填坑，不仅逼疯了自己，也逼疯了团队。虽然最终勉强上线，但周一估计会收到好几封辞职信。",
    imageUrl: "熬夜救世主.png"
  },
  {
    id: "end_hacked",
    title: "周五纵火犯 Friday Night Arsonist",
    description: "你成功地在周五晚上搞垮了生产环境。客服电话被打爆，大老板深夜被惊醒，而你，正在准备你的简历。",
    imageUrl: "周五纵火犯.png"
  },
  {
    id: "end_chaos",
    title: "灾难调度员 Chaos Dispatcher",
    description: "你的每次决策都在制造新的混乱，发版过程堪比好莱坞灾难片。最终大家都在一团乱麻中麻木了。",
    imageUrl: "灾难调度员.png"
  },
  {
    id: "end_loop",
    title: "时间循环者 Infinite Looper",
    description: "已经过了午夜，你还在修 Bug，修好一个又出一个。发版成了一个永远无法到达的彼岸。",
    imageUrl: "时间循环者.png"
  },
  {
    id: "end_perfect",
    title: "冷静指挥官 Calm Commander",
    description: "在极致的高压下，你依然保持了惊人的冷静。风险被化解，团队对你心服口服，这是一个教科书般的发版之夜。",
    imageUrl: "冷静指挥官.png"
  },
  {
    id: "end_apathy",
    title: "警报免疫者 Alert Numbed",
    description: "你对所有的警报 and 风险都视而不见，成功培养出了一支同样麻木的团队。系统千疮百孔，但只要还能跑，就假装看不见。",
    imageUrl: "警报免疫者.png"
  },
  {
    id: "end_executive",
    title: "需求献祭者 Scope Sacrificer",
    description: "为了能早点下班，你毫不犹豫地砍掉了所有有风险的功能。PM 气得跳脚，但你成功保卫了你的周末。",
    imageUrl: "需求献祭者.png"
  },
  {
    id: "end_rollback",
    title: "回滚先知 Rollback Prophet",
    description: "只要一有风吹草动，你的第一反应就是回滚。虽然保证了绝对的安全，但这个迭代等于什么都没做。",
    imageUrl: "回滚先知.png"
  },
  {
    id: "end_delayed",
    title: "延期保守派 The Safe Delayer",
    description: "你评估了所有的风险后，果断按下了暂停键。虽然要面对各方的压力，但你坚信这是最负责任的决定。",
    imageUrl: "延期保守派.png"
  },
  {
    id: "end_genius_op",
    title: "天才运营 Genius Operator",
    description: "虽然技术上一塌糊涂，线上崩得没眼看，但你靠着绝妙的话术和补偿方案，硬生生把一次严重的线上事故包装成了“限时回馈活动”，用户不仅没骂，反而感恩戴德。",
    imageUrl: "天才运营.png"
  },
  {
    id: "end_popular_mgr",
    title: "超人气管理 Super Popular Manager",
    description: "发布虽然磕磕绊绊，甚至被迫延期，但你在过程中展现出的护犊子和抗压能力，让团队士气空前高涨，大家都被你的领袖魅力折服，愿意为你卖命。",
    imageUrl: "超人气管理.png"
  },
  {
    id: "end_scapegoat",
    title: "天选背锅侠 The Chosen Scapegoat",
    description: "你小心翼翼地维持着一切指标，没出大错也没立大功。然而，系统在没有任何征兆的情况下崩溃了。明明不是你的错，最后黑锅却全扣在了你头上。",
    imageUrl: "天选背锅侠.png"
  }
];

export function determineEnding(state: GameState): Ending {
  const { riskLevel, teamTrust, chaosMeter, userImpact, releaseConfidence, currentTime } = state;

  // 1. Extreme Cases (Highest Priority)
  if (chaosMeter > 80 && riskLevel > 80 && releaseConfidence < 20) return endings.find(e => e.id === "end_hacked")!; // 生产环境被搞垮
  if (chaosMeter > 90) return endings.find(e => e.id === "end_chaos")!; // 纯粹的混乱
  
  // 2. Special Personalities
  if (userImpact < 30 && chaosMeter > 70 && releaseConfidence > 50) return endings.find(e => e.id === "end_genius_op")!; // 事故虽大，但用户被安抚了（天才运营）
  if (teamTrust > 85 && releaseConfidence < 60) return endings.find(e => e.id === "end_popular_mgr")!; // 团队极其信任，哪怕发版不顺利（超人气管理）
  if (teamTrust < 30) return endings.find(e => e.id === "end_burnout")!; // 团队崩溃
  
  // 3. Time Constraints
  if (currentTime.getHours() >= 23 || currentTime.getHours() < 5) return endings.find(e => e.id === "end_loop")!; // 熬夜无限循环

  // 4. Middle-tier Cases
  if (riskLevel > 80) return endings.find(e => e.id === "end_cowboy")!; // 高风险硬发
  if (userImpact > 75) return endings.find(e => e.id === "end_apathy")!; // 用户影响极大但不作为
  if (chaosMeter > 60 && teamTrust < 50) return endings.find(e => e.id === "end_executive")!; // 砍需求

  // 5. Positive / Cautious Cases
  if (releaseConfidence > 80 && riskLevel < 30 && chaosMeter < 40) return endings.find(e => e.id === "end_perfect")!; // 完美发布
  if (releaseConfidence < 40 && riskLevel > 60) return endings.find(e => e.id === "end_rollback")!; // 一直回滚

  // 6. Hidden / Default Fallbacks
  // 如果所有指标都在 40-60 的平庸区间，并且没能达成任何明确的特性结局，触发背锅侠
  if (releaseConfidence > 40 && releaseConfidence < 60 && 
      riskLevel > 40 && riskLevel < 60 && 
      teamTrust > 40 && teamTrust < 60) {
    return endings.find(e => e.id === "end_scapegoat")!;
  }

  // 默认：延期保守派
  return endings.find(e => e.id === "end_delayed")!;
}
