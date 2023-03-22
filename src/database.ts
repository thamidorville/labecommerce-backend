// Exercício 3
// Com as tipagens desenvolvidas, agora podemos criar alguns dados mock (de mentirinha, mas verdadeiramente estruturados).

// crie o arquivo database.ts dentro da pasta src
// iremos criar um array para cada entidade e exportá-los

import { TUser, TProduct, TPurchase, ROUPASESPACIAIS } from "./types";
// const arrayDeNums2: number[] = [1, 2, 3];
export const users: TUser[] = [

    {id:"1234", name: "Thami", email: "thami@email.com", password: "senhamuitoforte01"},
    {id:"4321", name: "Mitha", email: "mitha@email.com", password: "senhamaisoumenosforte02"},
    {id: "9876", name: "Thatha", email:"thathazitcha@email.com", password:"senhafracamasserve03"},

];
// TYPESCRIPT-II - EXERCICIO 1 Refatore o mock de products no database.ts
// com a mudança acima no type, o array de products no database.ts começará a dar erro
// corrija atribuindo o valor do enum à propriedade category dos objetos
export const products: TProduct[] = [
    {id: "1", name: "farol das estrelas", price: 550, category: ROUPASESPACIAIS.MACACAO },
    {id: "2", name: "Garota Interestelar", price: 250, category: ROUPASESPACIAIS.BODY },
    {id: "3", name: "Patrulheira do Espaço", price: 120, category: ROUPASESPACIAIS.CONJUNTO },
    {id: "4", name: "Rainha das estrelas", price: 300, category: ROUPASESPACIAIS.BODY },

];

export const purchase: TPurchase[] = [
    {userId: "1", productId: "2", quantity: 1, totalPrice: 250},
    {userId: "2", productId: "2", quantity: 2, totalPrice: 500},
    {userId: "3", productId: "3", quantity: 3, totalPrice: 900},

];

//criar novo usuario para a lista users
//input: tres parametros (id, email, password)
//output: frase de sucesso ("Cadastro realizado com sucesso")

type TCreateUser = (id: string, name: string, email: string, password: string) => string

export const createUser: TCreateUser = (id, name, email, password) => {
    const newUser: TUser = {id, name, email, password}
    users.push(newUser)
    console.log(newUser)
    return "Cadastro realizado com sucesso!"
}

// getAllUsers (busca todas as pessoas da lista de users)
// input: nenhum
// output: lista atualizada de users
// exemplo de chamada: getAllUsers()
//tipo de retorno "(): TUser[] =>" retornando um array de objetos do 
//tipo TUser

export const getAllUsers = (): TUser[] => {
    return users
}

type TCreateProduct = ( id: string, name: string, price: number,
    category: ROUPASESPACIAIS) => string // esse retorno de string e: "return "Produto criado com sucesso

    export const createProduct: TCreateProduct = (id, name, price, category) => {
        const newProduct: TProduct = {id, name, price, category}
        products.push(newProduct)
        return "Produto criado com sucesso!"
    }

   export const getAllProducts = (): TProduct[] => {
        return products
    }
    // getProductById (busca por produtos baseado em um id da lista de products)
    // input: um parâmetro (idToSearch)
    // output: o produto encontrado ou undefined
    // exemplo de chamada: getProductById("p004")

    export const getProductById = (idToSearch: string) : TProduct | undefined => {
    const searchProduct = products.find((product) => product.id === idToSearch)
    return searchProduct
    }

//exercicio 3 - desenvolva uma funcao para cada funcionalidade 
// product

// queryProductsByName (busca por produtos baseado em um nome da lista de products)
// input: um parâmetro (q)
// q é a abreviação de query (termo de busca/consulta)
// output: lista de produtos com nomes que contenham o termo de busca
// extra: o resultado da busca deve ser case insensitive
// exemplo de chamada: queryProductsByName("monitor")



      export const queryProductsByName = (q: string) : TProduct [] => {
        const query = q.toLowerCase()
        return products.filter((product) => product.name.toLowerCase().includes(query))
      }

    //   Purchase
    //   createPurchase (cria uma nova compra na lista de purchases)
    //   input: quatro parâmetros (userId, productId, quantity e totalPrice)
    //   output: frase de sucesso ("Compra realizada com sucesso")
    //   exemplo de chamada: createPurchase("u003", "p004", 2, 1600)

        type TCreatePurchase = (userId: string, productId: string, quantity: number, totalPrice: number) => string
        
        export const createPurchase: TCreatePurchase = (userId, productId, quantity, totalPrice) =>  {
            const newPurchase: TPurchase = {userId, productId, quantity, totalPrice}
            purchase.push(newPurchase)
            return "Compra realizada com sucesso!"
        }
    
        // getAllPurchasesFromUserId (busca todas as compras feitas baseado no id do usuário)
        // input: userIdToSearch
        // output: lista atualizada de compras nas quais o userId delas são do userIdToSearch
        // exemplo de chamada: getAllPurchasesFromUserId("u003")

        // export const getProductById = (idToSearch: string) : TProduct | undefined => {
        //     const searchProduct = products.find((product) => product.id === idToSearch)
        //     return searchProduct
        //     }
        
        export const getAllPurchasesFromUserId = (userIdToSearch: string) : TPurchase | undefined => {
                const searchPurchase = purchase.find((purchase) => purchase.userId === userIdToSearch)
                return searchPurchase
        }
           