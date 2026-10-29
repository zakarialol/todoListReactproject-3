import { createContext, useContext } from "react";

const TasksContext = createContext(null);

export function TasksProvider({ children, value }) {
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used inside TasksProvider");
  }

  return context;
}
