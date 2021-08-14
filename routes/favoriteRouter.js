const express = require("express");
const authenticate = require('../authenticate');
const user = require('../models/user');
const cors = require('./cors');
const Favorite = require("../models/favorite");

const favoriteRouter = express.Router();

favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorite.find({ user: req.user._id })
            .populate('user')
            .populate('campsites')
            .then(favorites => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            })
            .catch(err => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorite.findOne({ user: req.user._id })
            .then(favorite => {
                if (favorite.campsites) {
                    req.body.forEach(fav => {
                        if (!favorite.campsites.includes(fav._id)) {
                            favorite.campsites.push(fav._id);
                        }
                    });
                    favorite.save()
                        .then(favorite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json')
                            res.json(favorite);
                        })
                        .catch(err => next(err));
                } else {
                    Favorite.create({ user: req.user._id, campsites: req.body })
                        .then(favorite => {
                            req.body.forEach(fav => {
                                favorite.campsites.push(fav._id);
                            });
                            favorite.save()
                                .then(response => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json')
                                    res.json(response);
                                })
                                .catch(err => next(err));
                        })
                }
            })
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /campsites');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorite.findOneAndDelete({ user: req.user._id })
            .then(favorite => {
                if (favorite) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                } else {
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('You do not have any favorites to delete');
                }
            })
            .catch(err => next(err));
    });

favoriteRouter.route('/:campsiteId')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /favorites/:id');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorite.findOne({ user: req.user._id })
            .then(favorite => {
                if (favorite) {
                    if (!favorite.campsites.includes(req.params.campsiteId)) {
                        favorite.campsites.push(req.params.campstieId)
                        favorite.save()
                            .then(response => {
                                res.statusCode = 200;
                                res.contentType('Content-Type', 'application/json');
                                res.json(response);
                            })
                            .catch(err => next(err));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/plain')
                        res.end('Campsite is already a favorite');
                    }
                } else {
                    Favorite.create({ user: req.user._id, campsites: [req.params.campsitesId] })
                        .then(response => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json')
                            res.json(response);
                        })
                        .catch(err => next(err));
                }
            })
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites/:id');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorite.findOne({ user: req.user._id })
            .then(favorite => {
                if (favorite) {
                    const index = favorite.campsites.indexOf(req.params.campsiteId);
                    if (index >= 0) {
                        favorite.campsites.splice(index, 1);
                    }
                    favorite.save()
                        .then(favorite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        })
                        .catch(err => next(err))
                } else {
                    res.setHeader('Content-Type', 'text/plain')
                    res.end('There are no favorites to delete')
                }
            })
            .catch(err => next(err));
    });

module.exports = favoriteRouter;