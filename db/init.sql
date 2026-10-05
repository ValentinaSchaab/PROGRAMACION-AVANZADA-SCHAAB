CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  proyecto VARCHAR(255) NOT NULL,
  tipo_actividad VARCHAR(50) DEFAULT 'Task',
  estado VARCHAR(50) DEFAULT 'Pendiente',
  resumen VARCHAR(255) NOT NULL,
  descripcion TEXT,
  prioridad VARCHAR(50) DEFAULT 'Media',
  informador VARCHAR(100),
  asignado VARCHAR(100),
  precondicion TEXT,
  fecha_creacion DATE DEFAULT CURRENT_DATE,
  fecha_cierre DATE,
  sprint VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tarea inicial de prueba
INSERT INTO tasks (proyecto, tipo_actividad, estado, resumen, descripcion, prioridad, informador, asignado, precondicion, fecha_creacion, sprint)
VALUES ('Sistema ERP', 'Task', 'En Proceso', 'Configurar conexión PostgreSQL', 'Crear tablas e integrar Docker Compose.', 'Alta', 'Ernesto', 'Valentina', 'Docker instalado', '2026-10-01', 'Sprint 1');