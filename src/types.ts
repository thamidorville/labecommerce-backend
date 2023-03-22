// EXERCICIO 2

//Agora que temos uma aplicação typescript configurada, podemos criar tipagens para nossos dados.
// No projeto Labecommerce temos 3 entidades:

// user
// É a pessoa cliente cadastrada.

// id (string)
// email (string)
// password (string)
// product
// É o produto cadastrado.

// id (string)
// name (string)
// price (number)
// category (string)
// purchase
// É a compra realizada por cliente.

// userId (string)
// productId (string)
// quantity (number)
// totalPrice (number)
// Crie tipagens para cada uma das entidades acima
// lembre-se de referenciar o material assíncrono
// crie um arquivo dentro da pasta src chamado de types.ts
// coloque o código das tipagens dentro do types.ts e exporte-as

export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string,

}
// typescript-ii exercicio 1. Vamos refatorar nosso type de product para utilizar enum na propriedade category.

export enum ROUPASESPACIAIS {
    VESTIDO = "vestido",
    MACACAO = "macacao",
    BODY = "body",
    CONJUNTO = "conjunto"
}


export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: ROUPASESPACIAIS,
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number,
}

