import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";
import landing from "../images/landing.svg";
import api from "../services/api";

import studyIcon from "../images/icons/study.svg";
import teachIcon from "../images/icons/give-classes.svg";
import purpleHeartIcon from "../images/icons/purple-heart.svg";

import "../styles/landing.css";

export default function Landing() {
  const [totalConnections, setConnections] = useState(0);

  useEffect(() => {
    api.get("connection").then(({ data }) => {
      setConnections(data.total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Proffy" />
          <h2>Sua plataforma de estudos online</h2>
        </div>
        <img src={landing} alt="Plataforma de estudos" className="hero-image" />
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/give-lessons" className="give-classes">
            <img src={teachIcon} alt="Dar aulas" />
            Dar aulas
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalConnections} conexoes ja realizadas{" "}
          <img src={purpleHeartIcon} alt="Coracao Roxo" />
        </span>
      </div>
    </div>
  );
}
