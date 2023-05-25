import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGatos from './components/ListadoGatos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState([])
  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
  
      setTimeout(() => {
        setAnimarModal(true)
      }, 400)
    }
  }, [gastoEditar])

  const handleNuevoGasto = () => {
    setGastoEditar({})
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 400)
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      // Editar gasto
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )
      setGastos(gastosActualizados)
    } else {
      // Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 400)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id )
    setGastos(gastosActualizados)
  }

  return (
    <div className={ modal ? 'fijar' : '' }>
      <Header 
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGatos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt='icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      { modal && (
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
        />
      ) }

    </div>
  )
}

export default App
