export interface MyFitnessProfileResponse {
  user: User;
  expires: string;
  locale: string;
  userId: string;
  email: string;
  country: string;
}

export interface User {
  name: string;
  email: string;
  image: string;
}
