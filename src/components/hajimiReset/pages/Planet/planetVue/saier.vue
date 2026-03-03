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
    // console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
const monsterShowList = ref([])
onMounted(() => {
    allMes.value = store.state.hajimiReset.allMes
    // 数据本地化，方便后续使用
})
const groundList = ref(planetApi.getGroundList("赛尔号"))
</script>

<template lang="pug">
    Planet(:groundList="groundList")
</template>
<style scoped lang="scss">

</style>