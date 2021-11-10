import React from 'react';
import Plantilla from '../componentescomunes/plantilla';

const Home = ()=>{
    return(
        <Plantilla>
            <h2 style={{margin:'0.7em 0 0.7em 0'}}>Laboratorios</h2>
            <p style={{textAlign:'justify',lineHeight:'2em'}}>El Departamento de la carrera de Ingeniería en Sistemas de Información (DISI) de la U.T.N. – F.R.B.A. cuenta con los Laboratorios de Sistemas de Información
                 (DISILAB) cuya misión es brindar a los alumnos y docentes de la carrera el espacio, los servicios y disponibilidad tecnológica necesaria para el correcto 
                 desarrollo de sus actividades académicas y de investigación.
                DISILAB está compuesto por 7 laboratorios distribuidos en dos sedes de la facultad (Medrano y Campus), 100 puestos de trabajo, 4 servidores y posee capacidad 
                para 230 alumnos en simultáneo.
                Para solicitar reservas de los laboratorios se debe enviar un email al equipo DISILAB (disilab-soporte@sistemas.frba.utn.edu.ar) indicando fecha, horario, 
                laboratorio solicitado, infraestructura y software necesarios.
                DISILAB ofrece un amplio horario donde los distintos laboratorios están disponible para su uso. Puede ingresar en la sección Reservas y Horarios para mayor 
                información. En la sección Infraestructura podrá encontrar más información acerca de los equipos con los que cuentan los Laboratorios.
            </p>
            <h3>Servicio de Gestión de Laboratorio</h3>
            <p>
                La Gestión de los Laboratorios se encuentra certificada bajo ISO9000 (Gestión de Calidad) e ISO20000 (Calidad en Servicios de IT). Encontrará mayor información 
                en la sección Calidad.
                Para realizar Reclamos o Sugerencias, puede utilizar nuestro formulario para tal fin.
            </p>
        </Plantilla>
    )
}

export default Home