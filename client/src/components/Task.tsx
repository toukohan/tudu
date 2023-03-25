import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import axios from '../axiosInstance'

export interface TaskProps {
    id: string;
    title: string;
    description: string;
    done: boolean;
    created?: string;
    updated?: string;
}

interface TaskChanges {
    title?: string;
    description?: string;
    done?: boolean;
}

const Task = ({id, title, description, done, created, updated}: TaskProps) => {
    const queryClient = useQueryClient();
    const { mutate: deleteTask } = useMutation((id: string) => axios.delete(`/tasks/delete/${id}`), {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        }
    });

    const { mutate: updateTask } = useMutation((changes: TaskChanges) => axios.patch(`/tasks/update/${id}`, changes), {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        }
    });

    const taskDoneClass = done ? 'taskDone' : '';
        return (
            <div className="task">
                <div className={`flex-row space-between`}>
                    <h3 className={`${taskDoneClass} task-title`} onClick={() => {
                        updateTask({done: done ? false : true})
                    }}
                        >{title}</h3>

                   {done && <button className="taskDeleteButton" onClick={() => deleteTask(id)}>✖</button>}
                </div>
                <p className={`${taskDoneClass} task-description`}>{description}</p>
            </div>
        )
    }

export default Task