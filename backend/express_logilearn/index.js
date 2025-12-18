const express = require('express')
require('dotenv').config()
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3030

//import routes
const sectionRouter = require('./src/routes/sectionRoutes')
const levelRouter = require('./src/routes/levelRoutes')
const soalPGRouter = require('./src/routes/soalPGRoutes')

app.use(express.json())
app.use(cors())

//routes section
app.use('/', sectionRouter)
app.use('/', levelRouter)
app.use('/', soalPGRouter)

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})