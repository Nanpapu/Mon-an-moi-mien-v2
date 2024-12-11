import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { regions } from "../data/regions";
import { Recipe } from "../types";
import { saveRecipe } from '../utils/storage';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCard } from '../components/RecipeCard';

export default function MapScreen() {
  const { refreshSavedRecipes } = useRecipes();
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveRecipe = async (recipe: Recipe) => {
    const success = await saveRecipe(recipe);
    if (success) {
      await refreshSavedRecipes();
      Alert.alert('Thành công', 'Đã lưu công thức vào Menu của bạn');
    } else {
      Alert.alert('Thông báo', 'Công thức này đã được lưu trước đó');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 16.047079,
          longitude: 108.20623,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {regions.map((region) => (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  modalView: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
});
