'use strict'

const mongoose = require('mongoose');
const Client = mongoose.model('Client');

exports.get = async () => {
    const res = await Client
        .find({
            active: true
        });
    return res;
};

exports.getByMail = async (mail) => {
    const res = await Client.findOne({
        mail: mail,
        active: true
    });
    return res;
};

exports.getById = async (id) => {
    const res = await Client.findById(id);
    return res;
};

exports.create = async (body) => {
    const client = new Client(body);
    await client.save();
};

exports.update = async (id, body) => {
    await Client.findByIdAndUpdate(id, {
        $set: {
            name: body.name,
            age: body.age,
            mail: body.mail,
            active: body.active
        }
    });
};

exports.delete = async (id) => {
    await Client.findOneAndRemove(id);
};