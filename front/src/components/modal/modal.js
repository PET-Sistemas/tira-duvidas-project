import React, { useState } from "react";
import "./modal.css";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="overlay" onClick={onClose}></div>
      <div className="modal-content">
        {title && <h1>{title}</h1>}
        {children}
      </div>
    </div>
  );
}
