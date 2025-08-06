# Gerenciamento de Produtores Rurais

Este projeto é um sistema para gerenciamento de produtores rurais e suas propriedades, focado em oferecer uma interface intuitiva para o cadastro, busca e visualização de informações.

## Funcionalidades

Atualmente, o sistema oferece as seguintes funcionalidades:

### CRUD de Produtores

*   **Listagem de Produtores**: Exibe uma tabela (desktop) ou cards (mobile) com informações essenciais dos produtores (CPF/CNPJ, Nome, Cidade, Estado).
*   **Busca de Produtores**: Campo de busca com debounce para filtrar produtores por nome ou CPF/CNPJ.
*   **Visualização de Detalhes**: Ao clicar em um produtor, é possível ver seus dados cadastrais completos, propriedades rurais associadas e culturas plantadas em cada propriedade.
*   **Cadastro de Produtor**: (A ser implementado)
*   **Edição de Produtor**: (A ser implementado)

### Dashboard de Indicadores e Gráficos

*   (A ser implementado)

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias e bibliotecas:

*   **React**: Biblioteca principal para construção da interface do usuário.
*   **TypeScript**: Para tipagem estática, garantindo maior segurança e manutenibilidade do código.
*   **Vite**: Ferramenta de build e desenvolvimento rápido.
*   **Chakra UI**: Biblioteca de componentes para estilização e construção de UI, garantindo um design moderno e responsivo.
*   **React Router**: Para gerenciamento de rotas na aplicação.
*   **Redux Toolkit**: Para gerenciamento de estado global da aplicação.
*   **TanStack Query**: Para gerenciamento de dados assíncronos e cache de requisições (utilizado no hook `useProducers`).
*   **Axios**: Cliente HTTP para fazer requisições a APIs (atualmente substituído por mocks para desenvolvimento).
*   **MirageJS**: Utilizado para simular a API RESTful em ambiente de desenvolvimento, permitindo o desenvolvimento frontend independente do backend.

## Como Rodar o Projeto

Para configurar e rodar o projeto em sua máquina local, siga os passos abaixo:

1.  **Clone o Repositório**:

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd microfrontends
    ```

2.  **Instale as Dependências**:

    ```bash
    npm install
    ```

3.  **Inicie o Servidor de Desenvolvimento**:

    ```bash
    npm run dev
    ```

    O aplicativo estará disponível em `http://localhost:5173` (ou outra porta disponível).

    **Nota**: O projeto utiliza mocks locais para simular as chamadas de API, então não é necessário um backend rodando para testar as funcionalidades atuais.