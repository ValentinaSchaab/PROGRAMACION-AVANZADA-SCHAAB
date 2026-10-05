import { useState, useEffect } from 'react';
import FormularioTarea from './components/FormularioTarea';
import ListadoTareas from './components/ListadoTareas';
import './App.css';

const API_URL = 'http://localhost:3002/tasks';

function App() {
  const [tareas, setTareas] = useState([]);
  const [tareaAEditar, setTareaAEditar] = useState(null);
  const [cargando, setCargando] = useState(true);

  // 1. Cargar tareas desde el Backend (PostgreSQL)
  const cargarTareas = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setTareas(data);
      }
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  // 2. Guardar (Crear nueva o Actualizar existente)
  const handleGuardarTarea = async (tareaData) => {
    try {
      if (tareaAEditar) {
        // Editar existente (PUT)
        const res = await fetch(`${API_URL}/${tareaData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tareaData),
        });
        if (res.ok) {
          setTareaAEditar(null);
          cargarTareas();
        }
      } else {
        // Crear nueva (POST)
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tareaData),
        });
        if (res.ok) {
          cargarTareas();
        }
      }
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

  const handleEditarTarea = (tarea) => {
    setTareaAEditar(tarea);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarEdicion = () => {
    setTareaAEditar(null);
  };

  // 3. Eliminar tarea (DELETE)
  const handleEliminarTarea = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (tareaAEditar && tareaAEditar.id === id) {
          setTareaAEditar(null);
        }
        cargarTareas();
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  // 4. Cambiar estado de la tarea (PUT)
  const handleCambiarEstado = async (id, nuevoEstado) => {
    const tareaExistente = tareas.find(t => t.id === id);
    if (!tareaExistente) return;

    const tareaActualizada = { ...tareaExistente, estado: nuevoEstado };
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tareaActualizada),
      });
      if (res.ok) {
        cargarTareas();
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#007bff' }}>📌 Gestor de Tareas de Proyectos (TP5)</h1>
        <p style={{ color: '#666' }}>Programación Avanzada - UADER (React + PostgreSQL + Docker)</p>
      </header>

      <main>
        <FormularioTarea 
          onAgregarTarea={handleGuardarTarea} 
          tareaAEditar={tareaAEditar}
          onCancelarEdicion={handleCancelarEdicion}
        />

        {cargando ? (
          <p style={{ textAlign: 'center' }}>⏳ Conectando con PostgreSQL...</p>
        ) : (
          <ListadoTareas 
            tareas={tareas} 
            onEliminarTarea={handleEliminarTarea} 
            onCambiarEstado={handleCambiarEstado} 
            onEditarTarea={handleEditarTarea}
          />
        )}
      </main>
    </div>
  );
}

export default App;