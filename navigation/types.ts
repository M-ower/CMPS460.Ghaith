export type RootStackParamList = {
  Home: undefined;
  Cars: undefined;
  CarDetails: {
    name: string;
    year: number;
    price: string;
    description: string;
  };
  About: undefined;
};