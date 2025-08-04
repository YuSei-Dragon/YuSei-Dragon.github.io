<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
const Battlefield = defineAsyncComponent(() =>
  import("./pages/Battlefield.vue")
)
const myMonsterList = ref([
    {
        id: "Monster1",
        name:"艾露猫",
        atk:30,
        atkMagic:10,
        def:30,
        defMagic:30,
        life:30,
        speed:70,
        skillListName:["老大别怕，猫车来了",],
        attribute:"水",
        size:10,
    },
    {
        id: "Monster2",
        name:"迪奥·布兰度",
        atk:60,
        atkMagic:80,
        def:70,
        defMagic:50,
        life:90,
        speed:100,
        skillListName:[],
        attribute:"金",
        size:60,
    },
    {
        id: "Monster3",
        name:"诺克萨斯之手",
        atk:70,
        atkMagic:10,
        def:70,
        defMagic:60,
        life:80,
        speed:70,
        skillListName:["血怒"],
        attribute:"火",
        size:60,
    }
])
</script>
<template lang="pug">
.all-block
    .main-block()
        Battlefield(:myMonsterList_="myMonsterList")
</template>
<style scoped lang="scss">
.all-block{
    width: 100wh;
    height: 100vh;
    position: relative;
}
.main-block{
    position: absolute;
    bottom: 0;
    left: 0;
    width:500px;
    height: 400px;
    opacity:0.5;
}
.main-block:hover{
    opacity: 1;
}
</style>