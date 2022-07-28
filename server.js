require('dotenv').config();

const PORT = process.env.PORT;
const PATH = '/';

// Libraries
const express = require('express');
const app = express();
const cors = require('cors');
const version = require('./package.json').version;

// Connect DB
const db = require('./config/db');
db.authenticate()
    .then(() => {
        // console.log('Database connected...');
        console.log(`Database Connected`);
    })
    .catch(err => console.log('Error: ' + err))

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// -----------------------------Middleware------------------------------- //
app.use(cors())
app.use(express.json())

// ----------------------Operations Documentation----------------------- //
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Routes
const user_api = require('./routes/user_api');

// Landing Message
app.get(PATH, (req, res) => res.end(`${new Date()} : Lordos App API Server ${version}\n`));

// Endpoints
app.use('/', user_api)

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})



