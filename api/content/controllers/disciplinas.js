module.exports = (app) => {
    
    app.get('/disciplinas/listagem', (req, res)=>{

        const conn = app.database.connection.factory();
        const disciplinas = new app.database.model.disciplinaModel(conn);

        disciplinas.lista((erro, result)=>{
            if(erro){
                res.status(400).send(erro);
                return;
            }else{
                res.status(200).json(result);
            }
        })
    })

    app.post("/disciplinas/adiciona", (req, res)=>{

        req.assert("nome", "Nome da disciplina é obrigatório").notEmpty().len(2, 45);

        var erros = req.validationErrors();

        if(erros){
            res.status(400).send(erros);
            return;
        }

        var conn = app.database.connection.factory();
        var disciplina = new app.database.model.disciplinaModel(conn);

        disciplina.adiciona(req.body, (erro, result)=>{
            if(erro){
                res.status(200).send(erro);
            }else{
                res.status(201).json(result);
            }
        })

    })

    app.delete("/disciplinas/del/remove/:id", (req, res)=>{
        
        id = req.params.id;

        var conn = app.database.connection.factory();
        var disciplina = new app.database.model.disciplinaModel(conn);

        disciplina.remove(id, (erro, result)=>{
            if(erro){
                res.status(500).send(erro);
            }else{
                res.status(200).json(result);
            }
        })

    })

    app.get("/disciplina/:id", (req, res)=>{
        id = req.params.id;

        var conn = app.database.connection.factory();
        var disciplina = new app.database.model.disciplinaModel(conn);

        disciplina.getDisciplinaById(id, (erro, result)=>{
            if(erro){
                res.status(500).send(erro);
            }else{
                res.status(200).json(result);
            }
        })

    })
}