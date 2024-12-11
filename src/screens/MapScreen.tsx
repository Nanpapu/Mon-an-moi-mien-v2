// Component màn hình Bản đồ
// Hiển thị bản đồ với các điểm đánh dấu cho từng vùng miền và công thức của vùng đó
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Recipe } from '../types';
import { saveRecipe } from '../utils/storage';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCard } from '../components/RecipeCard';
import { regions } from "../data/regions";

export default function MapScreen() {
  // HOOKS & STATE
  const { refreshSavedRecipes } = useRecipes();
  // Danh sách công thức được chọn để hiển thị trong modal
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  // Trạng thái hiển thị modal
  const [modalVisible, setModalVisible] = useState(false);
  // Trạng thái sẵn sàng của bản đồ
  const [isMapReady, setIsMapReady] = useState(false);

  // EFFECTS
  // Thiết lập timer để đánh dấu bản đồ đã sẵn sàng
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // HANDLERS
  // Xử lý lưu công thức
  const handleSaveRecipe = async (recipe: Recipe) => {
    const success = await saveRecipe(recipe);
    if (success) {
      await refreshSavedRecipes();
      Alert.alert('Thành công', 'Đã lưu công thức vào Menu của bạn');
    } else {
      Alert.alert('Thông báo', 'Công thức này đã được lưu trước đó');
    }
  };

  // RENDER
  // Hiển thị thông báo khi không có dữ liệu
  if (!regions || regions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không có dữ liệu vùng miền</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Bản đồ Google Maps */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 16.047079,
          longitude: 108.20623,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        onMapReady={() => setIsMapReady(true)}
      >
        {/* Các điểm đánh dấu trên bản đồ */}
        {isMapReady && regions.map((region) => (
          <Marker
            key={region.id}
            coordinate={region.coordinate}
            title={region.name}
            onPress={() => {
              setSelectedRecipes(region.recipes);
              setModalVisible(true);
            }}
          />
        ))}
      </MapView>

      {/* Loading indicator khi bản đồ chưa sẵn sàng */}
      {!isMapReady && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* Modal hiển thị danh sách công thức */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text>Đóng</Text>
          </TouchableOpacity>
          <ScrollView>
            {selectedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSave={() => handleSaveRecipe(recipe)}
                showActions={true}
              />
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  // Container chính
  container: {
    flex: 1,
  },

  // Style cho bản đồ
  map: {
    flex: 1,
  },

  // Style cho loading container
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Styles cho modal
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
});