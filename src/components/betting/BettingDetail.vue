<template>
  <div class="full">
    <div class="modal" v-show="joinModal">
      <BettingJoin :user-point="userStore.loginUser.currentPoint" @modalOff="joinModal = false" />
    </div>
    <div class="modal" v-show="resultModal"><BettingResult @closeResultModal="closeResultModal" /></div>
    <div class="detail-container" :class="{ modalOn: joinModal, modalOn: resultModal }">
      <h2>
        <span class="point">{{ store.betting?.challengeUser?.name }}</span
        >님이 <span class="point">{{ store.betting?.mission?.content }}</span
        >을(를) <span class="point">{{ store.betting?.missionCnt }}</span
        >회(초 안에) 할 수 있다? 없다?
      </h2>
      <BettingProgressBar
        :failCnt="store.betting.failCnt"
        :successCnt="store.betting.successCnt"
        :history="store.betting.history"
      />
      <p v-if="store.betting.history" class="info">참여 완료한 배팅입니다.</p>
      <p v-else-if="store.betting.challengeUser.id == userStore.loginUser.id" class="info">도전 진행중입니다.</p>
      <p v-else class="info">배팅에 참여해보세요!</p>
      <div class="review">
        <div>
          <label for="reviewInput">코멘트 남기기</label>
          <input
            type="text"
            id="reviewInput"
            name="review"
            placeholder="코멘트를 작성해주세요."
            v-model="review"
            @keypress="
              (e) => {
                e.keyCode == 13 && createReview();
              }
            "
          />
          <button @click="createReview" v-show="!modifyMode">등록</button>
          <button @click="createReview" v-show="modifyMode">수정</button>
        </div>
        <ul class="review-content">
          <li v-for="review in store.reviewList" :key="review.id">
            <span class="writer">{{ review.writerName }}</span>
            <span class="content">{{ review.content }}</span>
            <svg
              v-if="review.writer == userId"
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:svgjs="http://svgjs.dev/svgjs"
              @click="updateReview(review.id, review.content)"
            >
              <g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)">
                <path
                  d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm2.244-17.184l-6.926,6.926c-.851.85-1.318,1.98-1.318,3.183v1.575c0,.276.224.5.5.5h1.575c1.202,0,2.333-.468,3.183-1.318l6.926-6.926c.526-.526.816-1.226.816-1.97s-.29-1.443-.816-1.97c-1.053-1.053-2.887-1.053-3.939,0Zm-3.693,10.158c-.661.661-1.54,1.025-2.476,1.025h-1.075v-1.075c0-.936.364-1.814,1.025-2.476l5.108-5.108,2.525,2.525-5.108,5.108Zm6.926-6.926l-1.11,1.11-2.525-2.525,1.11-1.11c.676-.676,1.85-.676,2.525,0,.338.338.523.786.523,1.263s-.186.925-.523,1.263Z"
                  fill="#9c9c9c"
                  fill-opacity="1"
                  data-original-color="#000000ff"
                  stroke="none"
                  stroke-opacity="1"
                />
              </g>
            </svg>
            <svg
              v-if="review.writer == userId"
              @click="deleteReview(review.id)"
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="12"
              height="12"
            >
              <path
                d="m12.038.02C5.421.02.038,5.402.038,12.02s5.383,12,12,12,12-5.383,12-12S18.655.02,12.038.02Zm0,22c-5.514,0-10-4.486-10-10S6.524,2.02,12.038,2.02s10,4.486,10,10-4.486,10-10,10Zm4.765-14.105l-3.457,4.105,3.457,4.105c.356.423.302,1.054-.12,1.409-.188.158-.417.235-.644.235-.285,0-.568-.121-.766-.355l-3.235-3.842-3.235,3.842c-.197.234-.48.355-.766.355-.227,0-.456-.077-.644-.235-.422-.355-.477-.986-.12-1.409l3.457-4.105-3.457-4.105c-.356-.423-.302-1.054.12-1.409.423-.358,1.055-.301,1.409.12l3.235,3.842,3.235-3.842c.354-.42.986-.478,1.409-.12.422.355.477.986.12,1.409Z"
                fill="#9c9c9c"
                fill-opacity="1"
                data-original-color="#000000ff"
                stroke="none"
                stroke-opacity="1"
              />
            </svg>
          </li>
        </ul>
      </div>
      <div class="btn-group">
        <button v-if="store.betting.result == 0 && userStore.loginUser.admin == 1" @click="finishing">
          배팅 마감하기
        </button>
        <button v-else-if="store.betting.result == 2 && userStore.loginUser.admin == 1" @click="setResultBtn">
          결과 입력하기
        </button>
        <button
          v-if="
            store.betting.result == 0 &&
            !store.betting.history &&
            store.betting.challengeUser.id != userStore.loginUser.id
          "
          @click="joinBetting"
        >
          배팅참여
        </button>
        <button @click="router.push({ path: '/betting' })">목록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBettingStore } from "@/stores/betting";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BettingProgressBar from "./BettingProgressBar.vue";
import router from "@/router";
import BettingJoin from "./modal/BettingJoin.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import BettingResult from "./modal/BettingResult.vue";

const review = ref("");
const joinModal = ref(false);
const modifyMode = ref("");
const store = useBettingStore();
const userStore = useUserStore();
const userId = userStore.loginUser.id;
const route = useRoute();
onMounted(async () => {
  try {
    await store.getBettingDetail(route.params.id);
    await store.getReviewList(route.params.id, userStore.loginUser.id);
  } catch (error) {
    console.error("Error loading betting detail:", error);
  }
});
const createReview = () => {
  if (review.value.trim() == "") {
    alert("코멘트 내용을 입력해주세요.");
  } else {
    if (confirm(modifyMode.value ? "코멘트를 수정하시겠습니까?" : "코멘트를 등록하시겠습니까?")) {
      (modifyMode.value
        ? axios.put(`${store.REST_API_URL}/review`, {
            content: review.value,
            id: modifyMode.value,
          })
        : axios.post(`${store.REST_API_URL}/review`, {
            writer: userId,
            content: review.value,
            bettingId: route.params.id,
          })
      )
        .then((res) => {
          if (res.status == 200) {
            store.getReviewList(route.params.id, userId);
          }
        })
        .then(() => (modifyMode.value ? alert("수정되었습니다.") : alert("등록되었습니다.")))
        .catch((err) => console.log(err));
    }
  }
  review.value = "";
  modifyMode.value = "";
};
const updateReview = (reviewId, content) => {
  review.value = content;
  modifyMode.value = reviewId;
};
const deleteReview = (reviewId) => {
  if (confirm("코멘트를 삭제하시겠습니까?")) {
    axios
      .delete(`${store.REST_API_URL}/review`, {
        params: {
          reviewId,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          store.getReviewList(route.params.id, userId);
          modifyMode.value = "";
        }
      })
      .then(() => alert("삭제되었습니다."))
      .catch((err) => console.log(err));
  }
};
watch(() => store.reviewList);
watch(() => store.betting);
watch(
  () => userStore.loginUser,
  (newLoginUser) => {
    if (newLoginUser && newLoginUser.id) {
      store.getReviewList(route.params.id, newLoginUser.id);
    }
  }
);

const finishing = () => {
  if (confirm("배팅을 마감하시겠습니까?")) {
    axios
      .put(`${store.REST_API_URL}/${route.params.id}/stop`)
      .then((res) => {
        if (res.status == 200) {
          store.getDetailFromBack(route.params.id, userStore.loginUser.id);
          store.getList(userStore.loginUser.id);
        }
      })
      .then(alert("배팅이 마감되었습니다."))
      .catch((err) => console.log(err));
  }
};
const resultModal = ref(false);
const setResultBtn = () => {
  resultModal.value = true;
};
const closeResultModal = () => {
  resultModal.value = false;
};
const joinBetting = () => {
  if (userStore.loginUser.currentPoint >= 10) {
    joinModal.value = true;
  } else {
    alert("보유 포인트가 참여 가능한 포인트보다 적습니다.");
  }
};
</script>

<style scoped>
.detail-container {
  background-color: white;
  border: 2px solid #82d4d9;
  margin: 10px;
  border-radius: 5px;
  padding: 20px 20px 10px;
  text-align: center;
  height: calc(100vh - 150px);
  position: relative;
}
.detail-container h2 {
  font-size: 20px;
  color: #555;
  margin: 20px 0;
}
.modal {
  position: fixed;
  width: 40%;
  z-index: 999;
  left: 50%;
  transform: translate(-50%, 15%);
}
.modalOn {
  opacity: 0.5;
}
.point {
  font-size: 24px;
  color: black;
}

.info {
  margin-top: 10px;
  color: #868585;
  font-size: 14px;
}
.review {
  margin-top: 20px;
}
.review label {
  color: #9c9c9c;
  font-size: 13px;
}
.review input {
  width: 80%;
  margin: 0 5px;
  border-radius: 5px;
  border: 2px solid #dfdfdf;
  height: 30px;
  padding: 3px 5px;
  outline-color: #82d4d9;
}
button {
  height: 25px;
}
input::placeholder {
  color: #d8d6d6;
}
.review-content {
  border: 2px solid #d8d8d8;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px 20px;
  height: calc(100vh - 150px - 250px);
  overflow-y: auto;
}
.review-content li {
  border-bottom: 1px solid #d8d6d6;
  display: grid;
  grid-template-columns: 80px 1fr 18px 18px;
  text-align: start;
  padding: 5px 0;
}
svg {
  margin: auto;
  cursor: pointer;
}
.writer {
  font-size: 15px;
}
.content {
  color: #3d3d3d;
  font-size: 14px;
}
.btn-group {
  position: absolute;
  display: flex;
  justify-content: end;
  gap: 10px;
  bottom: 1rem;
  right: 1rem;
}
</style>
