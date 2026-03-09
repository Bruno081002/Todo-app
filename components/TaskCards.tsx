import { Task } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type TaskCardProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onPress: (task: Task) => void;
};

const PRIORITY_COLORS = {
  Low: {
    border: "border-l-green-500",
    Text: "text-green-500",
    bg: "bg-green-100",
  },
  Medium: {
    border: "border-l-yellow-500",
    Text: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  High: { border: "border-l-red-500", Text: "text-red-500", bg: "bg-red-100" },
};

export default function TaskCards({
  task,
  onToggleComplete,
  onDelete,
  onPress,
}: TaskCardProps) {
  return (
    <TouchableOpacity onPress={() => onPress?.(task)}>
      <View
        className={`flex-row items-center bg-white rounded-2xl px-4 mb-3 border-l-4 ${PRIORITY_COLORS[task.priority].border}`}
        style={{ elevation: 2 }}
      >
        <TouchableOpacity
          onPress={() => {
            onToggleComplete(task.id);
          }}
          className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${task.completed ? PRIORITY_COLORS[task.priority].border : "border-gray-300"}`}
        >
          {task.completed && (
            <MaterialIcons
              name="check"
              size={14}
              color={
                task.priority === "Low"
                  ? "#22c55e"
                  : task.priority === "Medium"
                    ? "#eab308"
                    : "#ef4444"
              }
            />
          )}
        </TouchableOpacity>

        <View className="flex-1">
          <Text
            className={`text-base font-semibold ${task.completed ? "line-through text-gray-300" : "text-gray-800"}`}
          >
            {task.title}
          </Text>
          <Text className="text-xs text-gray-400 mt-1">{task.date}</Text>
        </View>
        <View
          className={` px-3 py-1 rounded-full mr-3 ${PRIORITY_COLORS[task.priority].bg}`}
        >
          <Text
            className={` text-xs font-bold ${PRIORITY_COLORS[task.priority].Text} `}
          >
            {task.priority}
          </Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <MaterialIcons
            name="delete-outline"
            size={22}
            color="#d1d5db"
          ></MaterialIcons>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
