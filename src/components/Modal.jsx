import { useState } from 'react'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({ setModal, animarModal, setAnimarModal }) => {

  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState(null)

  const ocultarModal = () => {
    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 400)
  }

  return (
    <div className="modal">
      <div className='cerrar-modal'>
        <img 
          src={CerrarBtn} 
          alt="Cerrar modal" 
          onClick={ocultarModal}
        />
      </div>

      <form className={`formulario ${ animarModal ? 'animar' : 'cerrar' }`}>
        <legend>Nuevo Gasto</legend>

        <div className='campo'>
          <label htmlFor="nombre">Nombre Gasto</label>

          <input 
            type="text" 
            placeholder='Añade el Nombre del Gasto'
            name="nombre" 
            id="nombre" 
            value={nombre}
            onChange={ e => setNombre(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor="cantidad">Cantidad</label>

          <input 
            type="number" 
            placeholder='Añade la cantidad del gasto: ej. 300'
            name="cantidad" 
            id="cantidad" 
            value={cantidad}
            onChange={ e => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className='campo'>
          <label htmlFor="categoria">Categoría</label>

          <select 
            name="categoria" 
            id="categoria"
            value={categoria}
            onChange={ e => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value="Añadir Gasto" />
      </form>
    </div>
  )
}

export default Modal