"use strict";
// Exercício 3
// Com as tipagens desenvolvidas, agora podemos criar alguns dados mock (de mentirinha, mas verdadeiramente estruturados).
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
// const arrayDeNums2: number[] = [1, 2, 3];
exports.users = [
    { id: "1234", name: "Thami", password: "senhamuitoforte01" },
    { id: "4321", name: "Mitha", password: "senhamaisoumenosforte02" },
    { id: "9876", name: "Thatha", password: "senhafracamasserve03" },
];
exports.products = [
    { id: "1", name: "farol das estrelas", price: 550, category: "roupa" },
    { id: "2", name: "Garota Interestelar", price: 250, category: "roupa" },
    { id: "3", name: "Patrulheira do Espaço", price: 120, category: "roupa" },
    { id: "4", name: "Rainha das estrelas", price: 300, category: "roupa" },
];
exports.purchase = [
    { userId: "1", productId: "2", quantity: 1, totalPrice: 250 },
    { userId: "2", productId: "2", quantity: 2, totalPrice: 500 },
    { userId: "3", productId: "3", quantity: 3, totalPrice: 900 },
];
