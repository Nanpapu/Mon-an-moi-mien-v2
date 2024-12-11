export interface Recipe {
  id: string;
  name: string;
  region: string;
  ingredients: string[];
  instructions: string[];
  image: string;
}

export interface Region {
  id: string;
  name: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  recipes: Recipe[];
} 