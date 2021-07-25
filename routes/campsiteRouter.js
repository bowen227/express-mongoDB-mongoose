const express = require("express");
const campsiteRouter = express.Router();

campsiteRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the campsites to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the campsite: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
  })
  .delete((req, res) => {
    res.end("Deleting all campsites");
  });
campsiteRouter
  .route("/:campsite")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send you the campsite with the id: ${req.params.campsite}`);
  })
  .post((req, res) => {
    res.end(`Will create a campsite with the id: ${req.params.campsite}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`Will update a campsite with the id: ${req.params.campsite}`);
  })
  .delete((req, res) => {
    res.end(`Will delete a campsite with the id: ${req.params.campsite}`);
  });
module.exports = campsiteRouter;
