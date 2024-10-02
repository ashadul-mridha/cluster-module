const express = require('express');




const app = express();
const port = 3000;
app.get('/', async (req, res) => {
    res.send('Hello World');
});


app.get('/hello', (_req, res) => {
    return res.send('Hello World');
})

app.get('/bye', (_req, res) => {

    for (let i = 0; i < 10000000000; i++) {
        // console.log(i);
    }
    
    return res.send('Goodbye World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})