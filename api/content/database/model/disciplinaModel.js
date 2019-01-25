class disciplinaModel {
    
    constructor(connection){
        this._connection = connection;
    }

    lista(callback){
        this._connection.query("SELECT * FROM disciplina", callback);
    }

    adiciona(disciplina, callback){
        this._connection.query("INSERT INTO disciplina SET ?", disciplina, callback);
    }

    remove(id, callback){
        this._connection.query("DELETE FROM disciplina WHERE id = ?", id, callback);
    }

    getDisciplinaById(id, callback){
        this._connection.query("SELECT * FROM disciplina WHERE id = ?", id, callback);
    }
}

module.exports = () => {
    return disciplinaModel;
}