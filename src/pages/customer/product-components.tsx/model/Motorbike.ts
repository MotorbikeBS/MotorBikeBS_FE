export interface IMotobike {
  id: number;
  image: string;
  images: Object;
  name: string;
  price: number;
  yearRegister: Date;
  postDate: Date;
  motorType: string;
  odo: number;
  description?: string;
}
