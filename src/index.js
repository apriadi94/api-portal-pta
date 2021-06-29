
const { app } = require('./config/app')
const logger = require('./utils/logger')

try {
    const port = process.env.APP_PORT
    app.listen(port, () => console.log(`App Running On Port: ${port}`))
} catch (error) {
    logger.error(error)
}

module.exports = app;
