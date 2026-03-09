import Header from "@/components/Header";
import TaskCards from "@/components/TaskCards";
import { Task } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList,Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddTaskManager from "./AddTaskManager";
import TaskDetailModal from "@/components/TaskDetailModal";

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, []);

  const handleTaskAdded = async (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleToggleComplete = async (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDelete = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setDetailVisible(true);
  }
  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <Header title="Taskiee" />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCards
            task={item}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
            onPress={handleTaskPress}
          />
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-20 text-base">No tasks found.</Text>
        }
      />
      <TaskDetailModal
        visible={detailVisible}
        task={selectedTask}
        onClose={() => setDetailVisible(false)}
        onEdit={() => { }}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />
      <AddTaskManager onTaskAdded={handleTaskAdded} />
    </SafeAreaView>
  );
}
