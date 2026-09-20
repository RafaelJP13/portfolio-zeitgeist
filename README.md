# Portfólio: Rafael Santos Fernandes

Site estático em HTML5, CSS3 e JavaScript puro. Sem build, sem dependências.

## Rodar localmente

Abra o `index.html` no navegador, ou use um servidor estático:

```bash
npx serve .
```

## Publicar na Vercel

**Pela CLI**

```bash
npm i -g vercel
vercel        # preview
vercel --prod # produção
```

**Pelo GitHub**

1. Suba esta pasta para um repositório.
2. Na Vercel, clique em *Add New > Project* e importe o repositório.
3. Em *Framework Preset*, deixe **Other**. Não precisa de build command nem output directory.

## Editar o conteúdo

- Textos e projetos: `index.html` (cada projeto é um `<article class="entry">`).
- Cores e tipografia: variáveis no topo de `css/style.css`.
- Filtro por tecnologia: as tags com `data-token` alimentam o filtro. Para uma tecnologia nova, adicione o `data-token` na tag e um `<button class="chip" data-filter="...">` na seção de filtro.
- Contatos: lista no `<footer>` do `index.html`.
