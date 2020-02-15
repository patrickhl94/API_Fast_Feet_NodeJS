# Instruções iniciais de configuração do ambiente de desenvolvimento:
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
---
  ## ***Prettier***


   * **Instalação do Prettier e suas dependencias:** ` yarn add prettier eslint-config-prettier eslint-plugin-prettier -D` ou `npm install prettier eslint-config-prettier eslint-plugin-prettier -D`  

    