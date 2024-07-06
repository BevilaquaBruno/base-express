const { Client } = require("basic-ftp");
let helper = {};

// método para criar a conexão
helper.getFtpConnection = async () => {
  //instancia a conexão
  const client = new Client()

  //verbose é para exibir os logs de acesso no cmd, desativei
  //client.ftp.verbose = true
  try {
    // cria a conexão
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS,
      port: process.env.FTP_PORT,
      secure: true,
    });
  }
  catch (err) {
    console.log(err);
  }

  //retorna a conexao
  return client;
}

//exporta o módulo
module.exports = helper