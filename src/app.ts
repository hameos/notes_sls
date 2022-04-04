import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

routes.forEach((route) => {
  const { method, path, middleware, handler } = route
  app[method](path, ...middleware, handler)
})

export default app
