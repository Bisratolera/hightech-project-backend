const {PrismaClient}  = require("@prisma/client");
const prisma = new PrismaClient();
const studentController = {};

studentController.Signup , async (req, res) => {
    const {fullname, stream, division, idno, gender, subcity, woreda, phonenumber, profilephoto} = req.body;
    if(!fullname || !stream || !division || !idno || !gender || !subcity || !woreda || !phonenumber || !profilephoto) {
        window.Error("please fill all the fields")
    }
    try {
        const newStudent = await prisma.student.create({
            data: req.body,
        })
        res.status(201).json(newStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'internal server error, please check the server log'})
    }
    
}


studentController.getStudentById, async(req, res) => {
    const {id} = req.params;
    try {
        const student = await prisma.student.findFirst({
            where: { id: parseInt(id) },
          });
          if (!student) {
            return res.status(404).json({ error: 'Student not found' });
          }
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


studentController.getAll, async(req, res) => {
    try {
        const students = await prisma.student.findMany();
        res.json(students)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server error, check the server log'})
    }
}

studentController.deleteAll, async(req, res) => {
    try {
        const students = await prisma.student.deleteMany();
        res.json(students)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server error, check the server log'})
    }
}


studentController.updateById, async(req, res) => {
    const {id} = req.params;
    try {
        const updatedStudent = await prisma.student.update({
            where: {id: parseInt(id)},
            data: req.body
        })
        res.json(updatedStudent)
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = studentController;