const express = require('express');
const Games  =require('../models/Games')
const router = express.Router();
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

router.get('/', async (req, res) => {
  const {limit, page, fields, orderBy, sortBy, q} = req.query;

  
  const criteria = {
    limit: Number(limit) || DEFAULT_LIMIT,
    page: Number(page) || DEFAULT_PAGE,
    fields: fields || null,
    orderBy: orderBy ||'title',
    sortBy: sortBy ==! undefined ? Number(sortBy) : 1,
    q: q || '',
  };

  const result =  await Games.find(criteria);


  return res.json({message: 'Games Ok', data: result });
});

module.exports = router;