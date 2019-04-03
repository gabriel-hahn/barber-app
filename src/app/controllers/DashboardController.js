const { User, Appointment } = require('../models')
const moment = require('moment')

class DashboardController {
  async index(req, res) {
    let appointments = []
    let providers = []

    // If current user is a provider, it will load all customers. Otherwise, it will load all available providers.
    if (req.session.user.provider) {
      const data = await Appointment.findAll({
        where: { provider_id: req.session.user.id }
      })

      await Promise.all(
        data.map(async appointment => {
          appointment.user = await User.findOne({
            where: { id: appointment.user_id }
          })

          appointment.dateFormated = moment(appointment.date).format('HH:mm')
          appointments.push(appointment)
        })
      )
    } else {
      providers = await User.findAll({ where: { provider: true } })
    }

    return res.render('dashboard', { providers, appointments })
  }
}

module.exports = new DashboardController()
