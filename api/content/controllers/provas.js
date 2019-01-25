module.exports = (app) => {
    app.get('./provas', (req, res)=>{
        res.send("provas");
    })
}