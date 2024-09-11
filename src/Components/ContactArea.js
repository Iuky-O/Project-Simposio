import React from "react";
import "../Styles/ContactArea.css";
import gmail from "../Assets/gmailBranco.png";
import whatsapp from "../Assets/whatsappBranco.png";

const ContactArea = () => {
    return (
        <div className="contact-area">
            <div className="contact-content">
                <div className="text-section">
                    <h1>Entre em contato</h1>
                    <p>Em caso de dúvida, sugestão ou queira saber mais sobre o Simpósio Regional de Engenharia de Software entre em contato conosco</p>
                </div>
                <div className="social-section">
                    <div className="social-icon-footer">
                        <a href="#"><img src={gmail} alt="Gmail" /></a>
                        <a href="#"><img src={whatsapp} alt="Whatsapp" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactArea;
