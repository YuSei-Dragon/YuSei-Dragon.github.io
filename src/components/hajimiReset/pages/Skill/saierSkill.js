let skillList = [
    {
        name:"撞击",
        type:"atk",
        atk:"35",
        aim:"single",
        cost: 1,
        text:"撞击对方造成伤害",
        attribute:"普通",
    },
    {
        name:"鸣叫",
        type:"effect",
        effect:{
            my:[],
            bot:[{"type":"atk","value":-1,}]
        },
        aim:"single",
        cost: 1,
        text:"小幅降低对方物理攻击",
        attribute:"普通",
    },
    {
        name:"瞪眼",
        type:"effect",
        effect:{
            my:[],
            bot:[{"type":"def","value":-1,}]
        },
        aim:"single",
        cost: 1,
        text:"小幅降低对方物理防御",
        attribute:"普通",
    },
    {
        name:"电光火石",
        type:"atk",
        atk:"40",
        aim:"single",
        cost: 1,
        text:"50%概率封印对方精灵一回合",
        effect:{
            my:[],
            bot:[{"type":"lock","value":1,"percent":"50"}]
        },
        attribute:"金",
    },
    {
        name:"诱惑",
        type:"effect",
        effect:{
            my:[],
            bot:[{"type":"speed","value":-1}]
        },
        aim:"single",
        cost: 1,
        text:"小幅降低对方速度",
        attribute:"普通",
    },
    {
        name:"飞翼拍击",
        type:"atk",
        atk:"60",
        aim:"single",
        cost: 1,
        text:"使用翅膀攻击对方",
        attribute:"普通",
    },
    {
        name:"魅惑",
        type:"effect",
        effect:{
            my:[],
            bot:[{"type":"speed","value":-2}]
        },
        aim:"single",
        cost: 1,
        text:"大幅降低对方速度",
        attribute:"普通",
    },
    {
        name:"手下留情",
        type:"atk",
        atk:"40",
        aim:"single",
        cost: 1,
        text:"伤害大于精灵hp时，会给对方留下1hp",
        attribute:"普通",
    },
    {
        name:"同生共死",
        type:"atk",
        atk:0,
        aim:"single",
        cost: 2,
        text:"对方体力高于自己才生效，对方体力变为和自己相同",
        attribute:"普通",
    },
    {
        name:"吹飞",
        type:"effect",
        effect:{
            my:[],
            bot:[{"type":"lock","value":1,"percent":"100"}]
        },
        aim:"single",
        cost: 1,
        text:"封印对方一回合",
        attribute:"普通",
    },
    {
        name: "燕返",
        type: "atk",
        atk: "60",
        atkAdd:{
            surelyHit:true,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"必中技能，无视闪避",
        attribute:"普通",
    },
    {
        name: "突进",
        type: "atk",
        atk: "90",
        atkAdd:{
            rebound:25,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"舍身技，会受到1/4的伤害反弹",
        attribute:"普通",
    },
    {
        name: "全力一击",
        type: "atk",
        atk: "120",
        aim:"single",
        effect:{
            my:[{"type":"lock","value":2,"percent":"100"}],
            bot:[]
        },
        cost: 2,
        text:"使用后封印自己一回合",
        attribute:"普通",
    },
    {
        name: "高速移动",
        type: "effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[{"type":"speed","value":2}],
            bot:[]
        },
        text:"大幅提高移动速度",
        attribute:"普通",
    },
    {
        name: "音速冲击",
        type: "atk",
        atk: "120",
        atkAdd:{
            rebound:25,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 2,
        text:"舍身技，会受到1/4的伤害反弹",
        attribute:"金",
    },
    {
        name:"猛禽急袭",
        type:"atk",
        atk:"150",
        atkAdd:{
            speedAdd:20,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 3,
        text:"每提升一级速度，伤害增加20",
        attribute:"金",
    },
    {
        name:"寄生种子",
        type:"effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"absorb","value":"16.25","valueType":"percent",turn:5}]
        },
        text:"5回合内每回合吸取对方1/8最大生命值",
        attribute:"木",
    },
    {
        name:"针刺",
        type:"atkMagic",
        atkMagic:"35",
        aim:"single",
        cost: 1,
        text:"飞出植物的针刺攻击对方",
        attribute:"木",
    },
    {
        name:"催眠粉",
        type:"effect",
        effect:{
            my:[],
            bot:[{"type":"lock","value":3,"percent":"50"}]
        },
        aim:"single",
        cost: 1,
        text:"50%概率封印对方三回合",
        attribute:"普通",
    },
    {
        name:"麻痹粉",
        type:"effect",
        effect:{
            my:[],
            bot:[{"type":"lock","value":2,"percent":"70"}]
        },
        aim:"single",
        cost: 1,
        text:"70%概率封印对方两回合",
        attribute:"普通",
    },
    {
        name:"毒粉",
        type:"effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"hurt","value":"10","valueType":"percent",turn:8}]
        },
        text:"8回合内每回合对对方造成1/10最大生命值伤害",
        attribute:"木",
    },
    {
        name:"疾风刃",
        type:"atk",
        atk:"55",
        aim:"single",
        cost: 1,
        text:"用叶子急速的攻击对方，带起一阵疾风",
        attribute:"木",
    },
    {
        name:"香甜气息",
        type:"effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"stable",turn:4}],
            bot:[]
        },
        text:"3个自身回合内攻击和特殊攻击必中",
        attribute:"木",
    },
    {
        name: "生长",
        type: "effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[{"type":"atkMagic","value":1}],
            bot:[]
        },
        text:"小幅提高特攻",
        attribute:"木",
    },
    {
        name: "舍身撞击",
        type: "atk",
        atk: "120",
        atkAdd:{
            rebound:25,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 2,
        text:"舍身技，会受到1/4的伤害反弹",
        attribute:"普通",
    },
    {
        name: "花瓣舞",
        type: "atk",
        atk: "50",
        atkAdd:{
            more:{
                min:1,
                max:2
            },
        },//攻击附带的特殊效果
        aim:"single",
        cost: 2,
        text:"一回合进行2~3次攻击",
        attribute:"木",
    },
    {
        name: "光合作用",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"heal","value":"50","valueType":"percent",turn:1}],
            bot:[]
        },
        text:"回复自身一半最大生命值",
        attribute:"木",
    },
    {
        name: "阳光烈焰",
        type: "atkMagic",
        atkMagic: "120",
        aim:"single",
        cost: 2,
        text:"无副效果的木属性强力特殊攻击",
        attribute:"木",
    },
    {
        name:"野蛮生长",
        type:"effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"def","value":-2},{"type":"heal","value":"100","valueType":"percent",turn:1}],
            bot:[]
        },
        text:"将自身生命值回满，但会降低自身两级物理防御",
    },
    {
        name: "荆棘之躯",
        type: "effect",
        aim:"single",
        cost: 3,
        effect:{
            my:[],
            bot:[{type:"atkReturn"}]
        },
        text:"强制让一只精灵对自身发起物理攻击，免疫这次攻击的伤害并全数返还",
        attribute:"木",
    },
    {
        name:"尖顶",
        type:"atk",
        atk:"40",
        aim:"single",
        cost: 1,
        text:"用尖刺对方造成伤害",
        attribute:"普通",
    },
    {
        name: "白雾",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"clean",turn:3}],
            bot:[]
        },
        text:"清空自身所有能力下降效果，并三回合内不会再受到能力下降效果",
        attribute:"水",
    },
    {
        name:"飞叶",
        type:"atkMagic",
        atkMagic:"35",
        aim:"single",
        cost: 1,
        text:"使用飞叶攻击对方",
        attribute:"木",
    },
    {
        name:"突刺",
        type:"atk",
        atk:"55",
        aim:"single",
        cost: 1,
        text:"突进刺伤对方造成伤害",
        attribute:"普通",
    },
    {
        name: "浓缩精华",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"speed","value":1},{"type":"stable",turn:2}],
            bot:[]
        },
        text:"增加自身一级速度，下回合攻击和特殊攻击必中",
        attribute:"水",
    },
    {
        name: "浓缩汁液",
        type: "atkMagic",
        atkMagic:"60",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{type:"cleanUp"}]
        },
        text:"对对方进行特殊攻击，命中后清空对方能力提升效果",
        attribute:"木",
    },
    {
        name:"刀叶",
        type:"atk",
        atk:"70",
        aim:"single",
        cost: 1,
        text:"用刀般锋利的叶片攻击对方",
        attribute:"木",
    },
    {
        name: "绿光波",
        type: "atkMagic",
        atkMagic:"60",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{type:"atkMagic","value":-1}]
        },
        text:"对对方进行特殊攻击，命中后降低对方一级攻击力",
        attribute:"木",
    },
    {
        name: "凝聚",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"atk","value":2}],
            bot:[]
        },
        text:"增加自身两级攻击力",
        attribute:"水",
    },
    {
        name: "四方飞叶",
        type: "atkMagic",
        atkMagic:"80",
        aim:"single",
        cost: 1,
        text:"对对方进行四面八方的飞叶攻击",
        attribute:"木",
    },
    {
        name: "千叶斩",
        type: "atk",
        atk: "55",
        atkAdd:{
            more:{
                min:1,
                max:2
            },
        },//攻击附带的特殊效果
        aim:"single",
        cost: 2,
        text:"一回合进行2~3次攻击",
        attribute:"木",
    },
    {
        name: "再生",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"heal","value":"50","valueType":"percent",turn:1}],
            bot:[]
        },
        text:"回复自身一半最大生命值",
        attribute:"普通",
    },
    {
        name: "绿叶仙子",
        type: "atkMagic",
        atkMagic:"115",
        aim:"single",
        cost: 2,
        text:"对对方进行强力的飞叶攻击",
        attribute:"木",
    },
    {
        name: "风华乱舞",
        type: "atk",
        atk:"125",
        aim:"single",
        cost: 3,
        text:"对对方进行强力的狂风落叶",
        attribute:"木",
    },
    {
        name:"卷紧",
        type:"atk",
        atk:"15",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"hurt","value":"10","valueType":"percent",turn:8}]
        },
        text:"成功命中后，8回合内每回合对对方造成1/10最大生命值伤害",
        attribute:"普通",
    },
    {
        name:"溶解液",
        type:"atkMagic",
        atkMagic:"15",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"atkMagic","value":-1,"percent":15}]
        },
        text:"成功命中后，15%几率降低对方一级特殊攻击力",
        attribute:"木",
    },
    {
        name: "消化不良",
        type: "atk",
        atk:"20",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{type:"cleanUp"}]
        },
        text:"对对方进行攻击，命中后清空对方能力提升效果",
        attribute:"普通",
    },
    {
        name: "胃液",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"clean",turn:1}],
            bot:[]
        },
        text:"清空自身所有能力下降效果",
        attribute:"普通",
    },
    {
        name: "榨取",
        type: "atkMagic",
        atkMagic:"60",
        aim:"single",
        cost: 3,
        text:"对对方进行榨取特殊攻击",
        attribute:"木",
    },
    {
        name: "能量储存",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"def","value":1},{"type":"defMagic","value":1}],
            bot:[]
        },
        text:"增加自身一级防御和特殊防御",
        attribute:"水",
    },
    {
        name: "能量吸收",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"heal","value":"25","valueType":"percent",turn:1}],
            bot:[]
        },
        text:"回复自身四分之一最大生命值",
        attribute:"普通",
    },
    {
        name: "能量放出",
        type: "atkMagic",
        atkMagic:"100",
        aim:"single",
        cost: 2,
        text:"对对方释放能量",
        attribute:"木",
    },
    {
        name: "要害攻击",
        type: "atk",
        atk:"80",
        aim:"single",
        cost: 1,
        text:"对对方进行要害攻击",
        attribute:"普通",
    },
    {
        name:"飞叶风暴",
        type:"atkMagic",
        atkMagic:"140",
        aim:"single",
        cost: 2,
        effect:{
            my:[{"type":"atkMagic","value":-1}],
            bot:[]
        },
        text:"成功命中后，降低自身一级特殊攻击力",
        attribute:"木",
    },
    {
        name: "花仙魔法",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"reverse",list:["atk","def","atkMagic","defMagic","speed"]}],
            bot:[]
        },
        text:"把自身所有的能力改变效果反转",
        attribute:"普通",
    },
    {
        name: "弹跳踢",
        type: "atk",
        atk: "30",
        atkAdd:{
            more:{
                min:1,
                max:2
            },
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"一回合进行2~3次攻击",
        attribute:"普通",
    },
    {
        name:"毒泡",
        type:"atkMagic",
        atkMagic:"45",
        aim:"single",
        cost: 1,
        text:"对对方喷出有毒的泡泡",
        attribute:"木",
    },
    {
        name:"毒气攻击",
        type:"atk",
        atk:"60",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"hurt","value":"10","valueType":"percent",turn:8,"percent":10}]
        },
        text:"成功命中后，10%几率令对方中毒，8回合内每回合对对方造成1/10最大生命值伤害",
        attribute:"木",
    },
    {
        name:"毒雾",
        type:"atkMagic",
        atkMagic:"60",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"hurt","value":"10","valueType":"percent",turn:8,"percent":10}]
        },
        text:"成功命中后，10%几率令对方中毒，8回合内每回合对对方造成1/10最大生命值伤害",
        attribute:"木",
    },
    {
        name: "毒气集中",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"atkMagic","value":1}],
            bot:[]
        },
        text:"增加自身一级特殊攻击等级",
        attribute:"普通",
    },
    {
        name:"地震",
        type:"atk",
        atk:"100",
        aim:"single",
        cost: 2,
        text:"踏碎大地，引发地震对对方造成伤害",
        attribute:"土",
    },
    {
        name:"防护罩",
        type:"team",
        aim:"single",
        cost: 2,
        effect:[{type:"protect",num:1}],
        text:"选择一只我方精灵，增加一层保护",
        attribute:"普通",
    },
    {
        name:"电磁波",
        type:"effect",
        effect:{
            my:[],
            bot:[{"type":"lock","value":2,"percent":"50"}]
        },
        aim:"single",
        cost: 1,
        text:"50%概率封印对方两回合",
        attribute:"金",
    },
    {
        name: "鬼脸",
        type: "effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"speed","value":-2}]
        },
        text:"大幅降低对方速度",
        attribute:"普通",
    },
    {
        name:"电气震",
        type:"atkMagic",
        atkMagic:"40",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"lock","value":1,"percent":"5"}]
        },
        text:"成功命中后，5%几率封印对方一回合",
        attribute:"金",
    },
    {
        name: "充电",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"stable",turn:1},{"type":"magnification",turn:2}],
            bot:[]
        },
        text:"下回合攻击/特殊攻击必中并且伤害翻倍",
        attribute:"金",
    },
    {
        name:"放电",
        type:"atkMagic",
        atkMagic:"80",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"lock","value":1,"percent":"5"}]
        },
        text:"成功命中后，5%几率封印对方一回合",
        attribute:"金",
    },
    {
        name:"火焰拳",
        type:"atkMagic",
        atkMagic:"75",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"hurt","value":"10","valueType":"percent",turn:8,"percent":10}]
        },
        text:"成功命中后，10%几率8回合内每回合对对方造成1/10最大生命值伤害",
        attribute:"火",
    },
    {
        name:"雷电拳",
        type:"atkMagic",
        atkMagic:"75",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"lock","value":1,"percent":"5"}]
        },
        text:"成功命中后，5%几率封印对方一回合",
        attribute:"金",
    },
    {
        name:"电光波",
        type:"atkMagic",
        atkMagic:"75",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"lock","value":1,"percent":"5"}]
        },
        text:"成功命中后，5%几率封印对方一回合",
        attribute:"金",
    },
    {
        name: "光之壁",
        type: "effect",
        aim:"self",
        cost: 2,
        effect:{
            my:[{"type":"defMagic","value":3},{"type":"delay",list:[
                {"type":"defMagic","value":-3,turn:3}
            ]}],
            bot:[]
        },
        text:"3回合内特防得到巨幅提升，但是3回合后特防会巨幅下降",
        attribute:"金",
    },
    {
        name:"能量冲击",
        type:"atkMagic",
        atkMagic:"90",
        aim:"single",
        cost: 1,
        text:"发出能量，对对方进行冲击",
        attribute:"金",
    },
    {
        name:"轰天雷",
        type:"atkMagic",
        atkMagic:"120",
        aim:"single",
        cost: 2,
        effect:{
            my:[],
            bot:[{"type":"lock","value":1,"percent":"5"}]
        },
        text:"成功命中后，5%几率封印对方一回合",
        attribute:"金",
    },
    {
        name: "铁钉雷",
        type: "atkMagic",
        atkMagic: "30",
        atkAdd:{
            more:{
                min:1,
                max:2
            },
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"一回合进行2~3次攻击",
        attribute:"普通",
    },
    {
        name: "噪音",
        type: "effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"def","value":-2}]
        },
        text:"降低对方两级防御",
        attribute:"普通",
    },
    {
        name:"铁头功",
        type:"atk",
        atk:"80",
        aim:"single",
        cost: 1,
        text:"使用铁头功进行头槌攻击",
        attribute:"普通",
    },
    {
        name:"积木陷阱",
        type:"atkMagic",
        atkMagic:"80",
        aim:"single",
        cost: 1,
        text:"设下陷阱进行特殊攻击",
        attribute:"普通",
    },
    {
        name: "执念",
        type: "effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[{"type":"atk","value":1},{"type":"atkMagic","value":1}],
            bot:[]
        },
        text:"增加自身一级攻击和一级特殊攻击",
        attribute:"普通",
    },
    {
        name:"扑街摔绊",
        type:"atk",
        atk:"100",
        aim:"single",
        cost: 2,
        effect:{
            my:[{"type":"lock","value":1,"percent":"10"}],
            bot:[{"type":"lock","value":2,"percent":"10"}]
        },
        text:"成功命中后，10%几率封印对方两回合,10%几率自身封印一回合",
        attribute:"土",
    },
    {
        name:"猛犬下山",
        type:"atk",
        atk:"100",
        aim:"single",
        cost: 2,
        text:"犬系专属技能,超绝气势冲向敌人发动攻击",
        attribute:"普通",
    },
    {
        name: "超负荷",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"atk","value":2}],
            bot:[]
        },
        text:"增加自身两级攻击",
        attribute:"普通",
    },
    {
        name:"彗星勾拳",
        type:"atk",
        atk:"120",
        aim:"single",
        cost: 2,
        text:"发出彗星一般轨迹莫测的勾拳",
        attribute:"普通",
    },
    {
        name:"算术",
        type:"effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"stable",turn:4}],
            bot:[]
        },
        text:"3个自身回合内攻击和特殊攻击必中",
        attribute:"普通",
    },
    {
        name:"爆裂齿轮",
        type:"atkMagic",
        atkMagic:"130",
        aim:"single",
        cost: 3,
        effect:{
            my:[],
            bot:[{"type":"defMagic","value":1,"percent":"20"}]
        },
        text:"成功命中后，20%几率降低对方一级防御",
        attribute:"金",
    },
    {
        name: "蒸汽时代",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"atkMagic","value":2},{"type":"defMagic","value":2}],
            bot:[]
        },
        text:"增加自身两级特殊攻击和两级特殊防御",
        attribute:"水",
    },
    {
        name:"风车摔投",
        type:"atk",
        atk:"140",
        aim:"single",
        cost: 3,
        text:"使出风车一般快速灵巧的摔投",
        attribute:"普通",
    },
    {
        name: "防守",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"def","value":1}],
            bot:[]
        },
        text:"增加自身一级防御",
        attribute:"普通",
    },
    {
        name:"影球",
        type:"atkMagic",
        atkMagic:"45",
        aim:"single",
        cost: 1,
        text:"使用球状黑影进行特殊攻击",
        attribute:"水",
    },
    {
        name: "吸收",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"defMagic","value":3},{"type":"def","value":3},
                {"type":"delay",list:[
                    {"type":"defMagic","value":-3,turn:2},
                    {"type":"def","value":-3,turn:2}
                ]}
            ],
            bot:[]
        },
        text:"自身2回合内大幅增加双抗，2回合后大幅降低双抗",
        attribute:"水",
    },
    {
        name:"魔影",
        type:"atkMagic",
        atkMagic:"70",
        atkAdd:{
            halfDouble:true
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"攻击目标生命值不足一半伤害加倍",
        attribute:"水",
    },
    {
        name: "分裂",
        type: "effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[{"type":"speed","value":1}],
            bot:[{"type":"speed","value":-1}]
        },
        text:"提升自身一级速度，降低对方一级速度",
        attribute:"水",
    },
    {
        name:"穿影弹",
        type:"atkMagic",
        atkMagic:"80",
        aim:"single",
        cost: 1,
        text:"用形状化为子弹的影子攻击",
        attribute:"水",
    },
    {
        name: "恐怖嚎叫",
        type: "effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"def","value":-1},{"type":"defMagic","value":-1}]
        },
        text:"降低对方一级防御，降低对方一级特殊防御",
        attribute:"普通",
    },
    {
        name:"绝影光线",
        type:"atkMagic",
        atkMagic:"100",
        aim:"single",
        cost: 2,
        effect:{
            my:[{"type":"speed","value":1,"percent":"20"}],
            bot:[]
        },
        text:"成功命中后，20%几率提升自身一级速度",
        attribute:"水",
    },
    {
        name: "暴食",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"heal","value":"100","valueType":"percent",turn:1},{"type":"lock","value":2}],
            bot:[]
        },
        text:"回复自身生命值的100%，并封印自己1回合",
        attribute:"水",
    },
    {
        name: "黑暗缠绕",
        type: "atkMagic",
        atkMagic:"90",
        aim:"single",
        cost: 1,
        effect:{
            my:[{"type":"speed","value":-1,"percent":"15"}],
            bot:[]
        },
        text:"技能命中后，15%降低对方一级速度",
        attribute:"水",
    },
    {
        name: "影之分裂",
        type: "atkMagic",
        atkMagic: "30",
        atkAdd:{
            more:{
                min:3,
                max:5
            },
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"一回合进行4~6次攻击",
        attribute:"水",
    },
    {
        name: "吞噬阳光",
        type: "effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[{"type":"atkMagic","value":1},{"type":"speed","value":1}],
            bot:[]
        },
        text:"提升自身一级物攻，一级速度",
        attribute:"水",
    },
    {
        name: "黑暗吸附",
        type: "atkMagic",
        atkMagic:"120",
        aim:"single",
        cost: 2,
        effect:{
            my:[],
            bot:[{"type":"speed","value":-1,"percent":"20"}]
        },
        text:"技能命中后，20%降低对方一级速度",
        attribute:"水",
    },
    {
        name: "多重魔影",
        type: "atkMagic",
        atkMagic:"150",
        aim:"single",
        cost: 3,
        effect:{
            my:[],
            bot:[{"type":"lock","value":1,"percent":"15"}]
        },
        text:"技能命中后，15%封印对方1回合",
        attribute:"水",
    },
    {
        name: "抓",
        type: "atk",
        atk:"40",
        aim:"single",
        cost: 1,
        text:"使用爪子攻击对方",
        attribute:"普通",
    },
    {
        name:"火花",
        type:"atkMagic",
        atkMagic:"40",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"hurt","value":"10","valueType":"percent",turn:8,"percent":10}]
        },
        text:"成功命中后，10%几率8回合内每回合对对方造成1/10最大生命值伤害",
        attribute:"火",
    },
    {
        name: "挑拨",
        type: "effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"speed","value":-1}]
        },
        text:"降低对方一级速度",
        attribute:"普通",
    },
    {
        name: "疯狂乱抓",
        type: "atk",
        atk: "25",
        atkAdd:{
            more:{
                min:1,
                max:4
            },
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"一回合进行2~5次攻击",
        attribute:"普通",
    },
    {
        name:"火焰车",
        type:"atkMagic",
        atkMagic:"95",
        aim:"single",
        cost: 2,
        effect:{
            my:[],
            bot:[{"type":"hurt","value":"10","valueType":"percent",turn:8,"percent":10}]
        },
        text:"成功命中后，10%几率8回合内每回合对对方造成1/10最大生命值伤害",
        attribute:"火",
    },
    {
        name: "佯攻",
        type: "atk",
        atk: "60",
        atkAdd:{
            surelyHit:true,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"必中技能",
        attribute:"普通",
    },
    {
        name:"折磨",
        type:"effect",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"def","value":"-1"}]
        },
        text:"降低对方一级防御",
        attribute:"普通",
    },
    {
        name: "惩罚",
        type: "atk",
        atk: "60",
        atkAdd:{
            addList:["atkLv","atkMagicLv","defLv","speedLv","defMagicLv"],
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"对方能力值越高伤害越高。每有一项能力值超过自身一级，伤害增加30%。",
        attribute:"普通",
    },
    {
        name:"火焰漩涡",
        type:"atkMagic",
        atkMagic:"15",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"hurt","value":"10","valueType":"percent",turn:8}]
        },
        text:"成功命中后，8回合内每回合对对方造成1/10最大生命值伤害",
        attribute:"火",
    },
    {
        name: "冥想",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"atkMagic","value":1},{"type":"atk","value":1}],
            bot:[]
        },
        text:"提升自身一级物攻，一级特攻",
        attribute:"普通",
    },
    {
        name: "烈焰冲撞",
        type: "atkMagic",
        atkMagic: "125",
        atkAdd:{
            rebound:25,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"对方所受1/4的伤害会反弹给自己",
        attribute:"火",
    },
    {
        name: "缩头",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"def","value":1}],
            bot:[]
        },
        text:"提升自身一级防御",
        attribute:"普通",
    },
    {
        name: "吸取",
        type: "atkMagic",
        atkMagic: "20",
        atkAdd:{
            absorb: 50,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"造成伤害的一半回复自己体力",
        attribute:"木",
    },
    {
        name: "诅咒",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"atk","value":1},{"type":"def","value":1},{"type":"speed","value":-1}],
            bot:[]
        },
        text:"提升自身一级物攻，一级防御，降低一级速度",
        attribute:"普通",
    },
    {
        name: "齿突",
        type: "atk",
        atk:"60",
        aim:"single",
        cost: 3,
        effect:{
            my:[],
            bot:[{"type":"lock","value":1,"percent":"5"}]
        },
        text:"技能命中后，5%封印对方1回合",
        attribute:"普通",
    },
    {
        name: "强力吸取",
        type: "atkMagic",
        atkMagic: "40",
        atkAdd:{
            absorb: 50,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"造成伤害的一半回复自己体力",
        attribute:"木",
    },
    {
        name: "咬碎",
        type: "atk",
        atk:"100",
        aim:"single",
        cost: 2,
        effect:{
            my:[],
            bot:[{"type":"def","value":-2,"percent":"15"}]
        },
        text:"技能命中后，15%降低对方一级防御",
        attribute:"普通",
    },
    {
        name: "超级吸取",
        type: "atkMagic",
        atkMagic: "60",
        atkAdd:{
            absorb: 50,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"造成伤害的一半回复自己体力",
        attribute:"木",
    },
    {
        name:"拍打",
        type:"atk",
        atk:"40",
        aim:"single",
        cost: 1,
        text:"拍打对方造成伤害",
        attribute:"普通",
    },
    {
        name: "泡沫",
        type: "atkMagic",
        atkMagic:"20",
        aim:"single",
        cost: 2,
        effect:{
            my:[],
            bot:[{"type":"speed","value":-1,"percent":"15"}]
        },
        text:"技能命中后，15%降低对方一级速度",
        attribute:"普通",
    },
    {
        name: "玩水",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"speed","value":1}],
            bot:[]
        },
        text:"提升自身一级速度",
        attribute:"普通",
    },
    {
        name:"飞击",
        type:"atk",
        atk:"35",
        aim:"single",
        cost: 1,
        text:"飞击对方造成伤害",
        attribute:"普通",
    },
    {
        name: "钢之爪",
        type: "atk",
        atk:"20",
        aim:"single",
        cost: 1,
        effect:{
            my:[{"type":"atk","value":1,"percent":"20"}],
            bot:[]
        },
        text:"技能命中后，20%提升自身一级物攻",
        attribute:"普通",
    },
    {
        name: "克制",
        type: "atk",
        atk:"0",
        atkAdd:{
            myLoss:50,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"对目标造成自己已损生命值一半的伤害",
        attribute:"普通",
    },
    {
        name: "泡沫光线",
        type: "atkMagic",
        atkMagic:"20",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"speed","value":-1,"percent":"15"}]
        },
        text:"技能命中后，15%降低对方一级速度",
        attribute:"水",
    },
    {
        name: "乱突",
        type: "atk",
        atk: "15",
        atkAdd:{
            more:{
                min:1,
                max:4
            },
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"一回合进行2~5次攻击",
        attribute:"普通",
    },
    {
        name:"潮汐",
        type:"atkMagic",
        atkMagic:"65",
        atkAdd:{
            halfDouble:true
        },//攻击附带的特殊效果
        aim:"single",
        cost: 1,
        text:"攻击目标生命值不足一半伤害加倍",
        attribute:"水",
    },
    {
        name: "剑舞",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"atk","value":2}],
            bot:[]
        },
        text:"提升自身两级物攻",
        attribute:"普通",
    },
    {
        name: "虚张声势",
        type: "effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"def","value":2}],
            bot:[]
        },
        text:"提升自身两级防御",
        attribute:"普通",
    },
    {
        name:"水流喷射",
        type:"atkMagic",
        atkMagic:"40",
        aim:"single",
        cost: 1,
        text:"水流喷射对方造成伤害",
        attribute:"水",
    },
    {
        name: "漩涡",
        type: "atkMagic",
        atkMagic:"15",
        aim:"single",
        cost: 1,
        effect:{
            my:[],
            bot:[{"type":"lock","percent":"70","value":"1"}]
        },
        text:"技能命中后，70%封印对方1回合",
        attribute:"水",
    },
    {
        name: "猛攻",
        type: "atk",
        atk:"80",
        aim:"single",
        cost: 1,
        text:"向对方发起猛攻",
        attribute:"普通",
    },
    {
        name: "高压水枪",
        type: "atkMagic",
        atkMagic:"120",
        aim:"single",
        cost: 1,
        text:"向对方发射高压水枪，威力强大",
        attribute:"水",
    },

]
let monsterSkillListByLevel = [
    {
        name:"皮皮",
        skillList:[
            {level:1,name:"撞击"},
            {level:3,name:"鸣叫"},
            {level:5,name:"电光火石"},
            {level:9,name:"飞翼拍击"},
            {level:13,name:"诱惑"},
        ]
    },//皮皮
    {
        name:"比波",
        skillList:[
            {level:1,name:"撞击"},
            {level:3,name:"鸣叫"},
            {level:5,name:"电光火石"},
            {level:9,name:"飞翼拍击"},
            {level:13,name:"诱惑"},
            {level:16,name:"手下留情"},
            {level:18,name:"同生共死"},
            {level:23,name:"吹飞"},
            {level:28,name:"燕返"},
            {level:33,name:"突进"},
        ]
    },//比波
    {
        name:"波克尔",
        skillList:[
            {level:1,name:"撞击"},
            {level:3,name:"鸣叫"},
            {level:5,name:"电光火石"},
            {level:9,name:"飞翼拍击"},
            {level:13,name:"诱惑"},
            {level:16,name:"手下留情"},
            {level:18,name:"同生共死"},
            {level:23,name:"吹飞"},
            {level:28,name:"燕返"},
            {level:33,name:"突进"},
            {level:37,name:"全力一击"},
            {level:41,name:"高速移动"},
            {level:49,name:"音速冲击"},
            {level:60,name:"猛禽急袭"},
        ]
    },//波克尔
    {
        name:"仙人球",
        skillList:[
            {level:1,name:"撞击"},
            {level:3,name:"鸣叫"},
            {level:7,name:"寄生种子"},
            {level:9,name:"针刺"},
            {level:13,name:"催眠粉"},
            {level:14,name:"毒粉"},
            {level:15,name:"突进"},
        ]
    },//仙人球
    {
        name:"仙人掌",
        skillList:[
            {level:1,name:"撞击"},
            {level:3,name:"鸣叫"},
            {level:7,name:"寄生种子"},
            {level:9,name:"针刺"},
            {level:13,name:"催眠粉"},
            {level:14,name:"毒粉"},
            {level:15,name:"突进"},
            {level:20,name:"疾风刃"},
            {level:23,name:"香甜气息"},
            {level:28,name:"生长"},
            {level:31,name:"舍身撞击"},
        ]
    },//仙人掌
    {
        name:"巨型仙人掌",
        skillList:[
            {level:1,name:"撞击"},
            {level:3,name:"鸣叫"},
            {level:7,name:"寄生种子"},
            {level:9,name:"针刺"},
            {level:13,name:"催眠粉"},
            {level:14,name:"毒粉"},
            {level:15,name:"突进"},
            {level:20,name:"疾风刃"},
            {level:23,name:"香甜气息"},
            {level:28,name:"生长"},
            {level:31,name:"舍身撞击"},
            {level:32,name:"花瓣舞"},
            {level:45,name:"光合作用"},
            {level:53,name:"阳光烈焰"},
            {level:59,name:"野蛮生长"},
            {level:65,name:"荆棘之躯"},
        ]
    },//巨型仙人掌
    {
        name:"小豆芽",
        skillList:[
            {level:1,name:"针刺"},
            {level:5,name:"生长"},
            {level:9,name:"卷紧"},
            {level:13,name:"催眠粉"},
            {level:16,name:"毒粉"},
            {level:19,name:"麻痹粉"},
        ]
    },//小豆芽
    {
        name:"叮叮",
        skillList:[
            {level:1,name:"尖顶"},
            {level:5,name:"毒粉"},
            {level:11,name:"白雾"},
            {level:16,name:"飞叶"},
            {level:21,name:"溶解液"},
            {level:26,name:"消化不良"},
            {level:28,name:"香甜气息"},
            {level:30,name:"胃液"},
            {level:32,name:"疾风刃"},
            {level:34,name:"刀叶"},
            {level:36,name:"榨取"},

        ]
    },//叮叮
    {
        name:"魔花仙子",
        skillList:[
            {level:1,name:"尖顶"},
            {level:5,name:"毒粉"},
            {level:11,name:"白雾"},
            {level:16,name:"飞叶"},
            {level:21,name:"突刺"},
            {level:25,name:"浓缩精华"},
            {level:29,name:"浓缩汁液"},
            {level:33,name:"刀叶"},
            {level:36,name:"榨取"},
            {level:39,name:"能量储存"},
            {level:41,name:"能量吸收"},
            {level:47,name:"能量放出"},
            {level:55,name:"要害攻击"},
            {level:63,name:"飞叶风暴"},
            {level:70,name:"花仙魔法"},
        ]
    },//魔花仙子
    {
        name:"依依",
        skillList:[
            {level:1,name:"尖顶"},
            {level:5,name:"毒粉"},
            {level:11,name:"白雾"},
            {level:16,name:"飞叶"},
        ]
    },//依依
    {
        name:"依丁丝",
        skillList:[
            {level:1,name:"尖顶"},
            {level:5,name:"毒粉"},
            {level:11,name:"白雾"},
            {level:16,name:"飞叶"},
            {level:21,name:"突刺"},
            {level:25,name:"浓缩精华"},
            {level:29,name:"浓缩汁液"},
            {level:33,name:"刀叶"},
        ]
    },//依丁丝
    {
        name:"依卡莱恩",
        skillList:[
            {level:1,name:"尖顶"},
            {level:5,name:"毒粉"},
            {level:11,name:"白雾"},
            {level:16,name:"飞叶"},
            {level:21,name:"突刺"},
            {level:25,name:"浓缩精华"},
            {level:29,name:"浓缩汁液"},
            {level:33,name:"刀叶"},
            {level:37,name:"突进"},
            {level:41,name:"寄生种子"},
            {level:44,name:"绿光波"},
            {level:47,name:"凝聚"},
            {level:50,name:"四方飞叶"},
            {level:53,name:"千叶斩"},
            {level:56,name:"再生"},
            {level:59,name:"绿叶仙子"},
            {level:64,name:"风华乱舞"},
        ]
    },//依卡莱恩
    {
        name:"小蘑菇",
        skillList:[
            {level:1,name:"撞击"},
            {level:4,name:"瞪眼"},
            {level:7,name:"针刺"},
            {level:10,name:"毒粉"},
            {level:13,name:"弹跳踢"},
            {level:17,name:"毒泡"},
            
        ]
    },//小蘑菇
    {
        name:"蘑菇怪",
        skillList:[
            {level:1,name:"撞击"},
            {level:4,name:"瞪眼"},
            {level:7,name:"针刺"},
            {level:10,name:"毒粉"},
            {level:13,name:"弹跳踢"},
            {level:17,name:"毒泡"},
            {level:21,name:"毒气攻击"},
            {level:24,name:"栖息"},
            {level:27,name:"毒雾"},
            {level:31,name:"毒气集中"},
            {level:35,name:"地震"},
            {level:39,name:"四方飞叶"},
            {level:43,name:"防护罩"},
            
        ]
    },//蘑菇怪
    {
        name:"利利",
        skillList:[
            {level:1,name:"撞击"},
            {level:5,name:"鸣叫"},
            {level:10,name:"电磁波"},
            {level:18,name:"鬼脸"},
        ]
    },//利利
    {
        name:"绵绵",
        skillList:[
            {level:1,name:"撞击"},
            {level:5,name:"鸣叫"},
            {level:10,name:"电磁波"},
            {level:18,name:"鬼脸"},
            {level:21,name:"电气震"},
            {level:25,name:"充电"},
            {level:29,name:"放电"},
            {level:33,name:"火焰拳"},
        ]
    },//绵绵
    {
        name:"电击兔",
        skillList:[
            {level:1,name:"撞击"},
            {level:5,name:"鸣叫"},
            {level:10,name:"电磁波"},
            {level:18,name:"鬼脸"},
            {level:21,name:"电气震"},
            {level:25,name:"充电"},
            {level:29,name:"放电"},
            {level:33,name:"火焰拳"},
            {level:38,name:"雷电拳"},
            {level:42,name:"电光波"},
            {level:51,name:"光之壁"},
            {level:59,name:"能量冲击"},
            {level:68,name:"轰天雷"},
        ]
    },//电击兔
    {
        name:"小犬苗",
        skillList:[
            {level:1,name:"撞击"},
            {level:7,name:"鸣叫"},
            {level:13,name:"电光火石"},
            {level:19,name:"铁钉雷"},
        ]
    },//小犬苗
    {
        name:"天才犬",
        skillList:[
            {level:1,name:"撞击"},
            {level:7,name:"鸣叫"},
            {level:13,name:"电光火石"},
            {level:19,name:"铁钉雷"},
            {level:24,name:"噪音"},
            {level:28,name:"铁头功"},
            {level:32,name:"积木陷阱"},
            {level:32,name:"执念"},
        ]
    },//天才犬
    {
        name:"夏洛犬",
        skillList:[
            {level:1,name:"撞击"},
            {level:7,name:"鸣叫"},
            {level:13,name:"电光火石"},
            {level:19,name:"铁钉雷"},
            {level:24,name:"噪音"},
            {level:28,name:"铁头功"},
            {level:32,name:"积木陷阱"},
            {level:32,name:"执念"},
            {level:40,name:"扑街摔绊"},
            {level:44,name:"猛犬下山"},
            {level:48,name:"超负荷"},
            {level:52,name:"彗星勾拳"},
            {level:56,name:"算术"},
            {level:60,name:"爆裂齿轮"},
            {level:64,name:"蒸汽时代"},
            {level:68,name:"风车摔投"},
        ]
    },//夏洛犬
    {
        name:"埃尔特",
        skillList:[
            {level:1,name:"撞击"},
            {level:5,name:"防守"},
            {level:9,name:"影球"},
            {level:13,name:"吸收"},
            {level:17,name:"邪恶攻击"},
            {level:21,name:"魔影"},
            {level:25,name:"分裂"},
            {level:29,name:"穿影弹"},
            {level:33,name:"恐怖嚎叫"},
        ]
    },//埃尔特
    {
        name:"埃洛兽",
        skillList:[
            {level:1,name:"撞击"},
            {level:5,name:"防守"},
            {level:9,name:"影球"},
            {level:13,name:"吸收"},
            {level:17,name:"邪恶攻击"},
            {level:21,name:"魔影"},
            {level:25,name:"分裂"},
            {level:29,name:"穿影弹"},
            {level:33,name:"恐怖嚎叫"},
            {level:37,name:"绝影光线"},
            {level:41,name:"暴食"},
            {level:45,name:"黑暗缠绕"},
            {level:49,name:"影之分裂"},
            {level:53,name:"吞噬阳光"},
            {level:57,name:"黑暗吸附"},
            {level:61,name:"多重魔影"},
        ]
    },//埃洛兽
    {
        name:"小火猴",
        skillList:[
            {level:1,name:"抓"},
            {level:3,name:"瞪眼"},
            {level:7,name:"火花"},
            {level:9,name:"挑拨"},
        ]
    },//小火猴
    {
        name:"烈火猴",
        skillList:[
            {level:1,name:"抓"},
            {level:3,name:"瞪眼"},
            {level:7,name:"火花"},
            {level:9,name:"挑拨"},
            {level:14,name:"音速拳"},
            {level:16,name:"疯狂乱抓"},
            {level:19,name:"火焰车"},
            {level:26,name:"佯攻"},
            {level:29,name:"折磨"},
        ]
    },//烈火猴
    {
        name:"烈焰猩猩",
        skillList:[
            {level:1,name:"抓"},
            {level:3,name:"瞪眼"},
            {level:7,name:"火花"},
            {level:9,name:"挑拨"},
            {level:14,name:"音速拳"},
            {level:16,name:"疯狂乱抓"},
            {level:19,name:"火焰车"},
            {level:26,name:"佯攻"},
            {level:29,name:"折磨"},
            {level:36,name:"惩罚"},
            {level:41,name:"全力一击"},
            {level:45,name:"火焰漩涡"},
            {level:53,name:"冥想"},
            {level:57,name:"烈焰冲撞"},
        ]
    },//烈焰猩猩
    {
        name:"布布种子",
        skillList:[
            {level:1,name:"撞击"},
            {level:4,name:"缩头"},
            {level:9,name:"吸取"},
            {level:13,name:"疾风刃"},
            {level:17,name:"诅咒"},
        ]
    },//布布种子
    {
        name:"布布草",
        skillList:[
            {level:1,name:"撞击"},
            {level:4,name:"缩头"},
            {level:9,name:"吸取"},
            {level:13,name:"疾风刃"},
            {level:17,name:"诅咒"},
            {level:22,name:"齿突"},
            {level:27,name:"强力吸取"},
        ]
    },//布布草
    {
        name:"布布花",
        skillList:[
            {level:1,name:"撞击"},
            {level:4,name:"缩头"},
            {level:9,name:"吸取"},
            {level:13,name:"疾风刃"},
            {level:17,name:"诅咒"},
            {level:22,name:"齿突"},
            {level:27,name:"强力吸取"},
            {level:32,name:"舍身撞击"},
            {level:33,name:"地震"},
            {level:34,name:"寄生种子"},
            {level:39,name:"光合作用"},
            {level:45,name:"咬碎"},
            {level:51,name:"超级吸取"},
            {level:57,name:"飞叶风暴"},
        ]
    },//布布花
    {
        name:"伊优",
        skillList:[
            {level:1,name:"拍打"},
            {level:4,name:"鸣叫"},
            {level:8,name:"泡沫"},
            {level:11,name:"玩水"},
            {level:15,name:"飞击"},
        ]
    },//伊优
    {
        name:"尤里安",
        skillList:[
            {level:1,name:"拍打"},
            {level:4,name:"鸣叫"},
            {level:8,name:"泡沫"},
            {level:11,name:"玩水"},
            {level:15,name:"飞击"},
            {level:16,name:"钢之爪"},
            {level:19,name:"克制"},
            {level:24,name:"泡沫光线"},
            {level:28,name:"乱突"},
            {level:33,name:"潮汐"},
        ]
    },//尤里安
    {
        name:"巴鲁斯",
        skillList:[
            {level:1,name:"拍打"},
            {level:4,name:"鸣叫"},
            {level:8,name:"泡沫"},
            {level:11,name:"玩水"},
            {level:15,name:"飞击"},
            {level:16,name:"钢之爪"},
            {level:19,name:"克制"},
            {level:24,name:"泡沫光线"},
            {level:28,name:"乱突"},
            {level:33,name:"潮汐"},
            {level:36,name:"剑舞"},
            {level:37,name:"虚张声势"},
            {level:38,name:"水流喷射"},
            {level:39,name:"漩涡"},
            {level:46,name:"白雾"},
            {level:52,name:"猛攻"},
            {level:59,name:"高压水枪"},
        ]
    },//巴鲁斯

]
export default{
    getSaierSkillList(){
        return skillList
    },
    getSkillList(){
        return monsterSkillListByLevel
    }
}