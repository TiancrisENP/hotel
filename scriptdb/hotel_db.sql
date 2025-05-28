-- Crear base de datos
CREATE DATABASE IF NOT EXISTS hotel_db;
USE hotel_db;

-- Tabla de habitaciones
CREATE TABLE IF NOT EXISTS habitaciones (
  codigo INT AUTO_INCREMENT PRIMARY KEY,
  numero VARCHAR(10) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  valor DECIMAL(10, 2) NOT NULL
);

-- Tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
  codigo INT AUTO_INCREMENT PRIMARY KEY,
  codigo_habitacion INT,
  nombre_cliente VARCHAR(100) NOT NULL,
  telefono_cliente VARCHAR(20) NOT NULL,
  fecha_reservacion DATE NOT NULL,
  fecha_entrada DATE NOT NULL,
  fecha_salida DATE NOT NULL,
  FOREIGN KEY (codigo_habitacion) REFERENCES habitaciones(codigo) ON DELETE CASCADE
);

INSERT INTO habitaciones (numero, tipo, valor) VALUES 
('101', 'Doble', 250000),
('102', 'Sencilla', 180000),
('103', 'Suite', 400000);
INSERT INTO habitaciones (numero, tipo, valor) VALUES 
('201', 'Sencilla', 150000),
('202', 'Doble', 220000),
('203', 'Suite', 350000),
('204', 'Familiar', 280000),
('205', 'Ejecutiva', 320000);

INSERT INTO reservas (
  codigo_habitacion, nombre_cliente, telefono_cliente, 
  fecha_reservacion, fecha_entrada, fecha_salida
) VALUES
(201, 'Carlos Ramírez', '3001234567', '2025-05-27', '2025-06-01', '2025-06-05'),
(202, 'Ana Torres', '3117654321', '2025-05-26', '2025-06-02', '2025-06-04'),
(101, 'Luis Pardo', '3128899001', '2025-05-25', '2025-06-03', '2025-06-07'),
(205, 'Mariana López', '3102233445', '2025-05-25', '2025-06-05', '2025-06-10');

truncate table reservas;



