export interface Product {
  id: string;
  name: string;
  species: string;
  grade: string;
  country: string;
  price: number;
  unit: string;
  certifications: string[];
  specifications: {
    thickness: string;
    width: string;
    length: string;
    moisture: string;
  };
  description: string;
  images: string[];
  inStock: boolean;
  supplier: {
    id: string;
    name: string;
    isVerified: boolean;
  };
}

export type ProductFilter = {
  species?: string[];
  country?: string[];
  priceRange?: [number, number];
};
