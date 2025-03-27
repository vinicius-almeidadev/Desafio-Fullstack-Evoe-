import axios from "axios";

const fullStackChallengeApi = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
});

export default fullStackChallengeApi;
