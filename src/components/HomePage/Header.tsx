import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Header.css";
import { scrollToSection } from "./Home";

interface HeaderProps {
  onLinkClickContact: () => void;
  onLinkClickAbout: () => void;
  onLinkClickJoin: () => void;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  onLinkClickContact,
  onLinkClickAbout,
  onLinkClickJoin,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="header">
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
        <nav className="nav">
          <li onClick={() => navigate("/Code")}>
            <a>Code</a>
          </li>
          <li onClick={() => navigate("/Music")}>
            <a>Music</a>
          </li>
          <li
            onClick={() => {
              onLinkClickAbout();
            }}
          >
            <a>Dance/Sports</a>
          </li>
          <li
            data-testid="join-link"
            onClick={() => {
              onLinkClickJoin();
            }}
          >
            <a>Misc</a>
          </li>
          <li
            data-testid="join-link"
            onClick={() => {
              onLinkClickJoin();
            }}
          >
            <a>About me!</a>
          </li>
        </nav>
        <div
          data-testid="contact-link"
          className="contact"
          onClick={() => {
            onLinkClickContact();
            console.log("hey");
          }}
        >
          <a>Resume!</a>
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
