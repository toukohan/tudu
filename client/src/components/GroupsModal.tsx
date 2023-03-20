import { useState } from "react";
import { useMutation, useQueryClient } from "react-query"
import axios from "../axiosInstance";
import ConfirmationModal from "./ConfirmationModal";

export interface GroupsModalProps {
    show: boolean;
    groups: any[];
    handleClose: () => void;
    handleVisibilityChange: (id: string) => void;
}

export default function GroupsModal({ show, handleClose, groups, handleVisibilityChange }: GroupsModalProps) {
   const [showModal, setShowModal] = useState(false);
   const [groupToDelete, setGroupToDelete] = useState("");

    const queryClient = useQueryClient();

   const { mutate } = useMutation((id: string) => axios.delete(`/groups/delete/${id}`),{
    onSuccess: () => {
        queryClient.invalidateQueries('user');
    }
});

    const handleDeleteClick = (groupId: string) => {
        setShowModal(true);
        setGroupToDelete(groupId);
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handleDeleteConfirm = () => {
        setShowModal(false);
        mutate(groupToDelete);
        handleClose();
    }

    return (
        <div className={show ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">
                <h1>Groups</h1>

                {showModal && <ConfirmationModal
                    message="Are you sure you want to remove this group?"
                    showModal={showModal}
                    handleModalClose={handleModalClose}
                    handleDeleteConfirm={handleDeleteConfirm}

                />}

                {groups.map((group) => (
                    <div className="flex-row space-between" key={group._id}>
                    <h3>{group.name}</h3>
                    <div>
                    {/* <button className="margin-right-1" onClick={() => handleVisibilityChange(group._id)}>
                        {group.visible ? "Hide" : "Show"}
                    </button> */}
                    <button className="modalDeleteButton" onClick={() => handleDeleteClick(group._id)}>X</button>
                    </div>
                    </div>
                ))}
       
                
                <button className="modalCloseButton" onClick={handleClose}>Close</button>
            </section>
        </div>
    )
}
