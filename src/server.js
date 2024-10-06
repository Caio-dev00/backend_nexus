const express = require('express')
const cors = require('cors')

const userRoutes = require('./routes/UserRoutes')
const favoriteRoutes = require('./routes/FavoriteRoutes')
const conversionRoutes = require('./routes/ConversionRoutes')

const app = express()

app.use(express.json())
app.use(cors())

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.static('public'))

app.use('/users', userRoutes)
app.use('/favorites', favoriteRoutes)
app.use('/conversion', conversionRoutes)


app.listen(3333, () => console.log("Server Online"))