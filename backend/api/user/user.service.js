
const dbService = require('../../services/db.service')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectId

const saltRounds = 10

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    let criteria = _buildCriteria(filterBy)

    let boardMembers;
    const boardCollection = await dbService.getCollection('board')

    try {
        const board = await boardCollection.findOne({ '_id': ObjectId(criteria.boardId) })
        boardMembers = board.members
    } catch {
        console.log('ERROR: cannot find board');
        throw err;
    }

    const userCollection = await dbService.getCollection('user')
    try {
        const boardMembersIds = boardMembers.map(member => ObjectId(member._id))
        criteria.boardMembersIds = { $nin: boardMembersIds }
        delete criteria.boardId

        let users;
        if (!criteria.q) users = await userCollection.find({ '_id': criteria.boardMembersIds }).toArray();
        else users = await userCollection.find({ $and: [{ '_id': criteria.boardMembersIds }, { 'username': criteria.q }] }).toArray();
        users.forEach(user => delete user.password)

        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })

        delete user.password
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByUsername(username) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${username}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({ "_id": ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);

    try {
        user.password = await bcrypt.hash(user.password, saltRounds)
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('user')
    try {
        const dbUsers = await collection.find().toArray();
        const isTakenUsername = dbUsers.some(dbUser => dbUser.username === user.username)
        if (isTakenUsername) return Promise.reject('The username is already exists')

        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.boardId) {
        criteria.boardId = filterBy.boardId
    }
    if (filterBy.q) {
        criteria.q = { $regex: `.*${filterBy.q}.*`, $options: 'i' }
    }
    return criteria;
}


