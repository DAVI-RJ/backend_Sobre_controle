# Sobre controle

Este repositório apresenta o backend de um projeto Full-stack desenvolvido com foco em boas práticas de codificação e uma arquitetura robusta. Segue uma abordagem cuidadosa no desenvolvimento backend com Node.js e Express, utilizando Sequelize como ORM. A intenção é exibir a aplicação de princípios de design e engenharia de software em um contexto real, entendendo que cada projeto possui suas necessidades específicas.

## Tecnologias Utilizadas

 - Backend: Node.js, Express.js
 - Yarn (gerenciar a instalação de pacotes)
 - ORM: Sequelize
 - Banco de Dados: PostgreSQL
 - Autenticação: JWT (JSON Web Tokens)
 - Validação: Yup
 - Segurança: Bcrypt (hash de senhas)
 - Logging: Winston
 - Variáveis de Ambiente: Dotenv
 - Estrutura de Módulos: ES Modules
 - CORS: conexão API frontend

## Arquitetura e Boas Práticas

O projeto segue uma arquitetura MVC (Model-View-Controller) clara, promovendo a separação de responsabilidades e a manutenibilidade do código. A decisão de utilizar ES Modules no ambiente Node.js, mesmo com os desafios que podem surgir (especialmente com ferramentas como sequelize-CLI), reflete um compromisso com as abordagens mais modernas do JavaScript.
Algumas das boas práticas e implementações notáveis neste repositório incluem:
 - Suporte a async/await: Para um fluxo de controle assíncrono mais limpo e legível.
 - Implementação do Logger Winston: Gerenciamento centralizado de logs para monitoramento e depuração eficazes.
 - Tratamento de Erros Robusto: Mecanismos padronizados para capturar e responder a erros de forma controlada.
 - Suporte a Sequelize: Utilização de um ORM para interagir com o banco de dados de maneira eficiente e segura.
 -Validação Básica de Yup: Garantindo a integridade dos dados de entrada.
 - Senhas Hash com Bcrypt: Armazenamento seguro de credenciais.
 - Implementação de JWT: Sistema de autenticação baseado em tokens para segurança das rotas.
 - Variáveis de Ambiente (.env): Gerenciamento seguro de configurações sensíveis e específicas do ambiente.
 - Configuração de CORS para aceitar requisições apenas de API cadastrada e rota com HTTPS.
 - Eslint

## Como Rodar o Projeto

Para configurar e executar este projeto localmente, siga os passos abaixo:
  #### Clone o repositório:
  ```
   git clone https://github.com/DAVI-RJ/backend_node.js
  ```
  #### cd backend_node.js
  -Instale as dependências:
  ```
    npm install # ou yarn install
  ```
 #### Configuração do Banco de Dados (.env):
   Este projeto utiliza o Sequelize como ORM. Você precisará criar um arquivo .env na raiz do projeto com as credenciais do seu banco de dados e outras configurações essenciais.
  
   Exemplo de .env:
   	DB_HOST=localhost
		DB_USER=seu_usuario
		DB_PASS=sua_senha
		DB_NAME=seu_banco_de_dados
		DB_DIALECT=postgres
    JWT_SECRET=sua_chave_secreta_jwt
    PORT=3000


   As configurações específicas do Sequelize, como as definidas no config/config.js (geradas pelo Sequelize-CLI), devem ser ajustadas conforme seu ambiente local e sistema operacional. Cada ambiente pode ter variações em como o banco de dados é acessado.

  -Execute as migrações do banco de dados (se aplicável):
  ```
   npx (yarn ou npm) sequelize-cli db:migrate
  
  ```

  #### Inicie o servidor:
  ```
   yarn run dev

  ```
   O servidor estará rodando em http://localhost:[PORTA_CONFIGURADA_NO_ENV].

## Testes
A qualidade de software é uma prioridade fundamental neste projeto. Embora os testes detalhados (unitários, de integração e ponta a ponta) não estejam incluídos diretamente neste repositório principal, eles foram desenvolvidos e estão disponíveis em um repositório dedicado.
Você pode explorar as estratégias de teste, as abordagens de qualidade de software e as ferramentas utilizadas para este projeto em:

Demonstração do Projeto
Para ter uma visão rápida das funcionalidades principais do projeto em ação e como as APIs se comportam, confira as demonstrações abaixo:
 * login empresa: 
 
