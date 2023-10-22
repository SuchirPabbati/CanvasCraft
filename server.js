const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/exchange', (req, res) => {
    const code = req.body.code;
    
    const redirectUri = 'https://ghaeonkdgkpombekogbeghcbcgkofdbe.chromiumapp.org/';

    const options = {
        url: 'https://oauth2.googleapis.com/token',
        form: {
            code: code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        }
    };

    request.post(options, (err, httpResponse, body) => {
        if (err) {
            console.error('An error occurred: ', err);
            res.status(500).send(err);
        } else {
            res.send(body);
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
