import express from 'express'

import './database/connection'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ message: "hello" })
})

app.listen(3333, () => console.log('Server running'))