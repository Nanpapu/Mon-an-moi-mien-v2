import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types';

const SAVED_RECIPES_KEY = '@saved_recipes';

export const saveRecipe = async (recipe: Recipe) => {
  try {
    const savedRecipes = await getSavedRecipes();
    if (!savedRecipes.find(r => r.id === recipe.id)) {
      const newSavedRecipes = [...savedRecipes, recipe];
      await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(newSavedRecipes));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Lỗi khi lưu công thức:', error);
    return false;
  }
};

export const getSavedRecipes = async (): Promise<Recipe[]> => {
  try {
    const savedRecipes = await AsyncStorage.getItem(SAVED_RECIPES_KEY);
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  } catch (error) {
    console.error('Lỗi khi lấy công thức đã lưu:', error);
    return [];
  }
};

export const removeRecipe = async (recipeId: string) => {
  try {
    const savedRecipes = await getSavedRecipes();
    const newSavedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
    await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(newSavedRecipes));
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa công thức:', error);
    return false;
  }
}; 