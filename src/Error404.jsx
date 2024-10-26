import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Error404() {
  return (
    <>
        <center>
            <p>Hola, estás intentando ingresar a una página que no existe.</p>
            <p>Error 404</p>
            <Button variant='success' as={Link} to="/" >
                Regresar a la página inicial
            </Button>
        </center>
    </>
  )
}
