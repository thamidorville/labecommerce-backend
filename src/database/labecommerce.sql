-- Active: 1680542749579@@127.0.0.1@3306
--exercicio 2 - a) criar tabela
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL);

    SELECT * FROM users;

    --exercicio 2 - b) - popule a tabela com pelo menos 3 users diferentes
    INSERT INTO users(id, email, password) 
        VALUES("1234", "thami@email.com", "senhamuitoforte01");
        INSERT INTO users(id, email, password) 
        VALUES("4321", "mitha@email.com", "senhamaisoumenosforte02");
        INSERT INTO users(id, email, password) 
            VALUES ("9876", "thathazitcha@email.com", "senhafracamasserve03");

--exercicio 3 - criacao da tabela de produtos 
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    price REAL NOT NULL, 
    category TEXT NOT NULL);

    SELECT * FROM products;

    -- EXERCICIO 3 - b) Populando a tabela de produtos
    -- popule a tabela com pelo menos 5 produtos diferentes
    INSERT INTO products (id, name, price, category) 
    VALUES("1", "farol das estrelas", 550, "macacão");

    INSERT INTO products (id, name, price, category) 
    VALUES("2", "Garota Interestelar", 250, "body");

    INSERT INTO products (id, name, price, category) 
    VALUES("3", "Patrulheira do Espaço", 120, "conjunto");

    INSERT INTO products (id, name, price, category)
    VALUES("4", "Rainha das estrelas", 300, "body");

    INSERT INTO products (id, name, price, category)
    VALUES("5", "Princesa da Lua", 760, "vestido");
