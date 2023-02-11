const express = require('express')
const { response } = require('express')
const app = express()
const axios = require('axios');

app.get('/', (request, response) => {
    return response.send('Line Notify | Androssy')
})
app.post('/notify', (req, res) => {
    if (req.headers.message && req.headers.token) {
        console.log(req.headers)
        try {
            let response = axios({
                method: 'post',
                url: `https://notify-api.line.me/api/notify`,
                params : {
                    message : req.headers.message
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + req.headers.token
                },
            });
            console.log(response)
            return res.send("Succcess")
        } catch (err) {
            return res.send("Failed While Sending")
        }
    } else {
        return res.send("Invaild Message")
    }
})

app.all("*", (request, reponse) => {
    return reponse.status(404).send()
})

app.listen(80, console.log('app loaded'))