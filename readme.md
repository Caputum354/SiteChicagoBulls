# Bulls Court

**Bulls Court** é uma experiência editorial responsiva sobre o Chicago Bulls, criada para apresentar a identidade visual do time em uma interface com ritmo de revista esportiva. O projeto foi implementado no front-end com **HTML, CSS e JavaScript puro**, sem frameworks de interface, banco de dados ou API própria.

> A direção visual escolhida foi **Courtside Editorial**: uma composição neo-editorial inspirada em pôsteres de arena, Swiss Style e cultura impressa de zines.

## Estrutura do projeto

| Arquivo | Responsabilidade |
| --- | --- |
| `client/index.html` | Documento HTML, metadados, título e carregamento das fontes. |
| `client/src/main.js` | Estrutura de conteúdo, renderização, dados estáticos e interações. |
| `client/src/styles.css` | Tokens visuais, layout responsivo, animações e estados de interface. |
| `ideas.md` | Brainstorm de direção visual e decisões de marca. |

## Tipografia

| Fonte | Uso | Características |
| --- | --- | --- |
| **Bebas Neue** | Manchetes, placares, anos, números e wordmark editorial. | Condensada, forte e com leitura imediata em tamanhos grandes. |
| **Manrope** | Corpo de texto, navegação, metadados, botões e formulários. | Geométrica, limpa e confortável para leitura em telas. |



## Cores utilizadas

| Nome | Hexadecimal | Função na interface |
| --- | --- | --- |
|   **Bulls Red**    | ` #CE1141 ` | Cor de ação, CTAs, etiquetas, destaques, estados ativos e áreas de energia. |
| **Bulls Red Dark** | ` #9F0D32 ` | Estado hover e variação de profundidade do vermelho principal. |
|     **Black**      | ` #080808 ` | Cabeçalho, rodapé, seção editorial, modal e áreas de contraste máximo. |
|      **Ink**       | ` #151515 ` | Texto principal sobre superfícies claras. |
|     **Paper**      | ` #F2F0EB ` | Fundo off-white das áreas de agenda, história e ícones. |
| **White**          | ` #FFFFFF ` | Texto sobre fundos escuros, botões claros e respiro visual. |
| **Steel**          | ` #A3A5A4 ` | Referência metálica para textos de apoio e sensação de placar. |
| **Muted**          | ` #777773 ` | Metadados e texto secundário em superfícies de papel. |

## Assets

As imagens fornecidas (`bandeiraBulls.jpg`, `chicago-bulls-logo.png` e `TorcidaBulls.jpg`) aparecem no hero, no cabeçalho, nos cartões de agenda, no arquivo e na seção de torcida. Também foram preparados assets editoriais complementares para imagens de arena, detalhe de quadra, cidade à noite e um símbolo gráfico de apoio.

Os arquivos de imagem são referenciados por URLs de storage do projeto, em vez de serem colocados dentro de `client/public/`. Isso mantém o bundle do front-end leve e segue a organização de mídia do ambiente.

## Interações incluídas

O site possui menu mobile com abertura e fechamento, navegação por âncoras, busca visual com filtragem dos cartões de notícias, filtros de ícones, modal para leitura de notas, newsletter com feedback de envio, ticker animado, entrada progressiva das seções, botão para retornar ao topo e suporte a `prefers-reduced-motion`.

## Execução

No ambiente do projeto, a aplicação é servida pelo Vite. Para uma execução local equivalente, instale as dependências do template e use o script de desenvolvimento configurado no `package.json`. A entrega visual e funcional está concentrada em `client/index.html`, `client/src/main.js` e `client/src/styles.css`.
