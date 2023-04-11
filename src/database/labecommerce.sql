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

-- RELAÇÕES SQL - I - EXERCÍCIO 1
-- criar a tabela de pedidos (purchases).

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL DEFAULT 0,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

-- RELAÇÕES SQL - I - EXERCÍCIO 2
-- Popular tabela
-- a) Crie dois pedidos para cada usuário cadastrado
-- No mínimo 4 no total (ou seja, pelo menos 2 usuários diferentes) 
-- e devem iniciar com a data de entrega nula.

INSERT INTO purchases(
    id, total_price, paid, delivered_at, buyer_id
) VALUES
    ('1', 550.00, 0, NULL, '1234'),
    ('2', 250.00, 0, NULL, '1234'),
    ('3', 120.00, 0, NULL, '4321'),
    ('4', 300.00, 0, NULL, '4321');
    
SELECT * FROM purchases;
-- b) Edite o status da data de entrega de um pedido
-- Simule que o pedido foi entregue no exato momento da sua edição 
--(ou seja, data atual).
    UPDATE purchases
    SET delivered_at = DATETIME('now') --SET para alterar o valor da coluna delivered_at
    WHERE id = '2';            

-- RELAÇÕES SQL - I - EXERCÍCIO 2
-- Crie a query de consulta utilizando junção para simular um endpoint de 
-- histórico de compras de um determinado usuário.
-- Mocke um valor para a id do comprador, ela deve ser uma das que 
-- foram utilizadas no exercício 2.

SELECT purchases.id,
purchases.total_price,
purchases.paid,
purchases.delivered_at,
users.id FROM purchases
JOIN users 
ON purchases.buyer_id = users.id -- junta a a coluna buyer_id da tabela
-- purchases com a coluna i da tabela users
WHERE purchases.buyer_id = '1234';

-- RELAÇÕES SQL - II - EXERCÍCIO 1

-- implementar a tabela de relações entre produtos e pedidos.
-- Criação da tabela de relações
-- nome da tabela: purchases_products
-- colunas da tabela:
-- purchase_id (TEXT e obrigatório, não deve ser único)
-- product_id (TEXT e obrigatório, não deve ser único)
-- quantity (INTEGER e obrigatório, não deve ser único)

CREATE TABLE purchases_products
(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- RELAÇÕES SQL - II - Exercício 2
-- Com a tabela de relações criada podemos finalmente
-- realizar compras no banco de dados!

-- Inserção dos dados
-- Popule sua tabela purchases_products simulando 3 compras de clientes.

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
(
    '1', '2', 1
),
(
    '4', '1', 2
),
(
    '3', '5', 3
);

-- o id de pedido 1, com o id do produto 2, 1 (uma fantasia)
-- o pedido de id 4, comprou o produto de id 1, 2 (duas fantasias)
-- o pedido de id 3, comprou o produto de id 5, 3 (tres fantasias)

--EXERCÍCIO 2.1

-- Consulta com junção INNER JOIN
-- Mostre em uma query todas as colunas das 
-- tabelas relacionadas (purchases_products, purchases e products).

SELECT 

purchases.id AS IdDoPedido,
purchases.total_price AS TotalDoPedido,
purchases.paid,
purchases.delivered_at,
purchases.buyer_id,
products.id AS IdDoProduto,
products.name AS nomeDoProduto,
products.price AS valorDoProduto,
products.category AS categoriaDoProduto

FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;

            --                     Exercício 2
            -- Apague as tabelas SQL de users, products e purchases 
            -- SELECT * FROM users;
            DROP TABLE users;
            DROP TABLE products;
            DROP TABLE purchases;


            --e as crie novamente apenas com as colunas descritas abaixo 
             --(são as mesmas colunas que estão nos requisitos finais do projeto).
            
           
            
            -- Em seguida, refatore (ou recrie) os seguintes endpoints: INDEX.TS
            