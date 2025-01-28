-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS apiDocker;

-- Seleccionar la base de datos
USE apiDocker;

-- Cambiar la contraseña del usuario root
ALTER USER 'root'@'%' IDENTIFIED BY 'admi';  -- Cambia 'admi' por la contraseña que prefieras

-- Refrescar los privilegios
FLUSH PRIVILEGES;
