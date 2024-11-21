<template>
  <div>
    <h3>포인트 내역</h3>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import axios from "axios";
const userStore = useUserStore();
axios
  .get(`${userStore.REST_API_URL}/point/history`, { params: { userId: userStore.loginUser.id } })
  .then((res) => console.log(res.data));
</script>

<style scoped></style>
