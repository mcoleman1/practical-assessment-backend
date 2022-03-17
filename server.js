const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAAY8aQEAAAAALDh2wkknhF9KpvY16L7r44VYQvM%3DGtTsDNEUeQ0hgyeMW0K4eywwo77gV5CRfhLbcY1frh3TTHg5ps';

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.post('/api/tweets', (req, res) => {
  let query = req.body.query;
  let maxResults = req.body.maxResults;

  if (query.includes("#")) {
    query = query.replace('#', '%23');
  }
  axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=${maxResults}`, {
    headers: {
      'Authorization': `Bearer ${bearerToken}`
    }
  })
  .then(response => {
    res.send(response.data.data).status(200);
  })
  .catch(err => console.error(err));
});

app.listen(3000);