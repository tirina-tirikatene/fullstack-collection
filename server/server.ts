import * as Path from 'node:path'

import express from 'express'
import knex from 'knex';
import dbConfig from './db/knexfile'; 
import cors from 'cors';


const db = knex(dbConfig.development);
const server = express()
server.use(express.json())
server.use(cors())


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

  if (!name || !location || !description) {
    return res.status(400).json({ message: 'All fields required'});
  }
  try {
    const [id] = await db('vendors').insert({ name, location, description }).returning('id');
    res.status(201).json({ id, name, location, description });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error adding vendor' });
  } }); 

  //route to delete a vendor 
  server.delete('/api/vendors/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db('vendors').where({ id }).del();
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting vendor' });
  }
})

  server.put('/api/vendors/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, description } = req.body;
    try {
      await db('vendors').where({ id }).update({ name, location, description });
      res.status(200).json({ message: 'Vendor updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating vendor' });
    }
  });


if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
