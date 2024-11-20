import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

const REST_API_URL = `http://localhost:1219/user`;
export const useUserStore = defineStore("user", () => {
  // 임시 데이터(로그인하면 axios로 받아오기)
  const loginUser = ref(null);

  const login = (loginUserInfo) => {
    axios
      .post(`${REST_API_URL}/login`, loginUserInfo)
      .then((response) => {
        if (response.status === 200) {
          loginUser.value = response.data;
          console.log(loginUser.value);
          sessionStorage.setItem("isAdmin", loginUser.value.admin);
          sessionStorage.setItem("userName", loginUser.value.name);
          sessionStorage.setItem("campus", loginUser.value.campus);
          sessionStorage.setItem("classNum", loginUser.value.classNum);
          sessionStorage.setItem("gender", loginUser.value.gender);
          sessionStorage.setItem("accept", loginUser.value.accept);
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

  const logout = function(){
    axios.post(`${REST_API_URL}/logout`)
    .then(() =>{
      sessionStorage.clear();
      loginUser.value = null;
      router.push({ name : "login"})
    }).catch((error) =>{
      console.log("로그아웃 실패 :" , error);
    })
  };

  const restoreLogin = () => {
    const userName = sessionStorage.getItem("userName");
    if (userName) {
      loginUser.value = {
        admin: parseInt(sessionStorage.getItem("isAdmin")),
        name: userName,
        campus: sessionStorage.getItem("campus"),
        classNum: parseInt(sessionStorage.getItem("classNum")),
        gender: parseInt(sessionStorage.getItem("gender")),
        accept: parseInt(sessionStorage.getItem("accept"))
      };
      // 필요한 경우 추가적인 로그인 후 처리를 여기에 구현
    }
  };

  // 우리반의 유저 정보 불러오기 
  const userList = ref([]);

  const getUserList = function(){
    axios.get(`${REST_API_URL}/list`)
    .then((response) =>{
      console.log(response.data)
      userList.value = response.data;
      getNotAcceptedList();
    })
  }

  const notAcceptedList = ref([]);

  const getNotAcceptedList = function(){
    notAcceptedList.value = userList.value.filter((user) => user.accept === 0);
    console.log(notAcceptedList.value)
  }

  const approve = function(userId){
    axios.patch(`${REST_API_URL}/approve/${userId}`)
    .then((response)=>{
      console.log(response);
      console.log(notAcceptedList.value)
      
    })
  }

  const reject = function(userId){
    axios.delete(`${REST_API_URL}/delete/${userId}`)
    .then((response) =>{
      console.log(response);
    })
  }


  return { loginUser, login, restoreLogin, logout, userList, getUserList, notAcceptedList, getNotAcceptedList
  };
});
