import { useState } from 'react'
import Task from './Task'
import CreateTask from './CreateTask'

export interface GroupProps {
    id: string;
    name: string;
    tasks: any[];
}

const Group = ({id, name, tasks}: GroupProps) => {
    const [createNewTask, setCreateNewTask] = useState(false);

    const toggleCreateNewTask = () => {
        setCreateNewTask(!createNewTask);
    }


    return (
        <div className="group">
            {/* <button className="closeButton">x</button> */}
            <div className="groupHeader">
                {createNewTask 
                    ? <CreateTask groupId={id} closeInput={toggleCreateNewTask} /> 
                    : (<>
                        <h1>{name}</h1>
                        <button className="addButton" onClick={toggleCreateNewTask}>+</button>
                        </>)}
            </div>
            <div className="tasks">
                {tasks && tasks.map((task: any) => {
                    return (
                        <Task 
                            key={task._id} 
                            id={task._id} 
                            title={task.title} 
                            description={task.description} 
                            completed={task.completed} 
                            created={task.createdAt} 
                            updated={task.updatedAt} 
                        />
                        )})}
            </div>
        </div>
    )
}

export default Group
