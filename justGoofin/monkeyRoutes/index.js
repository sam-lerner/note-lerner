const router = require("express").Router()

router.use("/gorilla", gorillaRoutes)
router.use("/bonobo", bonoboRoutes)
router.use("/chimpanzee", chimpeeRoutes)
router.use("/human", humanRoutes)
module.exports = router