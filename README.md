# Projeto SpringIonic - Frontend

Este projeto utiliza **Angular** com **Ionic Framework** para construir aplicações modernas e responsivas, com suporte a recursos nativos através do **Capacitor**. O objetivo principal é construir uma aplicação interativa e responsiva, adequada para dispositivos móveis e desktops. Ele oferece funcionalidades robustas de autenticação, navegação por rotas dinâmicas, integração de serviços e gerenciamento de dados, adequado para diversos dispositivos.

## Tecnologias Utilizadas

- **Angular (v18.x)**: Utilizado como o framework principal para o desenvolvimento frontend.
- **Ionic Framework**: Framework de interface de usuário para desenvolvimento rápido de aplicativos móveis e web com uma experiência consistente.
- **Capacitor**: Plataforma para construção de aplicações que podem acessar APIs nativas do dispositivo, permitindo integrações avançadas com dispositivos móveis.
- **TypeScript**: Suporte para desenvolvimento tipado no projeto.
- **Auth0 Angular JWT**: Para a gestão de tokens JWT em autenticações.
- **Serviços Personalizados (ex.: `CategoryService`, `AuthService`, `ProductService`, etc.)**
- **Reactive Forms e HTTP Interceptors para autenticação e tratamento de erros**
- **Ferramenta de Linting**:
  - `@angular-eslint` para validação de padrões de código.

## Scripts Disponíveis

- `start`: Inicia a aplicação em um servidor de desenvolvimento local.
- `build`: Gera a versão de produção da aplicação.
- `watch`: Compila e observa mudanças no código durante o desenvolvimento.
- `test`: Executa os testes unitários utilizando Karma e Jasmine.
- `lint`: Executa o linting no código usando ESLint.

## Dependências Principais

- **Angular Core e Módulos Associados** (`@angular/core`, `@angular/router`, etc.)
- **@ionic/angular**: Integração de componentes UI do Ionic com Angular.
- **@capacitor**: Módulos como `@capacitor/core`, `@capacitor/android` e plugins nativos para funcionalidades específicas.

## Funcionalidades Principais

1. **Autenticação e Segurança**:  
   O projeto utiliza `authInterceptor` e `errorInterceptor` para gerenciar tokens JWT e interceptar respostas de erro.
2. **Gestão de Navegação**:  
   Configurado com rotas para várias páginas, incluindo `home`, `categories`, `profile`, `signup`, `products`, `cart`, entre outras. Cada rota utiliza carregamento de módulos sob demanda (`lazy-loading`) para otimização do carregamento.
3. **Serviços**:  
   Serviços personalizados são fornecidos para operações de CRUD e interação com diferentes partes do aplicativo (ex.: `CategoryService` para categorias de produtos).

## Estrutura e Organização do Projeto

### Módulo Principal (`app.module.ts`)

- O módulo principal (`AppModule`) configura os principais serviços e componentes do aplicativo, incluindo:
  - `ReactiveFormsModule` para formulários dinâmicos.
  - `IonicModule` com a configuração de swipe desativada.
  - Provedores de serviços como `CategoryService`, `AuthService`, `StorageService`, `ClientService`, `ProductService`, `CartService` e `ImageUtilService`.

### Navegação por Rotas (`app-routing.module.ts`)

- A navegação é gerenciada usando `RouterModule` com rotas preguiçosas (`lazy-loaded`) para páginas específicas.
  - Exemplos de rotas incluem `/home`, `/categories`, `/profile`, etc.
  - Estratégia de pré-carregamento (`PreloadAllModules`) usada para melhorar o desempenho em alguns cenários.

## Serviços Essenciais e Funcionalidades

### AuthService (`auth.service.ts`)

- **Descrição**: Serviço responsável pela autenticação de usuários, gerenciamento de tokens JWT e logout.
- **Funcionalidades Principais**:
  - `authenticate()`: Realiza login utilizando as credenciais do usuário e retorna um `Observable` com a resposta do servidor.
  - `refreshToken()`: Faz a renovação do token JWT se ele ainda for válido.
  - `successfulLogin()`: Processa o login bem-sucedido, decodificando o token, armazenando o usuário e limpando/criando o carrinho.
  - `logout()`: Remove os dados do usuário e redireciona para a página inicial.

### ImageUtilService (`image-util.service.ts`)

- **Descrição**: Serviço utilitário para manipulação de imagens, como conversão de fotos tiradas por dispositivos móveis.
- **Funcionalidades Principais**:
  - `getPictureAsBlob()`: Converte uma imagem capturada pela câmera (usando Capacitor) em um `Blob`.
  - `dataUriToBlob()`: Converte uma URI de dados em um objeto `Blob`.

### StorageService (`storage.service.ts`)

- **Descrição**: Serviço para armazenar e recuperar informações no `localStorage`.
- **Funcionalidades Principais**:
  - `getLocalUser()` e `setLocalUser()`: Gerencia os dados do usuário local, incluindo leitura e remoção.
  - `getCart()` e `setCart()`: Gerencia o armazenamento do carrinho de compras.

### CartService (`cart.service.ts`)

- **Descrição**: Serviço responsável pelo gerenciamento do carrinho de compras.
- **Funcionalidades Principais**:
  - `createOrClearCart()`: Cria um carrinho vazio ou limpa o carrinho existente.
  - `getCart()`: Recupera o carrinho atual ou cria um novo se não houver carrinho armazenado.
  - `addProduct()`: Adiciona um produto ao carrinho.
  - `removeProduct()`: Remove um produto do carrinho.
  - `increaseQuantity()`: Aumenta a quantidade de um produto no carrinho.
  - `decreaseQuantity()`: Diminui a quantidade de um produto ou o remove se a quantidade for menor que 1.
  - `total()`: Calcula o total de todos os produtos no carrinho.

## Páginas Principais

### HomePage (`home.page.ts` e `home.page.html`)

- **Descrição**: Página inicial da aplicação, onde o usuário pode fazer login ou se registrar.
- **Componentes**:
  - **Formulário de Login**: Recebe o email e a senha do usuário, autenticando-o ao clicar no botão "Entrar".
  - **Botão de Registro**: Redireciona o usuário para a página de registro (`SignupPage`).
  - **Interação com o `AuthService`**: Realiza o login do usuário, chama o método `authenticate()` e, se bem-sucedido, redireciona para a página de categorias.

- **Funcionalidades**:
  - **Login**: O método `login()` chama o `AuthService` para autenticar as credenciais fornecidas pelo usuário.
  - **Autenticação Persistente**: Ao entrar, o token JWT é automaticamente renovado usando o método `refreshToken()` do `AuthService` e, se a renovação for bem-sucedida, redireciona para a página de categorias.

## SignupPage (`signup.page.ts` e `signup.page.html`)

- **Descrição**: Página responsável pelo registro de novos usuários.
- **Componentes**:
  - **Formulário de Cadastro**: Recebe as informações necessárias para o cadastro do usuário, incluindo:
    - Nome, Email, Tipo de Cliente (Pessoa Física ou Jurídica)
    - CPF ou CNPJ, Senha
    - Endereço completo (logradouro, número, complemento, bairro, CEP)
    - Telefones de contato
    - Estado e cidade (com atualização dinâmica das cidades com base no estado selecionado)
  
  - **Validação de Formulário**: Validações são aplicadas aos campos obrigatórios, como `name`, `email`, `password`, entre outros. A validação do formulário impede o envio se houver campos inválidos.
  
  - **Seleção Dinâmica de Cidade**: O estado selecionado carrega as cidades disponíveis, e ao mudar o estado, a cidade é atualizada automaticamente.

- **Fluxo de Cadastro**:
  1. O usuário preenche os campos do formulário.
  2. O formulário é validado antes do envio.
  3. Ao enviar, o método `signupUser()` chama o `ClientService` para realizar o cadastro.
  4. Após o sucesso do cadastro, um alerta é mostrado informando o sucesso e permitindo que o usuário retorne à tela anterior.

- **Funções Importantes**:
  - `signupUser()`: Realiza a inserção dos dados no sistema ao chamar o serviço `ClientService`.
  - `updateCities()`: Atualiza as cidades com base no estado selecionado pelo usuário.
  - `showInsertOk()`: Exibe um alerta confirmando que o cadastro foi realizado com sucesso.

### Serviços Utilizados no Cadastro

#### `ClientService` - Gerenciamento de Clientes
- **Responsabilidade**: O `ClientService` gerencia operações relacionadas aos clientes, como a busca por email ou ID, a inserção de novos registros e o upload de imagens.
  
- **Principais Métodos**:
  - **`findByEmail(email: string)`**: Realiza uma busca por um cliente baseado no email.
  - **`findById(id: string)`**: Busca um cliente específico por seu ID.
  - **`insert(obj: ClientDTO)`**: Realiza o cadastro de um novo cliente na base de dados. Este método é utilizado na página de cadastro (`signup.page.ts`).
  - **`uploadPicture(picture: Photo)`**: Realiza o upload da foto de perfil do cliente.

- **Interação com o Backend**: Utiliza o endpoint `POST /clients` para inserir novos clientes, além de utilizar o `GET /clients/{id}` e `GET /clients/email?value={email}` para buscar informações sobre clientes.

---

#### `StateService` - Gerenciamento de Estados
- **Responsabilidade**: O `StateService` busca todos os estados disponíveis na aplicação para permitir a seleção do estado no formulário de cadastro.

- **Principais Métodos**:
  - **`findAll()`**: Retorna todos os estados, com dados estruturados no formato `StateDTO[]`. Este serviço é utilizado na página de cadastro (`signup.page.ts`) para preencher o campo de estados.

- **Interação com o Backend**: Utiliza o endpoint `GET /states` para buscar todos os estados.

---

#### `CityService` - Gerenciamento de Cidades
- **Responsabilidade**: O `CityService` busca as cidades de um determinado estado, permitindo que o usuário selecione uma cidade após escolher um estado.

- **Principais Métodos**:
  - **`findAll(stateId: string)`**: Busca todas as cidades de um estado específico. Este serviço é utilizado na página de cadastro (`signup.page.ts`) para preencher o campo de cidades com base no estado selecionado.

- **Interação com o Backend**: Utiliza o endpoint `GET /states/{stateId}/cities` para buscar as cidades de um determinado estado.

---

### Fluxo Completo do Cadastro

1. **Seleção de Estado e Cidade**:
   - Ao iniciar o cadastro, a aplicação carrega a lista de estados utilizando o `StateService`. 
   - Quando o usuário seleciona um estado, o `CityService` é acionado para carregar as cidades daquele estado.
  
2. **Cadastro do Cliente**:
   - O formulário de cadastro é preenchido, e ao ser submetido, o `ClientService` é chamado para enviar os dados para o backend utilizando o método `insert()`.

### Estrutura de Dados - DTOs

#### **`ClientDTO` - Dados do Cliente**
- **Estrutura**: Define os dados de um cliente.
- **Campos**:
  - **`id`** (string): Identificador único do cliente.
  - **`name`** (string): Nome completo do cliente.
  - **`email`** (string): Email do cliente.
  - **`imageUrl`** (string, opcional): URL da imagem de perfil do cliente (caso haja).

- **Uso**: O `ClientDTO` é utilizado na criação e manipulação dos dados do cliente no backend. Esse objeto é enviado ao servidor quando o usuário se cadastra (via `ClientService.insert()`), e também é usado para a recuperação de dados do cliente.

---

#### **`StateDTO` - Dados do Estado**
- **Estrutura**: Representa um estado.
- **Campos**:
  - **`id`** (string): Identificador único do estado.
  - **`name`** (string): Nome do estado.

- **Uso**: O `StateDTO` é utilizado para listar e gerenciar os estados. Ele é usado no formulário de cadastro para preencher a lista de estados ao utilizar o `StateService`.

---

#### **`CityDTO` - Dados da Cidade**
- **Estrutura**: Representa uma cidade dentro de um estado.
- **Campos**:
  - **`id`** (string): Identificador único da cidade.
  - **`name`** (string): Nome da cidade.
  - **`state`** (StateDTO, opcional): Estado ao qual a cidade pertence (opcional, pois a cidade pode ser identificada apenas pelo seu `id` e `name`).

- **Uso**: O `CityDTO` é usado para listar e gerenciar as cidades dentro de um estado. Ele é utilizado no formulário de cadastro para preencher a lista de cidades com base no estado selecionado, sendo recuperado através do `CityService`.

---

### Configuração da API - `api.config.ts`

#### **API Configuration**
- **Campos**:
  - **`baseUrl`**: URL base para as chamadas de API, que será usada por todos os serviços para interagir com o backend.
  - **`bucketBaseUrl`**: URL base para acessar o bucket S3 onde as imagens dos clientes são armazenadas.

- **Uso**: As URLs fornecidas no arquivo de configuração são utilizadas nos serviços para realizar as requisições HTTP aos endpoints da API, garantindo a centralização das configurações e evitando repetição de URLs em várias partes do código.

---

## Instalação e Configuração

1. Clone este repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue para o diretório do projeto:
   ```bash
   cd springionic-frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute o servidor de desenvolvimento:
   ```bash
   npm start
   ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

1. Fork o projeto
2. Crie uma nova branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adicionei nova funcionalidade'`)
4. Faça um push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE]( https://opensource.org/licenses/MIT) para obter mais informações.
