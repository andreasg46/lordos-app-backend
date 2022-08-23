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
console.log(`Database Connected`);
    })
    .catch(err => console.log('Error: ' + err))

const populate = require('./config/data');
populate.populateData();

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// -----------------------------Middleware------------------------------- //
app.use(cors())
app.use(express.json())

// Log method on path on each request
app.use((req, res, next) => {
    req.version = req.headers['accept-version'];
    return next();
});

// ----------------------Operations Documentation----------------------- //
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Landing Message
app.get(PATH, (req, res) => res.end(`${new Date()} : Lordos App API Server ${version}\n`));

// Routes
const user_apis = require('./routes/user_apis');
const session_apis = require('./routes/session_apis');
const question_apis = require('./routes/question_apis');
const answer_apis = require('./routes/answer_apis');
const push_apis = require('./routes/push_apis');
const settings_apis = require('./routes/settings_apis');

// Endpoints
app.use(PATH, user_apis)
app.use(PATH, session_apis)
app.use(PATH, question_apis)
app.use(PATH, answer_apis)
app.use(PATH, push_apis)
app.use(PATH, settings_apis)

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}${PATH}`)
})



