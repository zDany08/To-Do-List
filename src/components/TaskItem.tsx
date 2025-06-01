import { useState, useCallback, useRef } from "react";
import { Task, useTasks } from "../contexts/TasksContext";

export default function TaskItem({
    task
} : {
    task: Task
}) {
    const { tasks, setTasks } = useTasks();
    const [completed, setCompleted] = useState<boolean>(false);
    const checkBoxRef = useRef<HTMLInputElement>(null);
    const onCheckboxChangeState = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const state: boolean = event.target.checked;
        setCompleted(state);
        changeTaskState(state, task, tasks, setTasks);
    }, [tasks]);
    const onTextChangeState = useCallback((): void => {
        const state: boolean = !completed;
        setCompleted(state);
        changeTaskState(state, task, tasks, setTasks);
    }, [tasks, completed]);
    const onRemove = useCallback((): void => setTasks(tasks.filter(listed => listed.text != task.text)), [tasks]);
    return (
        <li className="relative flex flex-row gap-5">
            <div className="size-7 rounded-full cursor-pointer">
                <input ref={checkBoxRef} className="appearance-none size-7 border-2 border-gray-400 rounded-full checked:border-orange-red-dark checked:bg-orange-red-dark cursor-pointer" type="checkbox" checked={task.completed} onChange={onCheckboxChangeState} />
                <svg className={`rotate-6 absolute top-[0.3rem] left-[0.33rem] size-4.5 text-gray-100 stroke-2${task.completed ? "" : " hidden"}`} onClick={() => checkBoxRef.current?.click()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </div>
            <span className={`text-xl cursor-pointer${task.completed ? " text-gray-500 line-through" : " text-gray-700"}`} onClick={onTextChangeState}>{task.text}</span>
            <svg className="absolute right-0 size-5 text-gray-500 stroke-2 cursor-pointer" onClick={onRemove} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </li>
    );
};

function changeTaskState(state: boolean, task: Task, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>) {
    const newTasks: Task[] = tasks;
    for(const listed of newTasks) if(listed.text == task.text) listed.completed = state;
    setTasks(newTasks);
}
