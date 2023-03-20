import { useState } from 'react';
import axios from '../axiosInstance'
import { useMutation, useQueryClient } from 'react-query';

const CreateGroup = () => {
    const user = localStorage.getItem('user');
    const [name, setName] = useState('');

    const queryClient = useQueryClient();

    const { mutate } = useMutation((name: string) => axios.post("/groups/create", { name, user }), {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        }
    });

    return (
        <div className="createGroup">
            <input type="text" placeholder="Group Name" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => {
                if(name === '') return;
                mutate(name);
                setName('');
            }}
            >Create Group</button>
        </div>
    )
}

export default CreateGroup;