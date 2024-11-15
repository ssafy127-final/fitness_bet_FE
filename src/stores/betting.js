import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const REST_API_URL = `http://localhost:1219/betting`;
// const userCampus = sessionStorage.getItem("campus");
const userCampus = "서울";
// const userClassNum = sessionStorage.getItem("classNum");
const userClassNum = 7;

export const useBettingStore = defineStore("betting", () => {
  const bettingList = ref([]);
  const getList = () => {
    axios
      .get(REST_API_URL, { params: { campus: userCampus, classNum: userClassNum } })
      .then((res) => (bettingList.value = res.data))
      .catch((err) => console.log(err));
  };
  return { bettingList, getList };
});
