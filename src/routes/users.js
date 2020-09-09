const { Router } = require("express");
const router = new Router();
const _ = require("underscore");

const users = require("../udatos.json");

//---------------------------------------------
// leer datos
//---------------------------------------------
router.get("/", (req, res) => {
  res.json(users);
});

//---------------------------------------------
// agregar datos
//---------------------------------------------
router.post("/", (req, res) => {
  if (req.body.name === "" || req.body.email === "") {
    res.status(502).json({ error: "El campo nombre y email son requeridos" });
  } else {
    const newUsers = { ...req.body };
    users.push(newUsers);
    res.json(users);
  }
});

//---------------------------------------------
// modificar datos
//---------------------------------------------
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const pers = { ...req.body };

  _.each(users, (usuarios, i) => {
    if (usuarios[0].id === id) {
      usuarios.name = req.body.name;
      usuarios.email = req.body.email;
      usuarios.password = req.body.password;
      usuarios.phones = req.body.phones;
    }
  });
  res.json(users);
});

//---------------------------------------------
// eliminar datos
//---------------------------------------------
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    _.each(users, (usuario, i) => {
      if (usuario.id == id) {
        users.splice(i, 1);
      }
    });
    res.json(users);
  }
});

module.exports = router;
