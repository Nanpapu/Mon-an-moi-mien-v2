import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Recipe } from '../types';
import { getSavedRecipes, removeRecipe } from '../utils/storage';
import { useRecipes } from '../context/RecipeContext';

export default function MenuScreen() {
  const { savedRecipes, refreshSavedRecipes } = useRecipes();

  useEffect(() => {
    refreshSavedRecipes();
  }, []);

  const handleDeleteRecipe = async (recipe: Recipe) => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc muốn xóa công thức "${recipe.name}" không?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            const success = await removeRecipe(recipe.id);
            if (success) {
              await refreshSavedRecipes();
              Alert.alert('Thành công', 'Đã xóa công thức');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refreshSavedRecipes} />
      }
    >
      {savedRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Bạn chưa lưu công thức nào.{'\n'}
            Hãy khám phá các món ăn trong phần Bản đồ!
          </Text>
        </View>
      ) : (
        savedRecipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <Text style={styles.regionName}>Vùng miền: {recipe.region}</Text>
            
            <Text style={styles.sectionTitle}>Nguyên liệu:</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.listItem}>
                • {ingredient}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>Cách làm:</Text>
            {recipe.instructions.map((instruction, index) => (
              <Text key={index} style={styles.listItem}>
                {index + 1}. {instruction}
              </Text>
            ))}

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteRecipe(recipe)}
            >
              <Text style={styles.deleteButtonText}>Xóa công thức</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  regionName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 5,
    paddingLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});