var express = require('express');
var router = express.Router();

router.get('/', questionController.findAllQuestion)
router.post('/', questionController.createQuestion)
router.put('/:id', questionController.updateQuestion)
router.delete('/:id', questionController.deleteQuestion)
router.post('/:id', questionController.createAnswer)

module.exports = router;
