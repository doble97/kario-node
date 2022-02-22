const express = require('express')
const rutas = require('./controllers/user-controller')
const routes_themes = require('./controllers/themes-controller')
const app = express()
app.use(express.json())
app.use('/', (req, res, next)=>{
    console.log('METHOD', req.method, '- URL', req.url, "- ADDRESS", req.hostname);
    next()
})
app.use('/', rutas )

app.use('/vocabulary',routes_themes )
app.listen(7777,()=>{
    console.log('Listening on port 7777..');
})