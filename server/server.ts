import * as Path from 'node:path'

import express from 'express'

import vendorsRouter from './routes/vendors'
import eventsRouter from './routes/events'


const server = express()

server.use(express.json())


server.use('/api/vendors', vendorsRouter);
server.use('/api/events', eventsRouter);


// ADD YOUR API ROUTES HERE

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
