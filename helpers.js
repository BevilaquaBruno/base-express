const { Client } = require("basic-ftp");

let helper = {};

helper.getFtpConnection = async () => {
  const client = new Client()
  //client.ftp.verbose = true
  try {
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

  return client;
}

module.exports = helper