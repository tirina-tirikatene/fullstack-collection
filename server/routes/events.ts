import express from "express";
import connection from '../db/connection'

const knex = connection;
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const events = await knex('events');
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events' });
  }
});

export default router;