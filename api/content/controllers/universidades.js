module.exports = (app) => {

    app.get('/universidades/listagem', (req, res)=>{
        
        const conn = app.database.connection.factory();
        const universidade = new app.database.model.universidadeModel(conn);

        universidade.lista((erro, result)=>{
            if(erro){
                res.status(400).send(erro);
                return;
            }else{
                res.status(200).json(result);
            }
        })
    })

    app.post('/universidades/adiciona', (req, res)=>{
        
        req.assert("nome", "Nome da universidade é obrigatório").notEmpty();
        req.assert("estado", "Estado da universidade é obrigatório | MAX 2 CHAR").notEmpty().len(2,2);
        req.assert("abreviatura", "Abreviatura é obrigatório").notEmpty().len(2,10);

        var error = req.validationErrors();

        if(error){
            console.log("erros na validação de dados");
            res.status(400).send(error);
            return;
        }

        uni = req.body;
        uni.abreviatura = uni.abreviatura.toUpperCase();


        const conn = app.database.connection.factory();
        const universidade = new app.database.model.universidadeModel(conn);

        universidade.adiciona(uni, (erro, result) => {
            if(erro){
                res.status(500).send(erro);
                return;
            }else{
                uni.id = result.insertId;
                res.location("/universidades/lista/" + uni.id);
            }
            res.status(201).json(uni);
        })

    })

    app.delete('/universidades/del/remove/:id', (req, res)=>{

        uni = {};
        uni.id = req.params.id;

        const conn = app.database.connection.factory();
        const universidade = new app.database.model.universidadeModel(conn);

        universidade.remove(uni, (erro, result)=>{
            if(erro){
                res.status(400).send(erro);
                return;
            }else{
                res.status(200).json(result);
            }
        })

    })

    app.get('/universidade/:id', (req, res)=>{
        uni = {};
        uni.id = req.params.id;

        const conn = app.database.connection.factory();
        const universidade = new app.database.model.universidadeModel(conn);
        
        universidade.getUniversidadeByID(uni, (erro, result)=>{
            if(erro){
                res.status(400).send(erro);
            }else{
                res.status(200).json(result);
            }
        })
        
    })

    app.get('/universidades/estado/:estado', (req, res)=>{
        var estado = req.params.estado;

        const conn = app.database.connection.factory();
        const universidade = new app.database.model.universidadeModel(conn);

        universidade.getUniversidadeByEstado(estado, (erro, result)=>{
            if(erro){
                res.status(400).send(erro)
            }else{
                res.status(200).json(result)
            }
        })

    })

}