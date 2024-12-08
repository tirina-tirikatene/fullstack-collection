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

 //route to add a vendor
 server.post('/api/vendors', async (req, res) => {
  const { name, location, description } = req.body;
  try {
    const [id] = await db('vendors').insert({ name, location, description }).returning('id');
    res.status(201).json({ id, name, location, description });
  } catch (error) {
    console.error(error); res.status(500).json({ message: 'Error adding vendor' });
  } }); 


if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

export default server
