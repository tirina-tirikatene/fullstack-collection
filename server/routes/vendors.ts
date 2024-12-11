import express from "express";
import connection from '../db/connection'

const knex = connection;
const router = express.Router()


//API route to get all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await knex('vendors');
    console.log('Vendors retrieved', vendors)
    res.status(200).json(vendors);
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving vendors' });
   }
  })

 //route to add a vendor
 router.post('/', async (req, res) => {
  const { name, location, description } = req.body;

  if (!name || !location || !description) {
    return res.status(400).json({ message: 'All fields required'});
  }
  try {
    const [id] = await knex('vendors').insert({ name, location, description }).returning('id');
    res.status(201).json({ id, name, location, description });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error adding vendor' });
  } }); 

  //route to delete a vendor 
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await knex('vendors').where({ id }).del();
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting vendor' });
  }
})

  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, description } = req.body;
    try {
      await knex('vendors').where({ id }).update({ name, location, description });
      res.status(200).json({ message: 'Vendor updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating vendor' });
    }
  });


  export default router;