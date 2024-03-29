const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const routes = require('./src/routes')

app.use(cors({ credentials: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/api', routes)

app.listen(8000)