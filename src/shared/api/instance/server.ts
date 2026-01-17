import axios from "axios";

export const kakaoServerApi = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local",
  headers: {
    Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
  },
});

export const weatherServerApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: process.env.OWM_API_KEY,
    units: "metric",
    lang: "kr",
  },
});
