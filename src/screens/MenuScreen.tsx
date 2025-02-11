// Component màn hình Menu chính
// Hiển thị danh sách các công thức đã lưu và cho phép tìm kiếm, lọc theo vùng miền
import React, { useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { Image } from 'expo-image';
import { Recipe } from "../types";
import { getSavedRecipes, removeRecipe } from "../utils/storage";
import { useRecipes } from "../context/RecipeContext";
import { SearchBar } from "../components/SearchBar";

export default function MenuScreen() {
  // HOOKS & STATE
  // Lấy danh sách công thức đã lưu và hàm refresh từ context
  const { savedRecipes, refreshSavedRecipes } = useRecipes();

  // State quản lý từ khóa tìm kiếm và vùng miền được chọn
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // COMPUTED VALUES
  // Lọc công thức theo điều kiện tìm kiếm và vùng miền
  const filteredRecipes = useMemo(() => {
    return savedRecipes.filter((recipe) => {
      // Kiểm tra khớp với từ khóa tìm kiếm (tên món hoặc nguyên liệu)
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((i) =>
          i.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Kiểm tra khớp với vùng miền đã chọn
      const matchesRegion = !selectedRegion || recipe.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [savedRecipes, searchQuery, selectedRegion]);

  // Lấy danh sách các vùng miền duy nhất từ công thức đã lưu
  const regions = useMemo(() => {
    return Array.from(new Set(savedRecipes.map((r) => r.region)));
  }, [savedRecipes]);

  // HANDLERS
  // Xử lý xóa công thức
  const handleDeleteRecipe = async (recipe: Recipe) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc muốn xóa công thức "${recipe.name}" không?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            const success = await removeRecipe(recipe.id);
            if (success) {
              await refreshSavedRecipes();
              Alert.alert("Thành công", "Đã xóa công thức");
            }
          },
        },
      ]
    );
  };

  // RENDER
  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Tìm theo tên món hoặc nguyên liệu..."
      />

      {/* Thanh lọc theo vùng miền */}
      <ScrollView
        horizontal
        style={styles.filterContainer}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            !selectedRegion && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedRegion(null)}
        >
          <Text style={styles.filterText}>Tất cả</Text>
        </TouchableOpacity>
        {regions.map((region) => (
          <TouchableOpacity
            key={region}
            style={[
              styles.filterButton,
              selectedRegion === region && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedRegion(region)}
          >
            <Text style={styles.filterText}>{region}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Danh sách công thức */}
      <ScrollView
        style={styles.recipeList}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshSavedRecipes} />
        }
      >
        {/* Hiển thị thông báo khi chưa có công thức hoặc không tìm thấy kết quả */}
        {filteredRecipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {savedRecipes.length === 0
                ? "Bạn chưa lưu công thức nào.\nHãy khám phá các món ăn trong phần Bản đồ!"
                : "Không tìm thấy công thức phù hợp với điều kiện lọc."}
            </Text>
          </View>
        ) : (
          // Hiển thị danh sách công thức đã được lọc
          filteredRecipes.map((recipe) => (
            <View key={recipe.id} style={styles.recipeCard}>
              <Image
                source={recipe.image}
                style={styles.recipeImage}
                contentFit="cover"
                transition={1000}
              />
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
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  // Container chính
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Styles cho phần lọc
  filterContainer: {
    paddingHorizontal: 10,
    marginBottom: 15,
    maxHeight: 50, // Thêm chiều cao tối đa
    minHeight: 50, // Thêm chiều cao tối thiểu
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    alignSelf: "center", // Căn giữa button theo chiều dọc
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
  },
  filterText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },

  // Styles cho danh sách công thức
  recipeList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },

  // Styles cho thẻ công thức
  recipeCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  regionName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 5,
    paddingLeft: 5,
  },

  // Styles cho nút xóa
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  deleteButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  // Thêm vào phần styles
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
});
