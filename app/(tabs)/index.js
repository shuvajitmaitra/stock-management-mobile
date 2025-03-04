import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, StatusBar, BackHandler, Alert } from "react-native";
import Item from "@/components/sharedCom/Item";
import { Colors } from "@/constant/Colors";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderPopup from "@/components/HeaderPopup";
import { useStock } from "@/context/StockContext";
import StockModal from "@/components/Modal/StockModal";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [position, setPosition] = useState(null);
  const { handleDeleteProduct, allProducts, getProducts, setSingleProduct, handleLogout, user, getHistories } = useStock();
  const [addModalVisible, setAddModalVisible] = useState(false);

  const filteredProducts = allProducts?.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleEditProduct = (product) => {
    setSingleProduct(product);
    setPosition(null);
    setAddModalVisible(true);
  };

  const { top } = useSafeAreaInsets();

  // Disable the Android back button on the dashboard
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    // Clean up the event listener
    return () => backHandler.remove();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: top + 10 }]}>
      <StatusBar backgroundColor={Colors.header} barStyle="light-content" />
      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search product"
          placeholderTextColor={Colors.white}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={(event) =>
            setPosition({
              x: event.nativeEvent.pageX,
              y: event.nativeEvent.pageY,
            })
          }
          style={styles.settingsButtonContainer}
        >
          <SettingsIcon size={30} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        refreshing={allProducts.length > 0 ? false : true}
        onRefresh={() => {
          getProducts();
          getHistories();
        }}
        data={filteredProducts}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <Item
            index={index}
            from={"dashboard"}
            user={user}
            item={item}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
            onUpdate={(item) => {
              setAddModalVisible(true);
              setSingleProduct({ ...item, stockUpdate: true });
            }}
          />
        )}
      />
      <HeaderPopup
        user={user}
        position={position}
        setPosition={setPosition}
        addProduct={() => setAddModalVisible(true)}
        signOut={handleLogout}
        products={allProducts.length}
      />
      {addModalVisible && (
        <StockModal
          isVisible={addModalVisible}
          user={user}
          onClose={() => {
            setAddModalVisible(false);
            setSingleProduct(null);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  settingsButtonContainer: {
    padding: 8,
    borderRadius: 7,
    backgroundColor: Colors.secondary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.header,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    padding: 10,
    height: 45,
    color: Colors.white,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
  },
  tableHeaderCell: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  deleteButton: {
    padding: 5,
  },
});
