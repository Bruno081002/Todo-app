export type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
};
