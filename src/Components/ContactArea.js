import React from "react";
import "../Styles/ContactArea.css";
import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineMarkAsUnread } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const ContactArea = () => {
  return (
    <div className="contact-area">
      <div className="about-container">
        <h1 className="heading-contact">Entre em contato</h1>
        <p>
          Em caso de dúvida, sugestão ou queira saber mais sobre o Simpósio
          Regional de Engenharia de Software, entre em contato conosco.
        </p>

        <div className="grid-container">
          <div className="contact-card">
            <MdOutlineMarkAsUnread className="contact-icon" />
            <h2>Email</h2>
            <p>simpósioregional@gmail.com</p>
          </div>

          <div className="contact-card">
            <FaWhatsapp className="contact-icon" />
            <h2>WhatsApp</h2>
            <p>4002-8922</p>
          </div>

          <div className="contact-card">
            <FiPhone className="contact-icon" />
            <h2>Atendimento</h2>
            <p>Disponível de segunda a sexta, das 9h às 18h</p>
          </div>

          <div className="contact-card">
            <FaMapMarkerAlt className="contact-icon" />
            <h2>Local</h2>
            <p>Rua Pedro Porpino da Silva, 1181, São José, Castanhal - Campus XX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactArea;
