<h1 align="center">
    <img alt="Ignite" title="Ignite" src=".github/ignite.png" />
</h1>

<h2 align="center"> Desafio 01 - Database Queries</h2>

</br>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Preparando o ambiente para os testes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Rodando a aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Testes da aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">O que é o Docker</a>&nbsp;&nbsp;&nbsp;
</p>

## 📦 Tecnologias

- [Node.js](https://nodejs.org/en/)
- [Jest.js](https://jestjs.io/pt-BR/)
- [ESLint](https://eslint.org/)
- [Docker](https://www.docker.com/)
- [TypeORM](https://typeorm.io/#/)

## 📦 Sobre o desafio

O objetivo do desafio, é realizar consultas no banco de dados com o TypeORM de três maneiras:

- Usando o ORM
- Usando Query Builder
- Usando Raw Query

Isso irá nos ajudar a entender e exercitar os diferentes tipos de consultas que podemos fazer.

No template, você irá encontrar uma aplicação já estruturada (apenas as entidades e repositórios) onde você deverá completar o que falta nas consultas dos dois repositórios.

A aplicação possui dois módulos: `users` e `games`. Um **usuário** pode ter vários jogos e um mesmo **jogo** pode estar associado a vários usuários.

## 📦 Preparando o ambiente para os testes

Para que os testes funcionem, é importante que você crie uma database no banco Postgres com o nome queries_challenge e substitua os dados de autenticação (caso os seus não sejam os mesmos) no arquivo ormconfig.json.

**Atenção**: Se você precisou mudar alguma informação no arquivo de configuração **ormconfig.json** para que fosse possível rodar os testes, é necessário que, antes de mandar na plataforma da Rocketseat, você volte esses dados ao padrão que veio do template. Caso contrário, os testes não irão rodar corretamente na plataforma.

## 📦 Rodando a aplicação

Para rodar a aplicação será necessário ter isntalado o **Docker** em seu equipamento. Caso queira consultar o Banco de dados, utiliza um programa que leia base de dados Postgres como por exemplo **Beekeeper Studio** ou **Postbird**

## 📦 Testes da aplicação

### UsersRepository

- Método **findUserWithGamesById**
- Método **findAllUsersOrderedByFirstName**
- Método **findUserByFullName**

### GamesRepository

- Método **findByTitleContaining**
- Método **countAllGames**
- Método **findUsersByGameId**

## 📦 O que é o Docker

Docker é um conjunto de produtos de plataforma como serviço que usam virtualização de nível de sistema operacional para entregar software em pacotes chamados contêineres. Os contêineres são isolados uns dos outros e agrupam seus próprios softwares, bibliotecas e arquivos de configuração.