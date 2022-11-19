import express from "express"
import cors from "cors"

import connectDatabase from "./database/db.js"
import routes from "./routes.js"

const port = 3001
const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

connectDatabase().then(() => {app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}. Database connected!`)
})}).catch(() => console.log("NÃO conectou o banco de dados!"))

