
# Welcome to IASI APP 👋

O **IASI** é um aplicativo inovador desenvolvido para promover a sustentabilidade industrial, permitindo que os usuários acompanhem e otimizem o desempenho ambiental de suas empresas. Através de uma interface intuitiva e amigável, o aplicativo oferece funcionalidades como monitoramento de eficiência energética, redução de custos, diminuição da pegada de carbono, e uso de energia renovável.

## 📋 Funcionalidades Principais

### 📝 Cadastro e Login
- Permite que usuários se registrem, façam login e recuperem suas senhas.
- Autenticação segura via tokens para garantir a proteção dos dados dos usuários.
- Armazenamento persistente de tokens usando `AsyncStorage`, mantendo o usuário logado mesmo após fechar o app.

### 📊 Dashboard de Indústrias
- Visualização centralizada das empresas cadastradas pelo usuário.
- Exibe dados importantes como:
  - Eficiência Geral
  - Redução de Custos
  - Pegada de Carbono
  - Uso de Energia Renovável
- Navegação intuitiva para visualizar e gerenciar várias indústrias.

### ➕ Adicionar Indústrias
- Funcionalidade para adicionar novas indústrias ao dashboard, inserindo informações relevantes para acompanhamento.
- Campos de entrada de dados para:
  - Nome da Indústria
  - Endereço
  - Eficiência Geral (%)
  - Redução de Custos (%)
  - Redução da Pegada de Carbono (%)
  - Uso de Energia Renovável (%)

### ✏️ Editar Indústrias
- Permite editar as informações de uma indústria já cadastrada.
- Acesso fácil à funcionalidade de edição diretamente do dashboard.

### 🔒 Autenticação Segura
- Uso de autenticação via token para segurança dos dados do usuário.
- Armazenamento seguro e persistente do token de autenticação.
- Função de logout para remover o token do armazenamento.

### 📡 Backend API
- Comunicação com um backend configurado para gerenciar usuários e indústrias.
- Rota para login e registro de usuários.
- Endpoints para adicionar, listar e editar indústrias associadas ao usuário autenticado.

## 🛠️ Estrutura do Projeto

```plaintext
IASI_FRONTEND/
├── app/
│   ├── AddIndustryScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── EditIndustryScreen.tsx
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── NavigationContext.tsx
│   ├── PasswordResetScreen.tsx
│   ├── RegisterScreen.tsx
│   └── index.tsx
├── assets/
│   ├── fonts/
│   └── images/
├── components/
│   ├── ButtonComponent.tsx
│   ├── CustomInputComponent.tsx
│   ├── DescriptionComponent.tsx
│   ├── InputComponent.tsx
│   └── LogoComponent.tsx
├── scripts/
│   ├── babel.config.js
│   └── global.css
├── app.json
├── package.json
├── README.md
└── tsconfig.json
```

## 🚀 Get Started

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/seu-usuario/iasi-app.git
   cd iasi-app
   ```

2. **Instalar Dependências:**

   ```bash
   npm install
   ```

3. **Iniciar o App:**

   ```bash
   npx expo start
   ```

4. **Configurar o Backend:**
   - Certifique-se de configurar e iniciar o backend para conectar o aplicativo às APIs.
   - O backend deve estar rodando em `http://localhost:3000` (ou ajuste conforme necessário).

## 📦 Requisitos de Dependências

O projeto utiliza as seguintes dependências principais:

- **React Native & Expo:** Framework para desenvolvimento mobile.
- **@react-native-async-storage/async-storage:** Armazenamento de dados local e persistente.
- **react-navigation:** Navegação entre telas.
- **Expo Font:** Gerenciamento de fontes personalizadas.
- **Ionicons:** Biblioteca de ícones.

## 📚 Backend API Endpoints

### Login e Registro
- **POST /login** - Realiza o login e retorna um token de autenticação.
- **POST /registro** - Cria um novo usuário.

### Gestão de Indústrias
- **GET /industrias** - Lista todas as indústrias cadastradas para o usuário autenticado.
- **POST /industrias** - Adiciona uma nova indústria.
- **PUT /industrias/:id** - Edita as informações de uma indústria existente.

## 🧪 Testes

1. **Simulação de Login e Cadastro:**
   - Faça login e crie uma conta para verificar a persistência e o comportamento da autenticação.
   
2. **Adicionar, Editar e Listar Indústrias:**
   - Use a tela de adicionar para criar novas indústrias.
   - Edite as indústrias criadas para testar o funcionamento completo das rotas do backend.

3. **Persistência de Sessão:**
   - Após fazer login, feche e reabra o aplicativo para garantir que a sessão do usuário é restaurada corretamente.

## 🤝 Contribuições

Contribuições são bem-vindas! Se encontrar algum bug ou tiver sugestões, sinta-se à vontade para abrir uma issue ou enviar um pull request.
