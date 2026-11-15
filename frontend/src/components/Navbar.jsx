import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/repo-space.svg";
import './Navbar.css';
const Navbar = () => {
  return (
    <nav class="navbar " style={{ backgroundColor: "#161b22",borderBottom:'2px solid #c9d1d9 '}}>
      <div class="container-fluid ">
        <Link class="navbar-brand d-flex align-items-center  brand-hover-effect"  to="/">
          {/* upon clicking the logo it diects to dashboard */}
          <img
            src={logo}
            alt="Logo-repo-space"
            width="70%"
            height="60"
            class="d-inline-block align-text-top me-1"
          />
          <h6 style={{ color: "#c9d1d9",margin:"0" }}>RepoSpace</h6>
        </Link>

        <ul class="navbar-nav flex-row"  >
          <li class="nav-item me-4">
            <Link class="nav-link active text-hover-effect" aria-current="page" to="/create" style={{ color: "#c9d1d9" }}>
              <i class="fa-solid fa-plus me-2"></i> Create A Repository
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link text-hover-effect" to="/profile" style={{ color: "#c9d1d9" }}>
             <i class="fa-solid fa-user-circle me-2"></i>Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
