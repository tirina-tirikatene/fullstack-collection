import * as Path from 'node:path'

import express from 'express'
import knex from 'knex';
import dbConfig from './db/knexfile'; 

const db = knex(dbConfig.development);
const server = express()
server.use(express.json())

// ADD YOUR API ROUTES HERE

//API route to get all vendors
server.get('/api/vendors', async (req, res) => {
  try {
    const vendors = await db('vendors');
    res.status(200).json(vendors);
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving vendors' });
   }
  })


if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
