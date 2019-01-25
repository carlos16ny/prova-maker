module.exports = (app) => {

    app.get('/professores/listagem', (req, res)=>{
        
        var conn = app.database.connection.factory();
        var professor = new app.database.model.professorModel(conn);

        professor.listagem((erro, result)=>{
            if(erro){
                res.status(400).send(erro);
            }else{
                res.status(200).json(result);
            }
        })
    })

    app.post('/professores/adiciona', (req, res)=>{
        
        req.assert("nome", "Nome não pode ser nulo").notEmpty();
        req.assert("email", "Email não pode ser nulo").notEmpty().isEmail().isLength({max:45});
        req.assert("senha", "senha deve conter no minimo 8 carcteres").isLength({min:8});

        erros = req.validationErrors();

        if(erros){
            res.status(400).send(erros);
            return;
        }

        var md5 = require('md5');

        var prof = req.body;
        prof.senha = md5(prof.senha);

        var conn = app.database.connection.factory();
        var professor = new app.database.model.professorModel(conn);

        professor.adiciona(prof, (erro, result)=>{
            if(erro){
                res.status(400).send(erro);
            }else{
                res.status(201).json(result);
            }
        })
    })

    app.post("/professores/link/universidade_materia", (req, res)=>{

        dados = req.body;

        req.assert("universidade.id", "ID universidade não pode ser nulo").notEmpty();
        req.assert("disciplina.id", "ID da disciplina não pode ser nulo").notEmpty();
        req.assert("professor.id", "ID do professor não pode ser nulo").notEmpty();

        var erro = req.validationErrors();

        if(erro){
            res.status(400).send(erro)
            return;
        }

        var conn = app.database.connection.factory();
        var link = new app.database.model.professorModel(conn);

        link.linkagem(dados, (erros, result)=>{
            if(erros){
                res.status(400).json(erros);
            }else{
                res.status(201).json(result);
            }
        })
    })

    app.delete("/professores/del/remove", (req, res)=>{
        
        req.assert("professores.id", "ID do professor é obrigatório").notEmpty();

        erro = req.validationErrors();
        
        if(erro){
            res.status(400).send(erro);
            return;
        }


    })

}