export interface IMotobike {
  id: number;
  image: string;
  images: string[];
  name: string;
  brand: string;
  model: string;
  price: number;
  status: string;
  storeName: string;
  yearRegister: Date;
  postDate: Date;
  motorType: string;
  odo: number;
  description?: string;
}
