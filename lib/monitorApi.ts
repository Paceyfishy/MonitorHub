import MonitorItem from "@/interfaces/MonitorItem";

export const getAllMonitors = async () => {

  try {

    const response = await fetch(`http://172.20.10.2:5001/monitors`);
    const data: MonitorItem[] = await response.json();

    return data;

  } catch (error) {

    console.log("Error fetching monitors:",error);

    return [];
  }
};