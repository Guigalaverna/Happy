import express from 'express'
import path from 'path'
import routes from './routes'

import './database/connection'

const app = express()

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.listen(3333, () => console.log('Server running'))