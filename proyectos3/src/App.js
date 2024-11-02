import './App.css';
let vacio = '';

function App() {
  const abrirMenu = ()=>{
    let menuDesplegable = document.getElementById('menu');
    let botonCerrar = document.getElementById('botonMenu');
    menuDesplegable.classList.toggle('abrirMenu');
    botonCerrar.classList.toggle('cerrarMenu');
  }
  return (
    <>
      <header>
        <div id='boton1'>
          <button onClick={abrirMenu} className='botonMenu' id='botonesMenu'> </button>
        </div>
        <nav id='menu' className='menuDesplegable'>
          <ul>
            <li><a href={vacio}>Inicio</a></li>
            <li><a href={vacio}>Eventos</a></li>
            <li><a href={vacio}>Inicio Sesión</a></li>
            <li><a href={vacio}>Registrarse</a></li>
          </ul>
        </nav>
      </header>   
      <div className="descripcion">
      <div className="caja-descripcion">
        <h1>¡Bienvenidos a SportWave!</h1>
        <p>
          descripcion de quienes somos y de que va el proyecto
        </p>
      </div>
    </div>
    </> 
  );
}

export default App;
