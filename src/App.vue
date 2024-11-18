<template>
  <div>
    <Header v-if="!hideHeaderFooter"></Header>
    <div class="content">
      <RouterView></RouterView>
    </div>
    <Footer v-if="!hideHeaderFooter"></Footer>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Footer from "./components/common/Footer.vue";
import Header from "./components/common/Header.vue";

const route = useRoute(); // 현재 라우트 정보를 가져옴

const hideHeaderFooter = computed(() => {
  // '/login' 경로에서 헤더와 푸터를 숨기는 조건
  return route.path === "/login";
});
</script>

<style scoped>
.content {
  min-height: calc(100vh - 130px);
  background-color: #eff5f6;
}
</style>
