# Consulta Clima

Aplicação web que mostra a previsão do tempo atual de qualquer cidade do mundo. O usuário digita o nome da cidade e recebe temperatura atual, máxima, mínima, umidade e velocidade do vento, usando a API da OpenWeather.

## Tecnologias

HTML, CSS, JavaScript, Node.js e Express.

## Sobre o backend

O projeto usa um servidor Node.js/Express para intermediar as chamadas à API da OpenWeather. Isso mantém a chave de API guardada apenas no servidor, evitando que ela fique exposta no código do front-end, visível a qualquer pessoa pelo navegador.

## Como rodar localmente

É necessário ter o Node.js instalado e uma chave de API gratuita da OpenWeather. Depois de clonar o repositório, instale as dependências do projeto, crie um arquivo de variáveis de ambiente com sua chave de API (seguindo o modelo do arquivo de exemplo incluído no projeto) e inicie o servidor. A aplicação fica disponível em localhost, na porta configurada.

## Autor

Desenvolvido por Gustavo Porfirio — [LinkedIn](https://www.linkedin.com/in/gustavo-porfirio-58461a407/) · GitHub
