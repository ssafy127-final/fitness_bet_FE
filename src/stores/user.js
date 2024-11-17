import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const REST_API_URL = `http://localhost:1219/betting`;
// const userCampus = sessionStorage.getItem("campus");
const userCampus = "서울";
// const userClassNum = sessionStorage.getItem("classNum");
const userClassNum = 7;
// const userId = sessionStorage.getItem("userId");
const userId = "1241530";

let id = 0;
export const useUserStore = defineStore("user", () => {
  // 임시 데이터(로그인하면 axios로 받아오기)
  const loginUser = ref({
    id: "1241530",
    name: "김엘사",
    campus: "서울",
    classNum: 7,
    currentPoint: 30,
    totalPoint: 540,
    visited: "2024-11-17",
  });
  return { loginUser };
});
