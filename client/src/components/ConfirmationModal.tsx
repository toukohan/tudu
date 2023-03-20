
export interface ConfirmationModalProps {
    message: string;
    showModal: boolean;
    handleModalClose: () => void;
    handleDeleteConfirm: () => void;
}

export default function ConfirmationModal({
    message,
    showModal, 
    handleModalClose, 
    handleDeleteConfirm}: ConfirmationModalProps) {

    

    return (
        <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal-content">
          <h2>{message}</h2>
          <div className="modal-actions">
            <button onClick={handleModalClose}>Cancel</button>
            <button className="modalDeleteButton" onClick={handleDeleteConfirm}>Remove</button>
          </div>
        </div>
      </div>
    )
}