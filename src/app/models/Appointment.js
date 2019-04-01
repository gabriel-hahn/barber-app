module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE
  })

  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { foreingKey: 'user_id' })
    Appointment.belongsTo(models.User, { foreingKey: 'provider_id' })
  }

  return Appointment
}
