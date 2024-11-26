<template>
  <div
    :style="{
      backgroundColor: currentBackColor,
      borderColor: currentBorderColor,
      fontStyle: props.contentInfo.style ? props.contentInfo.style : normal,
    }"
  >
    <span :style="{ color: props.contentInfo.firstColor }">{{ props.contentInfo.firstText }}</span>
    <span :style="{ color: props.contentInfo.secondColor }">{{ props.contentInfo.secondText }}</span>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  contentInfo: Object,
});
// contentInfo 형태
// contentInfo = {
//   firstBackColor: "",
//   secondBackColor: "",
//   firstColor: "",
//   secondColor: "",
//   firstText: "",
//   secondText: "",
//   firstBorderColor: "",
//   secondBorderColor: "",
//    speed:"",
//    style:""
// };

const currentBackColor = ref(props.contentInfo.firstBackColor);
const currentBorderColor = ref(props.contentInfo.firstBorderColor);
let intervalId = null;

const updateColors = () => {
  if (props.contentInfo.secondBackColor) {
    let toggle = false;
    intervalId = setInterval(
      () => {
        toggle = !toggle;
        currentBackColor.value = toggle ? props.contentInfo.secondBackColor : props.contentInfo.firstBackColor;
      },
      props.contentInfo.speed ? props.contentInfo.speed : 100
    );
  }
  if (props.contentInfo.secondBorderColor) {
    let toggle = false;
    intervalId = setInterval(() => {
      toggle = !toggle;
      currentBorderColor.value = toggle ? props.contentInfo.secondBorderColor : props.contentInfo.firstBorderColor;
    }, 100);
  }
};

onMounted(() => {
  updateColors();
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

// Watch for changes in props to update dynamically
watch(
  () => props.contentInfo,
  (newValue) => {
    currentBackColor.value = newValue.firstBackColor;
    currentBorderColor.value = newValue.firstBorderColor;
    if (intervalId) clearInterval(intervalId);
    updateColors();
  },
  { deep: true }
);
</script>

<style scoped>
div {
  font-weight: bold;
  border-style: solid;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
}
</style>
