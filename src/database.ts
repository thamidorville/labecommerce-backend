// Exercício 3
// Com as tipagens desenvolvidas, agora podemos criar alguns dados mock (de mentirinha, mas verdadeiramente estruturados).

// crie o arquivo database.ts dentro da pasta src
// iremos criar um array para cada entidade e exportá-los

import { TUser, TProduct, TPurchase } from "./types";
// const arrayDeNums2: number[] = [1, 2, 3];
export const users: TUser[] = [

    {id:"1234", name: "Thami", password: "senhamuitoforte01"},
    {id:"4321", name: "Mitha", password: "senhamaisoumenosforte02"},
    {id: "9876", name: "Thatha", password:"senhafracamasserve03"},

];

export const products: TProduct[] = [
    {id: "1", name: "farol das estrelas", price: 550, category: "roupa" },
    {id: "2", name: "Garota Interestelar", price: 250, category: "roupa" },
    {id: "3", name: "Patrulheira do Espaço", price: 120, category: "roupa" },
    {id: "4", name: "Rainha das estrelas", price: 300, category: "roupa" },

];

export const purchase: TPurchase[] = [
    {userId: "1", productId: "2", quantity: 1, totalPrice: 250},
    {userId: "2", productId: "2", quantity: 2, totalPrice: 500},
    {userId: "3", productId: "3", quantity: 3, totalPrice: 900},

];