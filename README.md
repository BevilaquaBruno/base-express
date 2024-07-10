# Para rodar:

> Precisa instalar o [node](https://nodejs.org/pt)

> Criar um FTP de exemplo pode usar o https://sftpcloud.io/tools/free-ftp-server

> Logar nesse FTP de teste e fazer upload de imagens (na raiz): https://demo.filestash.app/login

- Criar uma cópia do .env.example com o nome .env
- Preencher os campos do .env com base no acesso do FTP
- Criar uma pasta images dentro de public/

### Rodar para iniciar:

`npm run start`

### Achei meio lento a conexão com FTP, FTP é paia mesmo. 
### Coloquei comentários no código explicando tudo, alguns locais precisaria alterar de acordo como for usar ou adicionar algo.

### Quando acessar a página [localhost:3000](localhost:3000) a api vai consultar no FTP e vai baixar só as imagens que ainda não estão na pasta `public/images`, a lista de imagens ele manda pro front renderizar.

### Toda vez que acessa essa página ele acessa o FTP e busca as imagens. Se for o caso da pra criar um endpoint que só faz o download e o link da página fica mais rápido (eu acho).

![Imagem de exemplo](public/app_exemplo.png)