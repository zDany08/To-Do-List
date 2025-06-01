import { TasksProvider } from "./contexts/TasksContext";
import Container from "./components/Container";

export default function App() {
    return (
        <TasksProvider>
            <Container />
        </TasksProvider>
    );
};
