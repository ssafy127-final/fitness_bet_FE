<template>
    <header>
        <img src = "@/assets/img/logo.png" alt="로고" class = "logo" @click="goToMain">
        <nav>
            <RouterLink :to="{name : 'ranking'}"> 랭킹 </RouterLink>
            <RouterLink :to="{name : 'betting'}"> 배팅 </RouterLink>
            <RouterLink :to="{name : 'mission'}"> 미션 </RouterLink>
            <RouterLink :to="{name : 'myPage'}"> 마이페이지 </RouterLink>
        </nav>
    </header>
</template>

<script setup>

import router from '@/router';

const goToMain = function(){
    router.push({name : 'home'});
}

</script>

<style  scoped>
    .logo {
    height: 6.25rem;

    cursor: pointer;
}   
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 70%;
        margin: 0 auto;
    }

    header nav{
        display: flex;
        font-size: 1.2rem;
        gap: 8rem;
    }
</style>