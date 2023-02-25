import React, { useContext,useState}  from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import '../../styles/home.css'

export const Navbar = () => {
	const {actions,store}=useContext(Context)
	const [datauser,setDataUser] = useState(JSON.parse(localStorage.getItem("datauser") ))
	console.log(datauser)

	const [token,setToken] = useState(JSON.parse(localStorage.getItem("token") ))
	const handleLogout = () =>{
		setDataUser (localStorage.removeItem("datauser"))
        setToken (localStorage.removeItem("token"))
		alert("has cerrado sesion ")
	}

	return (
		<div className="mb-0">
			<nav className="navbar navbar-expand-lg  navbarColor textoTamañoMediano px-0 mb-0">
				<nav className="navbar ps-3">
					<div className="container-fluid">
						<Link to="/" className="text-decoration-none">
							<i className="fa-solid   navbarFontColor textoTamañoGrande"></i><a className="navbar-brand ps-2 navbarFontColor textoTamañoGrande" href="#">HOME</a>
						</Link>
					</div>
				</nav>
				<ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
					
				
				</ul>
				{/* login icon */}
				<li className="navbar-nav px-1">
					<Link to="/vistausuario" className="text-decoration-none">
						<i className="fa-regular fa-circle-user  navbarFontColor textoTamañoGrande"></i>
					</Link>
				</li>


				<li className="navbar-nav pe-3 ps-1">
					<Link to="/login" className="text-decoration-none">
						<a className="nav-link  navbarFontColor" href="#">{datauser ? datauser?.info_user.email : "Login"}</a>
					</Link>
					<Link to="/signup" className="text-decoration-none">
						<a className="nav-link  navbarFontColor" href="#">Signup</a>
					</Link>
				</li>
				{/* logout icon */}


				<li className="navbar-nav px-3"onClick={()=>{handleLogout()}} >


					<Link to="/" className="text-decoration-none">
						
						<i className="fa-solid fa-arrow-right-from-bracket tamañotextoGrande"></i>
					</Link>
				</li>
			</nav>
			<div className="linea-azul-navbar"></div>
		</div>
	);
};
