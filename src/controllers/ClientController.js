'use strict'

const mongoose = require('mongoose');
const repository = require('../repositorys/ClientRepository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request'
        });
    }
};

exports.getByMail = async (req, res, next) => {
    try {
        const data = await repository.getByMail(req.params.mail);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request'
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request'
        });
    }
};

exports.post = async (req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Saved successfully'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request'
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Updated successfully'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request'
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({
            message: 'Successfully deleted'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process your request'
        });
    }
};