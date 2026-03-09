import React from "react";
import "./modal.css";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="overlay" onClick={onClose}></div>
      <div className="modal-content w3-animate-top">{children}</div>
    </div>
  );
}