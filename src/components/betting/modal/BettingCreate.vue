<template>
  <div class="modal-container">
    <h3 class="random">
      <Slot :text="props.data.nameList" size="150px" />님이 &nbsp;<Slot
        :text="props.data.missionList"
        size="300px"
      />를(을) &nbsp; <Slot :text="props.data.numList" size="50px" />회(초 안에)
    </h3>
    <h3>할 수 있다?! 없다?!</h3>
    <div class="btn-group">
      <button @click="$emit('retry')">다시 돌리기</button>
      <button @click="$emit('modal')">등록하기</button>
      <button @click="$emit('modal')">취소하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Slot from "./Slot.vue";

const props = defineProps({
  data: Object,
});
</script>

<style scoped>
h3 {
  display: flex;
  flex-direction: row;
}
.random {
  align-items: baseline;
}
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #82d4d9;
  background-color: white;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  gap: 10px;
}
.btn-group {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
}
.btn-group button {
  padding: 8px 10px;
  margin: 5px;
}
</style>
