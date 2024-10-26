import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { createcurso } from '../helpers/cursos';
import { Form, Button } from 'react-bootstrap';


export default function Crearcurso() {

  const navigate = useNavigate();

  //Estados para guardar nombre, descripcion
  const [nombre, setNombre] = useState('');
  const [descripcion, setdescripcion] = useState('');

  const onChangeNombre = (event) =>
  {

    event.preventDefault();

    setNombre(event.target.value);

  }

  const onChangedescripcion = (event) =>
  {
    event.preventDefault();

    setdescripcion(event.target.value);
  
  }

  const onSubmitGuardarcurso =  async (event) =>
  {

    event.preventDefault();

    if(nombre.length <= 1 || descripcion.length <= 1)
    {
      await Swal.fire
      (
        {
          icon : 'info',
          title : 'Para su información',
          text : 'Favor completar todos los datos solicitados(mínimo 2 letras en el nombre y en la descripción).'
        }
      );

      return;
    }
    else
    {
      
      const resultCreatecurso = await createcurso
      (
        {
          'nombre' : nombre,
          'descripcion' : descripcion,
          'estado' : true
        }
      );

      if(resultCreatecurso)
      {
        navigate('/')
      }
      
    }

  }
  return (
    <>
      <div className='container'>
        <center>
          <h1 className='mb-3'>
            Crear un nuevo Curso
          </h1>
        </center>
        
        <h4>
          Por favor ingrese los siguientes datos:
        </h4>

        <Form onSubmit={ onSubmitGuardarcurso }>

        {/* Datos para nombre */}
        <Form.Group className='mt-3'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Ingresa el nombre del curso'
            value={nombre}
            onChange={onChangeNombre}
          />
        </Form.Group>

         {/* Datos para descripcion */}
         <Form.Group className='mt-3'>
          <Form.Label>Descripcion</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Ingresa la descripcion del curso'
            value={descripcion}
            onChange={onChangedescripcion}
          />
        </Form.Group>

        <p className='mt-3'>
          <Button type="submit">Guardar</Button>
        </p>
        <p className='mt-3'>
          <Button variant='danger' as={Link} to="/">Cancelar</Button>
        </p>

        </Form>
        
      </div>
    </>
  )
}
