import MonitorItem from "@/interfaces/MonitorItem";

const BASE_URL = "http://192.168.1.5:5000";

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