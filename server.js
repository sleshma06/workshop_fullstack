const express = require("express");
const professionals = require("./data/professionals");
const app = express();
app.use(express.json());

app.get("/api/professionals", (req, res) => {
  const category = req.query.category;

  if (category === undefined) {
    return res.status(200).json(professionals);
  }

  const filtered = professionals.filter((p) => p.category === category);
  res.status(200).json(filtered);
});
app.get("/api/professionals/:id", (req, res) => {
  const id = req.params.id;
  const idInNumber = parseInt(id);
  const professional = professionals.find(
    (professional) => professional.id === idInNumber,
  );
  if (professional === undefined) {
    return res.status(404).json({ message: "Professional not found" });
  }

  app.post("/api/professionals", (req, res) => {
    const name = req.body.name;
    const category = req.body.category;

    if (name === undefined || category === undefined) {
      return res
        .status(400)
        .json({ message: "Name and category are required" });
    }
    const maxId = professionals.reduce(
      (max, p) => (p.id > max ? p.id : max),
      0,
    );
    const newProfessional = {
      id: maxId + 1,
      name: name,
      category: category,
    };
    professionals.push(newProfessional);
    res.status(201).json(newProfessional);
  });

  res.status(200).json(professional);
});
app.put("/api/professionals/:id", (req, res) => {
  const id = req.params.id;
  const idInNumber = parseInt(id);
  const foundProfessional = professionals.find(
    (professional) => professional.id === idInNumber,
  );

  if (foundProfessional === undefined) {
    return res.status(404).json({ message: "Professional not found" });
  }

  const name = req.body.name;
  const category = req.body.category;

  if (name !== undefined) foundProfessional.name = name;
  if (category !== undefined) foundProfessional.category = category;

  res.status(200).json(foundProfessional);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
