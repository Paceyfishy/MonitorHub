import MonitorItem from "@/interfaces/MonitorItem";
import { auth } from "../services/firebase";
import { ReviewItem } from "@/interfaces/ReviewItem";

const BASE_URL ="http://192.168.1.117:5001";

export const getAllMonitors = async () => {

  try {

    const response = await fetch(`${BASE_URL}/monitors`);
    const data: MonitorItem[] = await response.json();

    return data;

  } catch (error) {

    console.log("Error fetching monitors:",error);

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

export const createReview = async (userId: string, monitorId: string, rating: number, comment: string, image?: string | null) => {
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
        image
      }),
    });

    return await response.json();

  } catch (error) {

    console.log("Error creating review:", error);

    return null;
  }
};

export const getMonitorReviews = async ( monitorId: string ) => {

  try {

    const response = await fetch(
      `${BASE_URL}/reviews/monitor/${monitorId}`
    );

    const data: ReviewItem[] = await response.json();

    return data;

  } catch (error) {

    console.log("Error fetching reviews:", error);

    return [];
  }
};

export const updateProfilePicture = async (userId: string, profilePicture: string) => {

  try {
    const response = await fetch(
      `${BASE_URL}/users/profile-picture`,
      {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId,
          profilePicture,
        }),
      }
    );

    return await response.json();

  } catch (error) {

    console.log(
      "Error updating profile picture:",
      error
    );
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

