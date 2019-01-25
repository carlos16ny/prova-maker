class universidadeModel {

    constructor(connection){
        this._connection = connection;
    }

    adiciona(universidade, callback){
        this._connection.query("INSERT INTO universidades SET ?", universidade, callback);
    }

    remove(universidade, callback){
        this._connection.query("DELETE FROM universidades WHERE id = ?", universidade.id, callback)
    }

    lista(callback){
        this._connection.query("SELECT * FROM universidades", callback);
    }

    getUniversidadeByID(universidade, callback){
        this._connection.query("SELECT * FROM universidades WHERE id = ?", universidade.id, callback)
    }

    getUniversidadeByEstado(estado, callback){
        this._connection.query("SELECT * FROM universidades WHERE estado = ?", estado , callback)        
    }
}

module.exports = () => {
    return universidadeModel;
}