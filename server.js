const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./view/swagger.json');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', require('./controllers/routes'))

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 8080
app.listen(port, () => {
    console.log('Run at port => '+port)
    console.log('Swagger => http://localhost:' + port + '/api-docs/')
})