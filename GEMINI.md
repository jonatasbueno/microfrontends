# Regras de Negócios e Requisitos

Construir um sistema para gerenciamento de **produtores rurais** e suas **propriedades**, com base em duas principais áreas funcionais:

1. **Criação, busca e leitura de Produtores Rurais**
2. **Dashboard de Indicadores e Gráficos**

O sistema deve ser escalável, permitir fácil manutenção e documentar de forma clara suas funcionalidades sem dependência de uma tecnologia específica.

---

## 1. CRUD de Produtores

### Funcionalidades Principais

* **Listagem de produtores**

  * Exibir tabela com:

    * CPF ou CNPJ.
    * Nome do produtor.
    * Estado.
    * Cidade.
    * Status (ativo/inativo).
  * Ações por item da lista:

    * **Ver detalhes**.
    * **Editar produtor**.
    * **Ativar/Desativar produtor**.

* **Cadastro de novo produtor**

  * Inserir dados obrigatórios:

    * CPF ou CNPJ (com validação).
    * Nome do produtor.
    * Endereço (cidade e estado).
  * Permitir adicionar propriedades rurais.

* **Edição de produtor**

  * Alterar dados cadastrais.
  * Adicionar, editar ou remover propriedades rurais.

* **Ativar/Inativar produtor**

  * Alterar status do produtor sem remover seus dados.
  * Garantir histórico preservado.

---

### Tela de Detalhes do Produtor

* Ao clicar em "Ver detalhes", abrir:

  * **Modal** ou nova tela contendo:

    * Dados cadastrais completos.
    * Lista de propriedades:

      * Nome da fazenda.
      * Cidade.
      * Estado.
      * Área total (ha).
      * Área agricultável (ha).
      * Área de vegetação (ha).
      * Safras e respectivas culturas.
    * Ações:

      * Editar produtor.
      * Adicionar/editar/remover propriedades.
      * Adicionar culturas e safras.

---

### Regras de Negócio do CRUD

1. CPF ou CNPJ deve ser único e validado.
2. A soma da **área agricultável** + **área de vegetação** não pode ultrapassar a **área total da propriedade**.
3. Um produtor pode ter:

   * 0, 1 ou mais propriedades.
4. Uma propriedade pode ter:

   * 0, 1 ou mais culturas por safra.
5. Permitir ativar ou desativar produtores sem excluir dados.

---

## 2. Dashboard de Indicadores

### Funcionalidades

* **Indicadores principais:**

  * Total de produtores cadastrados.
  * Total de fazendas cadastradas.
  * Total de hectares registrados (soma das áreas totais).

* **Gráficos:**

  * **Pizza por estado:** distribuição de fazendas por estado.
  * **Pizza por cultura plantada:** proporção das culturas registradas.
  * **Pizza por uso do solo:** relação entre área agricultável e área de vegetação.

* **Filtros opcionais:**

  * Filtrar dados por safra.
  * Filtrar por estado.
  * Filtrar por cultura.

---

### Regras de Negócio do Dashboard

1. Os dados exibidos devem ser atualizados em tempo real com base no cadastro.
2. Os gráficos devem representar a soma consolidada de todas as propriedades dos produtores.
3. As métricas de hectares devem considerar apenas propriedades ativas.
4. Ao desativar um produtor, suas propriedades deixam de contar nos totais e gráficos.

---
# Especificações Técnicas

### Tecnologias Utilizadas

- **React**: 19.1.1
  - Biblioteca principal para construção de interfaces.
- **TypeScript**: 5.9.2
  - Tipagem estática para garantir segurança e manutenção.
- **@chakra-ui/react + @emotion/react**:
  - Estilização de componentes.
- **react-router**:
  - Gerenciamento de rotas.
- **TanStack Query**: 5.84.1
  - Gerenciamento de dados assíncronos no remote de providers.
- **Redux**: 5.0.1
  - Gerenciamento de estado global no remote de estado.
- **React Redux**: 9.2.0
  - Integração do Redux com React.
- **react-hook-form**: 7.53.0
  - Gerenciamento de formulários no remote CRUD.
- **msw**
  - Mock de request
- **Vite**: 5.4.x
  - Ferramenta de build e desenvolvimento.

## Estrutura de Pastas

O repositório segue uma estrutura adaptada da referência fornecida. A estrutura completa da referência é:

```
frontend/
├── public/                       # Arquivos estáticos (favicon, etc.)
├── src/                          # Código-fonte da aplicação
│   ├── constants/                # Constantes e enums
│   ├── components/               # Componentes de UI
│   │   ├── ui/                   # Componentes atômicos (apenas renderização)
│   │   ├── container/            # Componentes que contêm outros componentes
│   │   └── business/             # Componentes com lógica de negócio
│   ├── hooks/                    # Hooks globais
│   ├── icons/                    # Componentes de ícones
│   ├── lib/                      # Funções utilitárias e wrappers
│   ├── pages/                    # Componentes de página (endpoints de roteamento)
│   ├── providers/                # Contextos e providers
│   ├── router/                   # Configuração de rotas
│   ├── services/                 # Chamadas de API
│   ├── store/                    # Estado global
│   ├── styles/                   # Configurações de estilo
│   ├── utils/                    # Funções utilitárias
│   │   ├── functions/            # Funções específicas (formatadores, etc.)
│   ├── types/                    # Tipos TypeScript compartilhados
│   ├── App.tsx                   # Componente raiz
│   └── main.tsx                  # Ponto de entrada Vite + ReactDOM
├── .env                          # Variáveis de ambiente
├── tsconfig.json                 # Configuração TypeScript
├── vite.config.ts                # Configuração Vite
└── package.json                  # Metadados e dependências
```

**Uso Adaptado**: Utiliza apenas as pastas necessárias