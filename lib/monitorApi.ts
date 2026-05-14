import MonitorItem from "@/interfaces/MonitorItem";

const BASE_URL ="http://172.20.10.2:5001";

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