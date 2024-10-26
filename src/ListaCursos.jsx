import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setcurso } from '../store/index';
import { getAllcurso, inactivarcursoById, activarcursoByUpdate, getcursoById  } from '../helpers/cursos';
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";
import { h } from 'gridjs';
import { Button } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


export default function Listacurso({nombre}) {

  const dispatch = useDispatch();

  const [datoscurso, setDatoscurso] = useState([]);

  const navigate = useNavigate();

  const initialData = async () => {
    const result = await getAllcurso();
    if (result) {
      setDatoscurso(result);
    }
  };

  const actualizarcurso = async (idParaActualizar) => {
    const resultGetDataCurso = await getcursoById({ id_curso: Number(idParaActualizar) });
    if (resultGetDataCurso) {
      dispatch(setcurso(resultGetDataCurso));
      navigate('/editarcurso');
    }  
  };

  const inactivarcurso = async (idParaInactivar) => {
    const resultInactivar = await inactivarcursoById({ id: Number(idParaInactivar) });
    if (resultInactivar) {
      initialData();
    }  
  };

  const activarcurso = async (nombreRecibido, descripcionRecibido, idRecibido) => {
    const resultActivar = await activarcursoByUpdate({
      nombre: nombreRecibido,
      descripcion: descripcionRecibido,
      estado: true,
      id: Number(idRecibido)
    });
    if (resultActivar) {
      initialData();
    }
  };

  useEffect(() => {
    initialData();
  }, []);

  return (
    <div>
      <center id='curso'>
        <h1 className='mb-1'>Lista de Curso</h1>
        <Button className='btn-dinamico mt-2 mb-3'  as={Link} to="/Crearcurso">
          Agregar nuevo Curso
        </Button>
      </center>

      <Tabs defaultActiveKey="TablaActiva" id="fill-tab-example" className='mb-3 text-black p-0 '>
        <Tab eventKey="TablaActiva" title="Lista de cursos activos" className='container '>
          <Grid
            data={datoscurso.activos || []}
            columns={[
              { id: 'id_curso', name: 'Id curso' },
              { id: 'nombre', name: 'Nombre' },
              { id: 'descripcion', name: 'Descripción' },
              { id: 'estado', name: 'Estado' },
              {
                name: 'Editar',
                formatter: (cell, row) => h('Button', {
                  className: 'py-2 mb-4  px-4 border rounded-md text-white btn btn-warning',
                  onClick: () => actualizarcurso(row.cells[0].data)
                }, 'Seleccionar'),
              },
              {
                name: 'Inactivar',
                formatter: (cell, row) => h('Button', {
                  className: 'py-2 mb-4 px-4 border rounded-md text-white btn btn-danger',
                  onClick: () => inactivarcurso(row.cells[0].data)
                }, 'Seleccionar'),
              },
            ]}
            search={true}
            pagination={{ enabled: true, limit: 5 }}
            sort={true}
            resizable={true}
            language={{
              search: { placeholder: 'Escribe para buscar...' },
              sort: { sortAsc: 'Orden de columna ascendente.', sortDesc: 'Orden de columna descendente.' },
              pagination: { previous: 'Anterior', next: 'Siguiente', navigate: (page, pages) => `Página ${page} de ${pages}`, page: (page) => `Página ${page}`, showing: 'Mostrando del', of: 'de', to: 'al', results: 'registros' },
              loading: 'Cargando...',
              noRecordsFound: 'Sin coincidencias encontradas.',
              error: 'Ocurrió un error al obtener los datos.',
            }}
            className={{ table: 'table table-bordered mb-0' }}
          />
        </Tab>

        <Tab eventKey="TablaInactiva" title="Lista de cursos inactivos" className='container'>
          <Grid
            data={datoscurso.inactivos || []}
            columns={[
              { id: 'id_curso', name: 'Id curso' },
              { id: 'nombre', name: 'Nombre' },
              { id: 'descripcion', name: 'Descripción' },
              { id: 'estado', name: 'Estado' },
              {
                name: 'Opción',
                formatter: (cell, row) => h('Button', {
                  className: 'py-2 mb-4 px-4 border rounded-md text-white btn btn-success ',
                  onClick: () => activarcurso(row.cells[1].data, row.cells[2].data, row.cells[0].data)
                }, 'Activar'),
              },
            ]}
            search={true}
            pagination={{ enabled: true, limit: 5 }}
            sort={true}
            resizable={true}
            language={{
              search: { placeholder: 'Escribe para buscar...' },
              sort: { sortAsc: 'Orden de columna ascendente.', sortDesc: 'Orden de columna descendente.' },
              pagination: { previous: 'Anterior', next: 'Siguiente', navigate: (page, pages) => `Página ${page} de ${pages}`, page: (page) => `Página ${page}`, showing: 'Mostrando del', of: 'de', to: 'al', results: 'registros' },
              loading: 'Cargando...',
              noRecordsFound: 'Sin coincidencias encontradas.',
              error: 'Ocurrió un error al obtener los datos.',
            }}
            className={{ table: 'table table-bordered mb-0' }}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
