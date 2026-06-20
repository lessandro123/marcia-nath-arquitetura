import { pages } from "./site-content.generated";

const removedPageSlugs = new Set(["inovacao-que-melhora-a-rotina"]);

export const pageSlugs = Object.keys(pages).filter(
  (slug) => slug !== "index" && !removedPageSlugs.has(slug)
);

export function resolvePageKey(slug) {
  const normalized = slug === "index.html" ? "index" : slug.replace(/\.html$/, "");
  return pages[normalized] && !removedPageSlugs.has(normalized) ? normalized : null;
}

export function getLegacyPage(pageKey) {
  const page = pages[pageKey];
  if (!page) return null;

  let body = page.body;

  if (pageKey === "inspire-se") {
    body = body.replace(
      'src="inspire-se-paleta.jpeg"',
      'src="/imagens%20atuais/crie_um_ambiente_a_partir_202606191455.jpeg"'
    );
  }

  if (pageKey === "artigos") {
    body = body.replace(
      /\s*<a class="article-hub-card" href="inovacao-que-melhora-a-rotina">[\s\S]*?<\/a>/,
      ""
    );
  }

  if (pageKey === "projeto-arquitetonico-valoriza-imovel") {
    body = body.replace(
      /(<h2>Valor percebido começa na organização do espaço<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_a_partir_202606191519.jpeg"
              alt="Sala integrada com iluminação planejada, painel ripado e áreas de estar e jantar organizadas"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /<section>\s*(<h2>Acabamento certo vale mais que acabamento caro<\/h2>)([\s\S]*?<\/p>[\s\S]*?<\/p>)\s*<\/section>/,
      `<section>
          $1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/quero_a_churrasqueira_sem_fogo_202606191535.jpeg"
              alt="Sala integrada com iluminação planejada, madeira, área de estar e espaço gourmet"
              loading="lazy"
              decoding="async"
            />
          </figure>
          $2
        </section>`
    );

    body = body.replace(
      /(<h2>Funcionalidade pesa na decisão de compra<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_apartir_dessa_202606191558.jpeg"
              alt="Apartamento integrado com iluminação em trilhos, estar, leitura e jantar organizados"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Quando investir em projeto faz mais sentido<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_apartir_dessa_202606191638.jpeg"
              alt="Sala de estar integrada à cozinha e jantar, com madeira, iluminação indireta e vegetação"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

  }

  if (pageKey === "tendencias-arquitetura-residencial-2026") {
    body = body.replace(
      /(<h2>Conforto térmico como decisão de projeto<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_apartir_dessa_202606191651.jpeg"
              alt="Loft com pé-direito alto, mezanino, grandes aberturas e ventilação natural"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Natureza integrada ao cotidiano<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_apartir_dessa_202606191702.jpeg"
              alt="Fachada residencial com jardins, grandes aberturas e áreas externas integradas"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Materiais naturais com leitura contemporânea<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_apartir_dessa_202606191714.jpeg"
              alt="Casa integrada com madeira, tijolos aparentes, vidro e iluminação contemporânea"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Automação mais discreta<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_apartir_dessa_202606191724.jpeg"
              alt="Ambiente residencial com painel de automação integrado à parede"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Plantas flexíveis e ambientes híbridos<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_apartir_dessa_202606191740.jpeg"
              alt="Sala residencial com marcenaria integrada, área de estar e espaço versátil"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Fachadas com presença e equilíbrio<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_apartir_dessa_202606191745.jpeg"
              alt="Área externa residencial com estrutura de madeira, jardim e estar integrado"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );
  }

  if (pageKey === "novidades-arquitetura-2026") {
    body = body.replace(
      /<section class="article-next"><span>Continue lendo<\/span><a href="inovacao-que-melhora-a-rotina">Quando a Tecnologia se Torna Conforto <span aria-hidden="true">→<\/span><\/a><\/section>/,
      '<section class="article-next"><span>Continue lendo</span><a href="ambientacao-atual-com-personalidade">Matéria, Luz e Personalidade <span aria-hidden="true">→</span></a></section>'
    );

    body = body.replace(
      /(<h2>Ambientes preparados para mudar<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/mude_a_cadeira_de_rodas_202606191950.jpeg"
              alt="Home office integrado ao quarto, com divisória de madeira, mesa de trabalho e vista urbana"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Conforto antes do equipamento<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/remova_essa_parede_de_vidro_202606192003.jpeg"
              alt="Sala de jantar e estar integradas, com marcenaria clara, iluminação planejada e vegetação"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );
  }

  if (pageKey === "ambientacao-atual-com-personalidade") {
    body = body.replace(
      /(<h2>A base vem do próprio espaço<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/troque_este_quadro_por_um_202606192019.jpeg"
              alt="Sala integrada com parede de pedra, obra de arte colorida e escada iluminada"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Texturas criam profundidade<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_a_partir_202606192030.jpeg"
              alt="Apartamento integrado com madeira no teto, poltronas em couro, cadeiras azuis e varanda com vista urbana"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Cor com direção<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_a_partir_202606192038.jpeg"
              alt="Sala integrada com sofá azul, almofadas coloridas, tapete estampado e mesa de jantar em madeira"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Iluminação e objetos finalizam a atmosfera<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/na_janela_querro_uma_que_202606192050.jpeg"
              alt="Sala e jantar integrados com painel ripado, iluminação linear, marcenaria e vista urbana"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );
  }

  if (pageKey === "automacao-residencial-vale-a-pena") {
    body = body.replace(
      /(<h2>O que automatizar primeiro<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/crie_um_ambiente_apartir_dessa_202606191902.jpeg"
              alt="Sala de espera contemporânea com poltronas, iluminação pendente e lareira automatizada"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Iluminação é onde a diferença aparece mais rápido<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/na_parede_do_quadro_grande_202606191921.jpeg"
              alt="Sala de jantar integrada, com iluminação planejada, marcenaria em madeira, painel de arte e áreas de estar ao fundo"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );

    body = body.replace(
      /(<h2>Conforto, segurança e economia precisam caminhar juntos<\/h2>)/,
      `$1
          <figure class="article-section-media">
            <img
              src="/imagens%20atuais/remova_esta_planta_onde_eu_202606191938.jpeg"
              alt="Sala integrada com marcenaria em madeira, iluminação planejada, televisão e área de estar"
              loading="lazy"
              decoding="async"
            />
          </figure>`
    );
  }

  return {
    bodyClass: page.bodyClass,
    body
  };
}

export function getPageMetadata(pageKey) {
  const page = pages[pageKey];
  if (!page) return {};

  return {
    title: page.title,
    description: page.description
  };
}
