export default {
    getBasicSetting(){
        return {
            version: "0.1.0",
            isTs: true,
            challengeMes: {
                classicalChallenge: {
                    level:1
                }
            },
            wildMonster:{}
        }
    },
    getTestSetting(){
        return {
            version: "0.1.0",
            isTs: true,
            "playerMes": {
                "monsterList": [
                    {
                        "name": "大狗嚼",
                        "race": {
                            "atk": 150,
                            "def": 120,
                            "atkMagic": 100,
                            "defMagic": 100,
                            "life": 140,
                            "speed": 150
                        },//种族值
                        "individual": {
                            "atk": 50,
                            "atkMagic": 50,
                            "def": 50,
                            "defMagic": 50,
                            "life": 50,
                            "speed": 50
                        },//个体值
                        "potentiality": {
                            "atk": 0,
                            "def": 0,
                            "atkMagic": 0,
                            "defMagic": 0,
                            "life": 0,
                            "speed": 0,
                        },//潜力值
                        "attribute": "土",
                        "level": 1,
                        "experience": 0,//当前经验
                        "skillList": [
                            "摇尾巴",
                            "大狗大狗嚼嚼嚼",
                            "低吼",
                            "哈基汪大旋风"
                        ],
                        "allSkillList":[
                            {"name":"摇尾巴","using":true},
                            {"name":"大狗大狗嚼嚼嚼","using":true},
                            {"name":"低吼","using":true},
                            {"name":"哈基汪大旋风","using":true},
                            {"name":"撕咬","using":false},
                            {"name":"电光火石","using":false},
                            {"name":"寄生种子","using":false},
                            {"name":"针刺","using":false},
                            {"name":"荆棘之躯","using":false},
                            {"name":"白雾","using":false},
                            {"name":"防护罩","using":false},
                        ]
                    },
                    {
                        "name": "小哈基汪",
                        "race": {
                            "atk": 110,
                            "def": 110,
                            "atkMagic": 100,
                            "defMagic": 100,
                            "life": 120,
                            "speed": 150
                        },//种族值
                        "individual": {
                            "atk": 20,
                            "atkMagic": 20,
                            "def": 20,
                            "defMagic": 20,
                            "life": 20,
                            "speed": 20
                        },
                        "potentiality": {
                            "atk": 0,
                            "def": 0,
                            "atkMagic": 0,
                            "defMagic": 0,
                            "life": 0,
                            "speed": 0
                        },
                        "attribute": "土",
                        "level": 1,
                        "experience": 0,//当前经验
                        "skillList": [
                            "摇尾巴",
                            "撕咬",
                            "犬吠",
                            "哈基汪大旋风"
                        ],
                        "allSkillList":[
                            {"name":"摇尾巴","using":true},
                            {"name":"撕咬","using":true},
                            {"name":"犬吠","using":true},
                            {"name":"哈基汪大旋风","using":true}
                        ]
                    },
                    {
                        "name": "小哈基汪",
                        "race": {
                            "atk": 110,
                            "def": 110,
                            "atkMagic": 100,
                            "defMagic": 100,
                            "life": 120,
                            "speed": 150
                        },//种族值
                        "individual": {
                            "atk": 20,
                            "atkMagic": 20,
                            "def": 20,
                            "defMagic": 20,
                            "life": 20,
                            "speed": 20
                        },//个体值
                        "potentiality": {
                            "atk": 0,
                            "def": 0,
                            "atkMagic": 0,
                            "defMagic": 0,
                            "life": 0,
                            "speed": 0
                        },//潜力值
                        "attribute": "土",
                        "level": 1,
                        "experience": 0,//当前经验
                        "skillList": [
                            "摇尾巴",
                            "撕咬",
                            "低吼",
                            "哈基汪大旋风"
                        ],
                        "allSkillList":[
                            {"name":"摇尾巴","using":true},
                            {"name":"撕咬","using":true},
                            {"name":"低吼","using":true},
                            {"name":"哈基汪大旋风","using":true}
                        ]
                    },
                    {
                        "name": "小哈基汪",
                        "race": {
                            "atk": 110,
                            "def": 110,
                            "atkMagic": 100,
                            "defMagic": 100,
                            "life": 120,
                            "speed": 150
                        },//种族值
                        "individual": {
                            "atk": 20,
                            "atkMagic": 20,
                            "def": 20,
                            "defMagic": 20,
                            "life": 20,
                            "speed": 20
                        },
                        "potentiality": {
                            "atk": 0,
                            "def": 0,
                            "atkMagic": 0,
                            "defMagic": 0,
                            "life": 0,
                            "speed": 0
                        },
                        "attribute": "土",
                        "level": 1,
                        "experience": 0,//当前经验
                        "skillList": [
                            "摇尾巴",
                            "撕咬",
                            "低吼",
                            "哈基汪大旋风"
                        ],
                        "allSkillList":[
                            {"name":"摇尾巴","using":true},
                            {"name":"撕咬","using":true},
                            {"name":"低吼","using":true},
                            {"name":"哈基汪大旋风","using":true}
                        ]
                    },
                    {
                        "name": "小哈基汪",
                        "race": {
                            "atk": 110,
                            "def": 110,
                            "atkMagic": 100,
                            "defMagic": 100,
                            "life": 120,
                            "speed": 150
                        },//种族值
                        "individual": {
                            "atk": 20,
                            "atkMagic": 20,
                            "def": 20,
                            "defMagic": 20,
                            "life": 20,
                            "speed": 20
                        },//个体值
                        "potentiality": {
                            "atk": 0,
                            "def": 0,
                            "atkMagic": 0,
                            "defMagic": 0,
                            "life": 0,
                            "speed": 0
                        },//潜力值
                        "attribute": "土",
                        "level": 1,
                        "experience": 0,//当前经验
                        "skillList": [
                            "摇尾巴",
                            "撕咬",
                            "低吼",
                            "哈基汪大旋风"
                        ],
                        "allSkillList":[
                            {"name":"摇尾巴","using":true},
                            {"name":"撕咬","using":true},
                            {"name":"低吼","using":true},
                            {"name":"哈基汪大旋风","using":true}
                        ]
                    },
                    {
                        "name": "小哈基汪",
                        "race": {
                            "atk": 110,
                            "def": 110,
                            "atkMagic": 100,
                            "defMagic": 100,
                            "life": 120,
                            "speed": 150
                        },//种族值
                        "individual": {
                            "atk": 20,
                            "atkMagic": 20,
                            "def": 20,
                            "defMagic": 20,
                            "life": 20,
                            "speed": 20
                        },
                        "potentiality": {
                            "atk": 0,
                            "def": 0,
                            "atkMagic": 0,
                            "defMagic": 0,
                            "life": 0,
                            "speed": 0
                        },
                        "attribute": "土",
                        "level": 1,
                        "experience": 0,//当前经验
                        "skillList": [
                            "摇尾巴",
                            "撕咬",
                            "低吼",
                            "哈基汪大旋风"
                        ],
                        "allSkillList":[
                            {"name":"摇尾巴","using":true},
                            {"name":"撕咬","using":true},
                            {"name":"低吼","using":true},
                            {"name":"哈基汪大旋风","using":true}
                        ]
                    },
                    {
                        name:"皮皮",
                        "race": {
                            "atk": 30,
                            "def": 30,
                            "atkMagic": 30,
                            "defMagic": 30,
                            "life": 60,
                            "speed": 80
                        },//种族值
                        "individual": {
                            "atk": 20,
                            "atkMagic": 20,
                            "def": 20,
                            "defMagic": 20,
                            "life": 20,
                            "speed": 20
                        },
                        "potentiality": {
                            "atk": 0,
                            "def": 0,
                            "atkMagic": 0,
                            "defMagic": 0,
                            "life": 0,
                            "speed": 0
                        },
                        "attribute": "金",
                        "level": 16,
                        "experience": 0,//当前经验
                        "skillList": [
                            "撞击",
                        ],
                        "allSkillList":[
                            {"name":"撞击","using":true}
                        ]
                    }
                ],
                "monsterFightList": [
                    0
                ],
                "name": "耄耋训练家",
                "levle": 1,
                rune:{
                    normal:10,
                    fortify:5,
                    superFortify:1,
                    supreme:0,
                },
            },
            challengeMes: {
                classicalChallenge: {
                    level:1
                }
            },
            wildMonster:{}
        }
    },
    getBasicPlayerMes(name){
        return {
            "monsterList": [
                {
                    name:"小火猴",
                    "race": {
                        "atk": 58,
                        "def": 44,
                        "atkMagic": 58,
                        "defMagic": 44,
                        "life": 44,
                        "speed": 61
                    },//种族值
                    "individual": {
                        "atk": Math.round(50 * Math.random()),
                        "atkMagic": Math.round(50 * Math.random()),
                        "def": Math.round(50 * Math.random()),
                        "defMagic": Math.round(50 * Math.random()),
                        "life": Math.round(50 * Math.random()),
                        "speed": Math.round(50 * Math.random())
                    },
                    "potentiality": {
                        "atk": 0,
                        "def": 0,
                        "atkMagic": 0,
                        "defMagic": 0,
                        "life": 0,
                        "speed": 0
                    },
                    "attribute": "火",
                    "level": 5,
                    "experience": 0,//当前经验
                    "skillList": [
                        "抓","瞪眼"
                    ],
                    "allSkillList":[]
                },
                {
                    name:"布布种子",
                    "race": {
                        "atk": 69,
                        "def": 65,
                        "atkMagic": 45,
                        "defMagic": 55,
                        "life":55,
                        "speed": 31
                    },//种族值
                    "individual": {
                        "atk": Math.round(50 * Math.random()),
                        "atkMagic": Math.round(50 * Math.random()),
                        "def": Math.round(50 * Math.random()),
                        "defMagic": Math.round(50 * Math.random()),
                        "life": Math.round(50 * Math.random()),
                        "speed": Math.round(50 * Math.random())
                    },
                    "potentiality": {
                        "atk": 0,
                        "def": 0,
                        "atkMagic": 0,
                        "defMagic": 0,
                        "life": 0,
                        "speed": 0
                    },
                    "attribute": "木",
                    "level": 5,
                    "experience": 0,//当前经验
                    "skillList": [
                        "撞击","缩头"
                    ],
                    "allSkillList":[]
                },
                {
                    name:"伊优",
                    "race": {
                        "atk": 51,
                        "def": 53,
                        "atkMagic": 61,
                        "defMagic": 56,
                        "life":53,
                        "speed": 40
                    },//种族值
                    "individual": {
                        "atk": Math.round(50 * Math.random()),
                        "atkMagic": Math.round(50 * Math.random()),
                        "def": Math.round(50 * Math.random()),
                        "defMagic": Math.round(50 * Math.random()),
                        "life": Math.round(50 * Math.random()),
                        "speed": Math.round(50 * Math.random())
                    },
                    "potentiality": {
                        "atk": 0,
                        "def": 0,
                        "atkMagic": 0,
                        "defMagic": 0,
                        "life": 0,
                        "speed": 0
                    },
                    "attribute": "水",
                    "level": 5,
                    "experience": 0,//当前经验
                    "skillList": [
                        "拍打","鸣叫"
                    ],
                    "allSkillList":[]
                },
            ],
            "monsterFightList": [
                0,1,2
            ],
            "name": name,
            "levle": 1,
            rune:{
                normal:10,
                fortify:5,
                superFortify:1,
                supreme:0,
            },
        }
    }
}
//更新日志
//待完成 vuex全局变量控制顶部提示
//新的基本设定
//保留精灵的设定和数值
//对战形式改为?V?
//场上精灵数量一边最多召唤5只，玩家有灵力上限
//灵力上限为8，初始灵力4，每回合回2
//召唤上场需要2点灵力
//初级技能 1点灵力
//中级技能 2点灵力
//高级技能 3点灵力

//灵力加速机制 （未完善）
//当回合数量超过某个数量时，每回合灵力回复+1
//必须是单数，不然先攻优势太大

//不同技能需要的灵力不同
//暂时取消卡牌，尝试专攻精灵对战
//使用灵力概念，限制双方一回合爆发上限
//招式是有使用次数的，免得无限回灵一回合秒杀多只怪
//招式使用次数改为一只精灵每回合只能发动一次技能
//玩家有总血量8000，精灵有独立血量
//玩家血量归零，或者精灵全阵亡，则失败

//效果加成 小幅1 大幅2 巨幅3
//最高加成等级5 最低消弱等级5
//2/2 
// 加成 分子+1
// 消弱 分母+1

//伤害计算公式
//伤害 = （技能攻击力/2）  * ( (100+(攻击力-对方防御力))/100)
//能力计算公式
//种族值最高1000 + 个体值最高300 + 潜力值100
//种族值 加起来不能超过1000
//单个种族值一般不会超过200,多数在100左右 最高300
//种族值 100弱小 150强大 200顶尖
//个体值 50*6=300 每个属性最多只能提升50点，天生定死，无法改变，可以通过转生提升
//1~100级，实际上只有99次升级，所以初始就要给一级的种族值
//潜力值通过升级可以提升，一共有100点，可以全部点到一个属性上
//升级潜力值都是+1

//进入战斗后精灵的数据会进行锁定，直接确认6项数据总和

//捕捉系统
//精灵都有个内置捕捉率（相当于种族值）
//不同的精灵卡有不同的捕捉率
//捕捉率 = 2 * 精灵内置捕捉率 * 精灵卡捕捉率 * 血量公式
//血量公式 =（3*最大血量-2*当前血量）/（3*最大血量）
//精灵卡种类
//普通卡 捕捉率1
//强化卡 捕捉率1.5
//超强化卡 捕捉率2
//至尊卡 捕捉率1000 必中
//最低精灵捕捉率 1%
//普通精灵捕捉率 40%

//经验结算公式 只和双方等级相关，等级越高，经验越多
//经验结算 = 对方basic
//每升一级所需要的经验：100 + lv^2
//等级 需要经验 basic
//1     101     100
//10    200     150
//20    500     200
//30    1000    300
//40    1700    400
//50    2600    500
//60    3700    600
//70    5000    700
//80    6500    800
//90    8200    900

//克制循环
//木->土->水->火->金->木
//同属性的招式和发动者威力*1.5
//技能还有普通属性，发动者一定属于五行属性，所以普通属性的招式威力不变

//封印的回合数算的是自己的回合数
//吸血效果算的是双方回合数 

//持续异常/增益状态不可叠加，新的状态会顶掉原来的状态
// 所以可以自己开低代价技能顶掉
//但是封锁和必中等非持续效果可以叠加

//技能消耗灵力的默认
//0~90威力 1
//90~120 2
//120~？ 3


//基本颜色
//#b5f830 浅黄绿色
//#33e35d 浅绿色
//#ee33ff 粉紫色
//#ff4646 红色
//#a10909 深红色
//#33a6ff 浅蓝色

//0105 已完成 处理效果技能的方法
//0106 已完成 控制技能消耗灵力
//0106 已完成 闪避几率
//0106 已完成 属性变化导致伤害计算变化
//0106 已完成 限制不是我方回合不能乱点
//0107 已完成 bot出招逻辑
//0107 已完成 精灵一回合只能发动一次技能
//0107 已完成 调整精灵场上样式
//0107 已完成 bot操作一步步执行
//0107 已完成 各种效果动画
//0107 已完成 捕捉系统设计
//0108 已完成 捕捉系统实现
//0112 已完成 测试捕捉效果
//0114 已完成 捕捉动画
//0119 已完成 决出胜负后的数据处理和结算显示
//0119 已完成 野生精灵的潜力值自动设置
//0119 已完成 战斗经验结算
//0121 已完成 天赋重洗系统
//0122 已完成 完善属性克制系统
//0122 已完成 完善战斗场地自带属性
//0122 已修复 经验结算
//0123 已完成 赛尔号 克洛斯星场景搭建 需要排查图片加载失败的问题
//0123 已完成 精灵技能更换
//0127 已完成 精灵进化
//0128 已完成 精灵等级学习技能表
//0128 已完成 精灵封印系统
//0129 已完成 同属性/被克制属性技能攻击伤害减半
//0129 已完成 特殊攻击的伤害计算
//0130 已完成 处理反伤效果
//0130 已完成 增加Boss提示
//0130 已完成 更新bot发动技能的合理逻辑