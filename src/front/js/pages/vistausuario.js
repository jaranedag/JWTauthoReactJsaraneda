import React, { useContext,useState}  from "react";
import { Context } from "../store/appContext";
import propTypes from 'prop-types'

import { Link } from "react-router-dom";
import '../../styles/home.css'



export const VistaUsuario = (props)=>{
  return ( <div className="card-title text-center">
  <h1>Vista privada solo para usuarios ingresados</h1>
</div>)
   
}


VistaUsuario.propTypes = {
    props: propTypes.string
}
