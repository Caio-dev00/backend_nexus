const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmPassword } = req.body

    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório'})
      return
    }

    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório'})
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória'})
      return
    }

    if (!confirmPassword) {
      res.status(422).json({ message: 'A confirmação da senha é obrigatória'})
      return
    }

    if (password !== confirmPassword) {
      res.status(422).json({ message: 'A senha e confirmação de senha devem ser a mesma'})
      return
    }

    const userExists = await User.findOne({ email: email })

    if( userExists) {
      res.status(422).json({ message: 'Este email já está em uso!' })
      return
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
      name: name,
      email: email,
      password: passwordHash
    })

    try {
      const newUser = await user.save()
      await createUserToken(newUser, req, res)
    }
    catch(err) {
      res.status(500).json({ message: err })
    }
  }

  static async login(req, res){
    const { email, password } = req.body

    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório'})
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória'})
      return
    }

    const user = await User.findOne({ email: email })

    if(!user) {
      res.status(422).json({ message: "Não há usuario cadastrado com esse email!"})
      return
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
      res.status(422).json({ message: 'Senha invalida!' })
      return
    }

    await createUserToken(user, req, res)
  }

  static async checkUser(req, res) {
    let currentUser

    if(req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, 'nexus#%?')

      currentUser = await User.findById(decoded.id)
      currentUser.password = undefined

    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async getUserById(req, res) {
    const id = req.params.id

    const user = await User.findById(id).select("-password")

    if(!user) {
      res.status(422).json({
        message: 'Usuario não encontrado'
      })
      return
    }

    res.status(200).json({ user })
  }

  static async editUser(req, res) {

    const token = getToken(req)
    const user = await getUserByToken(token)

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório'})
      return
    }

    user.name = name

    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório'})
      return
    }

    const userExists = await User.findOne({ email: email })

    if(user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor utilize outro email!' })
      return
    }

    user.email = email

    if(password != confirmPassword) {
      res.status(422).json({ error: 'As senhas não conferem.'})
    } else if (password == confirmPassword && password != null) {
      const salt = await bcrypt.genSalt(12)
      const reqPassword = req.body.password

      const passwordHash = await bcrypt.hash(reqPassword, salt)

      user.password = passwordHash
    }

   try {
    const updateUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true }
   );
    res.json({
      message: 'Usuario atualizado com sucesso!',
      data: updateUser,
    })
   } catch (error) {
    res.status(500).json({ message: error })
   }
  }
}