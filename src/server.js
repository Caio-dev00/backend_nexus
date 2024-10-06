const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3333

const userRoutes = require('./routes/UserRoutes')
const favoriteRoutes = require('./routes/FavoriteRoutes')
const conversionRoutes = require('./routes/ConversionRoutes')

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  return res.json({ message: "Seja Bem-Vindo à nexusapi"})
})

app.use('/users', userRoutes)
app.use('/favorites', favoriteRoutes)
app.use('/conversion', conversionRoutes)


app.listen(PORT, () => console.log("Server Online" + PORT))