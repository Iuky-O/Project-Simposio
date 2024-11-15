import React from "react";
import "../Styles/HomeStyle.css"
import Navbar from "./Navbar";
import Image1 from "../Assets/Fundo-Açai.jpeg"
import Image2 from "../Assets/Fundo-Guaraná.jpeg"
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useAuth} from "../Scripts/AuthContext";

///enrollment2 - article
const Home = () => {
    const { user } = useAuth();

    return (
        <div className="home">
            <div className="home-banner-container">

                <div className="home-text-section">
                    <h1 className="heading-home">
                        I Simpósio Regional de <span>Engenharia de Software</span>
                    </h1>
                    <p className="primary-text">
                        Embarque nessa jornada com a gente!
                    </p>
                    
                    {user ? (
                        <Link to="/article" className="btnI"> 
                            <div className="info-btn">
                                <h5>Submeta um Artigo</h5>
                                <BsArrowRightCircleFill />
                            </div>
                        </Link>
                    ) : (
                        <Link to="/enrollment2" className="btnI">
                            <div className="info-btn">
                                <h5>Inscreva-se</h5>
                                <BsArrowRightCircleFill />
                            </div>
                        </Link>
                    )}

                </div>
                <div className="home-image-section">
                    <img src={Image1} alt="" />
                    <img src={Image2} alt="" />

                </div>
            </div>
        </div>
    )
}

export default Home;