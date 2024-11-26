<template>
  <div class="container" :class="{ dark: bettingStore.darkMode }">
    <article v-show="bettingStore.darkMode">
      <Normal v-for="(ad, idx) in leftAd" :key="idx" :contentInfo="ad" />
    </article>
    <article v-show="!bettingStore.darkMode"></article>
    <div class="content">
      <RouterView />
    </div>
    <article v-show="bettingStore.darkMode">
      <Normal v-for="(ad, idx) in rightAd" :key="idx" :contentInfo="ad" />
    </article>
    <article v-show="!bettingStore.darkMode"></article>
  </div>
</template>

<script setup>
import Normal from "@/components/betting/ad/Normal.vue";
import { useBettingStore } from "@/stores/betting";
import { RouterView } from "vue-router";
const bettingStore = useBettingStore();

const leftAd = [
  {
    firstBackColor: "pink",
    secondBackColor: "yellow",
    firstColor: "whilt",
    secondColor: "blue",
    firstText: "싸피레이스 우승은",
    secondText: "우리의 것~~",
    firstBorderColor: "red",
    secondBorderColor: "white",
    speed: 70,
  },
  {
    firstBackColor: "yellow",
    secondBackColor: "blue",
    firstColor: "black",
    secondColor: "red",
    firstText: "12기 서울 7반",
    secondText: "취업률 100% 보장!",
    firstBorderColor: "white",
    secondBorderColor: "black",
    speed: 120,
    style: "italic",
  },
  {
    firstBackColor: "#e8c6f9",
    secondBackColor: "#5b00e3",
    firstColor: "#4f4754",
    secondColor: "#4f4754",
    firstText: "파이널 프로젝트",
    secondText: "다들 고생많았어☺",
    firstBorderColor: "white",
    secondBorderColor: "purple",
    speed: 92,
  },
  {
    firstBackColor: "#ffefd5",
    secondBackColor: "#8b8780",
    firstColor: "#8c692d",
    secondColor: "#ffd07e",
    firstText: "오늘은",
    secondText: "♬ ♭ 달리자 ♪ ♫",
    firstBorderColor: "gray",
    secondBorderColor: "white",
    speed: 57,
  },
  {
    firstBackColor: "#9beade",
    secondBackColor: "#673303",
    firstColor: "#5e7967",
    secondColor: "#00e313",
    firstText: "Java 자바조가",
    secondText: "제일 잘나가",
    firstBorderColor: "white",
    secondBorderColor: "cadetblue",
    speed: 132,
  },
  {
    firstBackColor: "#0800e3",
    secondBackColor: "#82d4d9",
    firstColor: "white",
    secondColor: "#fcb53b",
    firstText: "SCSA 친구들",
    secondText: "얼른 짐 챙겨라",
    firstBorderColor: "white",
    secondBorderColor: "cadetblue",
    speed: 72,
  },
];
const rightAd = [
  {
    firstBackColor: "purple",
    secondBackColor: "pink",
    firstColor: "whilt",
    secondColor: "yellow",
    firstText: "♡ 서울 7반 ♡",
    secondText: "성공적 취뽀 응원해!",
    firstBorderColor: "red",
    secondBorderColor: "white",
    speed: 97,
  },
  {
    firstBackColor: "green",
    secondBackColor: "aqua",
    firstColor: "whilt",
    secondColor: "yellow",
    firstText: "Git auto merge",
    secondText: "☆100% 안전 보장☆",
    firstBorderColor: "#b8ffff",
    secondBorderColor: "#eaffb8",
    speed: 111,
  },
  {
    firstBackColor: "gray",
    secondBackColor: "yellow",
    firstColor: "white",
    secondColor: "green",
    firstText: "Git 충돌 시",
    secondText: "♣200% 환불 보장♤",
    firstBorderColor: "yellow",
    secondBorderColor: "#ccffb8",
    speed: 81,
  },
  {
    firstBackColor: "#505241",
    secondBackColor: "#f4fcbf",
    firstColor: "white",
    secondColor: "red",
    firstText: "전원(❄엘사 제외❄)",
    secondText: "B형 취득 기원",
    firstBorderColor: "pink",
    secondBorderColor: "white",
    speed: 138,
  },
  {
    firstBackColor: "blue",
    secondBackColor: "#63b2fc",
    firstColor: "white",
    secondColor: "yellow",
    firstText: "블루스크린 시",
    secondText: "300% 위로 보장",
    firstBorderColor: "#264461",
    secondBorderColor: "#bfdffc",
    speed: 51,
  },
  {
    firstBackColor: "black",
    secondBackColor: "#a9a0d5",
    firstColor: "#ffa7f8",
    secondColor: "#e9ffa7",
    firstText: "헤일리쌤 쵝오",
    secondText: "민주프로님도 쵝오",
    firstBorderColor: "purple",
    secondBorderColor: "blue",
    speed: 91,
  },
];
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1.5fr 7fr 1.5fr;
  height: calc(100vh - 130px);
}
.dark {
  background-color: black;
}
article {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
