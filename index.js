const express = require('express');
const app = express();
const PORT = 3001;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(PORT,() => {
    console.log('server started on port 3000');
})

db.sequelize.sync()
    .then((result) => {
        app.listen(3000, () => {
            console.log(err);
        })
    })

app.post('/komik', async (requestAnimationFrame, res) => {
    const data = req.body;
    try{
        const komik = await db.Komik.create(data);
        res.send(komik);
    } catch (error){}
    res.send({message: error.message});
});

app.get('/komik', async (req, res) => {
    try{
        const komik = await db.Komik.findAll();
        res.send(komik);
    } catch (error){}
    res.send({message: error.message});
});

app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try{
        const komik = await db.Komik.update(data, {where: {id: id}});
        if (!komik){
            return res.send({message: 'data not found'});
        }
        res.send(komik);
    } catch (error){}
    res.send({message: error.message});
});