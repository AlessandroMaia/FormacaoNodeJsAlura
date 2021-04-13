const { Router } = require("express");
const NivelController = require("../controllers/NivelController");

const router = Router();

router.get('/niveis', NivelController.getAll)
router.get('/niveis/:id', NivelController.getById)
router.post('/niveis', NivelController.create)
router.put('/niveis/:id', NivelController.update)
router.delete('/niveis/:id', NivelController.delete)
router.post('/niveis/:id/restaura', NivelController.restore)

module.exports = router