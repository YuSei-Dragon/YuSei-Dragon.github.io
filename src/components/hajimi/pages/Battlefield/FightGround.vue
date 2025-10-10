<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits,
} from 'vue'
const Cat = defineAsyncComponent(() =>
  import("./Cat.vue")
)
const emit = defineEmits(['choiceCard'])
const props = defineProps({
    allMes:{
        type:Object,
        default:{},
    },
})
onMounted(()=>{
  init()
})
const init = ()=>{
  
}
const choicedMyCardIndex = ref("")
const choiceCard = (index)=>{
  if(index  === choicedMyCardIndex.value){
    choicedMyCardIndex.value = -1
    return  emit("choiceCard",{
        data:"",
        index:-1
    })
  }
  choicedMyCardIndex.value = index
  emit("choiceCard",{
    data:props.allMes.allMesMy.cardGroundList[index],
    index:index
  })
}
const getNameOnce = (name)=>{
  if(name&&name!==""){
    return name[0]
  }else{
    return ""
  }
}
</script>

<template lang="pug">
    .fight-ground-block
      .fight-my-card-block-line
        .fight-my-card-line-one(v-for="line in [1,1,1]")
      .fight-my-card-block
        .fight-my-card-one(v-for="(one,index) in props.allMes.allMesMy.cardGroundList"  :style="index===choicedMyCardIndex?'background:#eee':''" @click="choiceCard(index)")
          el-tooltip(effect="light"  placement="top")
            template(#content ) 
              div(style="max-width: 200px;font-size: 12px;color:#666;") {{one.name+":  "+one.desc}}
            .fight-my-card-one-img
      .fight-my-cat
        Cat
      .fight-bot-card-block-line
        .fight-bot-card-line-one(v-for="line in [1,1,1]")
      .fight-bot-card-block
        .fight-bot-card-one(v-for="one in props.allMes.allMesBot.cardGroundList")
          .fight-bot-card-one-img
      .fight-bot-cat
        Cat
      .fight-all-card-block
        .fight-all-card-num {{props.allMes.cardList.length}}
        .fight-all-card-text 卡池
      .fight-used-card-block
        .fight-used-card-num {{props.allMes.cardUsedList.length}}
        .fight-used-card-text 墓地
      .fight-chain-block
        .fight-chain(v-for="chain in props.allMes.chain") 
          el-tooltip(effect="light"  placement="right")
            template(#content ) 
              div(style="max-width: 200px;font-size: 12px;color:#666;") {{chain.card.desc}}
            .fight-chain-text {{getNameOnce(chain.card.name)}}
</template>
<style scoped lang="scss">
.fight-ground-block{
    height: 200px;
    width: 100%;
    position: relative;
    .fight-my-card-block-line{
      height: 80px;
      width: 250px;
      position: absolute;
      bottom: 0px;
      left: 100px;
      z-index: 1;
        .fight-my-card-line-one{
          height: 80px;
          width: 60px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-right: 10px;
          float: left;
        }
    }
    .fight-my-card-block{
      height: 80px;
      width: 250px;
      position: absolute;
      bottom: 0px;
      left: 100px;
      z-index: 2;
      .fight-my-card-one{
        height: 80px;
        width: 60px;
        border-radius: 4px;
        margin-right: 10px;
        float: left;
        position: relative;
        cursor: pointer;
        .fight-my-card-one-img{
          width: 50%;
          height: 50%;
          position: absolute;
          top: 25%;
          left: 25%;
          background-size: contain;
          background-position: center;
          background-image: url(./img/bagua.png);
          background-repeat: no-repeat;
          opacity: 0.1;
        }
      }
    }
    .fight-my-cat{
      height: 80px;
      width: 80px;
      border-radius: 4px;
      position: absolute;
      bottom: 0px;
      right: 100px;
    }
    .fight-bot-card-block-line{
      height: 80px;
      width: 250px;
      position: absolute;
      top: 30px;
      left: 100px;
      z-index: 1;
        .fight-bot-card-line-one{
          height: 80px;
          width: 60px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-right: 10px;
          float: left;
        }
    }
    .fight-bot-card-block{
      height: 80px;
      width: 250px;
      position: absolute;
      top: 30px;
      left: 100px;
      z-index: 2;
      .fight-bot-card-one{
        height: 80px;
        width: 60px;
        border-radius: 4px;
        margin-right: 10px;
        float: left;
        position: relative;
        cursor: pointer;
        .fight-bot-card-one-img{
          width: 50%;
          height: 50%;
          position: absolute;
          top: 25%;
          left: 25%;
          background-size: contain;
          background-position: center;
          background-image: url(./img/bagua.png);
          background-repeat: no-repeat;
          opacity: 0.1;
        }
      }
    }
    .fight-bot-cat{
      height: 80px;
      width: 80px;
      border-radius: 4px;
      position: absolute;
      top: 30px;
      right: 100px;
    }
    .fight-chain-block{
      height: 170px;
      width: 30px;
      position: absolute;
      top: 30px;
      right: 66px;
      background: #eee;
    }
    .fight-all-card-block{
      height: 80px;
      width: 60px;
      position: absolute;
      bottom: 0px;
      right: 0px;
      border-radius: 4px;
      border: 1px solid #ddd;
      .fight-all-card-num{
        font-size: 14px;
        color: #999;
        text-align: center;
        margin-top: 30%;
      }
      .fight-all-card-text{
        font-size: 14px;
        color: #999;
        text-align: center;
      }
    }
    .fight-used-card-block{
      height: 80px;
      width: 60px;
      position: absolute;
      top: 30px;
      right: 0px;
      border-radius: 4px;
      border: 1px solid #ddd;
      .fight-used-card-num{
        font-size: 14px;
        color: #999;
        text-align: center;
        margin-top: 30%;
      }
      .fight-used-card-text{
        font-size: 14px;
        color: #999;
        text-align: center;
      }
    }
    .fight-chain-block{
      height: 170px;
      width: 42px;
      position: absolute;
      top: 30px;
      left: 20px;
      background: #eee;
      border-radius: 4px;
      border: 1px solid #ddd;
      overflow: auto;
      .fight-chain{
        height: 32px;
        width: 32px;
        margin: 4px;
        text-align: center;
        line-height: 32px;
        background: #fff;
        border-radius: 4px;
        cursor: pointer;
        .fight-chain-text{
          font-size: 12px;
          color: #999;
          
        }
      }
    }
}
</style>