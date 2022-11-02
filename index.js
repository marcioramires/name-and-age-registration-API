import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import User from "./models/User.js"

const port = 3001
const app = express()

app.use(express.json())
app.use(cors())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', async (request, response) => {
    const user = await User.find()

    return response.json(user)
})

app.post('/users', async (request, response) => {
    const user = request.body
    
    const newUser = await User.create(user)

    return response.status(201).json(newUser)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()

})

mongoose.connect('mongodb+srv://marcioramires:D16m4a84@cluster0.5pzx8q3.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("Banco de dados conectado!"))
    .catch(() => console.log("NÃO conectou o banco de dados!"))

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})