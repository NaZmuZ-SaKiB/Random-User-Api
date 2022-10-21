const router = require('express').Router()
const controller = require('../controllers/user.controller')

router.get('/random', controller.randomUser);
router.get('/all', controller.allUsers);

router.post('/save', controller.addUser);

router.patch('/update', controller.updateUser);
router.patch('/bulk-update', controller.bulkUpdate);

router.delete('/delete', controller.deleteUser)

module.exports = router;