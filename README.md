# Desafio Técnico - Desenvolvedor(a) Frontend React - Ministério Público do Estado do Acre

Esse projeto é um desafio técnico que faz parte do processo seletivo do Ministério Público do Estado do Acre para o cargo de Programador.

## Objetivo
Desenvolver uma aplicação <strong>Frontend</strong> utilizando <strong>React</strong>, com um fluxo de autenticação simples e uma interface para cadastro e gerenciamento de vagas de emprego.

## Pré-requisitos
<ul>
  <li>
    Node.js
  </li>
  <li>
    Docker (para executar em ambiente de produção. Não obrigatório)
  </li>
</ul>

## Executando a aplicação (LOCAL)
#### 1. Instalação das dependências
```js
npm install
```

#### 2. Execução do projeto em ambiente de desenvolvimento (acessível em http://localhost:5173)
```js
npm run dev
```
## Executando a aplicação (PRODUÇÃO) - Necessário Docker
#### 1. Construção da imagem do projeto
```js
 docker build -t teste-react-mpac-antonio-andre .  
```

#### 2. Execução do projeto em ambiente de produção (acessível em http://localhost:8080)
```js
 docker run -p 8080:8080 teste-react-mpac-antonio-andre
```

## Tecnologias utilizadas
<ul>
  <li>
    React + Vite
  </li>
  <li>
    TailwindCSS + Tailwind Plus
  </li>
  <li>
    Shadcn UI
  </li>
  <li>
    Zustand
  </li>
</ul>

## Diferenciais implementados
<ul>
  <li>
    Utilização de TypeScript
  </li>
  <li>
    Dockerização da aplicação
  </li>
  <li>
    Boas práticas de organização de código e estrutura de pastas
  </li>
  <li>
    Responsividade e uma boa interface de usuário (UX/UI)
  </li>
  <li>
    Git flow
  </li>
</ul>

## Funcionalidades da Aplicação

### 1. Autenticação
<strong>Para acessar o sistema é necessário que o usuário tenha uma conta que já esteja devidamente autenticada/registrada no servidor da aplicação</strong>. <br/>
(O usuário autenticado é disponibilizado pela própria equipe do Ministério Público do Estado do Acre, não sendo necessário implementar um sistema de registro de usuário)

#### Tela de Login
<ul>
  <li>
    Campos obrigatórios:
    <ul>
      <li>
        Email
      </li>
      <li>
        Senha
    </li>
    </ul>
  </li>
</ul>

### 2. Operações de CRUD das Vagas
Após o usuário ser autenticado na aplicação será possível realizar todas as ações de:

#### Criar uma vaga (POST)
<ul>
  <li>
    Campos obrigatórios:
    <ul>
      <li>
        Nome da empresa
      </li>
      <li>
        Link
      </li>
      <li>
        Cargo/Função
      </li>
      <li>
        Salaŕio/Remuneração
      </li>
      <li>
        Remoto (booleano)
      </li>
    </ul>
  </li>
</ul>

#### Atualizar uma vaga (PUT)
<ul>
  <li>
    Campos obrigatórios:
    <ul>
      <li>
        Nome da empresa
      </li>
      <li>
        Link
      </li>
      <li>
        Cargo/Função
      </li>
      <li>
        Salaŕio/Remuneração
      </li>
      <li>
        Remoto (booleano)
      </li>
    </ul>
  </li>
</ul>

#### Listar todas as vagas (GET)
<ul>
  <li>
    Campos visíveis:
    <ul>
      <li>
        Cargo/Função
      </li>
      <li>
        Nome da empresa
      </li>
      <li>
        Localização
      </li>
    </ul>
  </li>
</ul>

#### Mostrar detalhes uma vaga (GET)
<ul>
  <li>
    Campos visíveis:
    <ul>
      <li>
        Nome da empresa
      </li>
      <li>
        Link
      </li>
      <li>
        Salário
      </li>
      <li>
        Cargo/Função
      </li>
      <li>
        Salaŕio/Remuneração
      </li>
      <li>
        Modalidade
      </li>
      <li>
        Data de criação
      </li>
    </ul>
  </li>
</ul>


## Detalhes importantes
<ul>
  <li>
    Um usuário vai conseguir acessar as rotas internas da aplicação somente se estiver autenticado
  </li>
  <li>
    Um usuário que está autenticado não terá acesso à rota "/login"
  </li>
  <li>
    Um usuário terá acesso à rota "/login" apenas se não estiver autenticado ou com token inválido
  </li>
</ul>

## Imagens da aplicação
### 1. Tela de login
![image](https://github.com/user-attachments/assets/45f4266a-3d48-4d1c-8ec6-9d2c41737a3e)

<br/>

### 2. Tela de listagem de vagas (sem vagas cadastradas)
![image](https://github.com/user-attachments/assets/df421365-9cc4-4203-8571-578628261702)


<br/>

### 3. Tela de listagem de vagas (com vagas cadastradas)
![image](https://github.com/user-attachments/assets/921dbd79-77e0-4d44-878a-a66d3842881b)


<br/>

### 4. Tela de registro/criação de uma vaga
![image](https://github.com/user-attachments/assets/f7b66369-d291-4c54-b3bd-a7136e902740)

<br/>

### 5. Tela de edição de uma vaga
![image](https://github.com/user-attachments/assets/c856d8a6-a84d-422e-9cb3-4821bbc78d9c)

<br/>

### 6. Tela de remover uma vaga
![image](https://github.com/user-attachments/assets/02b9fd2f-ae71-49aa-8f8c-40796837e327)



