import { createContext, useContext, useState } from "react";

export type Task = {
    text: string,
    completed: boolean
};

export type TasksState = {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksContext = createContext<TasksState | undefined>(undefined);

export function TasksProvider({
    children
} : {
    children: React.ReactNode
}) {
    const [tasks, setTasks] = useState<Task[]>([]);
    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks(): TasksState {
    const context = useContext(TasksContext);
    if (!context) throw new Error("Failed to use TasksContext.");
    return context;
};
