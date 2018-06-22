import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {res.json('API')});

module.exports = router;
