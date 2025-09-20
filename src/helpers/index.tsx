import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const useAuth = () => {
    const clearAll = () => {
        localStorage.clear();
        sessionStorage.clear();
        // navigate("/login");
        window.location.replace("/login");

    };

    const navigateToLogin = () => {
        if (window.location.pathname !== "/") {
            localStorage.clear();
            sessionStorage.clear(); // Don't forget to clear this if needed
            window.location.replace("/login");
        } else {
            localStorage.clear();
        }
    };


    const refreshToken = async () => {
        if (window.location.pathname !== "/") {
            try {
                // Get the refresh token from local storage
                const refreshToken = localStorage.getItem("REFRESH_TOKEN");

                if (refreshToken) {

                    // Call the API to refresh the access token
                    const tokenResponse = await axios.post(
                        `${API_BASE_URL}/auth/refresh`,
                        { refreshToken }
                    );

                    const accessToken = tokenResponse.data.response.data.accessToken;

                    if (accessToken) {
                        localStorage.setItem("ACCESS_TOKEN", accessToken);
                        window.location.reload();
                    } else {
                        console.error("Access token not found in response");
                        window.location.href = "/login";
                    }
                }
            } catch (error) {
                // Handle access token issue or 403 error
                if (error === 403) {
                    console.error("Access token issue or 403 error:", error);
                    window.location.href = "/login";
                } else {
                    console.error("Error refreshing access token:", error);
                    // navigateToLogin();
                }
            }
        }
    };





    return { clearAll, navigateToLogin, refreshToken };
};
