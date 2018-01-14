import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

/**
 * app.use(compression());
 * used to enable gzip compression
 * This is NOT for actual production
 * This is just useful for hosting the minified production build
 * for local debugging purposses.
 */
app.use(compression()); // enable gzip compression
app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('running on port ' + port);
    open('http://localhost:' + port);
  }
});
