const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const cors = require("cors");
const app = express();
const router = require("./routes/personRoutes");
const persons = require("./db/database");

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use("/person", router);
app.set("db", persons);
if (require.main === module) {
    app.listen(3000)
}
module.exports = app;