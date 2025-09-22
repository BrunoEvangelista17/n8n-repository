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

## ⚙️ Instalação e Configuração do Ambiente

Siga os passos abaixo para preparar o ambiente de execução e desenvolvimento.

### 1\. Clonar o Repositório

```bash
git clone <url-do-seu-repositorio-github>
cd <nome-do-repositorio>
```

### 2\. Instalar as Dependências

Este passo instala as ferramentas necessárias para compilar, testar e formatar o código do conector.

```bash
npm install
```

### 3\. Configurar Variáveis de Ambiente

O Docker Compose utiliza um arquivo `.env` para gerenciar as credenciais do banco de dados de forma segura. Crie um arquivo chamado `.env` na raiz do projeto e adicione o seguinte conteúdo:

```env
# Variáveis de ambiente para o banco de dados PostgreSQL
POST_GRES_USER=n8n
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

Este comando irá baixar as imagens do n8n e do PostgreSQL, iniciar os contêineres em segundo plano (`-d`) e mapear os volumes para persistência de dados e para carregar o conector customizado.

Aguarde cerca de um minuto para que os serviços iniciem completamente. Você pode verificar os logs com `docker-compose logs -f`.

### 2\. Acessar o n8n

A instância do n8n estará disponível no seu navegador:

  * **URL:** [http://localhost:5678](http://localhost:5678)

Utilize as seguintes credenciais de teste para fazer login:

| Campo | Valor |
| :--- | :--- |
| **Email** | `onflytestebruno@gmail.com` |
| **Senha** | `TesteOnfly#2025` |

-----

## 🔩 Desenvolvimento e Processo de Build

Se você desejar fazer alterações no código-fonte do conector, o fluxo de trabalho é simples.

### 1\. Compilando o Código (Build)

Após fazer qualquer alteração no arquivo `nodes/Random/Random.node.ts`, você precisa compilar o projeto. Execute o seguinte comando na raiz do repositório:

```bash
npm run build
```

Este comando, definido no `package.json`, irá transpilar o código TypeScript para JavaScript na pasta `dist/`.

### 2\. Recarregando o Node no n8n

Para que a sua instância do n8n no Docker carregue a nova versão compilada, reinicie o serviço:

```bash
docker-compose restart n8n_app
```

-----

## 🧪 Executar os Testes

### Teste Funcional (Dinâmico com Input)

Este é o teste para validar a funcionalidade do conector recebendo dados, simulando um input de usuário.

1.  **Acesse o n8n** em [http://localhost:5678](http://localhost:5678).
2.  Clique em **"Create Workflow"** para criar uma nova automação.
3.  Clique no botão `+` e adicione um node **"Set"**. Este node irá simular o input do usuário.
      * Configure-o para criar dois campos:
          * **Name**: `minInput`, **Value**: `10`
          * **Name**: `maxInput`, **Value**: `50`
4.  Clique no `+` após o node "Set" e, na barra de busca, pesquise por **"Random"** para adicionar o seu conector.
5.  No painel de configurações do node "Random", use **expressões** para ler os dados do node anterior:
      * No campo **Min**, clique no ícone `ƒx` e adicione a expressão: `{{$json["minInput"]}}`
      * No campo **Max**, faça o mesmo e adicione a expressão: `{{$json["maxInput"]}}`
6.  Clique no botão **"Execute workflow"** no canto superior esquerdo.
7.  Verifique a aba "Output" do node "Random": o resultado deve ser um objeto JSON contendo o campo `randomNumber` com um número dentro do intervalo definido no node "Set".
    ```json
    {
      "minInput": 10,
      "maxInput": 50,
      "randomNumber": 37
    }
    ```

-----

## ℹ️ Informações Adicionais

### Verificação da Infraestrutura

  * **Verificar Conexão com PostgreSQL:** Para confirmar que o n8n está usando o banco de dados, você pode criar um workflow, salvá-lo e reiniciar o contêiner (`docker-compose restart n8n_app`). Se o workflow permanecer salvo, a persistência de dados está funcionando.
  * **Verificar Carregamento do Node:** Para confirmar que o mapeamento de volume está correto, execute o comando abaixo para listar os arquivos do seu projeto dentro do contêiner do n8n:
    ```bash
    docker-compose exec n8n_app ls -l /home/node/.n8n/custom/n8n-nodes-onfly-random
    ```
