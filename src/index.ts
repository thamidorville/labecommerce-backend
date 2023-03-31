console.log("Tudo funcionando!")
//EXERCICIO 3
//Vá para o index.ts e importe as constantes users, products e purchases. Coloque um 
//console.log para cada e rode a aplicação com o script de start para ver se deu tudo certo!
import { users, products, purchase, createUser, getAllUsers, getAllProducts, createProduct, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId,  } from "./database";
import { ROUPASESPACIAIS, TProduct, TPurchase, TUser } from "./types";
import express, {Request, Response} from 'express'
import cors from 'cors'

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
app.get('/users', (req:Request, res:Response) => {
    res.status(200).send(users)
})

//getAllProducts
app.get('/products', (req:Request, res:Response) => {
    res.status(200).send(products)
})

//search product by name

app.get('/products/search', (req:Request, res:Response)=>{
    const q = req.query.q as string

    const productsFilter = products.filter((product) => 
    product.name.toLowerCase().includes(q.toLowerCase())
    )
    res.status(200).send(productsFilter)
})
//create user
app.post('/users', (req:Request, res:Response) => {
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const newUser: TUser = {
        id, 
        name,
        email, 
        password
    }
    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso!")
})

//create product
app.post('/products', (req:Request, res:Response) => {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    const newProduct: TProduct = {
        id, 
        name, 
        price, 
        category
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso!")
})

app.post('/purchases', (req:Request, res:Response) => {
    const userId = req.body.id
    const productId = req.body.id
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchase.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso!")
})

//APROFUNDAMENTO EXPRESS 

//EXERCICIO 1

//Get Products by id

app.get('/products/:id', (req:Request, res:Response) => {

    const id = req.params.id
    const result = products.find((product) => product.id === id)
    res.status(200).send(`Produto encontrado!', ${JSON.stringify(result)}`)
})

//Get User Purchases by User id

app.get('/users/:id/purchases', (req:Request, res:Response) => {

const userId = req.params.id

const userPurchase = purchase.find((purchase) => purchase.userId === userId )
userPurchase ? res.status(200).send(`Compra encontrada: ${JSON.stringify(userPurchase)}`) 
: res.status(400).send('Compra não encontrada!')
})

//aprofundamento express 
//EXERCICIO 2

//Delete User by id

app.delete('/users/:id', (req:Request, res:Response) => {
    const id = req.params.id
    const indexToRemove = users.findIndex((user) => user.id === id)

    indexToRemove >= 0 && users.splice(indexToRemove, 1)
    res.status(200).send('User apagado com sucesso!')
})

//Delete Product by id

app.delete('/products/:id', (req:Request, res:Response) => {
    const id = req.params.id

    const indexToRemove = products.findIndex((product) => product.id === id)

    if (indexToRemove >= 0) {
        products.splice(indexToRemove, 1)
    }
    res.status(200).send('Produto apagado com sucesso!')
})

//EXERCICIO 3 - APROFUNDAMENTO EXPRESS

//EDIT USER BY ID

app.put('/users/:id', (req:Request, res:Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined 
    const newEmail = req.body.email as string | undefined 
    const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id)

    if(user) {
        user.id = newId || user.id
        user.name = newName || user.name
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }
    res.status(200).send('Cadastro realizado com sucesso')

})

//edit product by id

app.put('/products/:id', (req:Request, res:Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined 
    const newPrice = req.body.price as number
    const newCategory = req.body.category as ROUPASESPACIAIS | undefined

    const product = products.find((product) => product.id === id)

    if (product){
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = isNaN(newPrice) ? product.price : newPrice
        product.category = newCategory || product.category
    }
    res.status(200).send('Produto atualizado com sucesso!')
})

