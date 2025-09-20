// utils/userUtils.js
export const getUserData = () => {
  const storedUserData = localStorage.getItem("userData");
  const userId = localStorage.getItem("userId");

  if (storedUserData) {
    const parsedUserData = JSON.parse(storedUserData);
    return {
      userId: userId || "",
      username: parsedUserData.userName || "New User",
      email: parsedUserData.email || "",
    };
  }

  return {
    userId: "",
    username: "New User",
    email: "",
  };
};
