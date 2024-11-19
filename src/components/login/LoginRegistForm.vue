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
                    <input type="text" v-model="userId" placeholder="학번 7자리를 입력하세요." id = "user-id" required>
                    <button id ="checkBtn" @click="checkDuplicated">중복확인</button>
                   <div class = "check-message" :class="{unique : isUniqueId}">
                       {{ message }}
                   </div> 
                </div>
                <label for="user-password" class = "input-label">비밀번호</label>
                <input type ="password" v-model="beforePw" placeholder="비밀번호를 입력하세요" id = "user-password" required>
                
                <label for="user-password-repeat" class = "input-label">재입력</label>
                <div class = "password-repeat-box">
                    <input type ="password" v-model="afterPw" placeholder="비밀번호 재입력" id = "user-password-repeat" required>
                    <div class = "password-message" :class="{unique : isDoubleChecked}">
                        {{ passwordMessage }}
                    </div>
                </div>
               
                <div class = "category">
                    <select v-model="selectedCampus" id="campus" @change="updateClasses" required>
                        <option disabled value = "">캠퍼스 선택</option>
                        <option value="서울">서울</option>
                        <option value="대전">대전</option>
                        <option value="광주">광주</option>
                        <option value="구미">구미</option>
                        <option value="부울경">부울경</option>
                    </select><label for="campus" class = "input-label">캠퍼스</label>
                    <select v-model="selectedClass" id="class" required>
                        <option disabled value="">반 선택</option>
                        <option v-for="num in classCount" :key="num" :value="num">
                            {{ num }}
                        </option>
                    </select> <label for="class" class = "input-label">반</label>
                    <select v-model="selectedGender" id="gender" required>
                        <option disabled value="">성별 선택</option>
                        <option value ="1">남성</option>
                        <option value ="0">여성</option>
                    </select>
                </div>
                <label for="user-name" class = "input-label" required>이름</label>
                <input type="text" v-model="userName" placeholder="이름" id = "user-name">
                <label for="user-tel" class = "input-label" required>전화번호</label>
                <input type="tel" v-model="userTel" placeholder="휴대전화 번호 입력 ( '-'제외 11자리 입력 )" id ="user-tel">
            </div>
            <label for="admin-check" class = "admin-check">반장 or CA 만 체크하세요</label>
            <input type="checkbox" id = "admin-check" v-model="isAdminCheckbox">
            <div>
                <button id = "registBtn" @click="regist">가입하기</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import router from '@/router';
import axios from 'axios';
import { ref, watch, computed } from 'vue';

const REST_API_URL = 'http://localhost:1219/user';

const userId = ref('');
const message = ref('');
const userName = ref('');
const isAdmin = computed({
  // get 메소드는 computed 속성 값을 읽을 때 호출됩니다.
  get: () => {
    // 체크박스가 체크되어 있다면 1을 반환하고, 그렇지 않다면 0을 반환합니다.
    return isAdminCheckbox.value ? 1 : 0;
  },

  // set 메소드는 computed 속성에 값을 할당할 때 호출됩니다.
  set: (newValue) => {
    // 할당된 값이 1이면 체크박스 상태를 true로 설정하고,
    // 그 외의 값이면 false로 설정합니다.
    isAdminCheckbox.value = newValue === 1;
  }
});
const isAdminCheckbox = ref(false);


const isUniqueId = ref(false); // 중복확인 되었는지
const isSevenNumber = ref(false); // id가 7자리 학번인지

const beforePw = ref('');
const afterPw = ref('');
const passwordMessage = ref('');

const isDoubleChecked = ref(false); // 비밀번호 재확인 됐는지

const userTel = ref('');
const isValidTel = ref(false);


const checkSevenNumber = () => {
    const isValid = /^\d{7}$/.test(userId.value);
    if (!isValid) {
        isSevenNumber.value = false;
        return;
    } 

    isSevenNumber.value = true;
};

const checkDuplicated = function(){
    checkSevenNumber();
    if(!isSevenNumber.value){
        message.value = '학번은 7자리 숫자여야 합니다.';
        return;
    }
    axios.get(`${REST_API_URL}/check-id`, {
        params: {id : userId.value} // 1242102를 param으로 보내
    })
    .then((response)=>{
        console.log(response.request.status) //
        if(response.request.status === 200){
            message.value = "가입 가능한 학번입니다."
            isUniqueId.value = true;
        }
        console.log(isUniqueId.value)
    }).catch((response) =>{
        console.log(response.request.status) 
        if(response.request.status === 400){
        message.value = "이미 중복된 학번입니다."
        isUniqueId.value = false;
        userId.value='';
    }
    });
}


watch([beforePw, afterPw], ([newBefore, newAfter]) => {
    if (newBefore === newAfter && newBefore !== '') {
        passwordMessage.value = "비밀번호가 일치합니다.";
        isDoubleChecked.value = true;
    } else if (newBefore !== '' && newAfter !== '') {
        passwordMessage.value = "비밀번호가 일치하지 않습니다.";
        isDoubleChecked.value = false;
    } else {
        passwordMessage.value = ""; // 둘 중 하나라도 입력되지 않은 경우.
    }
});



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

const checkTelValid = function(){
    const isValid = /^\d{11}$/.test(userTel.value);
    if (!isValid) {
        isValidTel.value = false;
        return;
    } 
    isValidTel.value = true;
}


const regist = function(){
    const registUserData = ref ({
        id : userId.value,
        pw : afterPw.value,
        name : userName.value,
        campus : selectedCampus.value,
        classNum : selectedClass.value,
        gender : selectedGender.value,
        admin : isAdmin.value,
        phone : userTel.value
    })
    if(isSevenNumber.value && isUniqueId.value  && isDoubleChecked.value){
        // 학번 7글자 확인, 아이디 중복 확인, 비밀번호 더블체크 확인이 다 true라면
        // 마지막 전화번호 유효성 검사 실행
        checkTelValid();
        if(isValidTel.value){
            // 전화번호 까지 유효하다면
            axios.post(`${REST_API_URL}/regist`, registUserData.value)
            .then((response) => {
                console.log(response.data)
                router.push({name : 'login'})
            }).catch((error)=>{
                console.error("회원가입 실패 : " , error);
                alert("회원 가입 등록 정보 유효성 검사를 모두 시행해주세요.")
            })      
        }
        else{
            alert("전화번호 형식이 올바르지 않습니다.")
        }
    }
    else {
        alert("입력 정보가 유효하지 않습니다. 모든 필드를 정확히 입력해주세요.");
    }
}




</script>

<style scoped>

.container {
  height: calc(100vh);
  background-color: #eff5f6;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rem;
}

.input-box{
    display: grid;
    grid-template-columns: 6rem 1fr; 
    grid-template-rows: repeat(1fr,6);
    row-gap: 1.4rem;
    text-align: left;
    
}



#logo {
        width : 40rem;
    }

.regist-form {
    border: 2px solid #B6B5B5;
    border-radius: 5%;
    padding: 3rem;
    text-align: center;
    background-color: white;
    box-shadow: 0px 6px 3px 3px rgba(180, 180, 180, 0.6781);
}

.regist-ment{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 3rem;
}

.regist-ment .title{
    font-weight: bold;
    font-size: 1.5rem;
    color: #3d3d3d;
}

.regist-ment .desc {
    font-size: 1rem;
    font-weight: 500;
    color: #3d3d3d;
}

.category{
    display: flex;
    gap: 1rem;
    grid-column: 1/3;
}

.input-label {
    white-space: nowrap;
    text-align: justify;
    margin-right: 1rem;
    }

.input-label::after {
    content: '';
    display: inline-block;
    width: 100%; /* 가상 요소의 너비를 100%로 설정하여 마지막 줄 꽉 채우기 */
}

#registBtn{
    margin: 2rem 0 0;
    font-size: 1.5rem;
    padding: 0.7rem 2.5rem;
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
    position: relative;
}

.input-box input{
    border-radius: 5px;
    border: 2px solid #D8D8D8;
    outline-color: #82d4d9;
}

.check-message{
    position: absolute;
    font-size: 0.6rem;
    color: red;
    font-weight: 400;
    bottom: -0.9rem;
}


.password-repeat-box{
    position: relative;
}
.password-message{
    position: absolute;
    font-size: 0.6rem;
    color: red;
    font-weight: 400;
    bottom: -0.9rem;

}

.unique {
    color : rgb(116, 197, 70);
    font-weight: 500;
}

#user-password-repeat{
    width: 100%;
}

.admin-check {
    font-size: 0.7rem;
    margin-right: 10px; /* 체크박스와 라벨 사이의 간격을 10px로 설정 */
}

/* 체크박스 스타일 조정 */
#admin-check {
    margin-left: 5px; /* 체크박스 왼쪽에 간격 추가 */
    display: inline;
}
</style>