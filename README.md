# brewfather-web-kitchen

Faça a versão web do brewfather, totalmente completa e funcional.

## Build

```sh
npm install
npm run build
```

A aplicação é um frontend estático e não depende de um backend próprio. O login e a sincronização com cloud são feitos diretamente no navegador usando OAuth 2.0 com PKCE quando o provedor exige.

## Configuração de provedores

Crie apenas os Client IDs públicos dos provedores e configure as variáveis de ambiente do frontend no arquivo `.env.local` (ou `.env` em ambientes de build):

```env
VITE_DROPBOX_CLIENT_ID=...
```

### Dropbox

- Crie um app no painel da Dropbox e use o OAuth 2.0 Authorization Code Flow com PKCE.
- Configure o redirect URI com a origem do app, por exemplo `http://localhost:8080` em desenvolvimento e `https://seu-site.com` em produção.
- Permissões mínimas: `files.content.write`, `files.content.read` e `account_info.read`.

## Sincronização

A sincronização salva um único arquivo JSON de backup por provedor (`BrewCraft/brewcraft-sync.json` por padrão). A aplicação usa comparação de versão, marca temporal e identidades do conteúdo para evitar sobrescrita silenciosa de dados e detectar conflitos com segurança.

## GitHub Pages

A aplicação já foi ajustada para funcionar em hospedagem estática. Para publicar no GitHub Pages:

1. Faça o push do projeto para um repositório GitHub.
2. Ative o GitHub Pages no repositório.
3. Use a opção de deploy a partir do branch `gh-pages` ou use GitHub Actions.
4. Configure o redirect URI do Dropbox com a origem da página pública, por exemplo `https://<usuario>.github.io/<repositorio>/`.
5. O app usa `HashRouter` automaticamente em GitHub Pages, então as rotas internas continuam funcionando sem fallback do servidor.

Exemplo de build para publicação:

```sh
npm install
npm run build
```

O conteúdo gerado em `dist/` pode ser publicado diretamente como site estático.

## Desenvolvimento local

```sh
npm run dev
```

A aplicação pode ser servida via qualquer hosting estático, sem `node server.cjs`, sem backend próprio e sem necessidade de iniciar um servidor local de OAuth.
