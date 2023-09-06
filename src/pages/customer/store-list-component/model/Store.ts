export interface IStore {
  id: number;
  image:string;
  store_name: string;
  description?: string;
  store_phone: string;
  store_email: string;
  point?: number;
  address: string;
  store_created_at?: Date;
  store_updated_at?: Date;
  store_manger_id?: number;
}
