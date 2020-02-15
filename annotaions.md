# Instruções iniciais de configuração do ambiente de desenvolvimento:
  ## Sucrase
  Sucrase é uma alternativa ao Babel para trabalhar com a sintaxe mais
  avançada do JS, como por exemplo a sintaxe do (`import/export`).

  **Instalação do Sucrase:** ` yarn add sucrase -D` ou `npm install sucrase -D`
  Após instalado, basta executar o comando `sucrase-node server.js`

  **Executando sucrase com o nodemon:** Para executar o sucrase com o `nodemon` é 
  necessário criar o arquivo `nodemon.json` na raiz do projeto com o seguinte json:
  `{
    "execMap" : {
    "js" : "node -r sucrase/register"
    } 
  }`


    