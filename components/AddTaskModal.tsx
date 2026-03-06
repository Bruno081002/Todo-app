import { useState } from "react";
import {
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

type AddTaskModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PRIORITIES = ["Low", "Medium", "High"];

export default function AddTaskModal({ visible, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDate] = useState(new Date());
  const [dueDateWeb, setDateWeb] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [show, setShow] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;
    const finalDate =
      Platform.OS === "web" ? dueDateWeb : dueDate.toLocaleDateString("pt-PT");
    console.log({ title, description, date: finalDate, priority });
    onClose();
    setTitle("");
    setDate(new Date());
    setDescription("");
    setPriority("");
    setShow(false);
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
                placeholderTextColor="#9ca3af"
                className=" border-2 border-gray-200 rounded-lg px-4 py-3 mb-6"
              ></TextInput>

              <Text className=" text-base font-600 mb-2">Data</Text>
              {Platform.OS === "web" ? (
                <TextInput
                  value={dueDateWeb}
                  onChangeText={(Text) => setDateWeb(Text)}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#9ca3af"
                  className=" border-2 border-gray-200 rounde-lg px-4 py-3 mb-4"
                ></TextInput>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => setShow(true)}
                    className=" border-2 border-gray-200 rounded-lg py-3 px-4 mb-4"
                  >
                    <Text className="text-black">
                      {dueDate.toLocaleDateString("pt-PT")}
                    </Text>
                  </TouchableOpacity>
                  {show && (
                    <View className=" bg-white rounded-xl overflow-hidden mb-4 ">
                      <DateTimePicker
                        value={dueDate}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        textColor="black"
                        onChange={(event, selectedDate) => {
                          if (selectedDate) setDate(selectedDate);
                          if (Platform.OS === "android") setShow(false);
                        }}
                      />
                      {Platform.OS === "ios" && (
                        <TouchableOpacity
                          onPress={() => setShow(false)}
                          className=" mx-4 mb-4 mt-2 bg-blue-600 py-3 rounded-xl justify-center items-center"
                        >
                          {" "}
                          <Text className=" text-black font-bold text-base">
                            {" "}
                            Confirmar{" "}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </>
              )}
              <Text className="text-base font-600 mb-2">
                Descrição da Tarefa
              </Text>
              <TextInput
                value={description}
                onChange={() => setDescription}
                placeholder="Descrição"
                placeholderTextColor="#9ca3af"
                multiline
                className="border-2 border-gray-200 rounded-lg px-4 text-start h-24 mb-4"
                style={{ textAlignVertical: "top" }}
              ></TextInput>
              <Text className="text-base font-600 mb-4"> Prioridade </Text>
              <View className=" flex-row gap-2 mb-6">
                {PRIORITIES.map((p) => (
                  <TouchableOpacity
                    key={p}
                    onPress={() => setPriority(p)}
                    className={`flex-1 py-2 rounded-xl items-center bottom-2 ${priority === p ? (p === "High" ? "bg-red-500 border-red-500" : p === "Medium" ? "bg-orange-500 border-orange-500" : "bg-green-500 border-green-500") : "bg-transparent border-gray-200"}`}
                  >
                    <Text
                      className={`font-bold text-sm ${
                        priority === p
                          ? "text-white"
                          : p === "High"
                            ? "text-red-500"
                            : p === "Medium"
                              ? "text-yellow-400"
                              : "text-green-500"
                      }`}
                    >
                      {p}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className=" flex-row gap-3 mb-2">
                <TouchableOpacity onPress={onClose} className=" flex-1 border-2 rounded-xl py-3 border-gray-200 items-center ">
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSave}
                  className={` flex-1 rounded-xl items-center py-3 ${title.trim() ? "bg-blue-500" : "bg-gray-200"}`}
                >
                  <Text>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
