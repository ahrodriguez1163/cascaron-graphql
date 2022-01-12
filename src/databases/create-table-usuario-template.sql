CREATE TABLE usuario(
  "user" varchar(255) NOT NULL primary key,
  name varchar(255),
  email varchar(255),
  movile varchar(255),
  phone varchar(255),
  pass varchar(255),
  token VARCHAR (255),
  active BOOLEAN DEFAULT true,
  social VARCHAR [],
  role INTEGER NOT NULL,
  last_login DATE,
  create_time DATE,
  update_time DATE
);
DROP TABLE usuario;
COMMENT ON TABLE usuario IS 'almacena los usuarios que trabajan con la aplicacion';
COMMENT ON COLUMN [table].[column] IS '[comment]';