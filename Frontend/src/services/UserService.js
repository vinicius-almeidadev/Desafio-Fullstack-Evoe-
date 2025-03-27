import fullStackChallengeApi from "./ApiService";

export async function createUser(data) {
  try {
      const response = await fullStackChallengeApi.post(`/user`, data, {
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (response.status !== 201) {
          throw new Error(response);
      }

      return response.data;
  } catch (error) {
      return error.response.data;
  }
}

export async function getUserById(userId) {
  try {
      const response = await fullStackChallengeApi.get(`/user/${userId}`, {
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (response.status !== 200) {
          throw new Error(response);
      }

      return response.data;
  } catch (error) {
      return error.response.data;
  }
}

export async function updateUser(userId, data) {
  try {
      const response = await fullStackChallengeApi.put(`/user/${userId}`, data, {
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (response.status !== 200) {
          throw new Error(response);
      }

      return response.data;
  } catch (error) {
      return error.response.data;
  }
}
