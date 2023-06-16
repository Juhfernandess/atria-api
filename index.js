const express = require('express')
const mongoose = require('mongoose')
const app = express()




//forma de ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas da api
const person_routes = require('./routes/person_routes')

app.use('/person', person_routes)

//endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Oi express!' })
})

// mongodb+srv://Julia:<CXdJf3R9xvJzrDzP>@apicluster.dcwm21l.mongodb.net/?retryWrites=true&w=majority

//entregar uma porta

mongoose.connect('mongodb+srv://Julia:CXdJf3R9xvJzrDzP@apicluster.dcwm21l.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('conectados')
        app.listen(3000)
    })
    .catch((err) => console.log(err))

