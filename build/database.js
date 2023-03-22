"use strict";
// Exercício 3
// Com as tipagens desenvolvidas, agora podemos criar alguns dados mock (de mentirinha, mas verdadeiramente estruturados).
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchase = exports.products = exports.users = void 0;
// crie o arquivo database.ts dentro da pasta src
// iremos criar um array para cada entidade e exportá-los
const types_1 = require("./types");
// const arrayDeNums2: number[] = [1, 2, 3];
exports.users = [
    { id: "1234", name: "Thami", email: "thami@email.com", password: "senhamuitoforte01" },
    { id: "4321", name: "Mitha", email: "mitha@email.com", password: "senhamaisoumenosforte02" },
    { id: "9876", name: "Thatha", email: "thathazitcha@email.com", password: "senhafracamasserve03" },
];
// TYPESCRIPT-II - EXERCICIO 1 Refatore o mock de products no database.ts
// com a mudança acima no type, o array de products no database.ts começará a dar erro
// corrija atribuindo o valor do enum à propriedade category dos objetos
exports.products = [
    { id: "1", name: "farol das estrelas", price: 550, category: types_1.ROUPASESPACIAIS.MACACAO },
    { id: "2", name: "Garota Interestelar", price: 250, category: types_1.ROUPASESPACIAIS.BODY },
    { id: "3", name: "Patrulheira do Espaço", price: 120, category: types_1.ROUPASESPACIAIS.CONJUNTO },
    { id: "4", name: "Rainha das estrelas", price: 300, category: types_1.ROUPASESPACIAIS.BODY },
];
exports.purchase = [
    { userId: "1", productId: "2", quantity: 1, totalPrice: 250 },
    { userId: "2", productId: "2", quantity: 2, totalPrice: 500 },
    { userId: "3", productId: "3", quantity: 3, totalPrice: 900 },
];
const createUser = (id, name, email, password) => {
    const newUser = { id, name, email, password };
    exports.users.push(newUser);
    console.log(newUser);
    return "Cadastro realizado com sucesso!";
};
exports.createUser = createUser;
// getAllUsers (busca todas as pessoas da lista de users)
// input: nenhum
// output: lista atualizada de users
// exemplo de chamada: getAllUsers()
//tipo de retorno "(): TUser[] =>" retornando um array de objetos do 
//tipo TUser
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, price, category) => {
    const newProduct = { id, name, price, category };
    exports.products.push(newProduct);
    return "Produto criado com sucesso!";
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
// getProductById (busca por produtos baseado em um id da lista de products)
// input: um parâmetro (idToSearch)
// output: o produto encontrado ou undefined
// exemplo de chamada: getProductById("p004")
const getProductById = (idToSearch) => {
    const searchProduct = exports.products.find((product) => product.id === idToSearch);
    return searchProduct;
};
exports.getProductById = getProductById;
//exercicio 3 - desenvolva uma funcao para cada funcionalidade 
// product
// queryProductsByName (busca por produtos baseado em um nome da lista de products)
// input: um parâmetro (q)
// q é a abreviação de query (termo de busca/consulta)
// output: lista de produtos com nomes que contenham o termo de busca
// extra: o resultado da busca deve ser case insensitive
// exemplo de chamada: queryProductsByName("monitor")
const queryProductsByName = (q) => {
    const query = q.toLowerCase();
    return exports.products.filter((product) => product.name.toLowerCase().includes(query));
};
exports.queryProductsByName = queryProductsByName;
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = { userId, productId, quantity, totalPrice };
    exports.purchase.push(newPurchase);
    return "Compra realizada com sucesso!";
};
exports.createPurchase = createPurchase;
// getAllPurchasesFromUserId (busca todas as compras feitas baseado no id do usuário)
// input: userIdToSearch
// output: lista atualizada de compras nas quais o userId delas são do userIdToSearch
// exemplo de chamada: getAllPurchasesFromUserId("u003")
// export const getProductById = (idToSearch: string) : TProduct | undefined => {
//     const searchProduct = products.find((product) => product.id === idToSearch)
//     return searchProduct
//     }
const getAllPurchasesFromUserId = (userIdToSearch) => {
    const searchPurchase = exports.purchase.find((purchase) => purchase.userId === userIdToSearch);
    return searchPurchase;
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
