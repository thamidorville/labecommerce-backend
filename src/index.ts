console.log("Tudo funcionando!")
//EXERCICIO 3
//Vá para o index.ts e importe as constantes users, products e purchases. Coloque um 
//console.log para cada e rode a aplicação com o script de start para ver se deu tudo certo!
import { users, products, purchase, createUser, getAllUsers, getAllProducts, createProduct, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId,  } from "./database";
import { ROUPASESPACIAIS, TProduct, TPurchase, TUser } from "./types";
import express, {Request, Response} from 'express'
import cors from 'cors'
import { db } from "./database/knex";

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

//API e express

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
console.log("servidor rodando")
})

//APIS e Express exercicio 1. crie um endpoint de teste
app.get('/ping', (req:Request, res:Response) => {
    res.send("Pong!")
})
//APIS e express exercicio 2. crie endpoints para a manipulacao dos dados do arquivo database.ts

//getAllUsers


                    // INTRO-KNEX - EXERCÍCIO 1
                    // REFATORE OS SEGUINTES ENDPOINTS
                    //GET ALL USERS

                    //APROFUNDANDO KNEX - EXERCÍCIO 1
                    //Refatore pelo menos 3 endpoints que você fez em raw para query builder

    app.get('/users', async (req:Request, res:Response) => {
    try {

        // const result = await db.raw(`SELECT * FROM users`)


            const result = await db.select("*").from("users")

        res.status(200).send(users)
    } catch (error) {
        res.status(500).send("erro ao carregar os usuários.")
    }
})
                            // INTRO-KNEX - EXERCÍCIO 1
                            // REFATORE OS SEGUINTES ENDPOINTS
                            //GET ALL PRODUCTS
//getAllProducts

                    //APROFUNDANDO KNEX - EXERCÍCIO 1
                    //Refatore pelo menos 3 endpoints que você fez em raw para query builder
app.get('/products', async (req:Request, res:Response) => {
    try {
        // const result = await db.raw(`SELECT * FROM products`)

                const result = await db("products")

        res.status(200).send(products)
    } catch (error) {
        res.status(500).send("erro ao carregar os produtos.")
    }
})

//search product by name
//exercicio 1 - fluxo de dados em back end
//query params deve possuir pelo menos 1 caractere


                            // INTRO-KNEX - EXERCÍCIO 1
                            // REFATORE OS SEGUINTES ENDPOINTS
                            //SEARCH PRODUCT BY NAME

        // APROFUNDANDO KNEX - Exercício 1
        //Refatore pelo menos 3 endpoints que você fez em raw para query builder.

app.get('/products/search', async (req:Request, res:Response)=>{
  try {
    const q = req.query.q as string

    if(!q || q.length === 0){
        throw new Error("parâmetro deve possuir pelo menos um caractere")
    }

    // const productsFilter = products.filter((product) => 
    // product.name.toLowerCase().includes(q.toLowerCase())
    // )
//  const productsFilter = await db.raw(`SELECT * FROM products WHERE (name) LIKE '%${q.toLowerCase()}%'`);

                const productsFilter = await db("products").where("name", "LIKE", `%${q.toLowerCase()}%'`)
       

    res.status(200).send(productsFilter)
  } catch (error) {
    if(error instanceof Error){ 
        res.status(400).send(error.message)
    }else {
        res.status(400).send("erro desconhecido!")
    }
   
  }
})
//create user
//exercicio 1 - fluxo de dados back end
//validar o body
//nao deve ser possivel criar mais de uma conta com a mesma id
//nao deve ser possivel criar mais de uma conta com o mesmo email

// app.post('/users', (req:Request, res:Response) => {
//  try {
//     const id = req.body.id
//     const name = req.body.name
//     const email = req.body.email
//     const password = req.body.password

//     const newUser: TUser = {
//         id, 
//         name,
//         email, 
//         password
//     }


//     if(!id || !name || !email || !password){
//         throw new Error("Preenchimento de todos os campos são obrigatórios.")
//     }

//     const verificarUsuarioComMesmoId = users.find((user) => user.id === id)
//     if(verificarUsuarioComMesmoId){
//         throw new Error("Já existe um usuário com este id.")
//     }
//     const emailRepetido = users.find((user) => user.email === email)
//     if(emailRepetido){
//         throw new Error("Já existe um usuário com este email.")
//     }

//     users.push(newUser)
//     res.status(201).send("Cadastro realizado com sucesso!")


// } catch (error) {
//     if (error instanceof Error) {
//         res.status(400).send(error.message);
//     } else {
//         console.error(error);
//         res.status(500).send("Erro interno do servidor");
//     }
//  }
// })


                        //INTRO-KNEX EXERCÍCIO 2
                    //Em seguida, refatore (ou recrie) os seguintes endpoints:

// Create User
// method HTTP (POST)
// path ("/users")
// body
// id
// name
// email
// password
// createdAt
// response
// status 201
// "Cadastro realizado com sucesso"

        app.post("/create-table-users", async (req:Request, res:Response) => {
            try {
        
            await db.raw(`
            CREATE TABLE users (
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                createdAt TEXT NOT NULL);
            `)
             res.status(200).send("Cadastro realizado com sucesso!")
            } catch (error) {
                if (error instanceof Error) {
                    res.status(400).send(error.message);
                } else {
                    console.error(error);
                    res.status(500).send("Erro interno do servidor");
                }
             }
    
    })


//create product
// exercicio 1 - fluxo de dados back end
//validar o body
// não deve ser possível criar mais de um produto com a mesma id

// app.post('/products', (req:Request, res:Response) => {
//     try {
//     const id = req.body.id
//     const name = req.body.name
//     const price = req.body.price
//     const category = req.body.category

//     const newProduct: TProduct = {
//         id, 
//         name, 
//         price, 
//         category
//     }

//     if (!id || !name || !price || !category){
//         throw new Error("Todos os campos devem ser preenchidos obrigatoriamente!")
//     }
//     const produtoComIdRepetida = products.find((product) => product.id === id)
//     if(produtoComIdRepetida){
//         throw new Error("Produto com id repetida.")
//     }
//     products.push(newProduct)
//     res.status(201).send("Produto cadastrado com sucesso!")
//     } catch (error) {
//         if(error instanceof Error){
//             res.status(400).send(error.message)
//         } else {
//             res.status(400).send("erro desconhecido.")
//         }
        
//     }
// })

                        //INTRO-KNEX - EXERCÍCIO 2

                        // Create Product
                        // method HTTP (POST)
                        // path ("/products")
                        // body
                        // id
                        // name
                        // price
                        // description
                        // imageUrl
                        // response
                        // status 201
                        // "Produto cadastrado com sucesso"

        app.post("/create-table/products", async (req:Request, res:Response) => {
            
            try {
               await db.raw(`
                CREATE TABLE products(
                id TEXT PRIMARY KEY NOT NULL, 
                name TEXT NOT NULL,
                price REAL NOT NULL,
                description TEXT NOT NULL,
                imageUrl TEXT NOT NULL
               `);
                        res.status(201).send("Produto cadastrado com sucesso!")
            } catch (error) {
                if(error instanceof Error){
                                res.status(400).send(error.message)
                            } else {
                                res.status(400).send("erro desconhecido.")
                            }
                            
                        }

        })



//create purchase
//exercicio 1 - fluxo de dados back end
//validar o body 
// - id do usuário que fez a compra deve existir no array de usuários cadastrados
// - id do produto que foi comprado deve existir no array de produtos cadastrados
// - a quantidade e o total da compra devem estar com o cálculo correto



                            //INTRO-KNEX EXERCÍCIO 2
                            //CREATE PURCHASE
//                             Create Purchase
// method HTTP (POST)

// path ("/purchases")

// body

// id
// buyer
// totalPrice
// createdAt
// paid
// response

// status 201
// "Compra cadastrada com sucesso"
            
// app.post('/purchases', (req:Request, res:Response) => {
//     try {
//     const userId = req.body.id
//     const productId = req.body.id
//     const quantity = req.body.quantity
//     const totalPrice = req.body.totalPrice

//     const newPurchase: TPurchase = {
//         userId,
//         productId,
//         quantity,
//         totalPrice
//     }

//     const idProdutoComprado = products.find((product) => product.id === productId)
//     const usuarioComprador = users.find((user) => user.id === userId)

//         if(!idProdutoComprado){
//             throw new Error("produto não encontrado.")
//         }
//         if(!usuarioComprador){
//             throw new Error("usuário não encontrado.")
//         }
//         if(!quantity || quantity < 1){
//             throw new Error("Quantidade inválida.")
//         }
//         const precoTotal = quantity * productId.price
    
//     purchase.push(newPurchase)


app.post("/create-table-purchases", async (req:Request, res: Response)=>{
    try {

        await db.raw(`
        
            CREATE TABLE purchases(
            id TEXT PRIMARY KEY NOT NULL,
            buyer TEXT NOT NULL,
            totalPrice REAL NOT NULL,
            createdAt TEXT NOT NULL,
            paid INTEGER NOT NULL,
            FOREIGN KEY (buyer) REFERENCES users(id)
        
        `)
                res.status(201).send("Compra cadastrada com sucesso!")

        
    } catch (error) {
        if(error instanceof Error){
            res.status(400).send(error.message)
        } else {
            res.status(400).send("erro desconhecido.")
        }
    }
    })
// })
//     res.status(201).send("Compra cadastrada com sucesso!")
//     } catch (error) {
        
// })

//APROFUNDAMENTO EXPRESS 

//EXERCICIO 1

//Get Products by id

// FLUXO DE DADOS BACK END EXERCICIO 2
//VALIDAR QUE O PRODUTO EXISTE


                        //INTRO-KNEX EXERCÍCIO 3
                        // GET PRODUCTS BY ID

app.get('/products/:id', async (req:Request, res:Response) => {

   try {
    const id = req.params.id
    // const result = products.find((product) => product.id === id)

        const result = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}"

        `);
    if(!result){
        throw new Error("Produto não encontrado.")
    }
    // res.status(200).send(`Produto encontrado!', ${JSON.stringify(result)}`)
    res.status(200).send("objeto encontrado do arquivo .db")
    
   } catch (error) {
    if(error instanceof Error){
        res.status(400).send(error.message)
    }else {
        res.status(400).send("erro desconhecido.")
    }
   }
})

//Get User Purchases by User id
// exercicio 2 - fluxo de dados back end
//validade que o usuario existe


                        //INTRO-KNEX EXERCÍCIO 3
                        //GET USER PURCHASES BY USER ID

                        // method HTTP (GET)
                        // path ("/users/:id/purchases")
                        // response
                        // status 200
                        // array de compras do user no arquivo .db

app.get('/users/:id/purchases', async (req:Request, res:Response) => {
try {
    const userId = req.params.id

// const userPurchase = purchase.find((purchase) => purchase.userId === userId )
                const userPurchase = await db.raw(`
                SELECT * FROM purchases
                WHERE userId = "${userId}"
                
                `);
    if(!userPurchase){
        throw new Error("Id do usuario comprador nao identificada.")

    }

    // res.status(200).send(`id de Compra encontrada: ${JSON.stringify(userPurchase)}`)
//     userPurchase ? res.status(200).send(`id de Compra encontrada: ${JSON.stringify(userPurchase)}`) 
// : res.status(400).send('id de Compra não encontrada!')
            res.status(200).send("array de compras do user no arquivo .db")
} catch (error) {
    if(error instanceof Error){
        res.status(400).send('id de Compra não encontrada!')
    } else {
        res.status(400).send("erro desconhecido.")
    }
}
})

//aprofundamento express 
//EXERCICIO 2

//Delete User by id

//exercicio 2 - fluxo de dados back end
//validar que o usuario existe

app.delete('/users/:id', (req:Request, res:Response) => {
    try {
        const id = req.params.id
        const indexToRemove = users.findIndex((user) => user.id === id)

        if(indexToRemove === -1){
            throw new Error("não existe usuário.")
        }

    indexToRemove >= 0 && users.splice(indexToRemove, 1)
    res.status(200).send('User apagado com sucesso!')
    } catch (error) {
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})

//Delete Product by id

// exercicio 2 - fluxo de dados back end
// - validar que o produto existe
app.delete('/products/:id', (req:Request, res:Response) => {
  try {
    const id = req.params.id

    const indexToRemove = products.findIndex((product) => product.id === id)

    if(indexToRemove === -1){
        throw new Error("produto não existe.")
    }

    if (indexToRemove >= 0) {
        products.splice(indexToRemove, 1)
    }
    res.status(200).send('Produto apagado com sucesso!')
  } catch (error) {
    if(error instanceof Error){
        res.status(400).send(error.message)
    }
  }
})

//EXERCICIO 3 - APROFUNDAMENTO EXPRESS

//EDIT USER BY ID

//exercicio 3 - fluxo de dados back end
// - validar que o usuario existe 
//- validar o body

app.put('/users/:id', (req:Request, res:Response) => {
   try {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined 
    const newEmail = req.body.email as string | undefined 
    const newPassword = req.body.password as string | undefined

        if (!newId || !newName || !newEmail || newPassword){
            throw new Error("Todos os campos devem ser preenchidos.")
        }
    const user = users.find((user) => user.id === id)

    if(!user){
        throw new Error("Usuário não existe.")
    }

    if(user) {
        user.id = newId || user.id
        user.name = newName || user.name
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }
    res.status(200).send('Cadastro realizado com sucesso')
   } catch (error) {
    if(error instanceof Error){
        res.status(400).send(error.message)
    }
   }

})

//edit product by id
//exercicio 2 - fluxo de dados back end
// - validar que o produto existe
// - validar o body
app.put('/products/:id', (req:Request, res:Response) => {
    try {
        const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined 
    const newPrice = req.body.price as number
    const newCategory = req.body.category as ROUPASESPACIAIS | undefined

    if (!newId || !newName || !newPrice || newCategory){
        throw new Error("Todos os campos devem ser preenchidos.")
    }

    const product = products.find((product) => product.id === id)

    if(!product){
        throw new Error("produto não existe.")
    }

    if (product){
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = isNaN(newPrice) ? product.price : newPrice
        product.category = newCategory || product.category
    }
    res.status(200).send('Produto atualizado com sucesso!')
    } catch (error) {
        if(error instanceof Error){
            res.status(400).send(error.message)
        }
    }
})

                //APROFUNDANDO KNEX - EXERCÍCIO 2
                //Exercício 2
                // Crie o seguinte endpoint com query builder: GET PURCHASE BY ID

                //APROFUNDANDO KNEX - EXERCÍCIO 3
            //Refatore o endpoint criado no exercício anterior para que 
            //o resultado bem sucedido também retorne a lista de produtos 
            //registrados na compra.

            app.get("/purchases/:id", async (req:Request, res:Response)=>{
                try {
                    
                    const purchaseId = req.params.id

                    const purchases = await db("purchases").select(
                    "id as purchaseId",
                    "total_Price as totalPrice",
                    "created_at as createdAt",
                    "is_paid as isPaid",
                    "buyer_id as buyerId",
                    "buyer_email as buyerEmail", 
                    "buyer_name as name"
                    ).where({id:purchaseId})

                   if (!purchases){
                        throw new Error("Compra não encontrada.")
                    }

                    const products = await db("purchases_products").select(
                        "products.id as id",
                        "products.name as name",
                        "products.price as price",
                        "products.description as description",
                        "products.image_url as imageUrl",
                        "purchases_products.quantity as quantity"
                    ).join("products", "products.id", "purchases_products.product.id").where(
                        "purchases_products.purchase_id", req.params.id);

                        res.status(200).json({
                            ...purchases,
                            productsList: products,
                        })

                } catch (error) {
                    if(error instanceof Error){
                        res.status(400).send(error.message)
                    }
                }
                }
            )

            


