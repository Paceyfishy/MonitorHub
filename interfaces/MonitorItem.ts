export default interface MonitorItem {

  id: string;

  name: string;
  brand: string;

  screenSize: number;
  resolution: string;
  panelType: string;

  contrastRatio: string;
  colorDepth: string;

  refreshRate: number;
  responseTime: number;

  adaptiveSync: string[];

  weight: string;
  dimensions: string;

  vesaMount: boolean;

  image: string;

  price: number;

  rating: number;

  category: string;
}