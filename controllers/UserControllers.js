import User from "../src/models/User.js"

async function getUsers(request, response) {
    const user = await User.find()

    return response.json(user)
}

async function createUser(request, response) {
    const user = request.body

    const newUser = await User.create(user)

    return response.status(201).json(newUser)
}

async function deleteUser(request, response) {
    const id = request.params.id

    await User.findByIdAndDelete({ _id: id })

    return response.status(204).json()
}

export { getUsers, createUser, deleteUser }


