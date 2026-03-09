import AddButton from "@/components/AddButton";
import AddTaskModal from "@/components/AddTaskModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Task } from "@/types";

type AddTaskManagerProps = {
  onTaskAdded: (task: Task) => void;
};

export default function AddTaskManager({ onTaskAdded }: AddTaskManagerProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskSave = async (newTask: Task) => {
    onTaskAdded(newTask);
  };
  return (
    <View className=" flex-1">
      <AddButton onPress={() => setModalVisible(true)} />
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onsave={handleTaskSave}
      />
    </View>
  );
}
