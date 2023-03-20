import { useState } from 'react'
import { useQuery } from 'react-query'
import CreateGroup from './CreateGroup'
import Group from './Group'
import GroupsModal from './GroupsModal'
import axios from '../axiosInstance'

const Dashboard = () => {
    const userId = localStorage.getItem('user');
    const [showModal, setShowModal] = useState(false);

    const { isLoading, isError, data } = useQuery({
        queryKey: 'user',
        queryFn: () => axios.get(`/users/${userId}`)
        })
    
        
    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }

    const handleShow = () => {
        setShowModal(!showModal);
    }

    const handleDelete = (id: string) => {
        console.log("delete this group: ", id);
    }

    const handleVisibilityChange = (id: string) => {
        console.log("change visibility of this group: ", id);
    }
        
    if (isLoading) {
        return <div>Loading...</div>
    }
    
    if (isError) {
        return <div>There was an error</div>
    }

    return (
        <div className="container">
            <header>
            {data && <h1>Hello {data.data.name ? data.data.name : "Stranger"}</h1>}
            <div className="flex-row">
                {showModal ? <><GroupsModal  
                    show={showModal}
                    handleVisibilityChange={handleVisibilityChange}
                    handleDelete={handleDelete}
                    handleClose={handleShow} 
                    groups={data ? data.data.groups : []} />
                   
                    </>
                : <button className="btn-secondary margin-right-1" onClick={handleShow}>Groups</button>}
                <button className="btn-secondary" onClick={logoutUser}>Logout</button>
            </div>
            </header>
            <div className="groups">
                {data && data.data.groups.map((group: any) => {
                    return (
                        <Group 
                            key={group._id} 
                            id={group._id} 
                            name={group.name} 
                            tasks={group.tasks} 
                        />
                        )
                    })
                }
            <CreateGroup />
            </div>
        </div>
    )
}

export default Dashboard;
