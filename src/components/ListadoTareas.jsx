function ListadoTareas({ tareas, onEliminarTarea, onCambiarEstado, onEditarTarea }) {
  if (tareas.length === 0) {
    return (
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ccc', color: '#666', textAlign: 'center' }}>
        <p>📂 No hay tareas registradas. Utilizá el formulario para agregar la primera.</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ccc', color: '#333', textAlign: 'left' }}>
      <h3 style={{ marginTop: 0 }}>📋 Lista de Tareas ({tareas.length})</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {tareas.map((tarea) => (
          <div 
            key={tarea.id} 
            style={{ 
              borderLeft: `6px solid ${tarea.estado === 'Finalizada' ? '#28a745' : tarea.estado === 'En Proceso' ? '#ffc107' : '#dc3545'}`,
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
              borderLeftWidth: '6px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>📌 [{tarea.proyecto}] - {tarea.resumen}</h4>
              <span style={{ 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: 'bold',
                color: '#fff',
                background: tarea.estado === 'Finalizada' ? '#28a745' : tarea.estado === 'En Proceso' ? '#ffc107' : '#dc3545'
              }}>
                {tarea.estado}
              </span>
            </div>

            <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
              <strong>Descripción:</strong> {tarea.descripcion || 'Sin descripción'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '13px', margin: '10px 0', background: '#fff', padding: '8px', borderRadius: '4px' }}>
              <div><strong>Tipo:</strong> {tarea.tipoActividad}</div>
              <div><strong>Prioridad:</strong> {tarea.prioridad}</div>
              <div><strong>Sprint:</strong> {tarea.sprint || 'N/A'}</div>
              <div><strong>Asignado:</strong> {tarea.asignado || 'Sin asignar'}</div>
              <div><strong>Informador:</strong> {tarea.informador || 'N/A'}</div>
              <div><strong>Creación:</strong> {tarea.fechaCreacion}</div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button 
                onClick={() => onEditarTarea(tarea)}
                style={{ padding: '6px 12px', background: '#17a2b8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                ✏️ Editar
              </button>

              {tarea.estado !== 'Finalizada' && (
                <button 
                  onClick={() => onCambiarEstado(tarea.id, 'Finalizada')}
                  style={{ padding: '6px 12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  ✅ Finalizar
                </button>
              )}

              {tarea.estado === 'Pendiente' && (
                <button 
                  onClick={() => onCambiarEstado(tarea.id, 'En Proceso')}
                  style={{ padding: '6px 12px', background: '#ffc107', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                >
                  ⏳ En Proceso
                </button>
              )}

              <button 
                onClick={() => onEliminarTarea(tarea.id)}
                style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListadoTareas;