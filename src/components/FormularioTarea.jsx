import { useState, useEffect } from 'react';

function FormularioTarea({ onAgregarTarea, tareaAEditar, onCancelarEdicion }) {
  const estadoInicial = {
    proyecto: '',
    tipoActividad: 'Task',
    estado: 'Pendiente',
    resumen: '',
    descripcion: '',
    prioridad: 'Media',
    informador: '',
    asignado: '',
    precondicion: '',
    fechaCreacion: new Date().toISOString().substring(0, 10),
    fechaCierre: '',
    sprint: ''
  };

  const [formData, setFormData] = useState(estadoInicial);

  // Si se presiona "Editar" en una tarea, llena el formulario con sus datos
  useEffect(() => {
    if (tareaAEditar) {
      setFormData(tareaAEditar);
    } else {
      setFormData(estadoInicial);
    }
  }, [tareaAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.proyecto || !formData.resumen) {
      alert('Por favor complete al menos el Nombre del Proyecto y el Resumen');
      return;
    }
    
    // Mantiene el ID si estamos editando, o crea uno nuevo si es creación
    onAgregarTarea({ ...formData, id: tareaAEditar ? tareaAEditar.id : Date.now() });

    setFormData(estadoInicial);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '20px', color: '#333', textAlign: 'left' }}>
      <h3 style={{ marginTop: 0 }}>{tareaAEditar ? '✏️ Editar Tarea' : '➕ Registrar Nueva Tarea'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        
        <div>
          <label><strong>1. Proyecto*:</strong></label>
          <input type="text" name="proyecto" value={formData.proyecto} onChange={handleChange} required style={{ width: '100%', padding: '6px', marginTop: '4px' }} />
        </div>

        <div>
          <label><strong>2. Tipo de Actividad:</strong></label>
          <select name="tipoActividad" value={formData.tipoActividad} onChange={handleChange} style={{ width: '100%', padding: '6px', marginTop: '4px' }}>
            <option value="Task">Task</option>
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
          </select>
        </div>

        <div>
          <label><strong>3. Estado:</strong></label>
          <select name="estado" value={formData.estado} onChange={handleChange} style={{ width: '100%', padding: '6px', marginTop: '4px' }}>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </div>

        <div>
          <label><strong>4. Prioridad:</strong></label>
          <select name="prioridad" value={formData.prioridad} onChange={handleChange} style={{ width: '100%', padding: '6px', marginTop: '4px' }}>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <label><strong>5. Resumen*:</strong></label>
          <input type="text" name="resumen" value={formData.resumen} onChange={handleChange} required style={{ width: '100%', padding: '6px', marginTop: '4px' }} />
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <label><strong>6. Descripción:</strong></label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} style={{ width: '100%', padding: '6px', marginTop: '4px', height: '50px' }} />
        </div>

        <div>
          <label><strong>7. Informador:</strong></label>
          <input type="text" name="informador" value={formData.informador} onChange={handleChange} style={{ width: '100%', padding: '6px', marginTop: '4px' }} />
        </div>

        <div>
          <label><strong>8. Persona Asignada:</strong></label>
          <input type="text" name="asignado" value={formData.asignado} onChange={handleChange} style={{ width: '100%', padding: '6px', marginTop: '4px' }} />
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <label><strong>9. Precondición:</strong></label>
          <input type="text" name="precondicion" value={formData.precondicion} onChange={handleChange} style={{ width: '100%', padding: '6px', marginTop: '4px' }} />
        </div>

        <div>
          <label><strong>10. Fecha de Creación:</strong></label>
          <input type="date" name="fechaCreacion" value={formData.fechaCreacion} onChange={handleChange} style={{ width: '100%', padding: '6px', marginTop: '4px' }} />
        </div>

        <div>
          <label><strong>11. Fecha de Cierre:</strong></label>
          <input type="date" name="fechaCierre" value={formData.fechaCierre} onChange={handleChange} style={{ width: '100%', padding: '6px', marginTop: '4px' }} />
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <label><strong>12. Sprint:</strong></label>
          <input type="text" name="sprint" placeholder="Ej: Sprint 1" value={formData.sprint} onChange={handleChange} style={{ width: '100%', padding: '6px', marginTop: '4px' }} />
        </div>

      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button type="submit" style={{ padding: '10px 20px', background: tareaAEditar ? '#28a745' : '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {tareaAEditar ? 'Guardar Cambios' : 'Guardar Tarea'}
        </button>

        {tareaAEditar && (
          <button type="button" onClick={onCancelarEdicion} style={{ padding: '10px 20px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cancelar Edición
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioTarea;