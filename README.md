# Sistema de Gerenciamento de VMs - Vituax

Sistema completo de gerenciamento de Máquinas Virtuais (VMs) com autenticação, controle de permissões, gerenciamento de MSPs (Multi-Service Providers) e funcionalidades de White Label.

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Requisitos do Sistema](#requisitos-do-sistema)
- [Stack Tecnológica](#stack-tecnológica)
- [Instalação e Configuração](#instalação-e-configuração)
- [Como Executar](#como-executar)
- [Estrutura de Portas](#estrutura-de-portas)
- [Conceitos Importantes](#conceitos-importantes)
- [Permissões de Usuários](#permissões-de-usuários)
- [Credenciais de Teste](#credenciais-de-teste)
- [Comandos Úteis](#comandos-úteis)
- [Segurança](#segurança)
- [Internacionalização](#internacionalização)
- [Recursos Adicionais](#recursos-adicionais)
- [Contribuindo](#contribuindo)
- [Suporte](#suporte)

---

## 🎯 Sobre o Projeto

Sistema desenvolvido para gerenciamento de Máquinas Virtuais (VMs) com suporte a múltiplas empresas (MSPs), controle de acesso baseado em roles, e funcionalidades de customização White Label.

O projeto foi desenvolvido seguindo boas práticas de desenvolvimento, utilizando arquitetura RESTful no backend e componentes reutilizáveis no frontend.

---

## ✅ Funcionalidades

O sistema implementa as seguintes funcionalidades principais:

### 🔐 Autenticação e Autorização
- Sistema completo de autenticação com JWT
- Rotas de login e registro de usuários
- Proteção de rotas com middleware de autenticação
- Gerenciamento de sessão e tokens
- CRUD completo de usuários com controle de permissões

### 🗄️ Gerenciamento de Banco de Dados
- Sistema de migrations com Prisma
- Campos adicionais na tabela VM: `pass`, `location`, `hasBackup`
- Validações de dados no backend
- Suporte a soft delete

### 🏠 Funcionalidades da Home Page
- Cards de VMs com informações detalhadas
- Funcionalidade de start/stop de VMs
- Gráficos de uso de CPU e Memória (mockados)
- Interface responsiva e intuitiva

### ➕ Criação de VM
- Formulário completo para criação de VMs
- Dropdown de sistemas operacionais
- Cards de sugestão de configurações
- Validações de dados

### 💾 Gerenciamento de VMs (My VMs)
- Listagem completa de VMs com filtros avançados
- Filtros por nome, status, MSP/BrandMaster
- Filtro "Apenas minhas VMs"
- Modal de edição com todos os campos editáveis
- Funcionalidade de start/stop pela tabela e modal
- Exclusão de VMs (apenas para admins)

### 🏢 Cadastro de MSP (Multi-Service Provider)
- Cadastro em 2 etapas com validações
- Criação e edição de MSPs
- Campos de endereço com busca por CEP/CNPJ
- Filtros de pesquisa e flag de POC (Proof of Concept)
- Interface responsiva

### 👥 Cadastro de Funcionários
- Tela completa de cadastro de funcionários
- Validações de dados
- Interface responsiva
- Suporte a traduções (i18n) em português, inglês e espanhol

### 🎨 Configuração White Label
- Alteração de logo da empresa
- Restrição de acesso apenas para admins
- Configurações de tema e cores personalizadas
- Gerenciamento de DNS/domínio

### 👤 Configuração de Perfil e Notificações
- **Permissões de Edição Configuráveis**: Administradores podem controlar quais campos do perfil podem ser editados através de 3 configurações:
  - Permitir edição de informações de contato (email, telefone, nome completo)
  - Permitir edição de senha
  - Permitir edição de imagem de perfil
- **Interface de Configuração**: Componente dedicado com checkboxes para configuração de permissões (apenas para admins)
- **Validações de Segurança**: Backend valida permissões antes de permitir edições
- **UX Melhorada**: Campos são desabilitados visualmente quando permissões estão desativadas
- **Suporte Multilíngue**: Traduções em português, inglês e espanhol

#### Detalhes da Implementação

A funcionalidade de "Configuração de Perfil e Notificações" foi implementada com as seguintes características:

**Backend:**
- Adicionados 3 campos booleanos na tabela `brandMaster`: `allowEditContactInfo`, `allowEditPassword`, `allowEditProfileImage`
- Migration criada para aplicar as mudanças no banco de dados
- Validações implementadas no `UserService` para verificar permissões antes de permitir edições
- Validação de admin no `BrandMasterService` para alterar configurações de permissão

**Frontend:**
- Componente `ProfileEditPermissions` criado para configuração de permissões (apenas para admins)
- Campos de edição desabilitados automaticamente quando permissões estão desativadas
- Validações no frontend antes de salvar alterações
- Traduções adicionadas em português, inglês e espanhol

**Segurança:**
- Apenas usuários com role `admin` podem alterar as configurações de permissão
- Backend valida permissões do `brandMaster` antes de permitir atualizações no perfil
- Frontend valida e desabilita campos para melhor experiência do usuário

---

## 🏗️ Arquitetura

O projeto está dividido em três partes principais:

```
TestTecVix/
├── backend-node-vix-test/    # API REST em Node.js + Express + Prisma
├── frontend-react-vix-test/  # Interface em React + TypeScript + Material-UI
├── screenshots/              # Imagens de referência para as telas
└── README.md                 # Este arquivo
```

### Backend
- **Arquitetura**: RESTful API com separação de responsabilidades (Controllers, Services, Models)
- **ORM**: Prisma para gerenciamento de banco de dados
- **Autenticação**: JWT (JSON Web Tokens)
- **Validação**: Zod para validação de schemas

### Frontend
- **Arquitetura**: Componentes React organizados por funcionalidade
- **Estado Global**: Zustand para gerenciamento de estado
- **Roteamento**: React Router
- **Internacionalização**: i18next com suporte a múltiplos idiomas

---

## 💻 Requisitos do Sistema

Antes de começar, certifique-se de ter instalado:

- **Sistema Operacional**: Linux (preferencialmente), macOS ou Windows
- **Docker**: Versão mais recente instalada e configurada
- **Node.js**: Versão LTS (Long Term Support)
- **npm** ou **yarn**: Gerenciador de pacotes

---

## 🛠️ Stack Tecnológica

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM (Object-Relational Mapping)
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **TypeScript** - Superset JavaScript tipado
- **Zod** - Validação de schemas
- **Jest** - Framework de testes

### Frontend
- **React** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Material-UI (MUI)** - Biblioteca de componentes
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Zustand** - Gerenciamento de estado
- **i18next** - Internacionalização
- **Vitest** - Framework de testes

---

## ⚙️ Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd TestTecVix
```

### 2. Configuração do Backend

#### 2.1. Navegue até a pasta do backend

```bash
cd backend-node-vix-test
```

#### 2.2. Instale as dependências

```bash
npm install
```

#### 2.3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com as seguintes configurações:

```env
# URL de conexão com o banco de dados
DATABASE_URL=mysql://root:password@localhost:3312/test-cloud-db

# Configurações do MySQL
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=test-cloud-db
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_HOST=localhost

# Secret para geração de tokens JWT
JWT_SECRET=seu_secret_super_seguro_aqui
```

> **Nota**: A porta do banco de dados é **3312** (não confundir com a porta padrão 3306 do MySQL).

#### 2.4. Suba o banco de dados

```bash
npm run db:up
```

Este comando irá:
- Subir um container Docker com MySQL
- Utilizar o arquivo `docker-compose-db.yml`
- Expor o banco na porta **3312**

#### 2.5. Configure o Prisma e popule o banco

```bash
# Gera o Prisma Client
npx prisma generate

# Executa as migrations e popula o banco com dados de teste
npx prisma migrate reset
```

Ou, alternativamente:

```bash
npx prisma migrate deploy && npx prisma db seed
```

> **Importante**: O comando `migrate reset` irá **apagar todos os dados** e recriar o banco. Use com cuidado!

### 3. Configuração do Frontend

#### 3.1. Navegue até a pasta do frontend

```bash
cd ../frontend-react-vix-test
```

#### 3.2. Instale as dependências

```bash
npm install
```

#### 3.3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
# URL base da API
VITE_BASE_URL=http://localhost:3001/api/v1
```

---

## 🚀 Como Executar

### Modo Desenvolvimento

#### Backend (API)

```bash
cd backend-node-vix-test
npm run dev
```

A API estará disponível em: **http://localhost:3001**

#### Frontend

```bash
cd frontend-react-vix-test
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

---

### Modo Produção (Docker)

#### Backend

```bash
cd backend-node-vix-test

# Build da aplicação
npm run build

# Sobe o container Docker
npm run dc:up
```

#### Frontend

```bash
cd frontend-react-vix-test

# Sobe o container Docker (já faz o build automaticamente)
npm run dc:up
```

---

## 🔌 Estrutura de Portas

| Serviço  | Porta |
|----------|-------|
| Frontend | 3000  |
| Backend  | 3001  |
| MySQL    | 3312  |

---

## 📖 Conceitos Importantes

### MSP vs BrandMaster

- **Internamente** e a nível de arquitetura, temos a entidade `brandMaster` (que representa empresas dentro do sistema)
- **Comercialmente** e em muitos lugares no projeto, aparece o termo `MSP`
- Para todos os efeitos, **MSP = BrandMaster** (são a mesma entidade)

### Tipos de Usuários

#### Usuário Vituax
- Usuário **sem** `idBrandMaster` associado
- Considerado um usuário da própria Vituax

#### Usuário com BrandMaster
- Usuário **com** `idBrandMaster` associado
- Pertence a uma empresa/MSP específica

---

## 🔐 Permissões de Usuários

O sistema possui três níveis de permissão:

| Tipo      | Leitura | Criação | Edição | Exclusão |
|-----------|---------|---------|--------|----------|
| `member`  | ✅      | ❌      | ❌     | ❌       |
| `manager` | ✅      | ✅      | ✅     | ❌       |
| `admin`   | ✅      | ✅      | ✅     | ✅       |

### Detalhamento

- **Member (Membro)**: Somente leitura. Não pode criar, editar ou deletar nenhum recurso.
- **Manager (Gerente)**: Pode ler, criar e editar recursos, mas **não pode deletar**.
- **Admin (Administrador)**: Acesso total. Pode ler, criar, editar e deletar recursos.

---

## 🔑 Credenciais de Teste

> **Importante**: Para criar usuários de teste com diferentes roles, execute o script `npm run create-test-users` no diretório do backend.

### Como Criar Usuários de Teste

Execute o seguinte comando no diretório do backend:

```bash
cd backend-node-vix-test
npm run create-test-users
```

Isso criará três usuários de teste:

```
Admin:
  Email: admin@test.com
  Senha: Test@123

Manager:
  Email: manager@test.com
  Senha: Test@123

Member:
  Email: member@test.com
  Senha: Test@123
```

**Nota**: O script usa `upsert`, então pode ser executado múltiplas vezes sem criar duplicatas. Ele atualizará as senhas caso os usuários já existam.

---

## 📝 Comandos Úteis

### Backend

```bash
# Desenvolvimento
npm run dev                 # Inicia servidor em modo desenvolvimento
npm run build              # Compila o projeto TypeScript
npm run start              # Inicia servidor em modo produção
npm run test               # Executa testes com cobertura
npm run test:dev           # Executa testes em modo watch

# Docker
npm run db:up              # Sobe o banco de dados MySQL
npm run db:down            # Para o banco de dados
npm run dc:up              # Sobe a API em container Docker
npm run dc:down            # Para a API

# Prisma
npx prisma generate        # Gera o Prisma Client
npx prisma migrate dev     # Cria e aplica migrations
npx prisma migrate reset   # Reseta o banco e aplica seeds
npx prisma studio          # Abre interface visual do banco

# Qualidade de código
npm run lint               # Verifica problemas no código
npm run lint:fix           # Corrige problemas automaticamente
npm run format             # Formata código com Prettier
```

### Frontend

```bash
# Desenvolvimento
npm run dev                # Inicia servidor de desenvolvimento
npm run build              # Compila para produção
npm run preview            # Preview da build de produção

# Docker
npm run dc:up              # Sobe o frontend em container Docker
npm run dc:down            # Para o frontend

# Testes
npm run test               # Executa testes em modo watch
npm run test:coverage      # Executa testes com cobertura

# Qualidade de código
npm run lint               # Verifica problemas no código
npm run format             # Formata código com Prettier
```

---

## 🔒 Segurança

### Autenticação
- Tokens JWT com expiração configurável
- Middleware de autenticação em todas as rotas protegidas
- Validação de permissões baseada em roles

### Validações
- Validação de dados no backend com Zod
- Validação de permissões antes de operações sensíveis
- Sanitização de inputs

### Permissões Configuráveis
- Administradores podem controlar permissões de edição de perfil por MSP
- Validações tanto no frontend quanto no backend

---

## 🌐 Internacionalização

O sistema suporta três idiomas:
- Português (pt-br)
- Inglês (en)
- Espanhol (es)

As traduções são gerenciadas através do i18next e podem ser facilmente expandidas.

---

## 📚 Recursos Adicionais

- [Documentação do Prisma](https://www.prisma.io/docs)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do React](https://react.dev/)
- [Documentação do Material-UI](https://mui.com/)
- [JWT.io](https://jwt.io/) - Para entender tokens JWT

---

## 🤝 Contribuindo

Para contribuições, siga os padrões estabelecidos:

1. **Commits semânticos**: Use prefixos como `feat:`, `fix:`, `refactor:`, `docs:`, etc.
2. **Code review**: Revise seu próprio código antes de fazer o commit
3. **Testes**: Sempre que possível, adicione testes para suas funcionalidades
4. **Documentação**: Mantenha o README atualizado
5. **Clean code**: Siga os padrões de código já estabelecidos no projeto

---

