const express = require('express')
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3030

//import routes
const authRoutes = require('./src/routes/authRoutes');
const sectionRouter = require('./src/routes/sectionRoutes')
const levelRouter = require('./src/routes/levelRoutes')
const esaiRouter = require('./src/routes/soalesaiRoutes')
const attemptRouter = require('./src/routes/attemptRoutes')
const pelajarRoutes = require('./src/routes/pelajarRoutes');

app.use(cors());
app.use(express.json())
app.use('/api/auth', authRoutes);
//routes section
app.use('/', sectionRouter)
app.use('/', levelRouter)
app.use('/', esaiRouter)
app.use('/', attemptRouter)
app.use('/api/pelajar', pelajarRoutes);

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})