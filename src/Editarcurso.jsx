import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { updatecurso } from '../helpers/cursos';
import { Form, Button } from 'react-bootstrap';

export default function Editarcurso() {

  const navigate = useNavigate();
  const cursoPorEditar = useSelector((state) => state.datosParaRedux.curso[0]);  

  const [nombre, setNombre] = useState('');
  const [descripcion, setdescripcion] = useState('');

  const onChangeNombre = (event) => {
    event.preventDefault();
    setNombre(event.target.value);
  }

  const onChangedescripcion = (event) => {
    event.preventDefault();
    setdescripcion(event.target.value);
  }

  const onSubmitActualizarcurso = async (event) => {
    event.preventDefault();

    if (nombre.length <= 1 || descripcion.length <= 1) {
      await Swal.fire({
        icon: 'info',
        title: 'Para su información',
        text: 'Favor completar todos los datos solicitados(mínimo 2 letras en el nombre y en la descripción).'
      });
      return;
    } else {
      const resultUpdatecurso = await updatecurso({
        'nombre': nombre,
        'descripcion': descripcion,
        'estado': cursoPorEditar.estado,
        'id': Number(cursoPorEditar.id_curso)
      });

      if (resultUpdatecurso) {
        navigate('/');
      }
    }
  }

  const initialData = () => {
    if (cursoPorEditar) {
      setNombre(cursoPorEditar.nombre || '');
      setdescripcion(cursoPorEditar.descripcion || '');
    }
  }

  useEffect(() => {
    if (!cursoPorEditar) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró el curso para editar',
      });
      navigate('/');
    } else {
      initialData();
    }
  }, []);

  return (
    <>
      <div className='container '>
        <center>
          <h1 className='mb-1'>
            Editar datos de un curso
          </h1>
        </center>
        
        <h4>
          Por favor ingrese los siguientes datos:
        </h4>

        <Form onSubmit={ onSubmitActualizarcurso }>
          {/* Datos para nombre */}
          <Form.Group className='mt-3'>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Ingresa el nombre del curso'
              value={nombre}
              onChange={onChangeNombre}
            />
          </Form.Group>

          {/* Datos para el detalle de los cursos */}
          <Form.Group className='mt-3'>
            <Form.Label>Descripción:</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Ingresa una descripcion del curso'
              value={descripcion}
              onChange={onChangedescripcion}
            />
          </Form.Group>

          <p className='mt-3'>
            <Button type="submit">Actualizar</Button>
          </p>
          <p className='mt-3'>
            <Button variant='danger' as={Link} to="/">Cancelar</Button>
          </p>
        </Form>
      </div>
    </>
  )
}
