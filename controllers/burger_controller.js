const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", (req,res) => {
    db.Burger.findAll().then( dbBurger => {
        let dbRecordsObj = {
            burgers: dbBurger
        };
        res.render('index', dbRecordsObj)
    });
});

router.post("/api/burgers", (req, res) => {
    db.Burger.create({
            burger_name: req.body.burger_name,
            // devoured: req.body.devoured
        }).then( dbBurger => {
            res.redirect('/');
        })
        .catch(err => {
            res.json(err);
        })
});

router.put("/api/burgers/:id", (req, res) => {

    db.Burger.update({
        devoured: true
    }, {
        where: {
            id: req.params.id
        }
    }).then( dbBurger => {
        res.json(dbBurger)
    })
    .catch(err => {
        res.json(err);
    });

});

module.exports = router;