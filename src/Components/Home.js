import React from "react";
import HomeStyle from "../Styles/HomeStyle.css"
import Navbar from "./Navbar";
import Logo from "../Assets/LOGO 1.1.png"
import { BsArrowRightCircleFill } from "react-icons/bs";

const Home = () => {
    return (
        <div className="home-container">
      
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                <img src="{BannerBackground}" alt="" />
                </div>
                <div className="home-text-section">
                <h1 className="heading">
                    I Simpósio Regional de <span>Engenharia de Software</span>
                </h1>
                <p className="primary-text">
                   Embarque nessa jornada com a gente!
                </p>
                <div className="btn">
                    <div className="info-btn">
                      <h6>Increva-se</h6>
                    
                        <BsArrowRightCircleFill />  
                    </div>

                </div>
                
                </div>
                <div className="home-image-section">
                <img src={Logo} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home;