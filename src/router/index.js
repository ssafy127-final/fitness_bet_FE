import BettingChallenge from "@/components/betting/BettingChallenge.vue";
import BettingDetail from "@/components/betting/BettingDetail.vue";
import BettingFinishedDetail from "@/components/betting/BettingFinishedDetail.vue";
import BettingFinishedList from "@/components/betting/BettingFinishedList.vue";
import BettingJoinList from "@/components/betting/BettingJoinList.vue";
import BettingList from "@/components/betting/BettingList.vue";
import MyInfo from "@/components/myPage/MyInfo.vue";
import MyPoint from "@/components/myPage/MyPoint.vue";
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
  const isLogined = true;
  console.log(to);
  console.log(from);
  if (!isLogined && to.name !== "login") {
    return { name: "login" };
  }

  if (isLogined) {
    if (to.name === "login") {
      return { name: from.name };
    }
  }
});

export default router;
