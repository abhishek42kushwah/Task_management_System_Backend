const express = require("express")
const router = express.Router()


const {createTask,updateTask,deleteTask,getTasks,getTaskById,updateTaskStatus} = require("../controllers/taskController")
const {protect} = require("../middleware/authMiddleware") 

router.post("/createTask",protect,createTask);
router.get("/getTasks",protect,getTasks);
router.get("/getTaskById/:id",protect,getTaskById);
router.put("/updateTask/:id",protect,updateTask);
router.delete("/deleteTask/:id",protect,deleteTask)
router.put("/updateTaskStatus/:id",protect,updateTaskStatus);

module.exports = router;

