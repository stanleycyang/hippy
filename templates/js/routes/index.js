import express from 'express';
let router = express.Router();

exports default router.get('/', (req, res, next) => {
  res.render('index', { title: 'Template' });
});



