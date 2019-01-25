module.exports = (app) => {
    app.get('./materias', (req, res)=>{
        res.send("materias");
    })
}