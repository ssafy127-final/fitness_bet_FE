<template>
    <div class = "container">
        <div class = "logo">
            <img src = "@/assets/img/logo.png" alt="로고" id = "logo">
        </div>

        <div class = "regist-form">
            <div class ="regist-ment">
                <p class = "title">회원가입</p>
                <p class = "desc">가입을 통해 서비스를 이용해보세요!</p>
            </div>

            <div class = "input-box">
                <label for="user-id" class = "input-label">학번</label>
                <div class = "input-user-id">
                    <input type="text" placeholder="학번 7자리를 입력하세요." id = "user-id">
                    <button id ="checkBtn" @click="checkDuplicated">중복확인</button>
                </div>
                <label for="user-password" class = "input-label">비밀번호</label>
                <input type ="password" placeholder="비밀번호를 입력하세요" id = "user-password">
                
                <label for="user-password-repeat" class = "input-label">재입력</label>
                <input type ="password" placeholder="비밀번호 재입력" id = "user-password-repeat">
               
                <div class = "category">
                    <select v-model="selectedCampus" id="campus" @change="updateClasses">
                        <option disabled value = "">캠퍼스 선택</option>
                        <option value="서울">서울</option>
                        <option value="대전">대전</option>
                        <option value="광주">광주</option>
                        <option value="구미">구미</option>
                        <option value="부울경">부울경</option>
                    </select><label for="campus" class = "input-label">캠퍼스</label>
                    <select v-model="selectedClass" id="class">
                        <option disabled value="">반 선택</option>
                        <option v-for="num in classCount" :key="num" :value="num">
                            {{ num }}
                        </option>
                    </select> <label for="class" class = "input-label">반</label>
                    <select v-model="selectedGender" id="gender">
                        <option disabled value="">성별 선택</option>
                        <option value ="1">남성</option>
                        <option value ="0">여성</option>
                    </select>
                </div>
                <label for="user-name" class = "input-label">이름</label>
                <input type="text" placeholder="이름" id = "user-name">
                <label for="user-tel" class = "input-label">전화번호</label>
                <input type="tel" placeholder="전화번호" id ="user-tel">
            </div>
            <button id = "registBtn">가입하기</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedCampus = ref('')
const selectedClass = ref('')
const selectedGender = ref('')

const classCount = ref(0);

const updateClasses = function(){
    if(selectedCampus.value ==='서울'){
        classCount.value = 21;
    }else if (selectedCampus.value === '대전'){
        classCount.value = 7;
    }
    //광 6 구 6 부 4
    else if (selectedCampus.value === '광주'){
        classCount.value = 6;
    }else if (selectedCampus.value === '구미'){
        classCount.value = 6;
    }else if (selectedCampus.value === '부울경'){
        classCount.value = 4;
    }else{
        classCount.value = 0;
    }
}

const checkDuplicated = function(){
    // 아이디 중복 확인 로직 작성
}

</script>

<style scoped>

.container {
  height: calc(100vh);
  background-color: #eff5f6;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
}

.input-box{
    display: grid;
    grid-template-columns: 6rem 1fr; 
    grid-template-rows: repeat(1fr,5);
    row-gap: 1.4rem;
    text-align: left;
    
}

#logo {
        width : 40rem;
    }

.regist-form {
    border: 2px solid #B6B5B5;
    border-radius: 10px;
    padding: 3rem;
    text-align: center;
}

.regist-ment{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 4rem;
}
.regist-ment .title{
    font-weight: bold;
    font-size: 2rem;
}

.regist-ment .desc {
    font-size: 1.2rem;
    font-weight: 500;
}

.category{
    display: flex;
    gap: 1rem;
    grid-column: 1/3;
}

.input-label{
    margin-right: 1rem;
}

#registBtn{
    margin: 2rem 0 0;
    font-size: 2rem;
    
}

input {
    padding: 5px;
}

label{
    padding: 5px 0;
}

.input-user-id{
    display: flex;
    gap: 3rem;
}
</style>