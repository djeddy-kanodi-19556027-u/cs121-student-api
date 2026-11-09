const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi");

const app = express();
app.use(express.json());

// In-memory student array with seed data
let students = [
  { id: 1, name: "Awa Diop" }
];
let nextId = 2;

// Root route
app.get("/", (req, res) => {
  res.json({ message: "CS121 API is running" });
});

// Swagger documentation routes
app.get("/openapi.json", (req, res) => {
  res.json(openapi);
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

// 1. List students
app.get("/students", (req, res) => {
  res.json(students);
});

// 2. Create a student
app.post("/students", (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json({ error: "Student name is required" });
  }
  const newStudent = { id: nextId++, name: req.body.name };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 3. Read one student
app.get("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// 4. Update a student
app.put("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);
  if (!student) return res.status(404).json({ error: "Student not found" });
  if (!req.body || !req.body.name) {
    return res.status(400).json({ error: "Student name is required" });
  }
  student.name = req.body.name;
  res.json(student);
});

// 5. Delete a student
app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === studentId);
  if (index === -1) return res.status(404).json({ error: "Student not found" });
  students.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});