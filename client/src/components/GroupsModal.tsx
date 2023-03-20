import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export interface GroupsModalProps {
    show: boolean;
    groups: any[];
    handleClose: () => void;
    handleVisibilityChange: (id: string) => void;
    handleDelete: (id: string) => void;
}

export default function GroupsModal({ show, handleClose, groups, handleDelete, handleVisibilityChange }: GroupsModalProps) {
   const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handleDeleteConfirm = () => {
        console.log("delete this group: ");
        setShowModal(false);
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
                    <button className="margin-right-1" onClick={() => handleVisibilityChange(group._id)}>
                        {group.visible ? "Hide" : "Show"}
                    </button>
                    <button className="modalDeleteButton" onClick={() => handleDeleteClick()}>X</button>
                    </div>
                    </div>
                ))}
       
                
                <button className="modalCloseButton" onClick={handleClose}>Close</button>
            </section>
        </div>
    )
}
