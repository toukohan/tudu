import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query"
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
   const [inviteOpen, setInviteOpen] = useState(false);
   const [inviteEmail, setInviteEmail] = useState("");
   const [groupToInvite, setGroupToInvite] = useState("");

   const queryClient = useQueryClient();

   const userId = localStorage.getItem("user");

   const { mutate } = useMutation((id: string) => axios.delete(`/groups/delete/${id}`), {
    onSuccess: () => {
        queryClient.invalidateQueries('user');
    }
});
    const { data: invitations } = useQuery("invitations", () => axios.get(`/users/${userId}/invitations`));
  
   const invite = async (groupId: string, email: string) => {
    const response = axios.post("/users/invite", {groupId, email});
    
    }

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

   const handleInviteClick = (groupId: string) => {
        if (inviteOpen) return handleInviteClose();
        setGroupToInvite(groupId); 
        setInviteOpen(!inviteOpen); 
   }

   const handleInviteConfirm = (groupId: string) => {
        
        invite(groupId, inviteEmail);
        setInviteOpen(false);
        setInviteEmail("");
    }
    const handleInviteClose = () => {
        setInviteOpen(false);
        setInviteEmail("");
        setGroupToInvite("");
    }
    const acceptInvitation = async (groupId: string) => {
        const response = await axios.post("/users/accept-invitation", {groupId, userId});
        
        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('invitations');
    }

    const declineInvitation = async (groupId: string) => {
        const response = await axios.post("/users/decline-invitation", {groupId, userId});

        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('invitations');
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
                    <div className="flex-row space-between group-invite-box" key={group._id}>

                        <div className="flex-column align-left">
                            <h3>{group.name}</h3>
                            {inviteOpen && groupToInvite === group._id &&
                                <div className="flex-row space-between">
                                <input type="email" placeholder="Enter email to invite" onChange={(e) => setInviteEmail(e.target.value)} autoFocus />
                                <button onClick={() => handleInviteConfirm(group._id)}>Send</button>
                                </div>}
                        </div>
                        <div>
                            {/* <button className="margin-right-1" onClick={() => handleVisibilityChange(group._id)}>
                                {group.visible ? "Hide" : "Show"}
                            </button> */}
                            {
                            !inviteOpen ?
                                <div className="flex-row">
                                <button className="inviteUserButton margin-right-1" onClick={() => handleInviteClick(group._id)}>Invite</button>
                                <button className="modalDeleteButton" onClick={() => handleDeleteClick(group._id)}>✖</button>
                                </div>
                                : 
                                groupToInvite === group._id && <button className="closeInviteButton" onClick={handleInviteClose}>✖</button>
                                
                            }
                        </div>
                    
                    </div>
                ))}
                    <div>
                    <h1>{(invitations && invitations.data.length > 0) ? "Invitations": ""}</h1>
                {invitations ? invitations.data.map((group: any) => {
                    return (
                        <div className="flex-row space-between group-invite-box" key={group._id}>
                        
                            <h3>{group.name}</h3>
                            <div className="flex-row">
                            <button className="margin-right-1 join-button" onClick={() => acceptInvitation(group._id)}>Join</button>
                            <button className="decline-button" onClick={() => declineInvitation(group._id)}>✖</button>
                            </div>
                        
                        </div>
                    )
                    
                }
                ): null}
                </div>

       
                
                <button className="modalCloseButton" onClick={handleClose}>Close</button>
            </section>
        </div>
    )
}
