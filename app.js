const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const hbs = require('express-handlebars')
const { mongoDbURL, PORT, globalVariables } = require('./config/configuration')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const app = express()

/* Mongoose configuration (connect to MongoDB) */
mongoose.connect(mongoDbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log('MongoDB connected successfully')
}).catch(err => {
    console.log('Database connection failed')
})

/* Express configuration */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

/* Flash and Session and Variable configuration */
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}))

app.use(flash())

/* Method Override Middleware */
app.use(methodOverride('newMethod'))

app.use(globalVariables)

/* View engine configuration (handlebars) */
app.engine('handlebars', hbs({ defaultLayout: 'default' }))
app.set('view engine', 'handlebars')

/* Routes of server */
const defaultRoutes = require('./routes/defaultRoutes')
app.use('/', defaultRoutes)

/* Routes of admin panels */
const adminRoutes = require('./routes/adminRoutes')
app.use('/admin', adminRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`)
})