import BettingView from "@/views/BettingView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginPage from "@/views/LoginPage.vue";
import MainPage from "@/views/MainPage.vue";
import MissionView from "@/views/MissionView.vue";
import MyPageView from "@/views/MyPageView.vue";
import RankingView from "@/views/RankingView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: RankingView,
    },
    {
      path: '/mission',
      name: 'mission',
      component: MissionView,
    },
    {
      path: '/betting',
      name: 'betting',
      component: BettingView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/myPage',
      name: 'myPage',
      component: MyPageView,
    },
  ],
});

router.beforeEach((to, from) =>{
  const isLogined = true;
  console.log(to)
  console.log(from)
  if(!isLogined && to.name !== 'login'){
    return ({ name: "login"});
  }
  
  if(isLogined){
    if(to.name === 'login'){

      return ({ name : from.name})
    }
  }
})



export default router;
