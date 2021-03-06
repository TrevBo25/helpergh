require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use( express.static( `${__dirname}/../build` ) );

app.post('/api/tokengetter', (req, res) => {
  axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}&code=${req.body.code}`)
    .then(response => {
      console.log(response.data)
      console.log(response.data.slice(response.data.indexOf('=') + 1,response.data.indexOf('&')))
      const token = response.data.slice(response.data.indexOf('=') + 1,response.data.indexOf('&'))
      res.status(200).send(token)
    });
})

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => console.log('we are listening on port ' + PORT));