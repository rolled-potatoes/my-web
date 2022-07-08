import express from 'express';

const router = express.Router();

router.get('/check', (req, res) => {
  return res.json(req.user);
});

export default router;
