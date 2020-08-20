import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";
import backIcon from "../images/icons/back.svg";

import "../styles/pageHeader.css";

interface PageHeaderProps {
  title?: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header id="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img src={logo} alt="Proffy" />
      </div>

      <div className="header-content">
        <strong>{props.title}</strong>
        {props.description && <p>{props.description}</p>}

        {props.children}
      </div>
    </header>
  );
};

export default PageHeader;
