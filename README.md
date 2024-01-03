Esse projeto é baseado em Next.JS e Prisma.

## Getting Started

É necessário possuir a última versão do node instalado em sua maquina `v20.10.0`;

Primeiro, faça a instalaçao do MySql em sua máquina:

Acesse https://dev.mysql.com/downloads/file/?id=523568 e clique em: `No thanks, just start my download`
- Siga o passo a passo de instalação do instalador;
- Defina o nome do usuário como `root`;
- Defina a senha do usuário de acordo com sua preferência;
- Defina a porta utilizada como `3306`;
- Após a instalação do banco de dados, acesse o propt de comando e rode a seguinte linha `mysql --host=localhost --user=root --password`;
- Logo após rodar a linha anterior, digite sua senha definida para o banco de dados e tecle enter;
- Será apresentada uma tela de boas vindas do MySql, após isso digite `create database next;` e tecle enter; 
- Após esses passos seu banco de dados já está configurado para se conectar com o projeto.

O segundo passo para a instalação é realizar a configuração na api do projeto:
- Crie um arquivo na raiz do projeto com o nome de `.env`;
- Acesse o arquivo `.env` e cole a seguinte linha `DATABASE_URL="mysql://root:alterarEssaSenha@localhost:3306/next"` de acordo com as configurações do seu banco de dados, caso você tenha seguido exatamento como nas instruções passadas sera necessário alterar somente a senha, localizada na  linha como `alterarEssaSenha`. 
- É importante ressaltar que o uso de símbolos na senha podem causar problemas na hora de conectar, é aconselhado que utilize apenas letras e números se possível.
- Após feito isso, é necessário acessar a rota `backend\prisma` no terminal e rodar `npx prisma migrate dev`;
- Escolha um nome que faça sentido para o migrate que está sendo criado;

Terceiro e último passo:
- Com o terminal aberto, acesse o caminho `backend\src`;
- Rode o comando `npm install`;
- Rode o comando `node index.js`;

Pronto, seu projeto está rodando na porta [http://localhost:3380].