export interface Product {
  id: string;
  name: string;
  image_urls?: string[];
  description?: string;
  price: number;
  stock?: number;
  available?: boolean;
  measurement_unit?: string;
  tags?: string[];
  category?: string;
  created_date?: string;
  project_id?: string;
}
