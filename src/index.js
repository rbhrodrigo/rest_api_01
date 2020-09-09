const express = require("express");
const morgan = require("morgan");
const app = express();

// settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use(require("./routes/index"));
app.use("/api/users", require("./routes/users"));

// ejecutando servidor
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
