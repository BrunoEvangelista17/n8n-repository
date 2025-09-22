# Desafio n8n - Conector Customizado "Random.org"

Este repositório contém a solução para o desafio de desenvolvimento de um conector (custom node) para a plataforma de automação n8n. O conector, chamado **"Random"**, integra-se com a API pública do [Random.org](https://www.random.org/) para gerar números inteiros verdadeiramente aleatórios dentro de um intervalo especificado.

O projeto foi desenvolvido seguindo as melhores práticas recomendadas pela documentação do n8n, utilizando Docker e Docker Compose para garantir um ambiente de desenvolvimento e teste consistente e de fácil configuração.

## Tecnologias Utilizadas

  * **n8n:** Plataforma de automação de workflows.
  * **Node.js & TypeScript:** Linguagem e ambiente para o desenvolvimento do conector.
  * **Docker & Docker Compose:** Para orquestração dos contêineres da aplicação n8n e do banco de dados.
  * **PostgreSQL:** Banco de dados para a instância do n8n.

## Pré-requisitos

  * [Docker](https://www.docker.com/get-started/)
  * [Docker Compose](https://docs.docker.com/compose/install/)
  * [Node.js](https://nodejs.org/) (v20+) e npm (para o desenvolvimento e instalação de dependências)
  * [Git](https://git-scm.com/)

-----

## ⚙️ Configuração do Ambiente

Siga os passos abaixo para preparar o ambiente de execução e desenvolvimento.

### 1\. Clonar o Repositório

```bash
git clone <url-do-seu-repositorio-github>
cd <nome-do-repositorio>
```

### 2\. Instalar as Dependências

Este passo instala as ferramentas necessárias para compilar, testar e formatar o código do conector customizado.

```bash
npm install
```

### 3\. Configurar Variáveis de Ambiente

O Docker Compose utiliza um arquivo `.env` para gerenciar as credenciais do banco de dados de forma segura.

Crie um arquivo chamado `.env` na raiz do projeto e adicione o seguinte conteúdo:

```env
# Variáveis de ambiente para o banco de dados PostgreSQL
POSTGRES_USER=n8n
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=n8n
```

**Observação:** Por segurança, o arquivo `.env` já está incluído no `.gitignore` para não ser enviado ao repositório.

-----

## 🚀 Executar o Serviço Localmente (usando Docker)

Com o ambiente configurado, basta um comando para iniciar a aplicação.

### 1\. Iniciar os Serviços

Execute o seguinte comando no terminal, a partir da raiz do projeto:

```bash
docker-compose up -d
```

Este comando irá:

1.  Baixar as imagens do n8n e do PostgreSQL.
2.  Criar e iniciar os contêineres em segundo plano (`-d`).
3.  Mapear os volumes para persistência de dados e para carregar o conector customizado.

Aguarde cerca de um minuto para que os serviços iniciem completamente. Você pode verificar os logs com `docker-compose logs -f`.

### 2\. Acessar o n8n

A instância do n8n estará disponível no seu navegador:

  * **URL:** [http://localhost:5678](https://www.google.com/search?q=http://localhost:5678)

Utilize as seguintes credenciais de teste para fazer login:

| Campo | Valor |
| :--- | :--- |
| **Email** | `onflytestebruno@gmail.com` |
| **Senha** | `TesteOnfly#2025` |

-----

## 🧪 Executar os Testes

O projeto está configurado com duas formas principais de teste.

### 1\. Teste de Qualidade de Código (Linting)

Para verificar se o código segue os padrões de estilo e as boas práticas do n8n, execute o linter:

```bash
npm run lint
```

Para tentar corrigir os problemas automaticamente, use:

```bash
npm run lintfix
```

### 2\. Teste Funcional (Manual)

Este é o teste principal para validar a funcionalidade do conector.

1.  **Acesse o n8n** em [http://localhost:5678](https://www.google.com/search?q=http://localhost:5678).
2.  Clique em **"Create Workflow"** para criar uma nova automação.
3.  Clique no botão `+` para adicionar um novo node.
4.  Na barra de busca, pesquise por **"Random"**.
5.  Clique no node **"Random"** para adicioná-lo ao canvas.
6.  No painel de configurações do node, defina os valores de **Min** e **Max**.
7.  Clique no botão **"Execute Node"**.
8.  Verifique a aba "Output": o resultado deve ser um objeto JSON contendo o campo `randomNumber` com um número dentro do intervalo especificado.
    ```json
    {
      "randomNumber": 42
    }
    ```

-----

## ℹ️ Informações Adicionais

### Fluxo de Desenvolvimento

Para fazer alterações no código do conector:

1.  Altere o arquivo `nodes/Random/Random.node.ts`.
2.  Compile o código TypeScript para JavaScript com o comando:
    ```bash
    npm run build
    ```
3.  Reinicie o contêiner do n8n para que ele carregue a nova versão do conector:
    ```bash
    docker-compose restart n8n_app
    ```

### Verificação da Infraestrutura

  * **Verificar Conexão com PostgreSQL:** Para confirmar que o n8n está usando o banco de dados, você pode criar um workflow, salvá-lo e reiniciar o contêiner (`docker-compose restart n8n_app`). Se o workflow permanecer salvo, a persistência de dados está funcionando.
  * **Verificar Carregamento do Node:** Para confirmar que o mapeamento de volume está correto, execute o comando abaixo para listar os arquivos do seu projeto dentro do contêiner do n8n:
    ```bash
    docker-compose exec n8n_app ls -l /home/node/.n8n/custom/n8n-nodes-onfly-random
    ```
