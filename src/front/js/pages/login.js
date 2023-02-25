import React,{useContext, useEffect, useState} from "react";
import { Navigate, useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.css";



export const Login = () => {
   const {store,actions}= useContext(Context);
   let navigate = useNavigate();
   const [errorMessage,setErrorMessage]= useState(false);
   const login = async (evento)=>{
      evento.preventDefault();
      let email = evento.target[0].value;
      let pass = evento.target[1].value;

      if(email == ""||pass==""){
         alert("debes completar los datos");
      }else{
         actions.login(email, pass);
         alert ("inicio session completado")
         navigate("/")
      }
    

   };
   
	 const llamada = async () => {
  
      if (sessionStorage.getItem("token") || localStorage.getItem("token")) {
      
       const ruta = await actions.tokenValidation("/");
       console.log("/", ruta);
       if (typeof ruta === "string") {
         navigate("/");
       }
      }
    }; 
     return (
       <form  onSubmit={login}>
          <div className="container text-center d-flex justify-content-center" >
             <div className="card mx-auto" style={{ backgroundColor: " #cec0ca ", width: "44.75rem", height: "40.25rem", marginTop: "5rem" }}>
                <div className="card-body">
                   <h2 className="card-title" style={{ marginBottom: "3rem" }}>Bienvenido(a)! </h2>
                   <div className="form-group">
                      <input type="text" className="form-control mb-5" style={{ width: '548px', height: '71px', background: '#FFFFFF', opacity: '0.66', borderRadius: '20px', margin: "0 auto" }} placeholder="Email" />
                   </div>
                   <div className="form-group">
                      <input type="password" className="form-control mb-3" style={{ width: '548px', height: '71px', background: '#FFFFFF', opacity: '0.66', borderRadius: '20px', margin: "0 auto" }} placeholder="Contraseña" />
                   </div >
 
                   <br />
                   <button href="#" type="submit" className="btn btn-primary text-center fs-5 mb-2" style={{ width: '277px', height: '71px', background: '#bd9ab3 ', opacity: 0.66, boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.2)', borderRadius: '20px', left: '605px', top: '675px', lineHeight: '60px' }}>Ingresar</button>
                   <br />
                   Aún no tienes cuenta ?<button type="button" className="btn btn-link mb-1">Registrate</button>
                </div>
               
                <button type="button" className="btn btn-link mb-2 fs-5">Has olvidado tu contraseña ?</button>
           
             </div>
          </div>
       </form>
    )
 }