//classe responsavel por acessar o BD E gravar os dados
import {Storage, SqlStorage} from 'ionic-angular';

export class DAOLancamentos {
  constructor(){
    let storage = new Storage(SqlStorage);

    storage.query("CREATE TABLE IF NOT EXISTS lancamentos (id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    " descricao TEXT, valor REAL, data INTEGER, conta TEXT, entradaSaida TEXT, pago INTEGER)").then((data) => {
      console.log("Tabela criada");
    }, (error) => {
      console.log("Erro: " + JSON.stringify(error.err));
    });
  }

  insert(lancamento, successCallback) {
    let storage = new Storage(SqlStorage);

    storage.query("INSERT INTO lancamentos(descricao, valor, data, conta, entradaSaida, pago) " +
      "VALUES (?, ?, ?, ?, ?, ?)", [lancamento.descricao, lancamento.valor, lancamento.data,
      lancamento.conta, lancamento.entradaSaida, lancamento.pago]).then((data) => {
        successCallback(lancamento);
      }, (error) => {
        console.log("Erro: " + JSON.stringify(error.err));
      })
  }

  getList(successCallback){
    let storage = new Storage(SqlStorage);

    storage.query("SELECT * FROM lancamentos", []).then((data) => {
      let lista = [];

      for(var i=0; i < data.res.rows.length; i++){
        let lancamentoDB = data.res.rows.item(i);

        let lancamento = {id: lancamentoDB.id,
          descricao: lancamentoDB.descricao,
          valor: lancamentoDB.valor,
          data: lancamentoDB.data,
          conta: lancamentoDB.conta,
          entradaSaida: lancamentoDB.entradaSaida,
          pago: lancamentoDB.pago
        }
        lista.push(lancamento);
      }
      successCallback(lista);
    }, (error)=> {
      console.log("Erro: " + JSON.stringify(error.err));
    });
  }

  delete(lancamento, successCallback){
    let storage = new Storage(SqlStorage);

    storage.query("DELETE FROM lancamentos WHERE id = ?", [lancamento.id]).then((data) =>{
      successCallback(lancamento);
    });
  }

  edit(lancamento, successCallback){
    let storage = new Storage(SqlStorage);

    storage.query("UPDATE lancamentos SET descricao = ?, valor = ?, data = ?, conta = ?, entradaSaida = ?, pago = ? WHERE id = ?", [lancamento.descricao, lancamento.valor, lancamento.data, lancamento.conta, lancamento.entradaSaida, lancamento.pago, lancamento.id]).then((data) => {
      successCallback(lancamento);
    });
  }

}
