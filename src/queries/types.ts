export interface Pokemon extends Link {}
export interface Berry extends Link {}

export interface ResponseError {
  message: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  id: number;
  body?: string;
  userId?: number;
  title: string;
}

// private

interface Link {
  name: string;
  link: string;
}
