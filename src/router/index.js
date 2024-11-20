import BettingChallenge from "@/components/betting/BettingChallenge.vue";
import BettingDetail from "@/components/betting/BettingDetail.vue";
import BettingFinishedDetail from "@/components/betting/BettingFinishedDetail.vue";
import BettingFinishedList from "@/components/betting/BettingFinishedList.vue";
import BettingJoinList from "@/components/betting/BettingJoinList.vue";
import BettingList from "@/components/betting/BettingList.vue";
import LoginRegistForm from "@/components/login/LoginRegistForm.vue";
import MissionList from "@/components/mission/MissionList.vue";
import AwaitList from "@/components/myPage/AwaitList.vue";
import MyInfo from "@/components/myPage/MyInfo.vue";
import MyPoint from "@/components/myPage/MyPoint.vue";
import { useUserStore } from "@/stores/user";
import BettingView from "@/views/BettingView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MissionView from "@/views/MissionView.vue";
import MyPageView from "@/views/MyPageView.vue";
import PointStoreView from "@/views/PointStoreView.vue";
import RankingView from "@/views/RankingView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/ranking",
      name: "ranking",
      component: RankingView,
    },
    {
      path: "/mission",
      name: "mission",
      component: MissionView,
      children: [
        {
          path : "",
          name : "missionList",
          component : MissionList
        }
      ]
    },
    {
      path: "/betting",
      name: "betting",
      component: BettingView,
      children: [
        {
          path: "",
          name: "bettingList",
          component: BettingList,
        },
        {
          path: ":id",
          name: "bettingDetail",
          component: BettingDetail,
        },
        {
          path: "finish",
          name: "finishedBetting",
          component: BettingFinishedList,
        },
        {
          path: "finish/:id",
          name: "finishedBettingDetail",
          component: BettingFinishedDetail,
        },
        {
          path: "history/join",
          name: "bettingJoinHistory",
          component: BettingJoinList,
        },
        {
          path: "history/challenge",
          name: "bettingChallengeHistory",
          component: BettingChallenge,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/regist",
      name: "regist",
      component: LoginRegistForm,
    },
    {
      path: "/myPage",
      name: "myPage",
      component: MyPageView,
      children: [
        {
          path: "point",
          name: "myPoint",
          component: MyPoint,
        },
        {
          path: "info",
          name: "myInfo",
          component: MyInfo,
        },
        {
          path : "awaitList",
          name : "awaitList",
          component: AwaitList
        }
      ],
    },
    {
      path: "/point",
      name: "point",
      component: PointStoreView,
    },
  ],
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  const isAdmin = sessionStorage.getItem("isAdmin");
  console.log(to);
  console.log(from);
  if (!userStore.loginUser) {
    console.log("로그안안해써")
    // 로그인을 안했는데
    if (to.name !== "login" && to.name !== "regist") {
      // 가고자 하는 곳이, 로그인 과 회원가입이 아니면
      return { name: "login" }; // 로그인으로 가
    }
  }

  if (userStore.loginUser) {
    if (to.name === "login" || to.name === "regist") {
      return { name: "home" };
    }
  }
  // 어드민이 아닌데
  if(isAdmin === "0"){
    if(to.name === "awaitList"){ // 가입 대기 리스트로 가면 안돼
      console.log("응 못가")
      return {name : "home"}
    }
  } 
}
);

export default router;
