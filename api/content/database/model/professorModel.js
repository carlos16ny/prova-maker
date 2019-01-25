class professorModel{

    constructor(conn){
        this._connection = conn;
    }

    listagem(callback){
        this._connection.query("SELECT * FROM professores", callback);
    }

    adiciona(professsor, callback){
        this._connection.query("INSERT INTO professores SET ?", professsor, callback);
    }

    linkagem(dados, callback){
        console.log(dados);
        this._connection.query("INSERT INTO professor_has_disciplina_on_universidade VALUES (?, ?, ?, ?)", [null, dados.universidade.id, dados.disciplina.id, dados.professor.id], callback );
    }
}

module.exports = ()=>{
    return professorModel;
}