import MonitorItem from "@/interfaces/MonitorItem";
import { auth } from "../services/firebase";

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
