<template>
  <div class="containerBox">
    <header>
      <h3>가입 대기 목록</h3>
    </header>
    <table width="100%">
      <thead>
        <tr>
          <th width="16%">학번</th>
          <th width="16%">캠퍼스</th>
          <th width="16%">반</th>
          <th width="16%">이름</th>
          <th width="16%">승인</th>
          <th width="16%">거절</th>
        </tr>
      </thead>
        
      <tbody v-if="userStore.notAcceptedList.length != 0">
        <tr v-for="user in userStore.notAcceptedList" :key="user.id">
          <td>{{user.id}}</td>
          <td>{{user.campus}}</td>
          <td>{{user.classNum}}</td>
          <td>{{user.name}}</td>
          <td><svg 
            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" 
            width="100" height="100" viewBox="0,0,256,256" @click = "approve(user.id)">
<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="none" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(2,2)"><path d="M64,16c-26.50967,0 -48,21.49033 -48,48c0,26.50967 21.49033,48 48,48c26.50967,0 48,-21.49033 48,-48c0,-26.50967 -21.49033,-48 -48,-48z" fill="#ffffff" stroke="none" stroke-width="1" stroke-linecap="butt"></path><path d="M64,25c-21.53911,0 -39,17.46089 -39,39c0,21.53911 17.46089,39 39,39c21.53911,0 39,-17.46089 39,-39c0,-21.53911 -17.46089,-39 -39,-39z" fill="#82d4d9" stroke="none" stroke-width="1" stroke-linecap="butt"></path><path d="M64,16c-26.50967,0 -48,21.49033 -48,48c0,26.50967 21.49033,48 48,48c26.50967,0 48,-21.49033 48,-48c0,-26.50967 -21.49033,-48 -48,-48z" fill="none" stroke="#82d4d9" stroke-width="6" stroke-linecap="butt"></path><path d="M42,69l13.55,12l30.45,-35" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"></path></g></g>
</svg></td>
          <td><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="100" height="100" viewBox="0,0,256,256" @click = "reject(user.id)">
<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="none" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(2,2)"><path d="M64,16c-26.50967,0 -48,21.49033 -48,48c0,26.50967 21.49033,48 48,48c26.50967,0 48,-21.49033 48,-48c0,-26.50967 -21.49033,-48 -48,-48z" fill="#ffffff" stroke="none" stroke-width="1" stroke-linecap="butt"></path><path d="M64,25c-21.53911,0 -39,17.46089 -39,39c0,21.53911 17.46089,39 39,39c21.53911,0 39,-17.46089 39,-39c0,-21.53911 -17.46089,-39 -39,-39z" fill="#f48884" stroke="none" stroke-width="1" stroke-linecap="butt"></path><path d="M44,84l40,-40M44,44l40,40" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"></path><path d="M64,16c-26.50967,0 -48,21.49033 -48,48c0,26.50967 21.49033,48 48,48c26.50967,0 48,-21.49033 48,-48c0,-26.50967 -21.49033,-48 -48,-48z" fill="none" stroke="#f48884" stroke-width="6" stroke-linecap="butt"></path></g></g>
</svg></td> 
        </tr>
      </tbody>
      <tbody v-else>
        <tr class ="no-data">
          <td colspan="6"> 대기 목록이 없습니다.</td>
        </tr>
      </tbody>
      
    </table>
  </div>
</template>

<script setup>

const REST_API_URL = `http://localhost:1219/user`;

import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { onMounted } from 'vue';

const userStore = useUserStore();
onMounted(()=>{
  reloadList();
}) 

const reloadList = function(){
  userStore.getUserList();
}
const approve = function(userId){
    axios.patch(`${REST_API_URL}/approve/${userId}`)
    .then((response)=>{
      console.log(response);
    })
    .then(()=>{
      reloadList();
    }).catch((error) => {
      console.error('승인 실패:', error);
  })
}


  const reject = function(userId){
    axios.delete(`${REST_API_URL}/delete/${userId}`)
    .then((response) =>{
      console.log(response);
    }).
    then(()=>{
      reloadList();
    }).catch((error) => {
      console.error('거절 실패:', error);
    });
  }
</script>

<style scoped>
.containerBox {
  background-color: white;
  border: 2px solid #82d4d9;
  height: calc(100vh - 130px - 2rem);
  margin: 0 10rem;
  border-radius: 10px;
  padding: 2rem;
}
h3 {
  font-size: 24px;
}
header {
  margin: 0.5rem 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
}

table {
  border-collapse: collapse;
}

tr,
td,
th {
  border-bottom: 1.5px solid #7b7a7a;
  padding: 0.5rem 0;
}
.no-data {
  text-align: center;
}
</style>