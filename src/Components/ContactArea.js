import React from "react";
import "../Styles/ContactArea.css";
import img from "../Assets/iameg.png";

const ContactArea = () => {
    return (
        <footer className="contact-area">
            <div className="contact-content">
                <div className="text-section">
                    <h2>Entre em contato</h2>
                </div>
                <div className="social-section">
                    <div className="social-icon-footer">
                        <a href="#"><img src={""} alt="Social Icon" /></a>
                        <a href="#"><img src={""} alt="Social Icon" /></a>
                        <a href="#"><img src={""} alt="Social Icon" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ContactArea;
