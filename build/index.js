"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Tudo funcionando!");
//EXERCICIO 3
//Vá para o index.ts e importe as constantes users, products e purchases. Coloque um 
//console.log para cada e rode a aplicação com o script de start para ver se deu tudo certo!
const database_1 = require("./database");
const types_1 = require("./types");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
console.log("TUsers:", database_1.users);
console.log("TProducts:", database_1.products);
console.log("TPurchase:", database_1.purchase);
//Chame cada uma no index.ts
// e verifique se estão funcionando dando console.log.
console.log((0, database_1.createUser)("5987", "Carochinha", "carochinha@email.com", "carochinha0123"));
console.log((0, database_1.getAllUsers)());
console.log((0, database_1.createProduct)("5", "Princesa da Lua", 760, types_1.ROUPASESPACIAIS.VESTIDO));
console.log((0, database_1.getAllProducts)());
console.log((0, database_1.getProductById)("3"));
console.log((0, database_1.getProductById)("93939393"));
console.log((0, database_1.queryProductsByName)("Patrulheira do Espaço"));
console.log((0, database_1.queryProductsByName)("lua"));
console.log((0, database_1.createPurchase)("4", "4", 3, 1000));
console.log((0, database_1.getAllPurchasesFromUserId)("2"));
//API e express
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("servidor rodando");
});
//exercicio 1. crie um endpoint de teste
app.get('/ping', (req, res) => {
    res.send("Pong!");
});
//exercicio 2. crie endpoints para a manipulacao dos dados do arquivo database.ts
//getAllUsers
app.get('/users', (req, res) => {
    res.status(200).send(database_1.users);
});
//getAllProducts
app.get('/products', (req, res) => {
    res.status(200).send(database_1.products);
});
//search product by name
app.get('products/search', (req, res) => {
    const q = req.query.q;
    const productsFilter = database_1.products.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()));
    res.status(200).send(productsFilter);
});
