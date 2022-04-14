const express = require("express");
const router = express.Router();
var TYPES = require('tedious').TYPES;
const addModel = require('../models/Ads')

// Get all ads
router.get("/getall-ads", async function(req, res) {
    let getAllTSQL = "SELECT * FROM ProgEksamen.UserAds"
    let result = await dbContext.executeQuery(getAllTSQL, null)

    res.status(200).json(result);
})

// Create add
router.post("/createadd", async (req, res) => {
    const add = new addModel (id, addname, price, category, location, img)

    let createAddTSQL
})