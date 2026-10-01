# Mensagens de Commit e Próximos Passos

## Mensagens de Commit Sugeridas

### Commit 1: Correção de dependências do frontend
**Mensagem:**
```
fix: substitui imports de @mui/system por @mui/material

Substitui todos os imports de @mui/system por @mui/material para resolver
erro de dependência não encontrada. O componente Stack está disponível
diretamente em @mui/material desde a v5.
```

**Arquivos:**
- `frontend-react-vix-test/src/components/Screen.tsx`
- `frontend-react-vix-test/src/components/ScreenFullPage.tsx`
- `frontend-react-vix-test/src/components/Modal/ModalSimple.tsx`
- `frontend-react-vix-test/src/components/Inputs/DropDown.tsx`
- `frontend-react-vix-test/src/components/Inputs/DropDownDark.tsx`
- `frontend-react-vix-test/src/components/HeaderMobile/HeaderGradient.tsx`
- `frontend-react-vix-test/src/pages/Home/components/Graphics/ModalChart.tsx`
- `frontend-react-vix-test/src/pages/MyVMs/components/ModalEditVM.tsx`
- `frontend-react-vix-test/src/pages/VirtualMachine/components/SliderLabelNum.tsx`

---

### Commit 2: Implementação de validações Zod para autenticação
**Mensagem:**
```
feat: adiciona validações Zod para login e registro de usuários

Cria schemas de validação usando Zod para login (username/email + password)
e registro de novos usuários, garantindo validação de dados no backend.
```

**Arquivos:**
- `backend-node-vix-test/src/types/validations/User/loginUser.ts`
- `backend-node-vix-test/src/types/validations/User/registerUser.ts`

---

### Commit 3: Implementação do UserModel
**Mensagem:**
```
feat: implementa UserModel com métodos CRUD e busca

Cria UserModel seguindo o padrão do projeto com métodos para criar, ler,
atualizar e deletar usuários, além de métodos específicos para buscar
por email, username ou ambos.
```

**Arquivos:**
- `backend-node-vix-test/src/models/UserModel.ts`

---

### Commit 4: Implementação do UserService
**Mensagem:**
```
feat: implementa UserService com lógica de negócio e hash de senhas

Implementa UserService com validações de negócio, hash de senhas usando
bcrypt, verificação de usuários duplicados e métodos para login e registro.
```

**Arquivos:**
- `backend-node-vix-test/src/services/UserService.ts`

---

### Commit 5: Completar implementação JWT
**Mensagem:**
```
feat: completa implementação de genToken e verifyToken

Implementa funções de geração e verificação de tokens JWT com tratamento
de erros e validação de expiração.
```

**Arquivos:**
- `backend-node-vix-test/src/utils/jwt.ts`

---

### Commit 6: Completar middleware de autenticação
**Mensagem:**
```
feat: completa middleware authUser para validação de tokens JWT

Implementa validação completa de tokens JWT no middleware authUser,
buscando o usuário no banco e validando se está ativo e não deletado.
```

**Arquivos:**
- `backend-node-vix-test/src/auth/authUser.ts`

---

### Commit 7: Implementação do UserController
**Mensagem:**
```
feat: implementa UserController com endpoints CRUD, login e register

Cria UserController com todos os endpoints necessários para gerenciamento
de usuários, incluindo login e registro que retornam tokens JWT.
```

**Arquivos:**
- `backend-node-vix-test/src/controllers/UserController.ts`

---

### Commit 8: Implementação de rotas de usuário
**Mensagem:**
```
feat: adiciona rotas de usuário com autenticação e autorização

Cria rotas públicas para login e register, e rotas protegidas para CRUD
de usuários com controle de permissões (admin, manager, member).
```

**Arquivos:**
- `backend-node-vix-test/src/routes/user.routes.ts`
- `backend-node-vix-test/src/routes/_index.ts`
- `backend-node-vix-test/src/constants/basePathRoutes.ts`

---

### Commit 9: Proteção de rotas no backend
**Mensagem:**
```
feat: aplica middleware authUser nas rotas protegidas

Aplica middleware de autenticação nas rotas de VM e BrandMaster,
garantindo que apenas usuários autenticados possam acessar.
```

**Arquivos:**
- `backend-node-vix-test/src/routes/vM.routes.ts`
- `backend-node-vix-test/src/routes/brandMaster.routes.ts`

---

### Commit 10: Ativação de rotas de login e register no frontend
**Mensagem:**
```
feat: ativa rotas de login e register no frontend

Descomenta e ativa as rotas de login e register que estavam comentadas,
permitindo acesso às telas de autenticação.
```

**Arquivos:**
- `frontend-react-vix-test/src/routes/_routes.ts`

---

### Commit 11: Proteção de rotas no frontend
**Mensagem:**
```
feat: implementa proteção de rotas no PrivatePage

Ativa verificação de autenticação no PrivatePage, redirecionando usuários
não autenticados para a tela de login e validando permissões de acesso.
```

**Arquivos:**
- `frontend-react-vix-test/src/auth/PrivatePage.tsx`

---

### Commit 12: Melhorias no formulário de login
**Mensagem:**
```
fix: adiciona navegação após login e envolve formulário em tag form

Adiciona redirecionamento para home após login bem-sucedido e envolve
campos de login em tag form para resolver aviso do navegador.
```

**Arquivos:**
- `frontend-react-vix-test/src/hooks/useLogin.tsx`
- `frontend-react-vix-test/src/pages/Login/components/MainLoginForm/LoginForm.tsx`

---

### Commit 13: Correção de tipos TypeScript
**Mensagem:**
```
fix: corrige tipos TypeScript no UserController

Adiciona type assertion para req.params.idUser garantindo que seja
tratado como string, resolvendo erros de compilação TypeScript.
```

**Arquivos:**
- `backend-node-vix-test/src/controllers/UserController.ts`

---

### Commit 14: Correção de URL e login automático no registro
**Mensagem:**
```
fix: corrige URL de registro e implementa login automático

Corrige URL de /user para /user/register no hook useRegister e
implementa login automático após registro bem-sucedido, similar
ao comportamento do login.
```

**Arquivos:**
- `frontend-react-vix-test/src/hooks/useRegister.tsx`

---

### Commit 15: Correção de validação Zod para idBrandMaster nullable
**Mensagem:**
```
fix: permite idBrandMaster null nas validações Zod

Adiciona .nullable() nas validações de idBrandMaster para aceitar
valores null, resolvendo erro de validação no registro.
```

**Arquivos:**
- `backend-node-vix-test/src/types/validations/User/registerUser.ts`
- `backend-node-vix-test/src/types/validations/User/createUser.ts`
- `frontend-react-vix-test/src/hooks/useRegister.tsx`

---

### Commit 16: Correção de requisições autenticadas no useLoadingApp
**Mensagem:**
```
fix: corrige requisições autenticadas no useLoadingApp

Adiciona verificação de autenticação antes de fazer requisições
protegidas e usa getAuth() para obter token. Trata erros 401 de
forma silenciosa em páginas públicas.
```

**Arquivos:**
- `frontend-react-vix-test/src/hooks/useLoadingApp.tsx`

---

### Commit 17: Correção do formulário de login e carrossel
**Mensagem:**
```
fix: adiciona tag form no login e melhora visibilidade do carrossel

Envolve campos de login em tag form para resolver aviso do navegador
e ajusta estilo do bullet ativo do carrossel para melhor visibilidade.
```

**Arquivos:**
- `frontend-react-vix-test/src/pages/Login/components/MainLoginForm/LoginForm.tsx`
- `frontend-react-vix-test/src/pages/Login/components/DisplayCarousel/index.tsx`

---

### Commit 18: Script para criação de usuários de teste
**Mensagem:**
```
feat: adiciona script para criar usuários de teste com diferentes roles

Cria script create-test-users.ts para facilitar criação de usuários
de teste (admin, manager, member) para desenvolvimento e testes.
Atualiza README com instruções de uso.
```

**Arquivos:**
- `backend-node-vix-test/scripts/create-test-users.ts`
- `backend-node-vix-test/package.json`
- `README.md`

---

## Próxima Funcionalidade a Desenvolver

De acordo com o README.md, a próxima funcionalidade na lista de tarefas é:

### **Funcionalidades da Home Page**

Especificamente:
- Implementar a função de **start** da VM
- Implementar a função de **stop** da VM
- Implementar os gráficos (mocados) de **Uso de CPU**
- Implementar os gráficos (mocados) de **Uso de Memória**

**Sugestão de branch:** `feature/home-vm-actions`

**Ordem de implementação sugerida:**
1. Primeiro: Funções de start/stop da VM (mais crítico)
2. Depois: Gráficos de CPU e Memória (visual)

---

## Orientações para Testar a Feature de Autenticação

### Pré-requisitos
1. Backend rodando em `http://localhost:3001`
2. Frontend rodando em `http://localhost:3000`
3. Banco de dados MySQL rodando (porta 3312)
4. Variável de ambiente `JWT_SECRET` configurada no backend

### Testes Manuais

#### 1. Teste de Registro de Usuário
1. Acesse `http://localhost:3000/register`
2. Preencha o formulário:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `senha123` (mínimo 8 caracteres)
3. Clique em "Registrar"
4. **Esperado:** Usuário criado, token JWT retornado, redirecionamento para home

#### 2. Teste de Login
1. Acesse `http://localhost:3000/login`
2. Preencha com email ou username + senha
3. Clique em "Entrar"
4. **Esperado:** Login bem-sucedido, token armazenado, redirecionamento para home

#### 3. Teste de Proteção de Rotas (Frontend)
1. Sem estar logado, tente acessar `http://localhost:3000/`
2. **Esperado:** Redirecionamento automático para `/login`
3. Após login, acesse `/`
4. **Esperado:** Acesso permitido à home

#### 4. Teste de Proteção de Rotas (Backend)
1. Tente fazer uma requisição GET para `http://localhost:3001/api/v1/vm` sem token
2. **Esperado:** Erro 401 (Unauthorized)
3. Faça login e obtenha o token
4. Faça a mesma requisição com header `Authorization: Bearer <token>`
5. **Esperado:** Resposta 200 com lista de VMs

#### 5. Teste de Permissões
1. Crie um usuário com role `member`
2. Tente criar uma VM (POST `/api/v1/vm`)
3. **Esperado:** Erro 403 (Forbidden) - apenas manager/admin podem criar
4. Faça login como `admin` ou `manager`
5. Tente criar uma VM novamente
6. **Esperado:** VM criada com sucesso

#### 6. Teste de Validações
1. Tente fazer login com email inválido
2. **Esperado:** Erro de validação
3. Tente registrar com senha menor que 8 caracteres
4. **Esperado:** Erro de validação
5. Tente registrar com email já existente
6. **Esperado:** Erro 409 (Conflict) - Email já existe

#### 7. Teste de Token Expirado
1. Faça login e obtenha um token
2. Aguarde 7 dias (ou modifique o tempo de expiração no código para teste)
3. Tente usar o token
4. **Esperado:** Erro 401 - Token inválido/expirado

### Testes com Postman/Insomnia

#### Collection de Testes Sugerida:

1. **POST /api/v1/user/register**
   ```json
   {
     "username": "testuser",
     "email": "test@example.com",
     "password": "senha123",
     "role": "member"
   }
   ```

2. **POST /api/v1/user/login**
   ```json
   {
     "email": "test@example.com",
     "password": "senha123"
   }
   ```

3. **GET /api/v1/user** (com token)
   - Header: `Authorization: Bearer <token>`

4. **GET /api/v1/vm** (sem token - deve falhar)
5. **GET /api/v1/vm** (com token - deve funcionar)

### Verificações Importantes

- [ ] Token JWT é gerado corretamente no login/register
- [ ] Token é armazenado no localStorage do frontend
- [ ] Token é enviado nas requisições subsequentes
- [ ] Rotas protegidas retornam 401 sem token
- [ ] Rotas protegidas funcionam com token válido
- [ ] Usuário inativo não recebe token no login
- [ ] Senhas são hasheadas no banco de dados
- [ ] Validações Zod funcionam corretamente
- [ ] Mensagens de erro são claras e úteis

### Dados de Teste Sugeridos

#### Opção 1: Usar Script de Criação de Usuários (Recomendado)

Execute o script para criar usuários de teste automaticamente:

```bash
cd backend-node-vix-test
npm run create-test-users
```

Isso criará os seguintes usuários:
- **Admin:** `admin@vituax.com` / `Admin@123`
- **Manager:** `manager@vituax.com` / `Manager@123`
- **Member:** `member@vituax.com` / `Member@123`

**Nota:** O script usa `upsert`, então pode ser executado múltiplas vezes sem criar duplicatas.

#### Opção 2: Criar Manualmente via API

Após criar um usuário admin via script, você pode criar outros usuários via API:

```bash
POST /api/v1/user
Authorization: Bearer <token-do-admin>
Body: {
  "username": "novo-admin",
  "email": "novo-admin@test.com",
  "password": "Senha@123",
  "role": "admin"
}
```

#### Opção 3: Criar via Registro Público

O registro público (`/register`) sempre cria usuários com role `member`. Para testar roles diferentes, use o script ou a API protegida.

---

## Observações

- O erro `401 Unauthorized` em `/brand-master/self` é esperado se você não estiver logado, pois a rota agora requer autenticação. O hook `useLoadingApp` foi ajustado para não mostrar toast de erro nesses casos.
- O aviso sobre campo de senha não estar em form foi corrigido - agora os campos estão dentro de uma tag `<form>`.
- O carrossel na tela de login foi ajustado para melhor visibilidade dos bullets ativos.
- O registro agora faz login automático e redireciona para a home após sucesso.
- O campo `idBrandMaster` pode ser `null` no registro - a validação foi ajustada para aceitar valores nulos.
