const app = require('./config/custom-config')();

app.get('/', (req, res) => {
    res.send("funcinando")
})

app.listen(3000, ()=>{
    
})
