import { createPortal } from "react-dom";

function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {
    if (!show) return null;

    return createPortal(
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="modal-title">{title}</h2>
                <div className="content">{content}</div>
                <div className="modal-actions">
                    <button onClick={onClose}>Annulla</button>
                    <button onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;