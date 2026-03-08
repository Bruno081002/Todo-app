import React, { useState } from "react";
import { Modal, View } from "react-native";
import AddButton from "@/components/AddButton";
import AddTaskModal from "@/components/AddTaskModal";


export default function AddTaskManager() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className=" flex-1">
      <AddButton onPress={() => setModalVisible(true)} />      
      <AddTaskModal visible={modalVisible} onClose={ () => setModalVisible(false)} />
    </View>
  );
}