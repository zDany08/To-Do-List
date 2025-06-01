import {useTasks} from "../contexts/TasksContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
    const { tasks } = useTasks();
    const taskItems = tasks.map(task => <TaskItem key={tasks.indexOf(task)} task={task} />);
    return (
        <ul className="w-full px-2 pt-2 flex flex-col gap-5">{taskItems}</ul>
    );
};
