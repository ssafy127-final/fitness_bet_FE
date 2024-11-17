<template>
  <div class="modalContainer">
    <h3>당신의 선택은?</h3>
    <div class="choice-group">
      <p class="possible choice" :class="{ possibleClick: choice == 1 }" @click="choice = 1">가능하다</p>
      <p class="impossible choice" :class="{ impossibleClick: choice == -1 }" @click="choice = -1">불가능하다</p>
    </div>
    <h4>배팅할 포인트를 입력해주세요.<br /><span>(10point 단위로 가능합니다.)</span></h4>
    <div class="point-group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:svgjs="http://svgjs.dev/svgjs"
        class="pointer"
        @click="downPoint"
      >
        <g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)">
          <path
            d="M6.41,9H17.59a1,1,0,0,1,.7,1.71l-5.58,5.58a1,1,0,0,1-1.42,0L5.71,10.71A1,1,0,0,1,6.41,9Z"
            fill="#a6a6a6"
            fill-opacity="1"
            data-original-color="#000000ff"
            stroke="none"
            stroke-opacity="1"
          />
        </g>
      </svg>
      <p class="choice point">{{ point }} Point</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:svgjs="http://svgjs.dev/svgjs"
        class="pointer"
        @click="upPoint"
      >
        <g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)">
          <path
            d="M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z"
            fill="#a6a6a6"
            fill-opacity="1"
            data-original-color="#000000ff"
            stroke="none"
            stroke-opacity="1"
          />
        </g>
      </svg>
    </div>
    <div class="btn-group">
      <button @click="joinBetting">배팅참여</button>
      <button @click="$emit('modalOff')">취소</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const choice = ref(0);
const props = defineProps({
  userPoint: Number,
});
const point = ref(10);
const downPoint = () => {
  if (point.value > 10) {
    point.value -= 10;
  } else {
    alert("최소 10point부터 배팅이 가능합니다.");
  }
};
const upPoint = () => {
  if (point.value + 10 > props.userPoint) {
    alert("보유포인트보다 높게 배팅할 수 없습니다.");
  } else {
    point.value += 10;
  }
};
const joinBetting = () => {
  if (choice.value == 0) {
    alert("가능 또는 불가능을 선택해주세요.");
  } else {
    // 배팅 참여 axios 요청 보내기, 컴포넌트 새로고침
  }
};
</script>

<style scoped>
.modalContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 0;
  border: 2px solid #82d4d9;
  background-color: white;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  gap: 10px;
  text-align: center;
}
.choice-group {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.choice {
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
}
.point-group {
  display: flex;
  gap: 5px;
  align-items: center;
}
.pointer {
  cursor: pointer;
}
.possible {
  border: 2px solid #99a7ff;
}
.impossible {
  border: 2px solid #fd9ed3;
}
.point {
  border: 2px solid #e2e2e2;
}
.possibleClick {
  border: 2px solid #8490dd;
  background-color: #99a7ff;
  color: white;
  font-weight: bold;
}
.impossibleClick {
  border: 2px solid #df8bb9;
  background-color: #fd9ed3;
  color: white;
  font-weight: bold;
}
h4 span {
  font-size: 14px;
}
.btn-group {
  position: absolute;
  display: flex;
  gap: 10px;
  bottom: 15px;
  right: 15px;
}
.btn-group button {
  padding: 5px 10px;
  font-size: 16px;
}
</style>
