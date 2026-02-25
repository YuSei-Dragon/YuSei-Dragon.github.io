<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
  defineProps,
  inject,
  reactive
} from 'vue'
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import planetApi from '../planetApi.js'
const Planet = defineAsyncComponent(() =>
  import("../Planet.vue")
)
const router = useRouter()
const route = useRoute()
const store = useStore()
const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
const kingdowMesList = ref([])
const monsterShowList = ref([])
onMounted(() => {
    allMes.value = store.state.hajimiReset.allMes
    // 数据本地化，方便后续使用
    kingdowMesList.value = allMes.value.planetMes.threeKingdoms.progressList
})
const groundList = ref(planetApi.getGroundList("三国"))
</script>

<template lang="pug">
    Planet(:groundList="groundList")
        template(#planetTitle)
            el-popover()
                template(#reference)
                    .sanguo-title-for-block()
                        .sanguo-title-for(v-for="kingdom in kingdowMesList")
                            .sanguo-title-for-color(:style="{backgroundColor:kingdom.color}")
                            .sanguo-title-for-bar-block
                                .sanguo-title-for-bar-progress(:style="{width:kingdom.progress+'%',backgroundColor:kingdom.color}")
                template(#default)
                    .sanguo-title-detail-block
                        .sanguo-title-detail-for-block(v-for="kingdom in kingdowMesList")
                            .sanguo-title-detail-for-name {{kingdom.name}}
                            .sanguo-title-detail-for-progress {{kingdom.progress}}%
</template>
<style scoped lang="scss">
.sanguo-title-for-block{
    width: 100%;
    height: 100%;
}
.sanguo-title-for{
    height: 10px;
    width: 100%;
    background-color: #fff;
    .sanguo-title-for-color{
        float: left;
        margin: 1px;
        height: 8px;
        width: 8px;
    }
    .sanguo-title-for-bar-block{
        float: left;
        margin-left:4px;
        width:80px;
        height: 4px;
        margin-top:3px;
        background-color: #aaa;
        border-radius: 4px;
        overflow: hidden;
        .sanguo-title-for-bar-progress{
            height: 4px;
        }
    }
}
.sanguo-title-detail-block{
    background-color: #eee;
    .sanguo-title-detail-for-block{
        float: left;
        width: 40px;
        text-align: center;
        .sanguo-title-detail-for-name{
            font-size: 12px;
            font-weight: bold;
            height: 25px;
            line-height: 25px;
        }
        .sanguo-title-detail-for-progress{
            font-size: 12px;
        }
    }
}
</style>