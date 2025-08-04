<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'

</script>
<template lang="pug">
.unkown-block
    .poker-diamond ♦
    .poker-club ♣
    .poker-heart ♥
    .poker-spades ♠
    .four-block
    .five-position
        .five-block
    .text ?
</template>
<style scoped lang="scss">
.unkown-block{
    width: 100%;
    height: 100%;
    position: relative;
    .poker-diamond{
        position: absolute;
        top: 4px;
        left: 4px;
        color: #bbb;
        font-size: 14px;
    }
    .poker-club{
        position: absolute;
        top: 4px;
        right: 4px;
        color: #bbb;
        font-size: 14px;
    }
    .poker-heart{
        position: absolute;
        bottom: 4px;
        left: 4px;
        color: #bbb;
        font-size: 14px;
    }
    .poker-spades{
        position: absolute;
        bottom: 4px;
        right: 4px;
        color: #bbb;
        font-size: 14px;
    }
    .four-block{
        position: absolute;
        top: 40px;
        left: 30px;
        height: 120px;
        width: 120px;
        border: 1px #bbb solid;
        transform: rotate(45deg);
    }
    .five-position{
        position: absolute;
        top: 80px;
        left: 45px;
        .five-block{
            position: relative;
            width: 54px;
            border-width: 50px 18px 0;
            border-style: solid;
            border-color: #bbb transparent;
        }
        .five-block::before{
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            top: -85px;
            left: -18px;
            border-width: 0 45px 35px;
            border-style: solid;
            border-color: transparent transparent #bbb;
        }
    }
    .text {
        font-size: 32px;
        font-weight: bold;
        color: #fff;
        position: absolute;
        top: 70px;
        left: 0px;
        width: 100%;
        text-align: center;
    }
}

</style>