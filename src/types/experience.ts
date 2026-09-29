export type Category = "Adventure" | "Culture" | "Food" | "Wellness" | "Nature";

export interface Experience {
  id: number;
  title: string;
  description: string;
  category: Category;
  /** Format: "City, Country" */
  destination: string;
  price: number;
  rating: number;
  imageUrl: string;
}
