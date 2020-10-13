import express from 'express'

import { getRepository } from 'typeorm'

import './database/connection'

const app = express()

app.use(express.json())

app.post('/orphanages', (req, res) => {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = req.body
})

app.listen(3333, () => console.log('Server running'))