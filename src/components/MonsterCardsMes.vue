<template>
    <div>

    </div>
</template>

<script>
export default {
    //20血
    setup () {
[   //spade
    {name:"攻击",type:"spade",desc:"消耗一张‘攻击’卡，使用我方怪兽攻击力之和发起一次攻击"},
    {name:"死斗",type:"spade",desc:"消耗一张‘死斗’卡，选对方和我方各一只怪兽，攻击力低的破坏，并给予差值的伤害"},
    {name:"破竹",type:"spade",desc:"攻击成功造成对方怪兽破坏的情况下，消耗一张‘破竹’卡，本回合可以再发动一次攻击"},
    {name:"重击",type:"spade",desc:"消耗一张‘重击’卡，本回合下次攻击结算伤害+4"},

    //diamond
    {name:"避战",type:"diamond",desc:"消耗一张‘避战’卡，抵消对方一次攻击"},
    

    //heart
    {name:"治愈",type:"heart",desc:"消耗一张‘治愈’卡，回复4点生命值"},


    //club
    {name:"镜像",type:"club",desc:"消耗一张‘镜像’卡，选取一只怪兽，本回合内攻防数值互换"},
    {name:"揠苗",type:"club",desc:"消耗一张‘揠苗’卡，进行一次判定，然后翻开三张卡，每拿一张相同花色的卡，收到两点伤害"},

]   

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>