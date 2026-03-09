import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Task } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";

type TaskDetailModalProps = {
    visible: boolean;
    task: Task | null;
    onClose: () => void;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
}

const PRIORITY_COLORS = {
    Low: { Text:"text-green-500", bg:"bg-green-100" },
    Medium: { Text:"text-yellow-500", bg:"bg-yellow-100" },
    High: { Text:"text-red-500", bg:"bg-red-100" },
}

export default function TaskDetailModal({ visible, task, onClose, onEdit, onDelete, onToggleComplete }: TaskDetailModalProps) {
  if (!task) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-end">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-t-3xl p-6">
              <View className="flex-row justify-between items-center mb-6">
                <Text className=" text-xl font-bold text-gray-800">
                  Detalhes
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <MaterialIcons name="close" size={24} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              <Text>Titulo</Text>
              <Text>{task?.title}</Text>

              <Text>Descrição</Text>
              <Text>{task?.description}</Text>

              <Text>Data</Text>
              <Text>{task?.date}</Text>

              <View>
                <View>
                  <Text>Prioridade</Text>
                  <View>
                    <Text>{task?.priority}</Text>
                  </View>
                </View>
                <View className="flex-row justify-end mt-6">
                  <Text>Estado</Text>
                  <View>
                    <Text>{task.completed ? "Completa" : "incompleta"}</Text>
                  </View>
                </View>
              </View>
              <View className="flex-row justify-end mt-6">
                <TouchableOpacity onPress={() => onToggleComplete(task.id)}>
                  <Text>
                    {task.completed
                      ? "Marcar como Incompleta"
                      : "Marcar como Completa"}
                  </Text>
                              </TouchableOpacity>
                <TouchableOpacity onPress={() => onEdit(task)} className="ml-4">
                  <Text>Editar</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => onDelete(task.id)} className="ml-4">
                                  <MaterialIcons name="delete-outline" size={22} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}