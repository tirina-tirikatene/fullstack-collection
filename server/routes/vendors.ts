import express from "express";
import knex from 'knex';
import knexConfig from '../db/knexfile';

const db = knex(knexConfig.development);
const router = express.Router();


//API route to get all vendors
router.get('/api/vendors', async (req, res) => {
  try {
    const vendors = await db('vendors');
    console.log('Vendors retrieved', vendors)
    res.status(200).json(vendors);
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving vendors' });
   }
  })

 //route to add a vendor
 router.post('/api/vendors', async (req, res) => {
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
  router.delete('/api/vendors/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db('vendors').where({ id }).del();
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting vendor' });
  }
})

  router.put('/api/vendors/:id', async (req, res) => {
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


  export default router;