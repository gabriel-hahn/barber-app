const { User } = require('../models')

class SessionController {
  async create(req, res) {
    return res.render('auth/signin')
  }

  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.error('User not found')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.error('Incorrect password')
      return res.redirect('/')
    }

    req.session.user = user

    return res.redirect('/app/dashboard')
  }
}

module.exports = new SessionController()
