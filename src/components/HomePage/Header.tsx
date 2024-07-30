import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Header.css";
import { scrollToSection } from "./Home";

interface HeaderProps {
  headerColor: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({ headerColor }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className={"header " + headerColor}>
      <div className="header-inner">
        <div
          className="logo"
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
            }
          }}
        >
          Roberto Gonzales
        </div>
        <nav className={"nav " + headerColor}>
          <li onClick={() => navigate("/Code")}>
            <a>Code</a>
          </li>
          <li onClick={() => navigate("/Code")}>
            <a>Music</a>
          </li>
          <li onClick={() => navigate("/Code")}>
            <a>Dance/Sports</a>
          </li>
          <li onClick={() => navigate("/Code")}>
            <a>Misc</a>
          </li>
          <li onClick={() => navigate("/Code")}>
            <a>About me</a>
          </li>
        </nav>
        <div data-testid="contact-link" className={"contact " + headerColor}>
          <a href="/PortfolioWebsite/resume.pdf">Resume</a>
        </div>
        <div className="nav-menu">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Header;
