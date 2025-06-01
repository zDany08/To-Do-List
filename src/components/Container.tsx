import { useState, useCallback } from "react";
import { useTasks } from "../contexts/TasksContext";
import TaskList from "./TaskList";

export default function Container() {
    const { tasks, setTasks } = useTasks();
    const [text, setText] = useState<string>("");
    const onChangeText = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => setText(event.target.value), [text]);
    const onAdd = useCallback((): void => {
        setTasks([...tasks, { text: text, completed: false }]);
        setText("");
    }, [tasks, text]);
    return (
        <div className="m-5 p-10 md:w-160 flex flex-col gap-10 bg-gray-100 rounded-xl">
            <h1 className="w-full font-bold text-4xl text-sky-900">To-Do List</h1>
            <div className="w-full relative flex flex-row">
                <input className="pl-6 pr-38 py-4 w-full bg-gray-300 text-gray-600 caret-gray-600 placeholder:text-gray-400 rounded-full outline-none truncate" type="text" placeholder="e.g. Workout, Shopping, Have a shower, etc." onChange={onChangeText} value={text} />
                <button className="absolute right-0 px-4 w-36 h-full bg-orange-red-dark not-disabled:hover:bg-orange-red-light text-gray-100 border-5 border-gray-300 rounded-4xl cursor-pointer transition-all duration-400" onClick={onAdd}>Add</button>
            </div>
            {tasks.length > 0 && <TaskList />}
        </div>
    );
};
