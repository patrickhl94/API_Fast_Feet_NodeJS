# **Instruções iniciais de configuração do ambiente de desenvolvimento:**
  ## ***Sucrase***
  Sucrase é uma alternativa ao Babel para trabalhar com a sintaxe mais
  avançada do JS, como por exemplo a sintaxe do (`import/export`).

  * **Instalação do Sucrase:** ` yarn add sucrase -D` ou `npm install sucrase -D`
  * Após instalado, basta executar o comando: `sucrase-node server.js`

  * **Executando sucrase com o nodemon:** Para executar o sucrase com o `nodemon` é 
  necessário criar o arquivo `nodemon.json` na raiz do projeto com o seguinte json:
  ```
  {
    "execMap" : {
    "js" : "node -r sucrase/register"
    } 
  }
  ```
  ### Configuração para debugar com o sucrase  
Para debugar com o sucrase, é necessário algumas configurações:

* Criar o launch.json da pasta .vscode, para abrir esta pasta, basta abrir o menu debug,
e iniciar uma nova configuração

* Dentro deste arquivo é necessário alterar "request" para "attach", e inserir o "protocol": "inspector"

* Também é necessário inserir no package.json o seguinte script: ` "start:debug" : "nodemon --inspect src/server.js"`

* Para o debug reniciar automatimante após um debug basta inserir a propriedade `"restart": true`
no launch.json de configuração debug

**Resultado final do launch.json:**
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Executar Programa",
      "protocol": "inspector",
      "restart": true
    }
  ]
}
```
  #### ***[Documentação do Sucrase](https://github.com/alangpierce/sucrase)***
___
  ## ***ESLint***
  ESLint é uma biblioteca para de padronização de código, nesta biblioteca é possível
  usar padronizações de algumas empresas de desenvolvimento de softwares, como por
  exemplo do Airbnb.

  * **Instalação do ESLint:** ` yarn add eslint -D` ou `npm install eslint -D` com as 
  seguintes configurações: 
  * Após instalado é necessario iniciar o ESLint através do comando: `yarn eslint --init`
    * **1° config:** To check syntax, find problems, and enforce code style.
    * **2° config:** Escolher entre: (`require/exports`) ou (`import/export`).
    * **3° config:** Escolher o framework ou `None od these`.
    * **4° config:** Escolher se usa typescript.
    * **5° config:** Com a barra de espaço marcar Broser ou Node.
    * **6° config:** Escolher o stilo. 
    * **7° config:** Formato JavaScript. 
    * **8° config:** Aceitoar instalar as dependencias do npm do padrão de estilo escolhido. 
  
    ***Por padão o ESLint instala as dependencias pelo npm, gerando o arquivo `package-lok.json`, 
    e caso esteja usando o `yarn`, basta apagar o arquivo gerado e executar o comando `yarn` no terminal.***
  
  Apos realizado a instalação o ESLint vai criar o arquivo `.eslintrc.js`, onde será realizado as principais configurações.
  * Antes de iniciar as configuração no `.eslintrc.js` é necessario instalar a extenção ESLint no VSCode, caso já tenha instalado não será necessário instalar novamente.
  * Para o VSCode corrigir os erros identificados pelo ESLint, é necessário inserir no arquivo do VSCode `settings.js` o seguinte script:
    ```
    "[javascript]" : {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        }
    },
    "[javascriptreact]" : {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        }
    ```
  * Dentro do arquivo `.eslintrc.js` tem uma propriedade chamada `"rules"`, nessa propriedade ficará todas as regras que sobrescreverá as regras da estilização padrão. Abaixo está as configurações padrão que usarei.
    ```
    rules: {
       "prettier/prettier" : "error",
       "class-methods-use-this": "off",
       "no-param-reassign": "off",
       "camelcase": "off",
       "no-unused-vars" : ["error", { "argdIgnorePAtter": "next" }],
       "linebreak-style": 0,
       "global-require": 0,
     }
    ```  
  #### ***[Documentação do ESLint](https://eslint.org/)***
---
  ## ***Prettier***
  O Prettier é uma ferramenta que deiza o código mais bonito, como por exemplo formatando o tamanho da linha do código.

   * **Instalação do Prettier e suas dependencias:** ` yarn add prettier eslint-config-prettier eslint-plugin-prettier -D` ou `npm install prettier eslint-config-prettier eslint-plugin-prettier -D`  
   * Após instalado, é necessário inserir no `eslintrc.js` na propriedade `'extends'` o valor `'prettier'`, como se trata de um objeto, e nesse atributo ja tem o valor `'airbnb-base'` é necessário colocar os dois valores dentro de um array ficando no seguinte formato: `extends: ['airbnb-base','prettier']`, além disse também é necessário inserir a propriedade `plugins: ['prettier']`
 
 ***O Prettier tem um problema de compatibilidade com o ESLint, que é o caso da aspas duplas e simples, para corrigir este problema é necessário criar um arquivo*** `.prettiercr` ***que é um arquivo JSON, com a seguinte configuração:***
  ```
  {
   "singleQuote" : true,
   "trailingComma" : "es5"
  }
  ```
  #### ***[Documentação do Prettier](https://prettier.io/)***
  ---
  ## ***Editor Config***
  Esta ferramenta serve para equipes que tenha desenvolvedores que usam editores de códigos diferentes.

  * O Editor Config é uma extensão do VSCode que precisa ser instalada.
  * Após instalada, clicar com o botão direito na área das pastas e arquivos do projeto e selecionar `Generate .editorconfig`, após isso será gerado um arquivo `.editorconfig` que deverá ser configurado da seguinte forma: 
    ```
    root = true

    [*]
    indent_style = space
    indent_size = 2
    charset = utf-8
    trim_trailing_whitespace = false
    insert_final_newline = false
    ```
   #### ***[Documentação do Editor Config](https://editorconfig.org/)***
   ___
   ___
# **Instruções de armazenamento no banco de dados**   
  ## ***Docker***
  * **Criar banco de dados no docker:** Nesse projeto irei utilizar o BD Postgres.
  * **Criar novo container com o banco de dados:** `docker run --name databasefastfeet -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`. --name é o nome do **CONTAINER**, POSTGRES_PASSWORD é a senha do BD e -p é o redirecionamento de porta, caso a porta 5432 esteja ocupada, basta alterar como por exemplo 5433:532.
  * Por 'default' o usuário do banco de dados será `postgres`, porem para alterar este usuário, basta inserir a variável POSTGRES_USER=nomeUser, quando estiver criando o container.
  * Para não ficar criando database dentro banco de dados de forma manual pelo terminal, existe um software com interface que facilita esse processo, que se chama `POSTBIRD`, no Postbird é possível criar um database clicando em create Database. O outros processos de criar, excluir e editar tabelas, seram todos feitos pelo `Sequelize`.    
  
  #### ***[Documentação Docker com Postgres](https://hub.docker.com/_/postgres)***
    
  
  ## ***Sequelize***
  Sequelize é um ORM que abstrai os comandos SQL e a criação de tabelas no banco de dados.
  * **Instalação do Sequelize:** `yarn add sequelize` ou `npm intall sequelize`  
  * Também é necessário instalar o `sequelize-cli` que é uma interface de linha de comando, que serve para executar os coamndo do sequelize via terminal. 
  * **Instalação do Postgres:** Para o Sequelize identificar o Postgres, é necessario ter as seguintes dependencias instalas: `yarn add pg pg-store` ou `nom install pg pg-store`. Caso tenha interesse em utilizar outro BD, consultar a documentação para verificar as configurações necessárias.  
  * **Configuração da base de dados:** 
    * Na raiz do projeto é necessário criar o arquivo `.sequelizerc`, este arquivo é responsável por exportar os caminhos onde estão os arquivos e pastas do sequelize. Este arquivo precisa está na sintaxe `JavaScript` e ele não aceita a sintaxe do (`import/export`).
      * Dentro do `.sequelizerc` conterá o script abaixo:
        ```
        const { resolve } = require('path')

        module.exports = {
          config: resolve(__dirname, 'src', 'config', 'database.js'),
          'models-path' : resolve(__dirname, 'src', 'app', 'models'),
          'migrations-path' : resolve(__dirname, 'src', 'database', 'migrations'),
          'seeders-path' : resolve(__dirname, 'src', 'database', 'seeds'),
        }
        ``` 
    * Criar um arquivo `database.js` dentro da pasta `config`
      * Dentro desta pasta conterá as configuraçãos do banco de dados conforme exemplo abaixo:
        ```
        module.exports = {
            dialect: 'postgres',
            host: 'localhost',
            username: 'postgres',
            password: 'docker',
            database: 'FastFeet',
            define: {
               timestamps: true,
               underscored: true,
               underscoredAll: true,
             },
        };     
        ``` 
#### ***[Documentação Sequelize](https://sequelize.org/v5/manual/getting-started.html)***        
