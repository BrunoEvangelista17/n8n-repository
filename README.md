# Desafio n8n Onfly"

Este repositório contém a solução para o desafio de desenvolvimento de um conector (custom node) para a plataforma de automação n8n. O conector, chamado **"Random"**, integra-se com a API pública do [Random.org](https://www.random.org/) para gerar números inteiros verdadeiramente aleatórios dentro de um intervalo especificado.

O projeto foi desenvolvido seguindo as melhores práticas, utilizando Docker e Docker Compose para garantir um ambiente de desenvolvimento e teste consistente e de fácil configuração.

## Tecnologias Utilizadas

  * **n8n:** Plataforma de automação de workflows.
  * **Node.js & TypeScript:** Linguagem e ambiente para o desenvolvimento do conector.
  * **Docker & Docker Compose:** Para orquestração dos contêineres da aplicação n8n e do banco de dados.
  * **PostgreSQL:** Banco de dados para a instância do n8n.

## Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em sua máquina:

  * [Docker](https://www.docker.com/get-started/)
  * [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Como Executar o Projeto

Siga os passos abaixo para subir a infraestrutura completa (n8n + PostgreSQL) e ter o conector customizado pronto para uso.

### 1\. Clone o Repositório

```bash
git clone <url-do-seu-repositorio>
cd <nome-da-pasta-do-projeto>
```

### 2\. Crie o Arquivo de Variáveis de Ambiente

O Docker Compose utiliza um arquivo `.env` para gerenciar as credenciais do banco de dados de forma segura. Crie um arquivo chamado `.env` na raiz do projeto, copiando o conteúdo abaixo:

```env
# Variáveis de ambiente para o banco de dados PostgreSQL
# O Docker Compose lerá este arquivo automaticamente.

POSTGRES_USER=n8n
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=n8n
```

**Observação:** Por segurança, o arquivo `.env` já está incluído no `.gitignore` para não ser enviado ao repositório.

### 3\. Inicie os Serviços

Com o Docker em execução, execute o seguinte comando no terminal, a partir da raiz do projeto:

```bash
docker-compose up -d
```

Este comando irá baixar as imagens necessárias e iniciar os contêineres do n8n e do PostgreSQL em segundo plano (`-d`). O processo pode levar alguns minutos na primeira vez.

### 4\. Verifique se Tudo Está Funcionando

Aguarde cerca de um minuto para que os serviços iniciem completamente. Você pode verificar os logs com o comando:

```bash
docker-compose logs -f n8n
```

Quando vir uma mensagem como `Editor is now available on http://localhost:5678/`, a plataforma está pronta.

## 🔑 Acesso ao n8n

A instância do n8n estará disponível no seu navegador no seguinte endereço:

  * **URL:** [http://localhost:5678](https://www.google.com/search?q=http://localhost:5678)

Para facilitar a avaliação, um usuário de teste já foi criado durante a configuração inicial da instância. Utilize as seguintes credenciais para fazer login:

| Campo     | Valor                       |
| :-------- | :-------------------------- |
| **Email** | `onflytestebruno@gmail.com` |
| **Senha** | `TesteOnfly#2025`           |

> **Nota:** Para fins deste desafio, as credenciais acima também são válidas para acessar a conta de e-mail `onflytestebruno@gmail.com` no Gmail, caso seja necessário acessar a conta.

-----