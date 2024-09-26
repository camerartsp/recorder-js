# Recorder-JS

**recorder-js** é uma aplicação web que permite gravar a tela do seu computador e fazer upload da gravação para um servidor. O projeto utiliza **Node.js** no backend e **HTML5** no frontend para fornecer uma interface simples para iniciar e parar gravações de tela.

## Funcionalidades

- Captura a tela do computador do usuário.
- Exibe uma pré-visualização da gravação em tempo real.
- Permite iniciar e parar a gravação com um clique.
- Faz upload da gravação para o servidor.
- Armazena as gravações no servidor para processamento futuro (opcional).

## Tecnologias Utilizadas

- **Node.js**: Para o servidor backend.
- **Express**: Framework para criar o servidor HTTP.
- **Multer**: Middleware para manipulação de uploads de arquivos.
- **HTML5**: Para a interface do usuário.
- **MediaRecorder API**: Para captura e gravação de vídeo da tela.

## Instalação

### Requisitos

- **Node.js** e **npm** (Node Package Manager) instalados em sua máquina.

### Passos

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/recorder-js.git
    cd recorder-js
    ```

2. **Instale as dependências do projeto:**

    ```bash
    npm install
    ```

3. **Configure suas variáveis de ambiente (opcional):**

    Para testar localmente em produção e usar o armazenamento da Vercel, você precisará criar uma variável de ambiente com seu token de leitura e escrita. Crie um arquivo chamado `.env` na raiz do projeto e adicione a seguinte linha:

    ```env
    BLOB_READ_WRITE_TOKEN=seu_token_aqui
    ```

    Certifique-se de substituir `seu_token_aqui` pelo seu token real.

4. **Inicie o servidor:**

    ```bash
    node server.js
    ```

    O servidor estará disponível em `http://localhost:3000` por padrão.

## Uso

1. **Abra o navegador e acesse** `http://localhost:3000`.
2. **Clique em "Iniciar Gravação"** para começar a capturar a tela.
3. **Clique em "Parar Gravação"** quando terminar. A gravação será automaticamente enviada para o servidor.

## Formatos de Arquivo

Os arquivos de gravação são salvos no formato `.webm` ou `.mp4`, dependendo do navegador.

## Estrutura do Projeto

- `index.html`: A página HTML que fornece a interface do usuário para gravação e pré-visualização do vídeo.
- `server.js`: O arquivo Node.js que configura o servidor e manipula uploads de arquivos.

## Problemas Conhecidos

- A taxa de quadros pode não ser consistente em todos os navegadores.
- O vídeo pode parecer acelerado se a taxa de quadros não for configurada corretamente.

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para a sua feature (`git checkout -b minha-nova-feature`).
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin minha-nova-feature`).
5. Abra um Pull Request.

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.