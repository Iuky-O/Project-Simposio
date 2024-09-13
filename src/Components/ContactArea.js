import React from "react";
import "../Styles/ContactArea.css";
import gmail from "../Assets/gmailBranco.png";
import whatsapp from "../Assets/whatsappBranco.png";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMarkAsUnread } from "react-icons/md";

const ContactArea = () => {
    return (


    <div className="contact-area">
            <div className="about-container">
                <h1 className="heading-contact">
                    Entre em contato
                </h1>
                <p>Em caso de dúvida, sugestão ou queira saber mais sobre o Simpósio Regional de Engenharia de Software entre em contato conosco</p>

                <div className="carts-container-topics">
                    {/* Tópico e descrição do evento */}
                    <div className="contact-section">
                        <h2> <MdOutlineMarkAsUnread /> Email</h2>
                        <p>simpósioregional@gmail.com</p>
                    </div>

                    {/* Tópico e descrição dos objetivos */}
                    <div className="contact-section">
                        <h2><FaWhatsapp /> Número do WhatsApp</h2>
                     
                        <p>4002-8922</p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactArea;
