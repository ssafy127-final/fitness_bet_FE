<template>
    <div class = "container">
        
        <div class = "logo">
            <img src = "@/assets/img/logo.png" alt="로고" id = "logo">
        </div>
        
        <div class = "login-form">
           
                <div class = "login-form-id">
                    <label for="userId">아이디 </label>
                    <input type="text" name="userId" class="login-input" placeholder="ID를 입력하세요">
                </div>
                <div class = "login-form-password">
                    <label for="password">비밀번호 </label>
                    <input type = "password" name = "password" class = "login-input" placeholder="를 입력하세요">
                </div>
            
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .container{
        display: flex;
    }

    #logo {
        width : 40rem;
    }

    .login-form {
        width : 50rem;
        height: auto;
        border: 2px solid #B6B5B5;
        border-radius: 10px;
    }
</style>