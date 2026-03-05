import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import AddTaskManager from "@/components/AddTaskManager";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <Header title="Taskiee" />
      <AddTaskManager/>      
    </SafeAreaView>
  );
}
