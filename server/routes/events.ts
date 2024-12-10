import express from "express";
import knex from 'knex'
import knexConfig from '../db/knexfile'

const db = knex(knexConfig.development)

const router = express.Router();

router.get('/api/events', async (req, res) => {
  try {
    const events = await db('events');
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events' });
  }
});

export default router;