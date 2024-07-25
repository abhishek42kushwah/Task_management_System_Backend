const Task = require("../models/Task")

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body
        
        if (!title || !description || !dueDate || !priority) {
            return res.status(400).json({ message: "All fields are required." });
        }
        
       

        const task = new Task({
            title, description, dueDate, priority,
            user: req.user._id
        });
      

        const createdTask = await task.save()
        res.status(201).json(createdTask);
        console.log(createdTask)


       
        return res.status(200).json({
            success: true,
            message: "Task Create SuccessFully",
            task
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:error.message,
            message: "task not create please try again",
        })
    }
}

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ dueDate: -1 })
        return res.json({
            tasks
        })
    } catch (error) {
        res.status(500).json({ message: "Tasks not found" });

    }
}
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
 
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        // if (task && task.user.equals(res.user._id)) {
            res.json(task)
        // }

    } catch (error) {
        res.status(404);
        throw new Error('Task not found');
    }
}

exports.updateTask = async (req, res) => {
    try {
        
        const { title, description, dueDate, priority } = req.body

    const task = await Task.findById(req.params.id);

    if (task && task.user.equals(req.user._id)) {
        task.title = title,
            task.description = description,
            task.dueDate = dueDate,
            task.priority = priority
    }

    if (!task || !task.user.equals(req.user._id)) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    

    const updateTask = await task.save()
    res.status(200).json({
        updateTask,
        message: "update successFully"
    })


    } catch (error) {
        
        res.status(500).json({
            message: "update failed",error
        })

    }
}

exports.deleteTask = async (req, res) => {
  try{  
         const task =  await Task.findByIdAndDelete(req.params.id)
    // if (task && task.user.equals(req.user._id)) {
        if (!task || !task.user.equals(req.user._id)) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        
      res.json({ message: 'Task removed',task });
    
 } catch(error) 
    {res.status(404).json({message:'Task not found',error});
}
}




exports.updateTaskStatus = async(req,res) =>{
     try {
        const { status } = req.body;
      
        const task = await Task.findById(req.params.id);
      
        if (task && task.user.equals(req.user._id)) {
          task.status = status;
      
          const updatedTask = await task.save();
          console.log(updatedTask)
        }
        res.json({
            success:true,
            message:"task updated"})

     } catch (error) {
        res.status(500).json({
            success:false,message:"task not update",error})
     }
       
}