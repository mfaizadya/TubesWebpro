const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3030

//import routes
const sectionRouter = require('./src/routes/sectionRoutes')

app.use(express.json())

//routes section
app.use('/', sectionRouter)

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})