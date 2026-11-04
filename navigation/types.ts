export type MainTabParamList = {
  Home: undefined;
  Tasks: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  TaskDetails: {
    taskId: string;
  };
  Cars: undefined;
  CarDetails: {
    name: string;
    year: number;
    price: string;
    description: string;
  };
  About: undefined;
  Garage: undefined;
  ApiPosts: undefined;
  CarCareOrganizer: undefined;
  TaskManager: undefined;
};
