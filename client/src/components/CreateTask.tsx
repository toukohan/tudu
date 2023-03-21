import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../axiosInstance';

export interface CreateTaskProps {
    groupId: string;
    closeInput: () => void;
}
export interface TaskInput {
    title: string;
    group: string;
    user: string;
    description?: string;
}
const CreateTask = ({ groupId, closeInput }: CreateTaskProps) => {
    const user = localStorage.getItem('user') as string;
    const queryClient = useQueryClient();

    const [newTask, setNewTask] = useState<TaskInput>({
        title: '',
        description: '',
        group: groupId,
        user: user
    });

    const { mutate } = useMutation((newTask: TaskInput) => axios.post(`/tasks/create`, newTask), {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        }
    });

    return (
        <div className="createTask">
            <div className="extendableInput">
            <input type="text" placeholder="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} autoFocus />
            {newTask.title !== '' &&
                    <input type="text" placeholder="Task Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
                }
                </div>
            <button className="addButton" onClick={() => {
                if(newTask.title === '') {
                    closeInput();
                    setNewTask({ ...newTask, title: '', description: '' });
                    return;
                }
                mutate(newTask);
                setNewTask({ ...newTask, title: '', description: '' });
            }}
            >+</button>
        </div>
    )
}

export default CreateTask;