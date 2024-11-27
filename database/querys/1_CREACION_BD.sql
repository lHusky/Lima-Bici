DROP DATABASE lima_bici;
CREATE DATABASE lima_bici CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE lima_bici;

CREATE TABLE tipo_Objetivo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100)
);

CREATE TABLE estado_objetivo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100)
);

CREATE TABLE tipo_PuntoInteres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
);

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL UNIQUE,
    fechaCumple DATE,
    fotoPerfil VARCHAR(400),
    contrasena VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    peso DECIMAL(5,2),
    estadoSesion BIT DEFAULT 0,
    estadoRecorrido BIT DEFAULT 0,
    verificationCode VARCHAR(10),
    verificationCodeExpires TIMESTAMP,
    tipo_usuario VARCHAR(10)
);

CREATE TABLE objetivo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    id_tipo INT,
    FOREIGN KEY (id_tipo) REFERENCES tipo_Objetivo(id) ON DELETE CASCADE
);

CREATE TABLE sesion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    velocidad_promedio DECIMAL(10, 2) DEFAULT 0,
    calorias_quemadas DECIMAL(10, 2) DEFAULT 0,
    km_recorridos DECIMAL(10, 2) DEFAULT 0,   
    fechaInicio DATE,  
    fechaFin DATE,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE ruta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    duracion DECIMAL(5,2),
    distancia DECIMAL(10, 2),
    nombre VARCHAR(255),
    descripcion VARCHAR(300),
    id_creador INT,
    fechaInicio DATE,
    fechaFin DATE,
    horaInicio TIME,
    horaFin TIME,
    FOREIGN KEY (id_creador) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE punto_interes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    horario VARCHAR(100),
    img_referencial VARCHAR(400),
    direccion VARCHAR(255),
    descripcion VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    id_tipo INT,
    id_creador INT,
    FOREIGN KEY (id_creador) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo) REFERENCES tipo_PuntoInteres(id) ON DELETE CASCADE
);
CREATE TABLE coordenada (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden INT,
    latitud DECIMAL(10, 6) NOT NULL,
    longitud DECIMAL(10, 6) NOT NULL,
    id_ruta INT NULL,
    id_punto_interes INT NULL,
    FOREIGN KEY (id_ruta) REFERENCES ruta(id) ON DELETE CASCADE,
    FOREIGN KEY (id_punto_interes) REFERENCES punto_interes(id) ON DELETE CASCADE,
    CONSTRAINT chk_coordenada_relacion CHECK (
        (id_ruta IS NOT NULL AND id_punto_interes IS NULL) OR
        (id_ruta IS NULL AND id_punto_interes IS NOT NULL)
    )
);

CREATE TABLE usuario_objetivo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    duracion DECIMAL(5, 2),
    progreso  DECIMAL(5, 4) NOT NULL DEFAULT 0,
    id_usuario INT,
    id_objetivo INT,
    id_estado_objetivo INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_objetivo) REFERENCES objetivo(id) ON DELETE CASCADE,
    FOREIGN KEY (id_estado_objetivo) REFERENCES estado_objetivo(id) ON DELETE CASCADE
);
CREATE TABLE usuario_ruta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    progreso DECIMAL(5, 4) NOT NULL DEFAULT 0,
    fecha_inicio DATE NOT NULL,
    flg_desvio BOOLEAN  NOT NULL DEFAULT 0,
    flg_finalizo BOOLEAN  NOT NULL DEFAULT 0,
    id_ruta INT,
    id_usuario INT,
    FOREIGN KEY (id_ruta) REFERENCES ruta(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_agregado DATE NOT NULL,
    descripcion VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    icon_favorito VARCHAR(300),
    id_usuario INT,
    id_ruta INT,
    id_punto_interes INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_ruta) REFERENCES ruta(id) ON DELETE CASCADE,
    FOREIGN KEY (id_punto_interes) REFERENCES punto_interes(id) ON DELETE CASCADE
);

INSERT INTO tipo_PuntoInteres (titulo) VALUES ('🏠 Casa');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('📚 Universidad');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('💼 Trabajo');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('🌳 Parque');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('🍽️ Restaurante');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('☕ Cafeteria');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('🛒 Supermercado');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('🛍️ Tienda');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('🚲 Tienda de Bicicletas');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('🅿️ Estacionamiento de Bicicletas');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('🤝 Alquiler de Bicicletas');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('🏋️‍♀️ Gimnasio');
INSERT INTO tipo_PuntoInteres (titulo) VALUES ('Otro');

INSERT INTO usuario (nombre, email, telefono, contrasena,tipo_usuario) VALUES ("admin", "admin@", "123456", "123456","admin");
