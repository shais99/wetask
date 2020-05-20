const express = require('express')

const { requireAuth } = require('../../middlewares/requireAuth.middleware')

const { getBoard, getBoards, deleteBoard, updateBoard, addBoard } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards)
router.get('/:id', getBoard)
router.post('/',requireAuth, addBoard)
router.put('/:id', requireAuth, updateBoard)
router.delete('/:id', requireAuth, deleteBoard)

module.exports = router