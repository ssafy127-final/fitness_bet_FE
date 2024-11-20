<template>
  <div class="container">
    <header>
      <img src="@/assets/img/logo.png" alt="로고" class="logo" @click="goToMain" />
      <nav>
        <div class="menu">
          <div class="menu-category">
            <RouterLink :to="{ name: 'betting' }">배팅</RouterLink>
            <ul class="dropdown-category">
              <li><RouterLink :to="{ name: 'bettingList' }">현재 우리반 배팅 보기</RouterLink></li>
              <li><RouterLink :to="{ name: 'finishedBetting' }">종료된 우리반 배팅 보기</RouterLink></li>

              <li><RouterLink :to="{ name: 'missionList' }">미션 목록 보기</RouterLink></li>
            </ul>
          </div>

          <div class="menu-category">
            <RouterLink :to="{ name: 'ranking' }">랭킹</RouterLink>
          </div>

          <div class="menu-category">
            <RouterLink :to="{ name: 'point' }">포인트 교환</RouterLink>
          </div>

          <div class="menu-category">
            <RouterLink :to="{ name: 'myPage' }">마이페이지</RouterLink>
            <ul class="dropdown-category">
              <li><RouterLink :to="{ name: 'myPoint' }">포인트 내역</RouterLink></li>
              <li><RouterLink :to="{ name: 'bettingJoinHistory' }">참여 기록 보기</RouterLink></li>
              <li><RouterLink :to="{ name: 'bettingChallengeHistory' }">챌린지 기록 보기</RouterLink></li>
              <li>
                <RouterLink :to="{ name: 'awaitList' }" v-if="userStore.loginUser.admin == 1"
                  >가입 대기 리스트</RouterLink
                >
              </li>
            </ul>
          </div>
          <button class="logout-button" @click="logout">로그아웃</button>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import router from "@/router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const goToMain = function () {
  router.push({ name: "home" });
};

const logout = () => {
  userStore.logout(); // Pinia 스토어에서 로그아웃 처리
};
</script>

<style scoped>
.container {
  background-color: #607180;
  position: relative;
}

.logo {
  height: 90px;
  cursor: pointer;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 0 auto;
  padding: 5px;
  height: 100px;
}

.menu {
  font-size: 1.2rem;
  display: flex;
  align-items: baseline;
  gap: 6rem;
  /* height: 100%; */
}
.logout-button {
  position: absolute;
  right: 2rem;
  top: 1rem;
  background-color: inherit;
  border: 2px solid #9aabb9;
  padding: 5px 7px;
}
.logout-button:hover {
  font-weight: bold;
}
.menu-category {
  position: relative;
  display: block; /* 필요하다면 이를 flex로 변경 */
  height: 100%;
  padding: 10px;
  border-bottom: 2px solid transparent;
}
.menu-category:hover {
  border-bottom: 2px solid white;
  transition: border-bottom 0.3s ease, color 0.3s ease;
}

.dropdown-category {
  display: none;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 250px; /* 필요에 따라 조정 */
  left: 50%; /* 상위 항목의 가운데에 위치하도록 설정 */
  transform: translateX(-50%); /* 드롭다운 메뉴의 중앙을 기준으로 왼쪽으로 50% 이동 */
  top: 73px;
}
.dropdown-category::before {
  content: "";
  display: block;
  position: absolute;
  cursor: pointer;
  top: -73px; /* 헤더 하단에서 드롭다운 사이 간격 */
  left: 0;
  right: 0;
  height: 73px; /* 간격 크기와 동일하게 */
}

.menu-category:hover .dropdown-category {
  display: flex; /* flex로 변경 */
  flex-direction: column; /* 항목들을 세로로 나열 */
}

.dropdown-category li {
  width: 100%;
  padding: 8px 0;
  text-align: center;
  margin: 0 auto;
}

a {
  text-decoration: none;
  color: white;
  cursor: pointer;
}

li a {
  color: black;
  font-size: 16px;
}
.dropdown-category li a:hover {
  color: white;
  background-color: #607180;
  padding: 3px 20px;
  border-radius: 50px;
}
</style>
