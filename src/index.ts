console.log("Tudo funcionando!")
//EXERCICIO 3
//Vá para o index.ts e importe as constantes users, products e purchases. Coloque um 
//console.log para cada e rode a aplicação com o script de start para ver se deu tudo certo!
import { users, products, purchase, createUser, getAllUsers, getAllProducts, createProduct, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId,  } from "./database";
import { ROUPASESPACIAIS } from "./types";

console.log("TUsers:", users);
console.log("TProducts:", products)
console.log("TPurchase:", purchase)

//Chame cada uma no index.ts
// e verifique se estão funcionando dando console.log.

console.log(createUser("5987", "Carochinha", "carochinha@email.com", "carochinha0123"))
console.log(getAllUsers())
console.log(createProduct("5","Princesa da Lua", 760, ROUPASESPACIAIS.VESTIDO))
console.log(getAllProducts())
console.log(getProductById("3"))
console.log(getProductById("93939393"))
console.log(queryProductsByName("Patrulheira do Espaço"))
console.log(queryProductsByName("lua"))
console.log(createPurchase("4", "4", 3, 1000))
console.log(getAllPurchasesFromUserId("2"))