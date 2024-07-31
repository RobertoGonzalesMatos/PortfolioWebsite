import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Header.css";

interface HeaderProps {
  headerColor: string;
  dim: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({ headerColor, dim }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const shouldDim: string = dim ? " dim" : "";

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
            <a className={dim ? "dimmed" : ""}>Code</a>
          </li>
          <li onClick={() => navigate("/Music")}>
            <a className={dim ? "dimmed" : ""}>Music</a>
          </li>
          <li onClick={() => navigate("/Dance-Sports")}>
            <a className={dim ? "dimmed" : ""}>Dance/Sports</a>
          </li>
          <li onClick={() => navigate("/Misc")}>
            <a className={dim ? "dimmed" : ""}>Misc</a>
          </li>
          <li onClick={() => navigate("/About-Me")}>
            <a className={dim ? "dimmed" : ""}>About me</a>
          </li>
        </nav>
        <div data-testid="contact-link" className={"contact " + headerColor}>
          <a href="/PortfolioWebsite/resume.pdf" target="_blank">
            Resume
          </a>
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
