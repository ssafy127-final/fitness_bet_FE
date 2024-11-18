<template>
    <div class = "container">
        
        <div class = "logo">
            <img src = "@/assets/img/logo.png" alt="로고" id = "logo">
        </div>
        
        <div class = "login-form">
            <div class ="input-box">
                <div class = "login-form-id">
                    <label for="userId" style="font-weight: bold;">아이디 </label>
                    <input type="text" name="userId" class="login-input" placeholder="ID를 입력하세요">
                </div>
                
                <div class = "login-form-password">
                    <label for="password"style="font-weight: bold;">비밀번호 </label>
                    <input type = "password" name = "password" class = "login-input" placeholder="비밀번호를 입력하세요">
                </div>
            </div>

                <div class = "btns">

                    <button class = "login-btn"> 로그인 </button>
                    <button class = "regist-btn" @click="router.push({path : '/regist'})"> 회원가입 </button>
        
                </div>
        </div>

    </div>
</template>

<script setup>
import router from '@/router';


</script>

<style scoped>
    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10rem;
    }

    #logo {
        width : 30rem;
    }

    .login-form {
        border: 2px solid #B6B5B5;
        border-radius: 10px;
        padding: 3rem;
        display: flex;
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
    border-color: #0056b3; /* 포커스 됐을 때 테두리 색 변경 */
    outline: none; /* 기본 윤곽선 제거 */
}
.btns{
    display: flex;
    flex-direction: column;
    gap : 2.5rem;
    padding-top: 1rem;
    padding-left: 3rem;
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