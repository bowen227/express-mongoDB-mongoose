const express = require("express");
const partnerRouter = express.Router();

partnerRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the partners to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the partners: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partner");
  })
  .delete((req, res) => {
    res.end("Deleting all partners");
  });
partnerRouter
  .route("/:partnerId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send you the partners with the id: ${req.params.partnerId}`);
  })
  .post((req, res) => {
    res.end(`Will create a partners with the id: ${req.params.partnerId}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`Will update a partners with the id: ${req.params.partnerId}`);
  })
  .delete((req, res) => {
    res.end(`Will delete a partners with the id: ${req.params.partnerId}`);
  });
module.exports = partnerRouter;
