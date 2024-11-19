import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const REST_API_URL = `http://localhost:1219/user`;
// const userCampus = sessionStorage.getItem("campus");
const userCampus = "서울";
// const userClassNum = sessionStorage.getItem("classNum");
const userClassNum = 7;
// const userId = sessionStorage.getItem("userId");
const userId = "1000001";

let id = 0;
export const useUserStore = defineStore("user", () => {
  // 임시 데이터(로그인하면 axios로 받아오기)
  const loginUser = ref({
    id: "1000001",
    name: "김철수",
    campus: "서울",
    classNum: 7,
    currentPoint: 500,
    totalPoint: 300,
    visited: "2024-11-19",
    admin: 1,
  });
  return { loginUser};
});
