export interface TaskProps {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    created: string;
    updated: string;
}

const Task = ({id, title, description, completed, created, updated}: TaskProps) => {
    
        return (
            <div className="task">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        )
    }

export default Task