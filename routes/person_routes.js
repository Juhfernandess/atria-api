const router = require('express').Router()
const Person = require('../models/Person')

//criação de dados - create
router.post('/', async (req, res) => {
    //req.body()
    const { name, ra, aprovado_atria } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }

    const person = {
        name,
        ra,
        aprovado_atria,
    }

    try {
        //criando dados
        await Person.create(person)

        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})
//leitura de dados - read
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {

        const person = await Person.findOne({ _id: id })
        res.status(200).json(person)

        if (!person) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return

        }



    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//atualização - update
router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const { name, ra, aprovado_atria } = req.body

    const person = {
        name,
        ra,
        aprovado_atria,
    }

    try {

        const update_person = await Person.updateOne({ _id: id }, person)

        if (update_person.matchedCount === 0) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }


        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }


})

//deletar dados - delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({ _id: id })

    if (!person) {

        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
    }

    try {
        await Person.deleteOne({ _id: id })
        
        res.status(200).json({ message: 'Usuário removido com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }

    
})

module.exports = router


