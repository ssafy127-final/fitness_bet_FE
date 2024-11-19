import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

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
  const loginUser = ref();

  const login = (loginUserInfo) => {
    axios
      .post(`${REST_API_URL}/login`, loginUserInfo)
      .then((response) => {
        if (response.status === 200) {
          loginUser.value = response.data;
          router.push({ path: "/" });
        }
      })
      .catch((response) => {
        if (response.status === 403) {
          alert("아직 가입 승인이 허가되지 않았습니다. 관리자에게 문의하세요.");
        } else if (response.status === 401) {
          alert("로그인 정보가 올바르지 않습니다.");
        }
      });
  };
  return { loginUser, login };
});
