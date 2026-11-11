CREATE DATABASE chapeco_mais_limpa;
\c chapeco_mais_limpa

DROP TABLE IF EXISTS acao;
DROP TABLE IF EXISTS conteudo;
DROP TABLE IF EXISTS usuario;


CREATE TABLE permissao (
  id BIGINT NOT NULL,
  descricao VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE usuario (
  email VARCHAR(100) NOT NULL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  senha VARCHAR(100) NOT NULL,
  tipo_usuario VARCHAR(100) NOT NULL
);

CREATE TABLE usuario_permissao (
  email VARCHAR(100) NOT NULL,
  id_permissao BIGINT NOT NULL,
  PRIMARY KEY (email, id_permissao),
  CONSTRAINT fk_up_usuario
    FOREIGN KEY (email) REFERENCES usuario(email) ON DELETE CASCADE,
  CONSTRAINT fk_up_permissao
    FOREIGN KEY (id_permissao) REFERENCES permissao(id) ON DELETE CASCADE
);

CREATE TABLE conteudo (
    id SERIAL PRIMARY KEY,
    email_usuario VARCHAR(100) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    titulo VARCHAR(200),
    texto TEXT NOT NULL

    CONSTRAINT fk_conteudo_usuario
        FOREIGN KEY (email_usuario)
        REFERENCES usuario(email)
);


CREATE TABLE acao (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    email_usuario VARCHAR(100) NOT NULL,
    data_acao DATE NOT NULL,
    horario TIME NOT NULL,
    local_acao VARCHAR(200) NOT NULL,
    descricao TEXT NOT NULL,
    foto_url TEXT,
    tags VARCHAR(300)

    CONSTRAINT fk_conteudo_usuario
        FOREIGN KEY (email_usuario)
        REFERENCES usuario(email)
);