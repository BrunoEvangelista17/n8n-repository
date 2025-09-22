# Desafio n8n - Conector Customizado "Random.org"

Este repositório contém a solução para o desafio de desenvolvimento de um conector (custom node) para a plataforma de automação n8n. O conector, chamado **"Random"**, integra-se com a API pública do [Random.org](https://www.random.org/) para gerar números inteiros verdadeiramente aleatórios dentro de um intervalo especificado.

O projeto foi desenvolvido seguindo as melhores práticas recomendadas pela documentação do n8n, utilizando Docker e Docker Compose para garantir um ambiente de desenvolvimento e teste consistente e de fácil configuração.

## Tecnologias Utilizadas

  * **n8n:** Plataforma de automação de workflows.
  * **Node.js & TypeScript:** Linguagem e ambiente para o desenvolvimento do conector.
  * **Docker & Docker Compose:** Para orquestração dos contêineres da aplicação n8n e do banco de dados.
  * **PostgreSQL:** Banco de dados para a instância do n8n.

## Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em sua máquina:

  * [Docker](https://www.docker.com/get-started/)
  * [Docker Compose](https://docs.docker.com/compose/install/)
  * [Node.js](https://nodejs.org/) (v20+) e npm
  * [Git](https://git-scm.com/)

-----

## 🚀 Como Executar o Projeto (Instalação e Execução)

Siga os passos abaixo para configurar, compilar e iniciar a aplicação.

### 1\. Clonar o Repositório

```bash
git clone <url-do-seu-repositorio-github>
cd <nome-do-repositorio>
```

### 2\. Configurar Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto, copiando o conteúdo abaixo. Ele será usado pelo Docker Compose para configurar as credenciais do banco de dados.

```env
# Variáveis de ambiente para o banco de dados PostgreSQL
POST_GRES_USER=n8n
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=n8n
```

**Observação:** Por segurança, o arquivo `.env` já está incluído no `.gitignore` para não ser enviado ao repositório.

### 3\. Instalar Dependências e Compilar o Projeto (Build)

Agora, instale as dependências do Node.js e compile o código-fonte do conector de TypeScript para JavaScript.

```bash
# Instala todas as dependências do projeto
npm install

# Compila o código do conector para a pasta /dist
npm run build
```

Este passo é essencial para que o n8n, ao ser iniciado, encontre os arquivos do conector prontos para serem carregados.

### 4\. Iniciar os Serviços com Docker

Com o projeto compilado, inicie os contêineres do n8n e do PostgreSQL:

```bash
docker-compose up -d
```

Este comando irá baixar as imagens necessárias (na primeira vez) e iniciar os serviços em segundo plano (`-d`). Aguarde cerca de um minuto para a inicialização completa.

### 5\. Acessar o n8n

A instância do n8n estará disponível no seu navegador:

  * **URL:** [http://localhost:5678](http://localhost:5678)

Utilize as seguintes credenciais de teste para fazer login:

| Campo | Valor |
| :--- | :--- |
| **Email** | `onflytestebruno@gmail.com` |
| **Senha** | `TesteOnfly#2025` |

-----

## 🧪 Executar os Testes

Este é o teste para validar a funcionalidade do conector recebendo dados de um passo anterior.

1.  **Acesse o n8n** e clique em **"Create Workflow"**.
2.  Adicione um node **"Set"** para simular o input do usuário.
      * **Name**: `minInput`, **Value**: `10`
      * **Name**: `maxInput`, **Value**: `50`
3.  Adicione o seu conector **"Random"** após o node "Set".
4.  No painel de configurações do node "Random", use **expressões** para ler os dados do node anterior:
      * **Min**: `{{$json["minInput"]}}`
      * **Max**: `{{$json["maxInput"]}}`
5.  Clique no botão **"Execute workflow"**.
6.  Verifique a aba "Output" do node "Random": o resultado deve conter o campo `randomNumber` com um número dentro do intervalo definido (entre 10 e 50).
    ```json
    {
      "minInput": 10,
      "maxInput": 50,
      "randomNumber": 37
    }
    ```

-----

## ℹ️ Informações Adicionais

### Fluxo de Desenvolvimento

Para fazer novas alterações no código do conector, o fluxo é:

1.  Edite o arquivo `nodes/Random/Random.node.ts`.
2.  Recompile o projeto com `npm run build`.
3.  Reinicie o serviço do n8n para carregar as alterações: `docker-compose restart n8n_app`.
