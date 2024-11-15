<template>
    <div class = "container">
    <header>
        <img src = "@/assets/img/logo.png" alt="로고" class = "logo" @click="goToMain">
        <nav>
            <div class = "menu">
                <div class="menu-category">
                    <RouterLink :to="{name : 'betting'}">배팅</RouterLink>
                    <ul class = "dropdown-category">
                        <li><RouterLink :to="{name : 'bettingList'}">현재 우리반 배팅 보기</RouterLink></li>
                        <li><RouterLink :to="{name : 'finishedBetting'}">종료된 우리반 배팅 보기</RouterLink></li>
                        <li><RouterLink :to="{name : 'bettingJoinHistory'}">참여 기록 보기</RouterLink></li>
                        <li><RouterLink :to="{name : 'bettingChallengeHistory'}">챌린지 기록 보기</RouterLink></li>
                    </ul>
                </div>

                <div class="menu-category">    
                    <RouterLink :to="{name : 'ranking'}">랭킹</RouterLink>
                </div>

                <div class="menu-category">
                    <RouterLink :to="{name : 'mission'}">포인트 교환</RouterLink>
                </div>

                <div class="menu-category">
                    <RouterLink :to="{name : 'myPage'}">마이페이지</RouterLink>
                    <ul class = "dropdown-category">
                        <li><RouterLink :to="{name : 'myPoint'}">포인트 내역</RouterLink></li>
                        <li><RouterLink :to="{name : 'myInfo'}">내 정보 수정</RouterLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    </div>
</template>


<script setup>

import router from '@/router';

const goToMain = function(){
    router.push({name : 'home'});
}

</script>

<style scoped>
.container {
    background-color: #607180;
}

.logo {
    height: 6.25rem;
    cursor: pointer;
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    margin: 0 auto;
}
header nav {
    display: flex;
    font-size: 1.2rem;
    gap: 8rem;
}
.menu {
    display: flex;
    position: relative;
    align-items: center;
    gap: 8rem;
}

.menu-category {
    position: relative;
    display: block; /* 필요하다면 이를 flex로 변경 */
}

.dropdown-category {
    display: none;
    position: absolute;
    top : 15px;
    background-color: #f9f9f9;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 250px; /* 필요에 따라 조정 */
    left: 50%; /* 상위 항목의 가운데에 위치하도록 설정 */
    transform: translateX(-50%); /* 드롭다운 메뉴의 중앙을 기준으로 왼쪽으로 50% 이동 */
    
}

.menu-category:hover .dropdown-category .dropdown-category:hover {
    display: flex; /* flex로 변경 */
    flex-direction: column; /* 항목들을 세로로 나열 */
}



.dropdown-category li {
    width: 100%;
    padding: 8px 0;
    text-align: center;
    margin: 0 auto;
}

.dropdown-category li:hover {
    background-color: #e7e7e7; /* 호버 시 배경색 변경 */
}

a {
    text-decoration: none;
    color: white;
}

li a{
    color: black;
}
</style>


