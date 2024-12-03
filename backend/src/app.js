const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
require("dotenv").config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log("**************");
  console.log("Gerador de Tabela TCC Ueber");
  console.log("--> Porta", PORT);
  console.log("**************");
});