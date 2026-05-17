import MonitorItem from "@/interfaces/MonitorItem";
import { ReviewItem } from "@/interfaces/ReviewItem";
import { auth } from "../services/firebase";

const BASE_URL = "http://192.168.1.117:5001";

export const getAllMonitors = async () => {
  try {
    const response = await fetch(`${BASE_URL}/monitors`);
    const data: MonitorItem[] = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching monitors:", error);

    return [];
  }
};

export const getMonitorById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/monitors/${id}`);

    const data: MonitorItem = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching monitor:", error);

    return null;
  }
};

export const createUser = async (firstName: string, lastName: string) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    const response = await fetch(`${BASE_URL}/users/create`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        firebase_uid: user.uid,

        email: user.email,

        firstName: firstName,

        lastName: lastName,
      }),
    });

    return await response.json();
  } catch (error) {
    console.log("Error creating user:", error);
  }
};
console.log("CURRENT USER:", createUser);
export const createReview = async (
  userId: string,
  monitorId: string,
  rating: number,
  comment: string,
  image?: string | null,
) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        monitorId,
        rating,
        comment,
        image,
      }),
    });

    return await response.json();
  } catch (error) {
    console.log("Error creating review:", error);

    return null;
  }
};

export const getMonitorReviews = async (monitorId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews/monitor/${monitorId}`);

    const data: ReviewItem[] = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching reviews:", error);

    return [];
  }
};

export const updateProfilePicture = async (
  userId: string,
  profilePicture: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/users/profile-picture`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId,
        profilePicture,
      }),
    });

    return await response.json();
  } catch (error) {
    console.log("Error updating profile picture:", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      return null;
    }

    const response = await fetch(`${BASE_URL}/users/firebase/${user.uid}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching user:", error);

    return null;
  }
};

export const addFavorite = async (userId: string, monitorId: string) => {
  await fetch(`${BASE_URL}/users/${userId}/favorites/${monitorId}`, {
    method: "POST",
  });
};

export const removeFavorite = async (userId: string, monitorId: string) => {
  await fetch(`${BASE_URL}/users/${userId}/favorites/${monitorId}`, {
    method: "DELETE",
  });
};

export const getMonitorsByIds = async (ids: string[]) => {
  try {
    const response = await fetch(`${BASE_URL}/monitors/by-ids`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ ids }),
    });

    return await response.json();
  } catch (error) {
    console.log("Error fetching favorites:", error);
    return [];
  }
};

export const getUserReviews = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews/user/${userId}`);

    return await response.json();
  } catch (error) {
    console.log("Error fetching user reviews:", error);
    return [];
  }
};

export const searchMonitors = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}/monitors/search?q=${encodeURIComponent(query)}`);
    const data: MonitorItem[] = await response.json();

    return data;
  } catch (error) {
    console.log("Error searching monitors:", error);
    return [];
  }
};

export const getMonitorsByCategory = async (category: string) => {
  try {
    const response = await fetch(`${BASE_URL}/monitors/category/${encodeURIComponent(category)}`);
    const data: MonitorItem[] = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching monitors by category:", error);
    return [];
  }
};


