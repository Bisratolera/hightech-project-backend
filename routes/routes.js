const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const studentController = require('../controllers/studentController');

const prisma = new PrismaClient();

router.post('/student/create', studentController.Signup)
// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {



// Update a student by ID
router.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a student by ID
router.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await prisma.student.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
