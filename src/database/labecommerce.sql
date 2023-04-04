-- Active: 1680542749579@@127.0.0.1@3306
--exercicio 2 - a) criar tabela
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL);

    SELECT * FROM users;

    -- exercicio 2 - b) - popule a tabela com pelo menos 3 users diferentes
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

--     APROFUNDAMENTO SQL - Exercício 1
-- Simularemos um planejamento de API.
-- Ainda veremos como conectar o Express com o Banco de dados, então por enquanto desenvolva manualmente as queries que no futuro serão ativadas em cada endpoint.

-- Get All Users
-- retorna todos os usuários cadastrados
SELECT * FROM users;

-- Get All Products
-- retorna todos os produtos cadastrados
SELECT * FROM products;

-- Search Product by name
-- crie um termo de busca, por exemplo "monitor"
-- retorna o resultado baseado no termo de busca

SELECT * FROM products
WHERE category LIKE '%body';

SELECT * FROM products
WHERE name LIKE '%estrelas';

-- Create User
-- crie um novo usuário
-- insere o item mockado na tabela users

INSERT INTO users(id, email, password)
VALUES("5678", "mariajoana@email.com", "senhadamariajoana123");

-- Create Product
-- crie um novo produto
-- insere o item mockado na tabela products

INSERT INTO products(id, name, price, category)
VALUES("6", "Imperatriz intergaláctica", 390, "vestido");

-- APROFUNDAMENTO SQL - Exercício 2
-- Mesmo fluxo do exercício 1.

-- Get Products by id
-- busca de produtos por id

SELECT * FROM products
WHERE id = '6';

-- Delete User by id
-- deleção de user por id

DELETE FROM users
WHERE id = '9876';

-- Delete Product by id
-- deleção de produto por id

DELETE FROM products
WHERE id = '6';

-- Edit User by id
-- edição de user por id

SELECT * FROM users;

UPDATE users
SET email = 'joanamaria@email.com', password = 'novasenhadamariajoana321'
WHERE id = '5678';

-- Edit Product by id
-- edição de produto por id

SELECT * FROM products;

UPDATE products
SET name = 'Rainha do Sistema solar', price = 840, category = 'conjunto'
WHERE id = '5'; 

-- Exercício 3
-- Copie as queries do exercício 1 e refatore-as

-- Get All Users
-- retorna o resultado ordenado pela coluna email em ordem crescente

SELECT * FROM users
ORDER BY email ASC;

SELECT id, email 
FROM users
ORDER BY email ASC;

-- Get All Products versão 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item

SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

-- Get All Products versão 2
-- seleção de um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo definido em ordem crescente

SELECT id, name, price FROM products
WHERE price BETWEEN 100.00 and 300.00
ORDER BY price ASC;

SELECT * FROM products
WHERE price BETWEEN 100.00 and 300.00
ORDER BY name ASC;