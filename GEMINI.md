# Regras de Negócios e Requisitos

Construir um sistema para gerenciamento de **produtores rurais** e suas **propriedades** com suas **agriculturas**, com base em duas principais áreas funcionais:

1. **Criação, busca e leitura de Produtores Rurais**
2. **Dashboard de Indicadores e Gráficos**

O sistema deve ser escalável, permitir fácil manutenção e documentar de forma clara suas funcionalidades sem dependência de uma tecnologia específica.

---

## 1. Listagem, Busca, Criação e Edição de Produtores

### Funcionalidades Principais da primeira tela (principal)

- **Listagem de produtores**

  - Exibir tabela com um campo de busca que aceite qualquer um desses itens de busca:

    - CPF ou CNPJ.
    - Nome do produtor.
    - Estado.
    - Cidade.

  - Ações por registro da lista:

    - **Ver detalhes** que deve direcionar para uma outra tela que será a de detalhes.

- **Cadastro de novo produtor**

  - Reaproveitar o modal de edição para ser o de criação, que irá apenas alterar o título de "Editar" para "Criar".
  - Durante o cadastro e edição exibir campos para adicionar e remover propriedades e culturas conforme botão de adicionar e excluir dinamicamente para cada uma delas.

---

### Tela de Detalhes do Produtor

- **Apresentação dos dados do produtor**

  - Exibir tela com todos os dados do produtor incluindo id, apresentando uma as propriedades em um tabela ou parecida onde cada registro seja expansível mostrando em uma lista as consulturas em ordem do decrente por ano

  - Ações da tela:

    - **Editar** que deverá abrir um modal grande que carregará todos os campos editáveis de um produtor e suas propriedades em um fomulário dinamico que permite excluir e adicionar, o mesmo vale para as culturas para cada propriedade que permite adicionar e ou excluir.
      - O comportamento de adicionar propriedades como culturas terá um comportamento identico mas cada um respeito seus campos e regras de negócio. Um sinal de mais ficará abaixo dos dados do produto escrito 'Adicionar proprieadde' para adicionar propriedade e 'Adicionar Cultura' para adicionar cultura abaixo dos dados de propriedade. O campos campos de cultura se resumirá a 2 selects respeitando os mocks com nome e ano. É possível adicionar 0 ou infinitas propriedades e 0 ou infinitas culturas por propriedades e cada cultura deve ser do ano anterior pra traz
      - No registro de cidade e estado do produtor também deve ser um campo de seleção que na Adição inicia vazio e a cidade aparece desativado com uma mensagem auxilar embaixo do campo descrevento 'Escolha um estado para habilitar esse campo.'.

  - **Modal** ou nova tela contendo:

    - Dados cadastrais completos.
    - Lista de propriedades:
      - Id
      - Nome da fazenda.
      - Cidade.
      - Estado.
      - Área total (ha). A soma da área agricultável com a área de vegetação não pode passar a área total, se isso ocorrer bloqueie o botão de 'Salvar' do modal e exiba uma mensagem de erro ou danger abaixo do campo 'A soma das áreas agricultável e de vegetação não podem ser maiores que a área total!'
      - Área agricultável (ha).
      - Área de vegetação (ha).
      - Safras e respectivas culturas.
    - Lista de culturas:
      - Id
      - Nome
      - Ano
    - Ações:
      - Editar produtor e suas proprieades assim como suas safras e culturas.

---

### Regras de Negócio

1. CPF ou CNPJ deve ser único e validado com menasgem de erro quando conveniente.
2. A soma da **área agricultável** + **área de vegetação** não pode ultrapassar a **área total da propriedade**.
3. Um produtor pode ter:

   - 0, 1 ou mais propriedades.

4. Uma propriedade pode ter:

   - 0, 1 ou mais culturas por safra.

5. As culturas devem ser agrupadas por anos na exibição dos detalhes

---

## 2. Dashboard de Indicadores

### Funcionalidades

- **Indicadores principais:**
  Devel ser exibidos em Card separadas com background com cor pastel disintos para cada card

  - Total de produtores cadastrados.
  - Total de fazendas cadastradas.
  - Total de hectares registrados (soma das áreas totais).

- **Gráficos:**

  - **Pizza por estado:** distribuição de fazendas por estado.
  - **Pizza por cultura plantada:** proporção das culturas registradas.
  - **Pizza por uso do solo:** relação entre área agricultável e área de vegetação.

- **Filtros opcionais:**
  Apresente 1 combo de filtro acima dos gráficos o nome 'Filtro' o qual será um combo com as opções 'Por safra', 'Por estado', 'Por cultura'

  - Filtrar dados por safra.
  - Filtrar por estado.
  - Filtrar por cultura.

---

### Regras de Negócio do Dashboard

1. Os dados exibidos devem ser atualizados em tempo real com base nos dados salvos no gerenciamento de estado.
2. Os gráficos devem representar a soma consolidada de todas as propriedades dos produtores seguindo as regras do filtro, o filtro inicial é vazio se baseando em todos os produtes sem distinção.

---

# Especificações Técnicas

## Tecnologias Utilizadas

Pesquise para se atualizar sobre cada uma das tecnologias com base nas documentações oficiais da versão descrita

```json
"dependencies": {
  "@chakra-ui/form-control": "^2.2.0",
  "@chakra-ui/react": "^3.24.1",
  "@emotion/react": "^11.14.0",
  "@faker-js/faker": "^9.9.0",
  "@fortawesome/fontawesome-svg-core": "^7.0.0",
  "@fortawesome/free-solid-svg-icons": "^7.0.0",
  "@fortawesome/react-fontawesome": "^0.2.3",
  "@hookform/resolvers": "^5.2.1",
  "@nivo/core": "^0.99.0",
  "@nivo/pie": "^0.99.0",
  "@reduxjs/toolkit": "^2.8.2",
  "@tanstack/react-query": "^5.84.1",
  "axios": "^1.11.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-hook-form": "^7.62.0",
  "react-redux": "^9.2.0",
  "react-router": "^7.7.1",
  "redux": "^5.0.1",
  "zod": "^4.0.15"
},
"devDependencies": {
  "@eslint/js": "^9.30.1",
  "@tanstack/eslint-plugin-query": "^5.83.1",
  "@types/react": "^19.1.8",
  "@types/react-dom": "^19.1.6",
  "@types/react-input-mask": "^3.0.6",
  "@vitejs/plugin-react-swc": "^3.10.2",
  "eslint": "^9.30.1",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.20",
  "globals": "^16.3.0",
  "typescript": "~5.8.3",
  "typescript-eslint": "^8.35.1",
  "vite": "^7.0.4",
  "vite-tsconfig-paths": "^5.1.4",
  "vitest": "^3.2.4"
}
```

## Estrutura de Pastas

O repositório segue uma estrutura adaptada da referência fornecida. A estrutura completa da referência é:

```
frontend/
├── public/                       # Arquivos estáticos (favicon, etc.)
├── src/                          # Código-fonte da aplicação
│   ├── components/               # Componentes de UI
│   │   ├── ui/                   # Componentes atômicos (apenas renderização)
│   │   ├── container/            # Componentes que contêm outros componentes
│   │   └── business/             # Componentes com lógica de negócio
│   ├── hooks/                    # Hooks globais
│   │   └── business/             # Hooks regra de negócio
│   ├── features/                 # Slices dos gerenciadores de estado (quando Redux Toolkit)
│   ├── mocks/                    # constants contendo estrutura de dados completas que serão utilizadas em retorno de simulão de API
│   ├── icons/                    # Componentes de ícones
│   ├── lib/                      # wrappers de bibliotecas
│   ├── pages/                    # Componentes de página (endpoints de roteamento)
│   ├── providers/                # Contextos e providers
│   ├── router/                   # Configuração de rotas
│   ├── services/                 # Chamadas de API
│   ├── store/                    # Estado global
│   ├── styles/                   # Configurações de estilo (theme)
│   ├── utils/                    # Funções utilitárias
│   │   ├── hooks/                # Hooks globais
│   │   ├── constants/            # Constantes
│   │   ├── functions/            # Funções específicas (formatadores, etc.)
│   │   └── types/                # Tipos TypeScript compart


```

**Uso Adaptado**: Utiliza apenas as pastas necessárias. Exclua pastas não utilizadas

## Interface e estilos

- Aplique estilos padrões de cores padrão do Chakra UI
- Insira tema claro como padrão e tema escuro com um toogle na barra superior de tarefas presente no layout da aplicação. Use o estado global para armazenar o estado de light e dark
- Inclua ícones do fontawesome em botões e locais adequados
- A páginas devem ser alinhadas e as tabelas deve ter um border e todos os elementos nas sections da talea devem ter 8px de border radius. A font padrão deve ser 1rem
- Todo layout deve ser responsivo
- Aplique cores coerentes e que se adeque aos contrates
- Aplique acessbilidade, nos elementos que o chakra UI não aplica
- Aplique mascara por meio de função utilizando o evento de onChange dos inputs, não instale biblioteca para isso
- Todos os textos das interfaces devem ser em PT-BR
- Todo código deve ser em inglês

## Testes

- Aplique testes unitários e se necessário de integração com Vitest
- Crie testes com coverage, ui
- Aplique padrões de nomes de arquivos de testes \*\*.test.\*\* no mesmo diretório do arquivo a ser testado
- Se possível for configure o vitest no arquivo de vite.config.ts que já se encontra na raiz do projeto, caso não seja possível crie o arquivo destinado ao vitest na raiz do projeto

## Qualidade de código

- Deixe o código legível e coerente para humanos
- Siga os padrões de clean code
- Não é permitido comentários no código com excessão de códigos comentários sobre funções, hooks pra que o typescript apresente um tooltip explicando os parametros e o que a função faz
- Após termino de cada tarefa aplique a formatação com prettier em todos os arquivos
- export todos os arquivo com 'export' evite a todo custo 'export default'
- concentre as regras de negócio em hooks customizado, o gerenciamento de estado deve ter funções simples
- hooks precisam fazer sentido, caso contrário use funções utilitárias
- opte por campos não controlados quando possível
- os imports de elementos do projeto devem iniciar com '@/'
- os imports de componentes visuais devem ser importados individualmente para cada linha
- use estado local com useState somente quando esse estado não precisar ser compartilhado em nenhum outro lugar
- busque mander os componentes de negócios com hooks customizados pra agregar as funcionalidades e propriedades. Só em casos estritamente necessário deixe lógica nos componentes. Quando os hooks forem apenas para atender um único componenete deixe ele dentro da pasta do componente

## Documentação

- Toda documentação deve ser em PT-BR
- Crie um documento na raiz do projeto chamado TASK.md, nesse documento deve ter cada uma das tarefas que julgar necessário e a cada execução deve ser aplicado check das tarefas realizadas e inclua o link para o commit no padrão markdown dado que se trata do Github
  - Para cada tarefa executada os arquivos atualizados devem ir para git staged e um commit deve ser criado seguindo os padrões do conventionals commit](https://www.conventionalcommits.org/en/v1.0.0/) com as seguintes informações:
    - Mensagem da ação principal no título seguindo os padrões do conventional commits
    - Na descrição do commit deve ser listado cada uma das ações executadas iniciada por '- [x]'
    - Se interessante usar ícones

# Strict

- O roteamento deve ser realizado com React Router na versão específica do package.json. Não confundir com React Router Dom
- Os campos devem seguir os padrões de formulários sempre que possível
- Componentes, funções e Hooks devem ser criados quando o código aparecer em dois ou mais lugares
- Só use interface para situações onde há class carregando implementações isoladas, caso contrário use types
- Se a estilização não vir de css exclua os arquivos de .css do projeto e suas devidas importações

# Evite a todo custo

- npm run dev
- npm run preview
- npm run build
- instalar react-router-dom
