<template>
    <div class = "container">
        
        <div class = "logo">
            <img src = "@/assets/img/logo.png" alt="로고" id = "logo">
        </div>
        
        <div class = "login-form">
            <div class ="input-box">
                <div class = "login-form-id">
                    <label for="userId" class="input-label">아이디 </label>
                    <input type="text" v-model="loginId" name="userId" class="login-input" placeholder="ID를 입력하세요">
                </div>
                
                <div class = "login-form-password">
                    <label for="password" class="input-label">비밀번호 </label>
                    <input type = "password" v-model="loginPassword" name = "password" class = "login-input" placeholder="비밀번호를 입력하세요">
                </div>
            </div>

                <div class = "btns">

                    <button class = "login-btn" @click = "login"> 로그인 </button>
                    <button class = "regist-btn" @click="router.push({path : '/regist'})"> 회원가입 </button>
                
                </div>
        </div>

    </div>
</template>

<script setup>
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

const REST_API_URL = 'http://localhost:1219/user';
const loginId = ref('');
const loginPassword = ref('');

const login = function(){
    const loginUserInfo = ref({
        id : loginId.value, 
        pw : loginPassword.value
    })

    axios.post(`${REST_API_URL}/login`, loginUserInfo.value)
    .then((response)=>{
        console.log(response.request.status);
        if(response.request.status === 200){
            router.push({path : '/'});
        }
    }).catch((response) =>{
        if(response.request.status === 403){
            alert("아직 가입 승인이 허가되지 않았습니다. 관리자에게 문의하세요.")
        }else {
            alert("로그인 정보가 올바르지 않습니다.");
        }
    })

}

</script>

<style scoped>
    .container{
        height: calc(100vh);
        background-color: #eff5f6;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10rem;
    }

    #logo {
        width : 40rem;
    }

    .login-form {
        border: 2px solid #B6B5B5;
        border-radius: 5%;
        padding: 3rem;
        display: flex;
        /* text-align: center; */
        background-color: white;
        box-shadow: 0px 4px 2px 2px rgba(180, 180, 180, 0.6781);
    }

    .login-input {
    width: 100%; /* 입력란을 상자 너비에 맞춤 */
    padding: 0.8rem 1.2rem; /* 내부 여백 설정 */
    margin: 1rem 0; /* 외부 여백 설정 */
    box-sizing: border-box; /* 테두리를 포함한 너비로 설정 */
    border: 1px solid #ccc; /* 테두리 스타일 설정 */
    border-radius: 8px; /* 테두리 둥글게 처리 */
    background-color: #f9f9f9; /* 배경색 설정 */
    font-size: 1.2rem; /* 글자 크기 설정 */
    color: #333; /* 글자색 설정 */
    }

.login-input:focus {
    border-color: #82d4d9; /* 포커스 됐을 때 테두리 색 변경 */
    outline: none; /* 기본 윤곽선 제거 */
}
.btns{
    display: flex;
    flex-direction: column;
    gap : 2.5rem;
    padding-top: 2.3rem;
    padding-left: 3rem;
}

.input-label{
    font-weight: bold;
    font-size: 1.5rem;
    color: #3d3d3d;
}

.input-box input{
    border-radius: 5px;
    border: 2px solid #D8D8D8;
    outline-color: #82d4d9;
}

.login-btn{
    padding :2rem;
    font-weight: bold;
    font-size: 1.3rem;
}

.regist-btn{
    font-size: 1.1rem;
    font-weight: bold;
    background-color: #c7ecfa;
    color: #333;
    padding: 0.5rem;
}
</style>