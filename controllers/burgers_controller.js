const express = require('express');

const router = express.Router();

// Import burger.js
const burger = require('../models/burger.js');

// Create Routes
router.get('/', function(req, res) {
  burger.all(function(data) {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/burgers', function(req, res) {
  let devoured = 0;
  if (req.body.devoured === 'true') {
    devoured = 1;
  }
  burger.create(
    ['burger_name', 'devoured'],
    [req.body.burger_name, devoured],
    function(result) {
      console.log(result);
      // ID of the new burger
      res.json({ id: result.insertId });
    }
  );
});

router.put('/api/burgers/:id', function(req, res) {
  const condition = `id = ${req.params.id}`;

  console.log('condition', condition);

  burger.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    function(result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete('/api/burgers/:id', function(req, res) {
  const condition = `id = ${req.params.id}`;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
    return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;