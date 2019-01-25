module.exports = (app) => {
    app.get('./questoes', (req, res)=>{
        res.send("questoes");
    })
}