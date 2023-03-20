import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import axios from '../axiosInstance'

export interface TaskProps {
    id: string;
    title: string;
    description: string;
    done: boolean;
    created: string;
    updated: string;
}

const Task = ({id, title, description, done, created, updated}: TaskProps) => {
    const [taskDone, setTaskDone] = useState(done);
    const queryClient = useQueryClient();

    const { mutate: deleteTask } = useMutation((id: string) => axios.delete(`/tasks/delete/${id}`), {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        }
    });

    const { mutate: markDone } = useMutation((id: string) => axios.patch(`/tasks/update/${id}`, {}),{
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        }
    });

    const taskDoneClass = taskDone ? 'taskDone' : '';
        return (
            <div className="task">
                <div className={`flex-row space-between`}>
                    <h3 className={taskDoneClass} onClick={() => {
                        setTaskDone(!taskDone)
                        markDone(id)}}
                        >{title}</h3>

                   {taskDone && <button className="taskDeleteButton" onClick={() => deleteTask(id)}>✖</button>}
                </div>
                <p>{description}</p>
            </div>
        )
    }

export default Task