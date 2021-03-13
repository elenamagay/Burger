const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");


router.get('/', (req, res) => {
    burger.selectAll(data => {
        const hbsObj = {
            burgers: data,
        };
        console.log(hbsObj);
        res.render("index", hbsObj);
    });
});


router.post("/api/burgers", (req, res) => {
    burger.insertOne(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (result) => res.json({ id: result.insertId }));

});

router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
    console.log('condition', condition)

    burger.updateOne({
        devoured: req.body.devoured,
    },
    condition, 
    result => {
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        else {
        res.status(200).end();
        }
    }
    );
});
 
module.exports = router; 