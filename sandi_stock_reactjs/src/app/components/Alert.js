import React from 'react'
import Modal from '../components/Modal';

export default function Alert({message, show, onClose}) {
    return (
        <Modal showOverlay={true} size={'xs'} show={show} onClose={() => onClose()}>
            <Modal.Header>
                <Modal.Title>
                   Thông báo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ width: "100%", textAlign: "center", fontSize: "22px", "line-height": "30px" }}>
                {message}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => onClose()}>Đóng</button>
            </Modal.Footer>
        </Modal>
    )
}