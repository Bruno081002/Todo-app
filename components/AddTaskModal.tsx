import { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type AddTaskModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PRIORITIES = ["Low", "Medium", "High"];

export default function AddTaskModal({ visible, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [show, setShow] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;
    console.log({ title, description, dueDate, priority });
    onClose();
    setTitle("");
    setDate(new Date());
    setDescription("");
    setPriority("");
  };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className=" flex-1 bg-black/50 justify-center items-center px-6">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-lg p-4  w-full max-w-sm">
              <Text className=" text-xl font-bold mb-10">Nova Tarefa</Text>
              <Text className=" text-base font-600 mb-2">Titulo</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Nome da Tarefa"
                className=" border-2 border-gray-200 rounded-lg px-4 mb-6"
                          ></TextInput>
                        
              <Text className=" text-base font-600 mb-2">Data</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
