import { useEffect, useState, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import axios from "axios";

const Navbar = ({isLogedIn , searchPost}) => {
    // Collapse navabr after clicked on mobile screens
    const handleNavbarCollapse = (e) => {
        //e.preventDefault();
        document.querySelector("#navbarTogglerDemo01").classList.remove("show");
    }
    const history = useNavigate();

    const handleLogin=(e)=>{
        handleNavbarCollapse(e);   
        const url = `http://localhost:5000/auth/${isLogedIn?'Logout':'Login'}`;
        // axios.post(url, {withCredentials: true},{headers:{'Access-Control-Allow-Credentials' : 'true'}}).then(res=>{  // cannot use axios here
        //     console.log(res)
        // }).catch(err=>console.log(err))
        window.location.assign(url)
    }
    return (
        
        <nav  className="navbar navbar-expand-lg  navbar-custom">
        <div  className="container-fluid">
        <Link to="/" className="navbar-brand">
            Code Prep
        </Link>
          <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="#navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <FormatAlignJustifyIcon />
          </button>
          <div  className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            {   isLogedIn &&
                <li className="navbar-item">
                <Link to="/add" className="nav-link" onClick={handleNavbarCollapse} >
                    Add-Question
                </Link>
            </li>}
            <li className="navbar-item">
                <Link  to="/posts" className="nav-link" onClick={handleNavbarCollapse} >
                    Posts
                </Link>
            </li>
            <li className="navbar-item">
                <Link  to="/myposts" className="nav-link" onClick={handleNavbarCollapse} >
                    My Questions
                </Link>
            </li>
            <li className="navbar-item">
                <span className="nav-link" onClick={handleLogin} >
                    {isLogedIn?"Logout":"Login"}
                </span>
            </li>
            </ul>
            <form  className="d-flex ms-auto">
              <input  className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>searchPost(e.target.value)}/>
            </form>
          </div>
        </div>
      </nav>

    );

}

export default Navbar;
