
import React,{useContext, useEffect, useState} from "react";
import { Navigate, useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SignUp = () => {
   let navigate = useNavigate();
   const { store, actions } = useContext(Context);
	const token = sessionStorage.getItem("token");

   const registro = async (evento) => {
      evento.preventDefault();
      let username =evento.target[0].value;
      let email=evento.target[1].value;
      let name=evento.target[2].value;
      let respuestaSecreta=evento.target[3].value;
      let pass=evento.target[4].value;
      let passRepetir=evento.target[5].value;
      
      if(pass != passRepetir){
          alert("las contraseñas deben ser iguales")
      }
      if(username == ""|| email == "" || name == "" || respuestaSecreta == "" || pass == ""|| passRepetir == ""){
         alert("Debes completar los datos");
      }else{
         await actions.SignUp(
            JSON.stringify({
					email: email,
					password: pass,

				})
         );
         alert("Registro completado");
         navigate("/login")
      }
   }
   
    return (
       <form onSubmit={registro} >
          <div className="container contenedor-principal"  >
             <div className="card carta-contenedora"style={{ backgroundColor: " #cec0ca ", width: "44.75rem", height: "40.25rem", marginTop: "5rem" }} >
 
                <div className="card-body " >
                   <h2 className="card-title" style={{ marginBottom: "3rem" }}>Registrar Nuevo Usuario</h2>
                   <div className="container d-flex">
                      <div className="form-group ">
                         <input type="text" className="form-control mb-5  input-id" name="username" placeholder="Username" />
 
                      </div>
                      <div className="form-group ">
                         <input type="email" className="form-control mb-5 input-nombre"
                            name="email" placeholder="Email" />
                      </div>
                   </div>
                   <div className="container d-flex">
                      <div className="form-group ">
                         <input type="text" className="form-control mb-5 input-id" name="nombre" placeholder="Nombre" />
                      </div>
                      <div className="form-group ">
                         <input type="text" className="form-control mb-5 input-nombre" name="apellido" placeholder="Respuesta Secreta" />
 
                      </div>
                   </div>
                   <div className="container d-flex">
                      <div className="form-group ">
                         <input type="password" className="form-control mb-5 input-id" name="contraseña" id="inputPassword" placeholder="Contraseña"/>
                      </div>
                      <div className="form-group ">
                         <input type="password" className="form-control mb-5 input-nombre" name="repetirContraseña" id="inputPassword" placeholder="Repetir Contraseña" />
                      </div>
                   </div>
                   <br />
                   <button href="#"type="submit" className="btn btn-primary text-center" style={{ width: '277px', height: '71px', background: '#bd9ab3', opacity: 0.66, boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.2)', borderRadius: '20px', left: '605px', top: '675px', lineHeight: '60px' }} value="Registrarse"><h3>Registrarse</h3></button>
                   <br />
                   Ya tienes cuenta ?<button type="button" className="btn btn-link mb-1">Inicia sesión aquí</button>
 
                </div>
             </div>
          </div>
       </form>
    )
 }
 
