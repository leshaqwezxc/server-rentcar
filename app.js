const express = require('express')
require('dotenv').config()
const sequalize = require('./db')
const app = express()
const models = require('./models/models')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const port = process.env.PORT || 3000
const path = require('path')


app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


//Обработка ошибок
app.use(errorHandler)



const start = async () => {
    try {
        await sequalize.authenticate()
        await sequalize.sync()
        app.listen(port, () => console.log('Server started on port', port))
    } catch (err) {
        console.log(err)
    }
}
start()