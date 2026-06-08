if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const resetHomeToHero = () => {
  if (!document.querySelector(".hero")) return;

  if (window.location.hash) {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};

window.addEventListener("pageshow", () => {
  resetHomeToHero();
  window.requestAnimationFrame(resetHomeToHero);
});

const initializeSite = () => {
  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menuClose = document.querySelector("[data-menu-close]");
  const heroVideos = Array.from(document.querySelectorAll("[data-hero-video]"));
  const revealItems = document.querySelectorAll(".reveal");
  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  const language =
    requestedLanguage === "en" || requestedLanguage === "es" || requestedLanguage === "it"
      ? requestedLanguage
      : "pt";

  const pageKey = (() => {
    const page = window.location.pathname.split("/").pop() || "index.html";
    return page.replace(".html", "") || "index";
  })();

  const englishMeta = {
    index: {
      title: "Marcia Nath Architecture | Residential Projects and Interiors",
      description:
        "Residential architecture and interiors for people who want a sophisticated, functional home aligned with the way they live."
    },
    sobre: {
      title: "About Marcia Nath | Marcia Nath Architecture",
      description:
        "Meet Marcia Nath Architecture: residential, interiors and facade projects designed to support better decisions and add value to each property."
    },
    residencial: {
      title: "Residential | Marcia Nath Architecture",
      description:
        "Residential projects for homes and apartments with comfort, function, property value and safer decisions before construction."
    },
    comercial: {
      title: "Commercial | Marcia Nath Architecture",
      description:
        "Commercial projects for brands that want to sell better, serve with clarity and turn their space into experience and positioning."
    },
    fachadas: {
      title: "Facades | Marcia Nath Architecture",
      description:
        "Facade projects with proportion, materials and architectural presence to enhance residential and commercial properties."
    },
    "inspire-se": {
      title: "Get Inspired | Marcia Nath Architecture",
      description:
        "Architecture and interiors references to turn loose ideas into project direction, safer choices and spaces with personality."
    }
  };

  const spanishMeta = {
    index: {
      title: "Marcia Nath Arquitectura | Proyectos residenciales e interiores",
      description:
        "Arquitectura residencial e interiores para quienes buscan una casa sofisticada, funcional y alineada con su forma de vivir."
    },
    sobre: {
      title: "Sobre Marcia Nath | Marcia Nath Arquitectura",
      description:
        "Conoce Marcia Nath Arquitectura: proyectos residenciales, interiores y fachadas para decidir mejor y valorizar cada inmueble."
    },
    residencial: {
      title: "Residencial | Marcia Nath Arquitectura",
      description:
        "Proyectos residenciales para casas y apartamentos con confort, funcionalidad, valorizacion del inmueble y decisiones mas seguras antes de la obra."
    },
    comercial: {
      title: "Comercial | Marcia Nath Arquitectura",
      description:
        "Proyectos comerciales para marcas que quieren vender mejor, atender con claridad y transformar el espacio en experiencia y posicionamiento."
    },
    fachadas: {
      title: "Fachadas | Marcia Nath Arquitectura",
      description:
        "Proyectos de fachadas con proporcion, materiales y presencia arquitectonica para valorizar inmuebles residenciales y comerciales."
    },
    "inspire-se": {
      title: "Inspirate | Marcia Nath Arquitectura",
      description:
        "Referências de arquitectura e interiores para transformar ideas sueltas en direccion de proyecto, elecciones mas seguras y espacios con personalidad."
    }
  };

  const italianMeta = {
    index: {
      title: "Marcia Nath Architettura | Progetti residenziali e interni",
      description:
        "Architettura residenziale e interni per chi cerca una casa sofisticata, funzionale e allineata al proprio modo di vivere."
    },
    sobre: {
      title: "Chi Siamo Marcia Nath | Marcia Nath Architettura",
      description:
        "Scopri Marcia Nath Architettura: progetti residenziali, interni e facciate per decidere meglio e valorizzare ogni immobile."
    },
    residencial: {
      title: "Residenziale | Marcia Nath Architettura",
      description:
        "Progetti residenziali per case e appartamenti con comfort, funzionalita, valorizzazione dell'immobile e decisioni piu sicure prima dei lavori."
    },
    comercial: {
      title: "Commerciale | Marcia Nath Architettura",
      description:
        "Progetti commerciali per brand che vogliono vendere meglio, accogliere con chiarezza e trasformare lo spazio in esperienza e posizionamento."
    },
    fachadas: {
      title: "Facciate | Marcia Nath Architettura",
      description:
        "Progetti di facciata con proporzione, materiali e presenza architettonica per valorizzare immobili residenziali e commerciali."
    },
    "inspire-se": {
      title: "Ispirati | Marcia Nath Architettura",
      description:
        "Riferimenti di architettura e interni per trasformare idee sparse in direzione di progetto, scelte piu sicure e spazi con personalita."
    }
  };

  const translations = {
    "Início": "Home",
    "Marcia Nath": "Marcia Nath",
    "Serviços": "Services",
    "Ir para serviços": "Go to services",
    "Processo": "Process",
    "Blog": "Blog",
    "Inspiração": "Inspiration",
    "Contato": "Contact",
    "Falar no WhatsApp": "Talk on WhatsApp",
    "Agendar uma conversa": "Schedule a conversation",
    "Informações de contato": "Contact information",
    "Categorias": "Categories",
    "WhatsApp": "WhatsApp",
    "Horário de Atendimento": "Business hours",
    "Atendimento personalizado": "Personalized service",
    "Todos os direitos reservados.": "All rights reserved.",
    "Voltar": "Back",
    "Ler artigo": "Read article",
    "Ler artigos": "Read articles",
    "Conheça mais": "Learn more",
    "Iniciar briefing": "Start briefing",
    "Iniciar briefing do projeto": "Start project briefing",
    "Conhecer projetos": "View projects",
    "Marcia Nath Arquitetura": "Marcia Nath Architecture",
    "Arquitetura residencial, interiores e curadoria de materiais.": "Residential architecture, interiors and material curation.",
    "Arquitetura sob medida": "Tailored architecture",
    "Arquitetura autoral para espaços que vivem bem e envelhecem com elegância.": "Signature architecture for spaces that live well and age with elegance.",
    "Projetos residenciais, interiores, fachadas e ambientes comerciais conduzidos com escuta, critério e curadoria para transformar investimento em presença, conforto e valor.": "Residential, interior, facade and commercial projects guided by listening, criteria and curation to turn investment into presence, comfort and value.",
    "Arquitetura com critério": "Architecture with criteria",
    "Projetos pensados para valorizar o imóvel, qualificar a rotina e revelar uma forma mais elegante de viver.": "Projects designed to enhance the property, elevate daily life and reveal a more elegant way of living.",
    "Cada espaço pede uma direção.": "Every space calls for direction.",
    "Antes da obra, uma direção clara para cada escolha importante.": "Before construction, a clear direction for every important choice.",
    "Projetos com intenção": "Projects with intention",
    "Arquitetura para valorizar sua rotina, seu imóvel e o seu modo de viver.": "Architecture designed to enhance your routine, your property and the way you live.",
    "Residencial": "Residential",
    "Comercial": "Commercial",
    "Fachadas": "Facades",
    "Inspire-se": "Get Inspired",
    "Espaços que acolhem e permanecem.": "Spaces designed to welcome and endure.",
    "Ambientes que expressam valor.": "Environments that express value.",
    "Presença arquitetônica com equilíbrio.": "Architectural presence with balance.",
    "Referências que revelam direção.": "References that reveal direction.",
    "Sobre Marcia Nath": "About Marcia Nath",
    "about.home.label": "About Marcia Nath",
    "about.home.title": "Marcia Nath",
    "about.home.lead":
      "Architecture projects for those seeking a beautiful, functional home aligned with real life, without giving up personality.",
    "about.home.body":
      "Every choice is guided with intention: from understanding the routine to materials, light and the details that make a space work better. The result is a project with clarity, presence and confidence to invest in what truly transforms living.",
    "about.page.back": "Back",
    "about.page.brand": "Marcia Nath Architecture",
    "about.page.h1": "About Marcia Nath",
    "about.page.lead":
      "Architecture for those who want to invest better in their own space: with beauty, function, clear choices and a home that makes sense in real life.",
    "about.page.kicker_1": "01 - Perspective",
    "about.page.h2_1": "A perspective that organizes desire and reality",
    "about.page.p_1":
      "The work begins with a careful reading of the client, the property and the current moment in life. From there, each space gains its own direction without losing unity as a whole.",
    "about.page.kicker_2": "02 - Process",
    "about.page.h2_2": "Listening to turn choices into direction",
    "about.page.p_2":
      "Listening organizes priorities: what bothers you, what should remain, which choices require more care and where the project can prevent unnecessary spending.",
    "about.page.kicker_3": "03 - Criteria",
    "about.page.h2_3": "A project that reduces doubts along the way",
    "about.page.p_3":
      "The project works as a decision map. It connects layout, materials, lighting, millwork and atmosphere so execution has less improvisation and more coherence.",
    "about.page.kicker_4": "04 - Scope",
    "about.page.h2_4": "Homes, interiors, facades and commercial spaces",
    "about.page.p_4":
      "Each area has a different need: living better, selling better, receiving better or enhancing the first impression. The proposal is to translate that need into architecture.",
    "about.page.cta_h2": "Want to understand which project makes sense for you?",
    "about.page.cta_p":
      "If you want to invest in your space with more confidence, the next step is to talk about routine, desires and priorities.",
    "Projetos de arquitetura para quem busca uma casa bonita, funcional e coerente com a vida real, sem abrir mão de personalidade.": "Architecture projects for those seeking a beautiful, functional home aligned with real life, without giving up personality.",
    "Cada escolha é conduzida com critério: da leitura da rotina aos materiais, da luz aos detalhes que fazem o espaço funcionar melhor. O resultado é um projeto com clareza, presença e segurança para investir no que realmente transforma o morar.": "Every choice is guided with intention: from understanding the routine to materials, light and the details that make a space work better. The result is a project with clarity, presence and confidence to invest in what truly transforms living.",
    "Exclusivamente para você": "Exclusively for you",
    "Decida melhor antes de construir, reformar ou decorar.": "Make better decisions before building, renovating or decorating.",
    "Antes de comprar revestimentos, mover paredes ou investir em mobiliário, o projeto organiza prioridades, evita escolhas soltas e transforma desejo em direção clara.": "Before buying finishes, moving walls or investing in furniture, the project organizes priorities, prevents disconnected choices and turns desire into clear direction.",
    "Projeto residencial": "Residential project",
    "Planejamento de casas e apartamentos para aproveitar melhor área, luz, circulação e potencial do imóvel.": "Planning for houses and apartments to make better use of area, light, circulation and property potential.",
    "Interiores": "Interiors",
    "Ambientes com linguagem consistente, mobiliário bem dimensionado e escolhas que fazem sentido no dia a dia.": "Spaces with a consistent language, well-scaled furniture and choices that make sense in everyday life.",
    "Curadoria e acompanhamento": "Curation and guidance",
    "Apoio para escolher com mais segurança e manter a intenção do projeto durante compras, ajustes e execução.": "Support to choose with more confidence and preserve the project's intention through purchases, adjustments and execution.",
    "Como acontece": "How it works",
    "Um processo claro para você investir com mais segurança.": "A clear process so you can invest with more confidence.",
    "Um processo pensado para decisões precisas.": "A process designed for precise decisions.",
    "Escuta privada": "Private listening",
    "Leitura da rotina, dos desejos, do orçamento e das escolhas que precisam de mais critério antes da obra.": "A reading of the routine, desires, budget and choices that need more criteria before construction.",
    "Estudo de potencial": "Potential study",
    "Definição da melhor distribuição, da atmosfera desejada e das oportunidades reais de valorização do espaço.": "Definition of the best layout, desired atmosphere and real opportunities to enhance the space.",
    "Curadoria e detalhamento": "Curation and detailing",
    "Materiais, acabamentos e orientações organizados para alinhar fornecedores e proteger a intenção da entrega.": "Materials, finishes and guidance organized to align suppliers and protect the intention of the final delivery.",
    "Escuta": "Listening",
    "Entendimento da rotina, dos desejos, do orçamento e das escolhas que precisam ser resolvidas.": "Understanding the routine, desires, budget and decisions that need to be resolved.",
    "Conceito": "Concept",
    "Definição da linguagem, da distribuição dos ambientes e da atmosfera que vai guiar cada decisão.": "Definition of the design language, spatial distribution and atmosphere that will guide every decision.",
    "Detalhamento": "Detailing",
    "Especificações e orientações para reduzir dúvidas, alinhar fornecedores e proteger a qualidade da entrega.": "Specifications and guidance to reduce doubts, align suppliers and protect the quality of the final delivery.",
    "Vamos trabalhar juntas?": "Shall we work together?",
    "O primeiro passo é entender o que você quer transformar.": "The first step is understanding what you want to transform.",
    "Compartilhe o momento da obra, o tipo de ambiente e o que hoje não funciona como deveria. A partir desse primeiro briefing, fica mais simples avaliar caminhos, prioridades e o formato ideal de projeto.": "Share the stage of the work, the type of space and what does not work as it should today. From this first briefing, it becomes easier to evaluate paths, priorities and the ideal project format.",
    "Espaço": "Space",
    "Casa, apartamento, fachada, interiores ou ambiente comercial que precisa de direção.": "House, apartment, facade, interiors or commercial space that needs direction.",
    "Momento": "Stage",
    "Ideia inicial, reforma, obra em andamento ou etapa de escolhas e acabamentos.": "Initial idea, renovation, ongoing construction or the stage of finishes and decisions.",
    "Desejo": "Desire",
    "O que você quer valorizar, resolver e sentir ao viver ou apresentar o espaço.": "What you want to enhance, solve and feel when living in or presenting the space.",
    "Ambientes que acolhem a rotina": "Spaces that support daily life",
    "Como proporção, luz e materiais podem transformar a casa em um lugar mais prático e prazeroso.": "How proportion, light and materials can turn a home into a more practical and pleasant place.",
    "Fachada com presença, sem excesso": "A facade with presence, without excess",
    "Como volumetria, textura e paisagismo ajudam a valorizar o imóvel logo na primeira impressão.": "How volume, texture and landscaping help enhance a property from the very first impression.",
    "Escolhas que envelhecem bem": "Choices that age well",
    "Um olhar sobre materiais, circulação e detalhes que evitam arrependimentos depois da obra pronta.": "A look at materials, circulation and details that help prevent regrets after the work is done.",
    "Próximo passo": "Next step",
    "Vamos transformar sua ideia em um projeto bonito, possível e bem direcionado.": "Let's turn your idea into a beautiful, feasible and well-directed project.",
    "Sobre Marcia Nath": "About Marcia Nath",
    "Arquitetura para quem quer investir melhor no próprio espaço: com beleza, função, clareza de escolhas e uma casa que faça sentido na vida real.": "Architecture for those who want to invest better in their own space: with beauty, function, clear choices and a home that makes sense in real life.",
    "01 - Olhar": "01 - Perspective",
    "Um olhar que organiza desejo e realidade": "A perspective that organizes desire and reality",
    "O trabalho parte de uma leitura cuidadosa do cliente, do imóvel e do momento da vida. A partir disso, cada ambiente ganha uma direção própria, sem perder unidade no conjunto.": "The work begins with a careful reading of the client, the property and the current moment in life. From there, each space gains its own direction without losing unity as a whole.",
    "02 - Processo": "02 - Process",
    "Escuta para transformar escolhas em direção": "Listening to turn choices into direction",
    "A escuta organiza prioridades: o que incomoda, o que precisa permanecer, quais escolhas exigem mais cuidado e onde o projeto pode evitar gastos desnecessários.": "Listening organizes priorities: what bothers you, what should remain, which choices require more care and where the project can prevent unnecessary spending.",
    "03 - Critério": "03 - Criteria",
    "Um projeto que reduz dúvidas no caminho": "A project that reduces doubts along the way",
    "O projeto funciona como um mapa de decisão. Ele conecta layout, materiais, iluminação, marcenaria e atmosfera para que a execução tenha menos improviso e mais coerência.": "The project works as a decision map. It connects layout, materials, lighting, millwork and atmosphere so execution has less improvisation and more coherence.",
    "04 - Atuação": "04 - Scope",
    "Residências, interiores, fachadas e comerciais": "Homes, interiors, facades and commercial spaces",
    "Cada frente tem uma necessidade diferente: morar melhor, vender melhor, receber melhor ou valorizar a primeira impressão. A proposta é traduzir essa necessidade em arquitetura.": "Each area has a different need: living better, selling better, receiving better or enhancing the first impression. The proposal is to translate that need into architecture.",
    "Quer entender qual projeto faz sentido para você?": "Want to understand which project makes sense for you?",
    "Se você quer investir no seu espaço com mais segurança, o próximo passo é conversar sobre rotina, desejos e prioridades.": "If you want to invest in your space with more confidence, the next step is to talk about routine, desires and priorities.",
    "Casas e apartamentos planejados para melhorar a rotina, valorizar o imóvel e transformar investimento em conforto, beleza e uso inteligente dos ambientes.": "Houses and apartments planned to improve routine, enhance property value and turn investment into comfort, beauty and intelligent use of space.",
    "01 - Rotina": "01 - Routine",
    "O projeto começa pelo jeito que a casa precisa funcionar": "The project starts with how the home needs to work",
    "O projeto residencial começa mapeando rotina: horários, circulação, armazenamento, privacidade, forma de receber e pequenos hábitos que definem como a casa deve responder.": "A residential project begins by mapping routine: schedules, circulation, storage, privacy, ways of hosting and small habits that define how the home should respond.",
    "02 - Planta": "02 - Layout",
    "Melhor uso da área, da luz e da circulação": "Better use of area, light and circulation",
    "A planta precisa trabalhar a favor da vida diária. Reposicionar usos, integrar ambientes e ajustar medidas pode transformar a sensação de amplitude sem depender de excesso.": "The layout needs to work in favor of daily life. Repositioning uses, integrating spaces and adjusting dimensions can transform the feeling of openness without relying on excess.",
    "03 - Dormitórios": "03 - Bedrooms",
    "Descanso com conforto e intenção": "Rest with comfort and intention",
    "Dormitórios pedem silêncio visual, luz controlada e armazenamento bem resolvido. Cada detalhe ajuda a criar uma rotina de descanso mais leve e organizada.": "Bedrooms call for visual calm, controlled light and well-resolved storage. Each detail helps create a lighter, more organized rest routine.",
    "04 - Convivência": "04 - Living",
    "Salas que recebem melhor": "Living areas that host better",
    "Sala de estar, jantar e cozinha precisam conversar. O projeto ajusta proporções, circulação e pontos de apoio para receber bem sem comprometer o uso diário.": "Living room, dining room and kitchen need to work together. The project adjusts proportions, circulation and support points to host well without compromising daily use.",
    "05 - Receber": "05 - Hosting",
    "A casa preparada para encontros reais": "A home prepared for real gatherings",
    "A mesa pede luz na medida, cadeiras confortáveis, passagem livre e materiais resistentes. Esses detalhes fazem o encontro acontecer com beleza, mas também com praticidade.": "The table calls for the right light, comfortable chairs, free passage and durable materials. These details make gatherings beautiful, but also practical.",
    "Vamos planejar seu lar com mais segurança?": "Shall we plan your home with more confidence?",
    "Conte como é o seu espaço hoje, o que precisa melhorar e quais decisões você quer tomar com mais clareza.": "Tell me what your space is like today, what needs to improve and which decisions you want to make with more clarity.",
    "Espaços comerciais desenhados para comunicar valor, melhorar o atendimento e apoiar a operação com elegância, eficiência e identidade de marca.": "Commercial spaces designed to communicate value, improve service and support operations with elegance, efficiency and brand identity.",
    "01 - Posicionamento": "01 - Positioning",
    "Espaços que posicionam a marca": "Spaces that position the brand",
    "O espaço comercial precisa deixar claro quem a marca é, para quem ela fala e qual percepção deseja construir. Arquitetura, layout e materiais trabalham esse posicionamento.": "A commercial space needs to make clear who the brand is, who it speaks to and what perception it wants to build. Architecture, layout and materials work together on this positioning.",
    "02 - Jornada": "02 - Journey",
    "Recepção, fluxo e venda mais claros": "Clearer reception, flow and sales",
    "A jornada começa na porta: onde o cliente entra, espera, circula, compra, pergunta e finaliza o atendimento. O projeto organiza esse percurso para tornar a experiência fluida.": "The journey starts at the door: where the client enters, waits, circulates, buys, asks and completes the service. The project organizes this path to make the experience fluid.",
    "03 - Operação": "03 - Operation",
    "Uma experiência mais profissional": "A more professional experience",
    "Balcão, estoque, atendimento, exposição e bastidores precisam funcionar juntos. Um layout claro reduz fricção para a equipe e melhora a percepção do cliente.": "Counter, storage, service, display and back-of-house need to work together. A clear layout reduces friction for the team and improves the client's perception.",
    "04 - Percepção": "04 - Perception",
    "Materiais que comunicam valor": "Materials that communicate value",
    "Materiais comerciais precisam comunicar e resistir. A escolha considera limpeza, manutenção, fluxo de pessoas, iluminação e o nível de sofisticação que a marca quer transmitir.": "Commercial materials need to communicate and withstand use. The choice considers cleaning, maintenance, people flow, lighting and the level of sophistication the brand wants to convey.",
    "05 - Memória": "05 - Memory",
    "Um espaço que fica na memória": "A space that stays in memory",
    "Um ambiente memorável não depende de excesso. Ele depende de coerência: fachada, recepção, atendimento e detalhes repetindo a mesma mensagem de marca.": "A memorable space does not depend on excess. It depends on coherence: facade, reception, service and details repeating the same brand message.",
    "Vamos transformar seu espaço em uma experiência de marca?": "Shall we turn your space into a brand experience?",
    "Conte sobre sua marca, seu fluxo de atendimento e o tipo de percepção que você quer construir no cliente.": "Tell me about your brand, your service flow and the kind of perception you want to build in the client.",
    "Fachadas planejadas para valorizar o imóvel, organizar a primeira impressão e criar uma leitura arquitetônica coerente com o que existe dentro.": "Facades planned to enhance the property, organize the first impression and create an architectural reading that is coherent with what exists inside.",
    "01 - Rua": "01 - Street",
    "A primeira impressão também é projeto": "The first impression is also design",
    "A fachada precisa conversar com rua, terreno, aberturas e privacidade. O estudo define o que mostrar, o que proteger e como criar presença sem pesar o conjunto.": "The facade needs to respond to the street, site, openings and privacy. The study defines what to reveal, what to protect and how to create presence without weighing down the whole.",
    "02 - Volumetria": "02 - Volume",
    "Mais presença, menos improviso": "More presence, less improvisation",
    "Volumes bem definidos criam leitura mesmo antes dos acabamentos. Cheios, vazios, planos e profundidades organizam a imagem e evitam uma frente fragmentada.": "Well-defined volumes create a clear reading even before finishes. Solids, voids, planes and depth organize the image and prevent a fragmented front.",
    "03 - Materiais": "03 - Materials",
    "Materiais que valorizam com o tempo": "Materials that gain value over time",
    "Cada material externo precisa considerar sol, chuva, manutenção e durabilidade. A beleza da fachada depende tanto da combinação visual quanto da permanência.": "Every exterior material needs to consider sun, rain, maintenance and durability. The beauty of the facade depends as much on visual composition as on permanence.",
    "04 - Percurso": "04 - Path",
    "Chegada clara e acolhedora": "A clear and welcoming arrival",
    "Portão, caminho, porta, jardim e luz orientam a chegada. Quando esse percurso é claro, a casa parece mais acolhedora e a entrada ganha intenção.": "Gate, path, door, garden and light guide the arrival. When this route is clear, the home feels more welcoming and the entrance gains intention.",
    "05 - Entorno": "05 - Surroundings",
    "Arquitetura em relação ao entorno": "Architecture in relation to its surroundings",
    "Paisagismo, muros, calçada e vizinhança interferem na leitura final. A fachada precisa se destacar sem ignorar o contexto onde ela está inserida.": "Landscaping, walls, sidewalk and neighborhood affect the final reading. The facade needs to stand out without ignoring the context it belongs to.",
    "Vamos valorizar a primeira impressão do seu imóvel?": "Shall we enhance your property's first impression?",
    "Se você quer uma fachada mais clara, mais forte ou mais integrada ao terreno, o primeiro passo é entender o potencial do que já existe.": "If you want a clearer, stronger facade that is better integrated with the site, the first step is understanding the potential of what already exists.",
    "Ideias de atmosfera, materiais e composição para sair das referências soltas e chegar a uma direção de projeto mais clara, bonita e possível.": "Ideas of atmosphere, materials and composition to move from scattered references to a clearer, beautiful and feasible project direction.",
    "01 - Recorte": "01 - Selection",
    "Inspiração que ajuda a decidir": "Inspiration that helps you decide",
    "A inspiração certa não é uma pasta cheia de imagens. Ela revela preferências, identifica padrões e mostra quais escolhas realmente combinam com a rotina e com o espaço disponível.": "The right inspiration is not a folder full of images. It reveals preferences, identifies patterns and shows which choices truly fit the routine and available space.",
    "02 - Paleta": "02 - Palette",
    "Paleta, atmosfera e direção": "Palette, atmosphere and direction",
    "Uma paleta bem definida evita compras impulsivas e combinações desconectadas. Ela cria uma base para materiais, mobiliário, iluminação e acabamentos conversarem entre si.": "A well-defined palette prevents impulsive purchases and disconnected combinations. It creates a base for materials, furniture, lighting and finishes to work together.",
    "Textura e luz com intenção": "Texture and light with intention",
    "Madeira, pedra, tecido, metal e pintura mudam conforme a luz do dia e da noite. Por isso, textura e iluminação precisam ser pensadas juntas antes da escolha final.": "Wood, stone, fabric, metal and paint change with day and night light. That is why texture and lighting need to be considered together before the final choice.",
    "04 - Equilíbrio": "04 - Balance",
    "Composição sem excesso": "Composition without excess",
    "A composição define pausas, contraste e peso visual. Esse equilíbrio evita excesso de objetos e ajuda cada peça a ter uma função dentro da atmosfera desejada.": "Composition defines pauses, contrast and visual weight. This balance prevents excess objects and helps each piece serve a purpose within the desired atmosphere.",
    "05 - Atmosfera": "05 - Atmosphere",
    "Um repertório que vira projeto": "A visual repertoire that becomes a project",
    "O repertório vira projeto quando deixa de ser apenas gosto e passa a orientar decisão: o que entra, o que sai e o que sustenta a identidade do ambiente.": "A visual repertoire becomes a project when it stops being just taste and starts guiding decisions: what enters, what leaves and what sustains the identity of the space.",
    "Vamos transformar suas referências em direção?": "Shall we turn your references into direction?",
    "Se você tem muitas ideias e não sabe por onde seguir, esse recorte pode ser o primeiro passo para um projeto mais claro e coerente.": "If you have many ideas and do not know where to go, this selection can be the first step toward a clearer and more coherent project."
    ,
    "Navegação principal": "Main navigation",
    "Abrir menu": "Open menu",
    "Fechar menu": "Close menu",
    "Menu mobile": "Mobile menu",
    "Informações importantes para o primeiro contato": "Important information for the first contact",
    "Conheça mais sobre Marcia Nath": "Learn more about Marcia Nath",
    "Ler artigo sobre ambientes que acolhem a rotina": "Read article about spaces that support daily life",
    "Ler artigo sobre fachada com presença": "Read article about a facade with presence",
    "Ler artigo sobre escolhas que envelhecem bem": "Read article about choices that age well",
    "Retrato em preto e branco de Marcia Nath": "Black-and-white portrait of Marcia Nath",
    "Sala residencial com arcos abertos para jardim, sofá claro e mesa de centro": "Residential living room with open arches to the garden, a light sofá and a coffee table",
    "Ambiente comercial com composição arquitetônica e materiais claros": "Commercial space with architectural composition and light materials",
    "Fachada residencial com volumetria limpa, madeira aparente e jardim frontal": "Residential facade with clean volume, exposed wood and a front garden",
    "Ambiente com mesa de jantar, cozinha azul e composição acolhedora": "Space with a dining table, blue kitchen and a welcoming composition",
    "Área residencial com jardim e varanda integrada": "Residential area with garden and integrated veranda",
    "Interior com mesa de jantar e cozinha azul": "Interior with a dining table and blue kitchen",
    "Ambiente residencial com poltrona e abertura para jardim": "Residential space with an armchair and a garden opening",
    "Vista aérea de casa com área externa e implantação": "Aerial view of a house with outdoor area and site layout",
    "Recepção comercial com bancada, prateleiras e iluminação suave": "Commercial reception with a counter, shelves and soft lighting",
    "Área de atendimento com madeira escura e detalhes de curadoria": "Client area with dark wood and curated details",
    "Sala comercial com sofá, mesa lateral e abertura para jardim": "Commercial lounge with a sofá, side table and garden opening",
    "Nook de espera com cadeira, madeira ripada e vegetação": "Waiting nook with a chair, slatted wood and greenery",
    "Ambiente com mesa de jantar e cozinha azul, iluminação quente e composição limpa": "Space with a dining table and blue kitchen, warm lighting and a clean composition",
    "Interior com bancada escura, prateleiras abertas e recepção elegante": "Interior with a dark counter, open shelves and an elegant reception",
    "Espaço comercial com atmosfera controlada e acabamento neutro": "Commercial space with a controlled atmosphere and neutral finish",
    "Sala com abertura para área externa, livros e flores sobre a mesa": "Living room opening to the outdoors, with books and flowers on the table",
    "Espaço com madeira, vegetação e poltrona clara em atmosfera de descanso": "Space with wood, greenery and a light armchair in a restful atmosphere",
    "Recepção com bancada e iluminação focada": "Reception with a counter and focused lighting",
    "Canto de leitura com poltrona, mesa lateral e vegetação": "Reading corner with an armchair, side table and greenery",
    "Interior escuro com luz quente, bancada e objetos decorativos": "Dark interior with warm light, a counter and decorative objects"
  };

  const spanishTranslations = {
    "Início": "Início",
    "Marcia Nath": "Marcia Nath",
    "Serviços": "Servicios",
    "Ir para serviços": "Ir a servicios",
    "Processo": "Proceso",
    "Blog": "Blog",
    "Inspiração": "Inspiracion",
    "Contato": "Contacto",
    "Falar no WhatsApp": "Hablar por WhatsApp",
    "Agendar uma conversa": "Agendar una conversacion",
    "Informações de contato": "Informacion de contacto",
    "Categorias": "Categorias",
    "WhatsApp": "WhatsApp",
    "Horário de Atendimento": "Horario de Atencion",
    "Atendimento personalizado": "Atencion personalizada",
    "Todos os direitos reservados.": "Todos los derechos reservados.",
    "Voltar": "Volver",
    "Ler artigo": "Leer articulo",
    "Ler artigos": "Leer articulos",
    "Conheça mais": "Conoce mas",
    "Iniciar briefing": "Iniciar briefing",
    "Iniciar briefing do projeto": "Iniciar briefing del proyecto",
    "Conhecer projetos": "Conocer proyectos",
    "Navegação principal": "Navegacion principal",
    "Abrir menu": "Abrir menu",
    "Fechar menu": "Cerrar menu",
    "Menu mobile": "Menu movil",
    "Informações importantes para o primeiro contato": "Informacion importante para el primer contacto",
    "Conheça mais sobre Marcia Nath": "Conoce mas sobre Marcia Nath",
    "Ler artigo sobre ambientes que acolhem a rotina": "Leer articulo sobre espacios que acompanan la rutina",
    "Ler artigo sobre fachada com presença": "Leer articulo sobre una fachada con presencia",
    "Ler artigo sobre escolhas que envelhecem bem": "Leer articulo sobre elecciones que envejecen bien",
    "Marcia Nath Arquitetura": "Marcia Nath Arquitectura",
    "Arquitetura residencial, interiores e curadoria de materiais.": "Arquitectura residencial, interiores y curaduria de materiales.",
    "Arquitetura sob medida": "Arquitectura a medida",
    "Arquitetura autoral para espaços que vivem bem e envelhecem com elegância.": "Arquitectura de autor para espacios que se viven bien y envejecen con elegancia.",
    "Projetos residenciais, interiores, fachadas e ambientes comerciais conduzidos com escuta, critério e curadoria para transformar investimento em presença, conforto e valor.": "Proyectos residenciales, interiores, fachadas y ambientes comerciales conducidos con escucha, criterio y curaduria para transformar la inversion en presencia, confort y valor.",
    "Arquitetura com critério": "Arquitectura con criterio",
    "Projetos pensados para valorizar o imóvel, qualificar a rotina e revelar uma forma mais elegante de viver.": "Proyectos pensados para valorizar el inmueble, cualificar la rutina y revelar una forma mas elegante de vivir.",
    "Cada espaço pede uma direção.": "Cada espacio pide una direccion.",
    "Antes da obra, uma direção clara para cada escolha importante.": "Antes de la obra, una direccion clara para cada decision importante.",
    "Projetos com intenção": "Proyectos con intencion",
    "Arquitetura para valorizar sua rotina, seu imóvel e o seu modo de viver.": "Arquitectura para valorizar tu rutina, tu inmueble y tu forma de vivir.",
    "Residencial": "Residencial",
    "Comercial": "Comercial",
    "Fachadas": "Fachadas",
    "Inspire-se": "Inspirate",
    "Espaços que acolhem e permanecem.": "Espacios que acogen y perduran.",
    "Ambientes que expressam valor.": "Ambientes que expresan valor.",
    "Presença arquitetônica com equilíbrio.": "Presencia arquitectonica con equilibrio.",
    "Referências que revelam direção.": "Referencias que revelan direccion.",
    "Sobre Marcia Nath": "Sobre Marcia Nath",
    "about.home.label": "Sobre Marcia Nath",
    "about.home.title": "Marcia Nath",
    "about.home.lead":
      "Proyectos de arquitectura para quienes buscan una casa bonita, funcional y coherente con la vida real, sin renunciar a la personalidad.",
    "about.home.body":
      "Cada eleccion se conduce con criterio: desde la lectura de la rutina hasta los materiales, la luz y los detalles que hacen que el espacio funcione mejor. El resultado es un proyecto con claridad, presencia y seguridad para invertir en lo que realmente transforma el habitar.",
    "about.page.back": "Volver",
    "about.page.brand": "Marcia Nath Arquitectura",
    "about.page.h1": "Sobre Marcia Nath",
    "about.page.lead":
      "Arquitectura para quien quiere invertir mejor en su propio espacio: con belleza, funcion, claridad de elecciones y una casa que tenga sentido en la vida real.",
    "about.page.kicker_1": "01 - Mirada",
    "about.page.h2_1": "Una mirada que organiza deseo y realidad",
    "about.page.p_1":
      "El trabajo parte de una lectura cuidadosa del cliente, del inmueble y del momento de vida. A partir de eso, cada ambiente gana una direccion propia sin perder unidad en el conjunto.",
    "about.page.kicker_2": "02 - Proceso",
    "about.page.h2_2": "Escucha para transformar elecciones en direccion",
    "about.page.p_2":
      "La escucha organiza prioridades: lo que incomoda, lo que debe permanecer, que elecciones exigen mas cuidado y donde el proyecto puede evitar gastos innecesarios.",
    "about.page.kicker_3": "03 - Critério",
    "about.page.h2_3": "Un proyecto que reduce dudas en el camino",
    "about.page.p_3":
      "El proyecto funciona como un mapa de decision. Conecta layout, materiales, iluminacion, carpinteria y atmosfera para que la ejecucion tenga menos improvisacion y mas coherencia.",
    "about.page.kicker_4": "04 - Actuacion",
    "about.page.h2_4": "Residências, interiores, fachadas y comerciales",
    "about.page.p_4":
      "Cada frente tiene una necesidad diferente: vivir mejor, vender mejor, recibir mejor o valorizar la primera impresion. La propuesta es traducir esa necesidad en arquitectura.",
    "about.page.cta_h2": "Quieres entender que proyecto tiene sentido para ti?",
    "about.page.cta_p":
      "Si quieres invertir en tu espacio con mas seguridad, el proximo paso es conversar sobre rutina, deseos y prioridades.",
    "Projetos de arquitetura para quem busca uma casa bonita, funcional e coerente com a vida real, sem abrir mão de personalidade.": "Proyectos de arquitectura para quienes buscan una casa bonita, funcional y coherente con la vida real, sin renunciar a la personalidad.",
    "Cada escolha é conduzida com critério: da leitura da rotina aos materiais, da luz aos detalhes que fazem o espaço funcionar melhor. O resultado é um projeto com clareza, presença e segurança para investir no que realmente transforma o morar.": "Cada eleccion se conduce con criterio: desde la lectura de la rutina hasta los materiales, la luz y los detalles que hacen que el espacio funcione mejor. El resultado es un proyecto con claridad, presencia y seguridad para invertir en lo que realmente transforma el habitar.",
    "Exclusivamente para você": "Exclusivamente para ti",
    "Decida melhor antes de construir, reformar ou decorar.": "Decide mejor antes de construir, reformar o decorar.",
    "Antes de comprar revestimentos, mover paredes ou investir em mobiliário, o projeto organiza prioridades, evita escolhas soltas e transforma desejo em direção clara.": "Antes de comprar revestimientos, mover paredes o invertir en mobiliário, el proyecto organiza prioridades, evita elecciones sueltas y transforma el deseo en una direccion clara.",
    "Projeto residencial": "Proyecto residencial",
    "Planejamento de casas e apartamentos para aproveitar melhor área, luz, circulação e potencial do imóvel.": "Planificacion de casas y apartamentos para aprovechar mejor el area, la luz, la circulacion y el potencial del inmueble.",
    "Interiores": "Interiores",
    "Ambientes com linguagem consistente, mobiliário bem dimensionado e escolhas que fazem sentido no dia a dia.": "Ambientes con lenguaje consistente, mobiliário bien dimensionado y elecciones que tienen sentido en el dia a dia.",
    "Curadoria e acompanhamento": "Curaduria y acompanamiento",
    "Apoio para escolher com mais segurança e manter a intenção do projeto durante compras, ajustes e execução.": "Apoyo para elegir con mas seguridad y mantener la intencion del proyecto durante compras, ajustes y ejecucion.",
    "Como acontece": "Como sucede",
    "Um processo claro para você investir com mais segurança.": "Un proceso claro para invertir con mas seguridad.",
    "Um processo pensado para decisões precisas.": "Un proceso pensado para decisiones precisas.",
    "Escuta privada": "Escucha privada",
    "Leitura da rotina, dos desejos, do orçamento e das escolhas que precisam de mais critério antes da obra.": "Lectura de la rutina, los deseos, el presupuesto y las decisiones que necesitan mas criterio antes de la obra.",
    "Estudo de potencial": "Estudio de potencial",
    "Definição da melhor distribuição, da atmosfera desejada e das oportunidades reais de valorização do espaço.": "Definicion de la mejor distribucion, la atmosfera deseada y las oportunidades reales de valorizacion del espacio.",
    "Curadoria e detalhamento": "Curaduria y detalle",
    "Materiais, acabamentos e orientações organizados para alinhar fornecedores e proteger a intenção da entrega.": "Materiales, acabados y orientaciones organizados para alinear proveedores y proteger la intencion de la entrega.",
    "Escuta": "Escucha",
    "Entendimento da rotina, dos desejos, do orçamento e das escolhas que precisam ser resolvidas.": "Comprension de la rutina, los deseos, el presupuesto y las decisiones que necesitan resolverse.",
    "Conceito": "Concepto",
    "Definição da linguagem, da distribuição dos ambientes e da atmosfera que vai guiar cada decisão.": "Definicion del lenguaje, la distribucion de los ambientes y la atmosfera que guiara cada decision.",
    "Detalhamento": "Detalle",
    "Especificações e orientações para reduzir dúvidas, alinhar fornecedores e proteger a qualidade da entrega.": "Especificaciones y orientaciones para reducir dudas, alinear proveedores y proteger la calidad de la entrega.",
    "Vamos trabalhar juntas?": "Trabajamos juntas?",
    "O primeiro passo é entender o que você quer transformar.": "El primer paso es entender lo que quieres transformar.",
    "Compartilhe o momento da obra, o tipo de ambiente e o que hoje não funciona como deveria. A partir desse primeiro briefing, fica mais simples avaliar caminhos, prioridades e o formato ideal de projeto.": "Comparte el momento de la obra, el tipo de ambiente y lo que hoy no funciona como deberia. A partir de ese primer briefing, es mas simple evaluar caminos, prioridades y el formato ideal de proyecto.",
    "Espaço": "Espacio",
    "Casa, apartamento, fachada, interiores ou ambiente comercial que precisa de direção.": "Casa, apartamento, fachada, interiores o ambiente comercial que necesita direccion.",
    "Momento": "Momento",
    "Ideia inicial, reforma, obra em andamento ou etapa de escolhas e acabamentos.": "Idea inicial, reforma, obra en curso o etapa de elecciones y acabados.",
    "Desejo": "Deseo",
    "O que você quer valorizar, resolver e sentir ao viver ou apresentar o espaço.": "Lo que quieres valorizar, resolver y sentir al vivir o presentar el espacio.",
    "Ambientes que acolhem a rotina": "Ambientes que acompanan la rutina",
    "Como proporção, luz e materiais podem transformar a casa em um lugar mais prático e prazeroso.": "Como la proporcion, la luz y los materiales pueden transformar la casa en un lugar mas practico y placentero.",
    "Fachada com presença, sem excesso": "Fachada con presencia, sin exceso",
    "Como volumetria, textura e paisagismo ajudam a valorizar o imóvel logo na primeira impressão.": "Como la volumetria, la textura y el paisajismo ayudan a valorizar el inmueble desde la primera impresion.",
    "Escolhas que envelhecem bem": "Elecciones que envejecen bien",
    "Um olhar sobre materiais, circulação e detalhes que evitam arrependimentos depois da obra pronta.": "Una mirada sobre materiales, circulacion y detalles que evitan arrepentimientos despues de la obra lista.",
    "Próximo passo": "Proximo paso",
    "Vamos transformar sua ideia em um projeto bonito, possível e bem direcionado.": "Transformemos tu idea en un proyecto bonito, posible y bien direccionado.",
    "Arquitetura para quem quer investir melhor no próprio espaço: com beleza, função, clareza de escolhas e uma casa que faça sentido na vida real.": "Arquitectura para quien quiere invertir mejor en su propio espacio: con belleza, funcion, claridad de elecciones y una casa que tenga sentido en la vida real.",
    "01 - Olhar": "01 - Mirada",
    "Um olhar que organiza desejo e realidade": "Una mirada que organiza deseo y realidad",
    "O trabalho parte de uma leitura cuidadosa do cliente, do imóvel e do momento da vida. A partir disso, cada ambiente ganha uma direção própria, sem perder unidade no conjunto.": "El trabajo parte de una lectura cuidadosa del cliente, del inmueble y del momento de vida. A partir de eso, cada ambiente gana una direccion propia sin perder unidad en el conjunto.",
    "02 - Processo": "02 - Proceso",
    "Escuta para transformar escolhas em direção": "Escucha para transformar elecciones en direccion",
    "A escuta organiza prioridades: o que incomoda, o que precisa permanecer, quais escolhas exigem mais cuidado e onde o projeto pode evitar gastos desnecessários.": "La escucha organiza prioridades: lo que incomoda, lo que debe permanecer, que elecciones exigen mas cuidado y donde el proyecto puede evitar gastos innecesarios.",
    "03 - Critério": "03 - Critério",
    "Um projeto que reduz dúvidas no caminho": "Un proyecto que reduce dudas en el camino",
    "O projeto funciona como um mapa de decisão. Ele conecta layout, materiais, iluminação, marcenaria e atmosfera para que a execução tenha menos improviso e mais coerência.": "El proyecto funciona como un mapa de decision. Conecta layout, materiales, iluminacion, carpinteria y atmosfera para que la ejecucion tenga menos improvisacion y mas coherencia.",
    "04 - Atuação": "04 - Actuacion",
    "Residências, interiores, fachadas e comerciais": "Residências, interiores, fachadas y comerciales",
    "Cada frente tem uma necessidade diferente: morar melhor, vender melhor, receber melhor ou valorizar a primeira impressão. A proposta é traduzir essa necessidade em arquitetura.": "Cada frente tiene una necesidad diferente: vivir mejor, vender mejor, recibir mejor o valorizar la primera impresion. La propuesta es traducir esa necesidad en arquitectura.",
    "Quer entender qual projeto faz sentido para você?": "Quieres entender que proyecto tiene sentido para ti?",
    "Se você quer investir no seu espaço com mais segurança, o próximo passo é conversar sobre rotina, desejos e prioridades.": "Si quieres invertir en tu espacio con mas seguridad, el proximo paso es conversar sobre rutina, deseos y prioridades.",
    "Casas e apartamentos planejados para melhorar a rotina, valorizar o imóvel e transformar investimento em conforto, beleza e uso inteligente dos ambientes.": "Casas y apartamentos planificados para mejorar la rutina, valorizar el inmueble y transformar la inversion en confort, belleza y uso inteligente de los ambientes.",
    "01 - Rotina": "01 - Rutina",
    "O projeto começa pelo jeito que a casa precisa funcionar": "El proyecto empieza por la forma en que la casa necesita funcionar",
    "O projeto residencial começa mapeando rotina: horários, circulação, armazenamento, privacidade, forma de receber e pequenos hábitos que definem como a casa deve responder.": "El proyecto residencial comienza mapeando la rutina: horários, circulacion, almacenamiento, privacidad, forma de recibir y pequenos hábitos que definen como la casa debe responder.",
    "02 - Planta": "02 - Planta",
    "Melhor uso da área, da luz e da circulação": "Mejor uso del area, la luz y la circulacion",
    "A planta precisa trabalhar a favor da vida diária. Reposicionar usos, integrar ambientes e ajustar medidas pode transformar a sensação de amplitude sem depender de excesso.": "La planta necesita trabajar a favor de la vida diária. Reposicionar usos, integrar ambientes y ajustar medidas puede transformar la sensacion de amplitud sin depender del exceso.",
    "03 - Dormitórios": "03 - Dormitórios",
    "Descanso com conforto e intenção": "Descanso con confort e intencion",
    "Dormitórios pedem silêncio visual, luz controlada e armazenamento bem resolvido. Cada detalhe ajuda a criar uma rotina de descanso mais leve e organizada.": "Los dormitorios piden silêncio visual, luz controlada y almacenamiento bien resuelto. Cada detalle ayuda a crear una rutina de descanso mas leve y organizada.",
    "04 - Convivência": "04 - Convivência",
    "Salas que recebem melhor": "Salas que reciben mejor",
    "Sala de estar, jantar e cozinha precisam conversar. O projeto ajusta proporções, circulação e pontos de apoio para receber bem sem comprometer o uso diário.": "Sala, comedor y cocina necesitan dialogar. El proyecto ajusta proporciones, circulacion y puntos de apoyo para recibir bien sin comprometer el uso diário.",
    "05 - Receber": "05 - Recibir",
    "A casa preparada para encontros reais": "La casa preparada para encuentros reales",
    "A mesa pede luz na medida, cadeiras confortáveis, passagem livre e materiais resistentes. Esses detalhes fazem o encontro acontecer com beleza, mas também com praticidade.": "La mesa pide luz en la medida, sillas comodas, paso libre y materiales resistentes. Esos detalles hacen que el encuentro suceda con belleza y practicidad.",
    "Vamos planejar seu lar com mais segurança?": "Planeamos tu hogar con mas seguridad?",
    "Conte como é o seu espaço hoje, o que precisa melhorar e quais decisões você quer tomar com mais clareza.": "Cuenta como es tu espacio hoy, que necesita mejorar y que decisiones quieres tomar con mas claridad.",
    "Espaços comerciais desenhados para comunicar valor, melhorar o atendimento e apoiar a operação com elegância, eficiência e identidade de marca.": "Espacios comerciales disenados para comunicar valor, mejorar la atencion y apoyar la operacion con elegancia, eficiencia e identidad de marca.",
    "01 - Posicionamento": "01 - Posicionamiento",
    "Espaços que posicionam a marca": "Espacios que posicionan la marca",
    "O espaço comercial precisa deixar claro quem a marca é, para quem ela fala e qual percepção deseja construir. Arquitetura, layout e materiais trabalham esse posicionamento.": "El espacio comercial necesita dejar claro quien es la marca, a quien habla y que percepcion desea construir. Arquitectura, layout y materiales trabajan ese posicionamiento.",
    "02 - Jornada": "02 - Jornada",
    "Recepção, fluxo e venda mais claros": "Recepcion, flujo y venta mas claros",
    "A jornada começa na porta: onde o cliente entra, espera, circula, compra, pergunta e finaliza o atendimento. O projeto organiza esse percurso para tornar a experiência fluida.": "La jornada empieza en la puerta: donde el cliente entra, espera, circula, compra, pregunta y finaliza la atencion. El proyecto organiza ese recorrido para hacer la experiência fluida.",
    "03 - Operação": "03 - Operacion",
    "Uma experiência mais profissional": "Una experiencia mas profesional",
    "Balcão, estoque, atendimento, exposição e bastidores precisam funcionar juntos. Um layout claro reduz fricção para a equipe e melhora a percepção do cliente.": "Mostrador, stock, atencion, exposicion y bastidores necesitan funcionar juntos. Un layout claro reduce friccion para el equipo y mejora la percepcion del cliente.",
    "04 - Percepção": "04 - Percepcion",
    "Materiais que comunicam valor": "Materiales que comunican valor",
    "Materiais comerciais precisam comunicar e resistir. A escolha considera limpeza, manutenção, fluxo de pessoas, iluminação e o nível de sofisticação que a marca quer transmitir.": "Los materiales comerciales necesitan comunicar y resistir. La eleccion considera limpieza, mantenimiento, flujo de personas, iluminacion y el nivel de sofisticacion que la marca quiere transmitir.",
    "05 - Memória": "05 - Memória",
    "Um espaço que fica na memória": "Un espacio que queda en la memória",
    "Um ambiente memorável não depende de excesso. Ele depende de coerência: fachada, recepção, atendimento e detalhes repetindo a mesma mensagem de marca.": "Un ambiente memorable no depende del exceso. Depende de coherencia: fachada, recepcion, atencion y detalles repitiendo el mismo mensaje de marca.",
    "Vamos transformar seu espaço em uma experiência de marca?": "Transformamos tu espacio en una experiência de marca?",
    "Conte sobre sua marca, seu fluxo de atendimento e o tipo de percepção que você quer construir no cliente.": "Cuenta sobre tu marca, tu flujo de atencion y el tipo de percepcion que quieres construir en el cliente.",
    "Fachadas planejadas para valorizar o imóvel, organizar a primeira impressão e criar uma leitura arquitetônica coerente com o que existe dentro.": "Fachadas planificadas para valorizar el inmueble, organizar la primera impresion y crear una lectura arquitectonica coherente con lo que existe dentro.",
    "01 - Rua": "01 - Calle",
    "A primeira impressão também é projeto": "La primera impresion tambien es proyecto",
    "A fachada precisa conversar com rua, terreno, aberturas e privacidade. O estudo define o que mostrar, o que proteger e como criar presença sem pesar o conjunto.": "La fachada necesita dialogar con la calle, el terreno, las aberturas y la privacidad. El estudio define que mostrar, que proteger y como crear presencia sin pesar el conjunto.",
    "02 - Volumetria": "02 - Volumetria",
    "Mais presença, menos improviso": "Mas presencia, menos improviso",
    "Volumes bem definidos criam leitura mesmo antes dos acabamentos. Cheios, vazios, planos e profundidades organizam a imagem e evitam uma frente fragmentada.": "Volumenes bien definidos crean lectura incluso antes de los acabados. Llenos, vacios, planos y profundidades organizan la imagen y evitan una frente fragmentada.",
    "03 - Materiais": "03 - Materiales",
    "Materiais que valorizam com o tempo": "Materiales que valorizan con el tiempo",
    "Cada material externo precisa considerar sol, chuva, manutenção e durabilidade. A beleza da fachada depende tanto da combinação visual quanto da permanência.": "Cada material exterior necesita considerar sol, lluvia, mantenimiento y durabilidad. La belleza de la fachada depende tanto de la combinacion visual como de la permanência.",
    "04 - Percurso": "04 - Recorrido",
    "Chegada clara e acolhedora": "Llegada clara y acogedora",
    "Portão, caminho, porta, jardim e luz orientam a chegada. Quando esse percurso é claro, a casa parece mais acolhedora e a entrada ganha intenção.": "Porton, camino, puerta, jardin y luz orientan la llegada. Cuando ese recorrido es claro, la casa parece mas acogedora y la entrada gana intencion.",
    "05 - Entorno": "05 - Entorno",
    "Arquitetura em relação ao entorno": "Arquitectura en relacion con el entorno",
    "Paisagismo, muros, calçada e vizinhança interferem na leitura final. A fachada precisa se destacar sem ignorar o contexto onde ela está inserida.": "Paisajismo, muros, vereda y vecindario interfieren en la lectura final. La fachada necesita destacarse sin ignorar el contexto donde esta inserta.",
    "Vamos valorizar a primeira impressão do seu imóvel?": "Valorizamos la primera impresion de tu inmueble?",
    "Se você quer uma fachada mais clara, mais forte ou mais integrada ao terreno, o primeiro passo é entender o potencial do que já existe.": "Si quieres una fachada mas clara, mas fuerte o mas integrada al terreno, el primer paso es entender el potencial de lo que ya existe.",
    "Ideias de atmosfera, materiais e composição para sair das referências soltas e chegar a uma direção de projeto mais clara, bonita e possível.": "Ideas de atmosfera, materiales y composicion para salir de referências sueltas y llegar a una direccion de proyecto mas clara, bonita y posible.",
    "01 - Recorte": "01 - Recorte",
    "Inspiração que ajuda a decidir": "Inspiracion que ayuda a decidir",
    "A inspiração certa não é uma pasta cheia de imagens. Ela revela preferências, identifica padrões e mostra quais escolhas realmente combinam com a rotina e com o espaço disponível.": "La inspiracion correcta no es una carpeta llena de imagenes. Revela preferências, identifica patrones y muestra que elecciones combinan realmente con la rutina y el espacio disponible.",
    "02 - Paleta": "02 - Paleta",
    "Paleta, atmosfera e direção": "Paleta, atmosfera y direccion",
    "Uma paleta bem definida evita compras impulsivas e combinações desconectadas. Ela cria uma base para materiais, mobiliário, iluminação e acabamentos conversarem entre si.": "Una paleta bien definida evita compras impulsivas y combinaciones desconectadas. Crea una base para que materiales, mobiliário, iluminacion y acabados dialoguen entre si.",
    "Textura e luz com intenção": "Textura y luz con intencion",
    "Madeira, pedra, tecido, metal e pintura mudam conforme a luz do dia e da noite. Por isso, textura e iluminação precisam ser pensadas juntas antes da escolha final.": "Madera, piedra, tejido, metal y pintura cambian con la luz del dia y de la noche. Por eso, textura e iluminacion necesitan pensarse juntas antes de la eleccion final.",
    "04 - Equilíbrio": "04 - Equilíbrio",
    "Composição sem excesso": "Composicion sin exceso",
    "A composição define pausas, contraste e peso visual. Esse equilíbrio evita excesso de objetos e ajuda cada peça a ter uma função dentro da atmosfera desejada.": "La composicion define pausas, contraste y peso visual. Ese equilíbrio evita exceso de objetos y ayuda a que cada pieza tenga una funcion dentro de la atmosfera deseada.",
    "05 - Atmosfera": "05 - Atmosfera",
    "Um repertório que vira projeto": "Un repertório que se convierte en proyecto",
    "O repertório vira projeto quando deixa de ser apenas gosto e passa a orientar decisão: o que entra, o que sai e o que sustenta a identidade do ambiente.": "El repertório se convierte en proyecto cuando deja de ser solo gusto y empieza a orientar decisiones: lo que entra, lo que sale y lo que sostiene la identidad del ambiente.",
    "Vamos transformar suas referências em direção?": "Transformamos tus referências en direccion?",
    "Se você tem muitas ideias e não sabe por onde seguir, esse recorte pode ser o primeiro passo para um projeto mais claro e coerente.": "Si tienes muchas ideas y no sabes por donde seguir, este recorte puede ser el primer paso hacia un proyecto mas claro y coherente."
  };

  const italianTranslations = {
    "Início": "Home",
    "Marcia Nath": "Marcia Nath",
    "Serviços": "Servizi",
    "Ir para serviços": "Vai ai servizi",
    "Processo": "Processo",
    "Blog": "Blog",
    "Inspiração": "Ispirazione",
    "Contato": "Contatti",
    "Falar no WhatsApp": "Scrivi su WhatsApp",
    "Agendar uma conversa": "Prenota una conversazione",
    "Informações de contato": "Informazioni di contatto",
    "Categorias": "Categorie",
    "WhatsApp": "WhatsApp",
    "Horário de Atendimento": "Orari di apertura",
    "Atendimento personalizado": "Servizio personalizzato",
    "Todos os direitos reservados.": "Tutti i diritti riservati.",
    "Voltar": "Indietro",
    "Ler artigo": "Leggi articolo",
    "Ler artigos": "Leggi articoli",
    "Conheça mais": "Scopri di piu",
    "Iniciar briefing": "Avvia briefing",
    "Iniciar briefing do projeto": "Avvia briefing del progetto",
    "Conhecer projetos": "Scopri i progetti",
    "Navegação principal": "Navigazione principale",
    "Abrir menu": "Apri menu",
    "Fechar menu": "Chiudi menu",
    "Menu mobile": "Menu mobile",
    "Informações importantes para o primeiro contato": "Informazioni importanti per il primo contatto",
    "Conheça mais sobre Marcia Nath": "Scopri di piu su Marcia Nath",
    "Ler artigo sobre ambientes que acolhem a rotina": "Leggi l'articolo sugli spazi che accompagnano la routine",
    "Ler artigo sobre fachada com presença": "Leggi l'articolo su una facciata con presenza",
    "Ler artigo sobre escolhas que envelhecem bem": "Leggi l'articolo sulle scelte che invecchiano bene",
    "Marcia Nath Arquitetura": "Marcia Nath Architettura",
    "Arquitetura residencial, interiores e curadoria de materiais.": "Architettura residenziale, interni e curatela dei materiali.",
    "Arquitetura sob medida": "Architettura su misura",
    "Arquitetura autoral para espaços que vivem bem e envelhecem com elegância.": "Architettura d'autore per spazi che si vivono bene e invecchiano con eleganza.",
    "Projetos residenciais, interiores, fachadas e ambientes comerciais conduzidos com escuta, critério e curadoria para transformar investimento em presença, conforto e valor.": "Progetti residenziali, interni, facciate e spazi commerciali guidati da ascolto, criterio e curatela per trasformare l'investimento in presenza, comfort e valore.",
    "Arquitetura com critério": "Architettura con criterio",
    "Projetos pensados para valorizar o imóvel, qualificar a rotina e revelar uma forma mais elegante de viver.": "Progetti pensati per valorizzare l'immobile, qualificare la routine e rivelare un modo piu elegante di vivere.",
    "Cada espaço pede uma direção.": "Ogni spazio chiede una direzione.",
    "Antes da obra, uma direção clara para cada escolha importante.": "Prima del cantiere, una direzione chiara per ogni scelta importante.",
    "Projetos com intenção": "Progetti con intenzione",
    "Arquitetura para valorizar sua rotina, seu imóvel e o seu modo de viver.": "Architettura per valorizzare la tua routine, il tuo immobile e il tuo modo di vivere.",
    "Residencial": "Residenziale",
    "Comercial": "Commerciale",
    "Fachadas": "Facciate",
    "Inspire-se": "Ispirati",
    "Espaços que acolhem e permanecem.": "Spazi che accolgono e durano.",
    "Ambientes que expressam valor.": "Ambienti che esprimono valore.",
    "Presença arquitetônica com equilíbrio.": "Presenza architettonica con equilibrio.",
    "Referências que revelam direção.": "Riferimenti che rivelano una direzione.",
    "Sobre Marcia Nath": "Chi siamo Marcia Nath",
    "about.home.label": "Chi siamo Marcia Nath",
    "about.home.title": "Marcia Nath",
    "about.home.lead":
      "Progetti di architettura per chi cerca una casa bella, funzionale e coerente con la vita reale, senza rinunciare alla personalita.",
    "about.home.body":
      "Ogni scelta viene guidata con criterio: dalla lettura della routine ai materiali, dalla luce ai dettagli che fanno funzionare meglio lo spazio. Il risultato e un progetto con chiarezza, presenza e sicurezza per investire in cio che trasforma davvero il vivere.",
    "about.page.back": "Indietro",
    "about.page.brand": "Marcia Nath Architettura",
    "about.page.h1": "Chi siamo Marcia Nath",
    "about.page.lead":
      "Architettura per chi vuole investire meglio nel proprio spazio: con bellezza, funzione, chiarezza nelle scelte e una casa che abbia senso nella vita reale.",
    "about.page.kicker_1": "01 - Sguardo",
    "about.page.h2_1": "Uno sguardo che organizza desiderio e realta",
    "about.page.p_1":
      "Il lavoro parte da una lettura attenta del cliente, dell'immobile e del momento di vita. Da li, ogni ambiente prende una direzione propria senza perdere unita nell'insieme.",
    "about.page.kicker_2": "02 - Processo",
    "about.page.h2_2": "Ascolto per trasformare le scelte in direzione",
    "about.page.p_2":
      "L'ascolto organizza le priorita: cio che disturba, cio che deve restare, quali scelte richiedono piu cura e dove il progetto puo evitare spese inutili.",
    "about.page.kicker_3": "03 - Critério",
    "about.page.h2_3": "Un progetto che riduce i dubbi lungo il percorso",
    "about.page.p_3":
      "Il progetto funziona come una mappa decisionale. Collega layout, materiali, illuminazione, falegnameria e atmosfera affinche l'esecuzione abbia meno improvvisazione e piu coerenza.",
    "about.page.kicker_4": "04 - Ambito",
    "about.page.h2_4": "Residenze, interni, facciate e commerciali",
    "about.page.p_4":
      "Ogni ambito ha un'esigenza diversa: vivere meglio, vendere meglio, accogliere meglio o valorizzare la prima impressione. La proposta e tradurre questa esigenza in architettura.",
    "about.page.cta_h2": "Vuoi capire quale progetto ha senso per te?",
    "about.page.cta_p":
      "Se vuoi investire nel tuo spazio con piu sicurezza, il passo successivo e parlare di routine, desideri e priorita.",
    "Projetos de arquitetura para quem busca uma casa bonita, funcional e coerente com a vida real, sem abrir mão de personalidade.": "Progetti di architettura per chi cerca una casa bella, funzionale e coerente con la vita reale, senza rinunciare alla personalita.",
    "Cada escolha é conduzida com critério: da leitura da rotina aos materiais, da luz aos detalhes que fazem o espaço funcionar melhor. O resultado é um projeto com clareza, presença e segurança para investir no que realmente transforma o morar.": "Ogni scelta viene guidata con criterio: dalla lettura della routine ai materiali, dalla luce ai dettagli che fanno funzionare meglio lo spazio. Il risultato e un progetto con chiarezza, presenza e sicurezza per investire in cio che trasforma davvero il vivere.",
    "Exclusivamente para você": "Esclusivo per te",
    "Decida melhor antes de construir, reformar ou decorar.": "Decidi meglio prima di costruire, ristrutturare o arredare.",
    "Antes de comprar revestimentos, mover paredes ou investir em mobiliário, o projeto organiza prioridades, evita escolhas soltas e transforma desejo em direção clara.": "Prima di acquistare rivestimenti, spostare pareti o investire nell'arredo, il progetto organizza le priorita, evita scelte isolate e trasforma il desiderio in una direzione chiara.",
    "Projeto residencial": "Progetto residenziale",
    "Planejamento de casas e apartamentos para aproveitar melhor área, luz, circulação e potencial do imóvel.": "Pianificazione di case e appartamenti per sfruttare meglio superficie, luce, circolazione e potenziale dell'immobile.",
    "Interiores": "Interni",
    "Ambientes com linguagem consistente, mobiliário bem dimensionado e escolhas que fazem sentido no dia a dia.": "Ambienti con linguaggio coerente, arredi ben dimensionati e scelte che hanno senso nella vita quotidiana.",
    "Curadoria e acompanhamento": "Curatela e accompagnamento",
    "Apoio para escolher com mais segurança e manter a intenção do projeto durante compras, ajustes e execução.": "Supporto per scegliere con piu sicurezza e mantenere l'intenzione del progetto durante acquisti, modifiche ed esecuzione.",
    "Como acontece": "Come funziona",
    "Um processo claro para você investir com mais segurança.": "Un processo chiaro per investire con piu sicurezza.",
    "Um processo pensado para decisões precisas.": "Un processo pensato per decisioni precise.",
    "Escuta privada": "Ascolto privato",
    "Leitura da rotina, dos desejos, do orçamento e das escolhas que precisam de mais critério antes da obra.": "Lettura della routine, dei desideri, del budget e delle scelte che richiedono piu criterio prima del cantiere.",
    "Estudo de potencial": "Studio del potenziale",
    "Definição da melhor distribuição, da atmosfera desejada e das oportunidades reais de valorização do espaço.": "Definizione della migliore distribuzione, dell'atmosfera desiderata e delle reali opportunita di valorizzazione dello spazio.",
    "Curadoria e detalhamento": "Curatela e dettaglio",
    "Materiais, acabamentos e orientações organizados para alinhar fornecedores e proteger a intenção da entrega.": "Materiali, finiture e indicazioni organizzati per allineare i fornitori e proteggere l'intenzione della consegna.",
    "Escuta": "Ascolto",
    "Entendimento da rotina, dos desejos, do orçamento e das escolhas que precisam ser resolvidas.": "Comprensione della routine, dei desideri, del budget e delle decisioni da risolvere.",
    "Conceito": "Concetto",
    "Definição da linguagem, da distribuição dos ambientes e da atmosfera que vai guiar cada decisão.": "Definizione del linguaggio, della distribuzione degli ambienti e dell'atmosfera che guidera ogni decisione.",
    "Detalhamento": "Dettaglio",
    "Especificações e orientações para reduzir dúvidas, alinhar fornecedores e proteger a qualidade da entrega.": "Specifiche e indicazioni per ridurre i dubbi, allineare i fornitori e proteggere la qualita della consegna.",
    "Vamos trabalhar juntas?": "Lavoriamo insieme?",
    "O primeiro passo é entender o que você quer transformar.": "Il primo passo e capire cosa vuoi trasformare.",
    "Compartilhe o momento da obra, o tipo de ambiente e o que hoje não funciona como deveria. A partir desse primeiro briefing, fica mais simples avaliar caminhos, prioridades e o formato ideal de projeto.": "Condividi la fase del lavoro, il tipo di ambiente e cio che oggi non funziona come dovrebbe. Da questo primo briefing e piu semplice valutare strade, priorita e il formato ideale del progetto.",
    "Espaço": "Spazio",
    "Casa, apartamento, fachada, interiores ou ambiente comercial que precisa de direção.": "Casa, appartamento, facciata, interni o spazio commerciale che ha bisogno di direzione.",
    "Momento": "Fase",
    "Ideia inicial, reforma, obra em andamento ou etapa de escolhas e acabamentos.": "Idea iniziale, ristrutturazione, cantiere in corso o fase di scelte e finiture.",
    "Desejo": "Desiderio",
    "O que você quer valorizar, resolver e sentir ao viver ou apresentar o espaço.": "Cio che vuoi valorizzare, risolvere e sentire vivendo o presentando lo spazio.",
    "Ambientes que acolhem a rotina": "Spazi che accompagnano la routine",
    "Como proporção, luz e materiais podem transformar a casa em um lugar mais prático e prazeroso.": "Come proporzione, luce e materiali possono trasformare la casa in un luogo piu pratico e piacevole.",
    "Fachada com presença, sem excesso": "Facciata con presenza, senza eccessi",
    "Como volumetria, textura e paisagismo ajudam a valorizar o imóvel logo na primeira impressão.": "Come volumi, texture e paesaggio aiutano a valorizzare l'immobile fin dalla prima impressione.",
    "Escolhas que envelhecem bem": "Scelte che invecchiano bene",
    "Um olhar sobre materiais, circulação e detalhes que evitam arrependimentos depois da obra pronta.": "Uno sguardo su materiali, circolazione e dettagli che evitano rimpianti a lavori finiti.",
    "Próximo passo": "Prossimo passo",
    "Vamos transformar sua ideia em um projeto bonito, possível e bem direcionado.": "Trasformiamo la tua idea in un progetto bello, possibile e ben orientato.",
    "Arquitetura para quem quer investir melhor no próprio espaço: com beleza, função, clareza de escolhas e uma casa que faça sentido na vida real.": "Architettura per chi vuole investire meglio nel proprio spazio: con bellezza, funzione, chiarezza nelle scelte e una casa che abbia senso nella vita reale.",
    "01 - Olhar": "01 - Sguardo",
    "Um olhar que organiza desejo e realidade": "Uno sguardo che organizza desiderio e realta",
    "O trabalho parte de uma leitura cuidadosa do cliente, do imóvel e do momento da vida. A partir disso, cada ambiente ganha uma direção própria, sem perder unidade no conjunto.": "Il lavoro parte da una lettura attenta del cliente, dell'immobile e del momento di vita. Da li, ogni ambiente prende una direzione propria senza perdere unita nell'insieme.",
    "02 - Processo": "02 - Processo",
    "Escuta para transformar escolhas em direção": "Ascolto per trasformare le scelte in direzione",
    "A escuta organiza prioridades: o que incomoda, o que precisa permanecer, quais escolhas exigem mais cuidado e onde o projeto pode evitar gastos desnecessários.": "L'ascolto organizza le priorita: cio che disturba, cio che deve restare, quali scelte richiedono piu cura e dove il progetto puo evitare spese inutili.",
    "03 - Critério": "03 - Critério",
    "Um projeto que reduz dúvidas no caminho": "Un progetto che riduce i dubbi lungo il percorso",
    "O projeto funciona como um mapa de decisão. Ele conecta layout, materiais, iluminação, marcenaria e atmosfera para que a execução tenha menos improviso e mais coerência.": "Il progetto funziona come una mappa decisionale. Collega layout, materiali, illuminazione, falegnameria e atmosfera affinche l'esecuzione abbia meno improvvisazione e piu coerenza.",
    "04 - Atuação": "04 - Ambito",
    "Residências, interiores, fachadas e comerciais": "Residenze, interni, facciate e commerciali",
    "Cada frente tem uma necessidade diferente: morar melhor, vender melhor, receber melhor ou valorizar a primeira impressão. A proposta é traduzir essa necessidade em arquitetura.": "Ogni ambito ha un'esigenza diversa: vivere meglio, vendere meglio, accogliere meglio o valorizzare la prima impressione. La proposta e tradurre questa esigenza in architettura.",
    "Quer entender qual projeto faz sentido para você?": "Vuoi capire quale progetto ha senso per te?",
    "Se você quer investir no seu espaço com mais segurança, o próximo passo é conversar sobre rotina, desejos e prioridades.": "Se vuoi investire nel tuo spazio con piu sicurezza, il passo successivo e parlare di routine, desideri e priorita.",
    "Casas e apartamentos planejados para melhorar a rotina, valorizar o imóvel e transformar investimento em conforto, beleza e uso inteligente dos ambientes.": "Case e appartamenti progettati per migliorare la routine, valorizzare l'immobile e trasformare l'investimento in comfort, bellezza e uso intelligente degli ambienti.",
    "01 - Rotina": "01 - Routine",
    "O projeto começa pelo jeito que a casa precisa funcionar": "Il progetto inizia da come la casa deve funzionare",
    "O projeto residencial começa mapeando rotina: horários, circulação, armazenamento, privacidade, forma de receber e pequenos hábitos que definem como a casa deve responder.": "Il progetto residenziale inizia mappando la routine: orari, circolazione, deposito, privacy, modo di accogliere e piccole abitudini che definiscono come la casa deve rispondere.",
    "02 - Planta": "02 - Pianta",
    "Melhor uso da área, da luz e da circulação": "Miglior uso di area, luce e circolazione",
    "A planta precisa trabalhar a favor da vida diária. Reposicionar usos, integrar ambientes e ajustar medidas pode transformar a sensação de amplitude sem depender de excesso.": "La pianta deve lavorare a favore della vita quotidiana. Riposizionare gli usi, integrare gli ambienti e regolare le misure puo trasformare la sensazione di ampiezza senza dipendere dall'eccesso.",
    "03 - Dormitórios": "03 - Camere",
    "Descanso com conforto e intenção": "Riposo con comfort e intenzione",
    "Dormitórios pedem silêncio visual, luz controlada e armazenamento bem resolvido. Cada detalhe ajuda a criar uma rotina de descanso mais leve e organizada.": "Le camere chiedono silenzio visivo, luce controllata e deposito ben risolto. Ogni dettaglio aiuta a creare una routine di riposo piu leggera e organizzata.",
    "04 - Convivência": "04 - Convivio",
    "Salas que recebem melhor": "Soggiorni che accolgono meglio",
    "Sala de estar, jantar e cozinha precisam conversar. O projeto ajusta proporções, circulação e pontos de apoio para receber bem sem comprometer o uso diário.": "Soggiorno, pranzo e cucina devono dialogare. Il progetto regola proporzioni, circolazione e punti di appoggio per accogliere bene senza compromettere l'uso quotidiano.",
    "05 - Receber": "05 - Accogliere",
    "A casa preparada para encontros reais": "La casa pronta per incontri reali",
    "A mesa pede luz na medida, cadeiras confortáveis, passagem livre e materiais resistentes. Esses detalhes fazem o encontro acontecer com beleza, mas também com praticidade.": "Il tavolo chiede luce misurata, sedie comode, passaggio libero e materiali resistenti. Questi dettagli rendono l'incontro bello ma anche pratico.",
    "Vamos planejar seu lar com mais segurança?": "Pianifichiamo la tua casa con piu sicurezza?",
    "Conte como é o seu espaço hoje, o que precisa melhorar e quais decisões você quer tomar com mais clareza.": "Racconta com'e il tuo spazio oggi, cosa deve migliorare e quali decisioni vuoi prendere con piu chiarezza.",
    "Espaços comerciais desenhados para comunicar valor, melhorar o atendimento e apoiar a operação com elegância, eficiência e identidade de marca.": "Spazi commerciali progettati per comunicare valore, migliorare il servizio e supportare l'operativita con eleganza, efficienza e identita di marca.",
    "01 - Posicionamento": "01 - Posizionamento",
    "Espaços que posicionam a marca": "Spazi che posizionano il brand",
    "O espaço comercial precisa deixar claro quem a marca é, para quem ela fala e qual percepção deseja construir. Arquitetura, layout e materiais trabalham esse posicionamento.": "Lo spazio commerciale deve chiarire chi e il brand, a chi parla e quale percezione vuole costruire. Architettura, layout e materiali lavorano su questo posizionamento.",
    "02 - Jornada": "02 - Percorso",
    "Recepção, fluxo e venda mais claros": "Accoglienza, flusso e vendita piu chiari",
    "A jornada começa na porta: onde o cliente entra, espera, circula, compra, pergunta e finaliza o atendimento. O projeto organiza esse percurso para tornar a experiência fluida.": "Il percorso inizia dalla porta: dove il cliente entra, aspetta, si muove, acquista, chiede e conclude il servizio. Il progetto organizza questo percorso per rendere l'esperienza fluida.",
    "03 - Operação": "03 - Operativita",
    "Uma experiência mais profissional": "Un'esperienza piu professionale",
    "Balcão, estoque, atendimento, exposição e bastidores precisam funcionar juntos. Um layout claro reduz fricção para a equipe e melhora a percepção do cliente.": "Banco, magazzino, servizio, esposizione e retrobottega devono funzionare insieme. Un layout chiaro riduce l'attrito per il team e migliora la percezione del cliente.",
    "04 - Percepção": "04 - Percezione",
    "Materiais que comunicam valor": "Materiali che comunicano valore",
    "Materiais comerciais precisam comunicar e resistir. A escolha considera limpeza, manutenção, fluxo de pessoas, iluminação e o nível de sofisticação que a marca quer transmitir.": "I materiali commerciali devono comunicare e resistere. La scelta considera pulizia, manutenzione, flusso di persone, illuminazione e il livello di raffinatezza che il brand vuole trasmettere.",
    "05 - Memória": "05 - Memória",
    "Um espaço que fica na memória": "Uno spazio che resta nella memória",
    "Um ambiente memorável não depende de excesso. Ele depende de coerência: fachada, recepção, atendimento e detalhes repetindo a mesma mensagem de marca.": "Un ambiente memorabile non dipende dall'eccesso. Dipende dalla coerenza: facciata, accoglienza, servizio e dettagli che ripetono lo stesso messaggio del brand.",
    "Vamos transformar seu espaço em uma experiência de marca?": "Trasformiamo il tuo spazio in un'esperienza di brand?",
    "Conte sobre sua marca, seu fluxo de atendimento e o tipo de percepção que você quer construir no cliente.": "Racconta del tuo brand, del flusso di servizio e del tipo di percezione che vuoi costruire nel cliente.",
    "Fachadas planejadas para valorizar o imóvel, organizar a primeira impressão e criar uma leitura arquitetônica coerente com o que existe dentro.": "Facciate progettate per valorizzare l'immobile, organizzare la prima impressione e creare una lettura architettonica coerente con cio che esiste all'interno.",
    "01 - Rua": "01 - Strada",
    "A primeira impressão também é projeto": "La prima impressione e anche progetto",
    "A fachada precisa conversar com rua, terreno, aberturas e privacidade. O estudo define o que mostrar, o que proteger e como criar presença sem pesar o conjunto.": "La facciata deve dialogare con strada, terreno, aperture e privacy. Lo studio definisce cosa mostrare, cosa proteggere e come creare presenza senza appesantire l'insieme.",
    "02 - Volumetria": "02 - Volumetria",
    "Mais presença, menos improviso": "Piu presenza, meno improvvisazione",
    "Volumes bem definidos criam leitura mesmo antes dos acabamentos. Cheios, vazios, planos e profundidades organizam a imagem e evitam uma frente fragmentada.": "Volumi ben definiti creano una lettura anche prima delle finiture. Pieni, vuoti, piani e profondita organizzano l'immagine ed evitano una facciata frammentata.",
    "03 - Materiais": "03 - Materiali",
    "Materiais que valorizam com o tempo": "Materiali che si valorizzano nel tempo",
    "Cada material externo precisa considerar sol, chuva, manutenção e durabilidade. A beleza da fachada depende tanto da combinação visual quanto da permanência.": "Ogni materiale esterno deve considerare sole, pioggia, manutenzione e durata. La bellezza della facciata dipende sia dalla combinazione visiva sia dalla permanenza.",
    "04 - Percurso": "04 - Percorso",
    "Chegada clara e acolhedora": "Arrivo chiaro e accogliente",
    "Portão, caminho, porta, jardim e luz orientam a chegada. Quando esse percurso é claro, a casa parece mais acolhedora e a entrada ganha intenção.": "Cancello, cammino, porta, giardino e luce guidano l'arrivo. Quando questo percorso e chiaro, la casa sembra piu accogliente e l'ingresso acquista intenzione.",
    "05 - Entorno": "05 - Contesto",
    "Arquitetura em relação ao entorno": "Architettura in relazione al contesto",
    "Paisagismo, muros, calçada e vizinhança interferem na leitura final. A fachada precisa se destacar sem ignorar o contexto onde ela está inserida.": "Paesaggio, muri, marciapiede e vicinato influenzano la lettura finale. La facciata deve distinguersi senza ignorare il contesto in cui e inserita.",
    "Vamos valorizar a primeira impressão do seu imóvel?": "Valorizziamo la prima impressione del tuo immobile?",
    "Se você quer uma fachada mais clara, mais forte ou mais integrada ao terreno, o primeiro passo é entender o potencial do que já existe.": "Se vuoi una facciata piu chiara, piu forte o piu integrata al terreno, il primo passo e capire il potenziale di cio che esiste gia.",
    "Ideias de atmosfera, materiais e composição para sair das referências soltas e chegar a uma direção de projeto mais clara, bonita e possível.": "Idee di atmosfera, materiali e composizione per passare da riferimenti sparsi a una direzione di progetto piu chiara, bella e possibile.",
    "01 - Recorte": "01 - Selezione",
    "Inspiração que ajuda a decidir": "Ispirazione che aiuta a decidere",
    "A inspiração certa não é uma pasta cheia de imagens. Ela revela preferências, identifica padrões e mostra quais escolhas realmente combinam com a rotina e com o espaço disponível.": "L'ispirazione giusta non e una cartella piena di immagini. Rivela preferenze, identifica schemi e mostra quali scelte si adattano davvero alla routine e allo spazio disponibile.",
    "02 - Paleta": "02 - Tavolozza",
    "Paleta, atmosfera e direção": "Tavolozza, atmosfera e direzione",
    "Uma paleta bem definida evita compras impulsivas e combinações desconectadas. Ela cria uma base para materiais, mobiliário, iluminação e acabamentos conversarem entre si.": "Una tavolozza ben definita evita acquisti impulsivi e combinazioni scollegate. Crea una base per far dialogare materiali, arredi, illuminazione e finiture.",
    "Textura e luz com intenção": "Texture e luce con intenzione",
    "Madeira, pedra, tecido, metal e pintura mudam conforme a luz do dia e da noite. Por isso, textura e iluminação precisam ser pensadas juntas antes da escolha final.": "Legno, pietra, tessuto, metallo e pittura cambiano con la luce del giorno e della notte. Per questo texture e illuminazione vanno pensate insieme prima della scelta finale.",
    "04 - Equilíbrio": "04 - Equilíbrio",
    "Composição sem excesso": "Composizione senza eccesso",
    "A composição define pausas, contraste e peso visual. Esse equilíbrio evita excesso de objetos e ajuda cada peça a ter uma função dentro da atmosfera desejada.": "La composizione definisce pause, contrasto e peso visivo. Questo equilíbrio evita troppi oggetti e aiuta ogni pezzo ad avere una funzione nell'atmosfera desiderata.",
    "05 - Atmosfera": "05 - Atmosfera",
    "Um repertório que vira projeto": "Un repertório che diventa progetto",
    "O repertório vira projeto quando deixa de ser apenas gosto e passa a orientar decisão: o que entra, o que sai e o que sustenta a identidade do ambiente.": "Il repertório diventa progetto quando smette di essere solo gusto e inizia a orientare le decisioni: cio che entra, cio che esce e cio che sostiene l'identita dell'ambiente.",
    "Vamos transformar suas referências em direção?": "Trasformiamo i tuoi riferimenti in direzione?",
    "Se você tem muitas ideias e não sabe por onde seguir, esse recorte pode ser o primeiro passo para um projeto mais claro e coerente.": "Se hai molte idee e non sai da dove partire, questa selezione puo essere il primo passo verso un progetto piu chiaro e coerente."
  };

  const normalize = (value) => value.replace(/\s+/g, " ").trim();
  const currentTranslations = language === "es" ? spanishTranslations : translations;
  const activeTranslations =
    language === "it" ? italianTranslations : language === "es" ? spanishTranslations : translations;

  const toLanguageUrl = (targetLanguage) => {
    const url = new URL(window.location.href);
    if (targetLanguage === "pt") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", targetLanguage);
    }
    return `${url.pathname}${url.search}${url.hash}`;
  };

  const upsertLink = (rel, attributes) => {
    const selector = `link[rel="${rel}"]${attributes.hreflang ? `[hreflang="${attributes.hreflang}"]` : ""}`;
    const link = document.head.querySelector(selector) || document.createElement("link");
    link.setAttribute("rel", rel);
    Object.entries(attributes).forEach(([key, value]) => link.setAttribute(key, value));
    if (!link.parentNode) document.head.appendChild(link);
  };

  const applySeoLanguageUrls = () => {
    const ptUrl = new URL(window.location.href);
    ptUrl.searchParams.delete("lang");
    const enUrl = new URL(ptUrl.href);
    enUrl.searchParams.set("lang", "en");
    const esUrl = new URL(ptUrl.href);
    esUrl.searchParams.set("lang", "es");
    const itUrl = new URL(ptUrl.href);
    itUrl.searchParams.set("lang", "it");

    upsertLink("canonical", {
      href: language === "en" ? enUrl.href : language === "es" ? esUrl.href : language === "it" ? itUrl.href : ptUrl.href
    });
    upsertLink("alternate", { hreflang: "pt-BR", href: ptUrl.href });
    upsertLink("alternate", { hreflang: "en", href: enUrl.href });
    upsertLink("alternate", { hreflang: "es", href: esUrl.href });
    upsertLink("alternate", { hreflang: "it", href: itUrl.href });
    upsertLink("alternate", { hreflang: "x-default", href: ptUrl.href });
  };

  const translateTextNodes = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!normalize(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest("script, style, svg")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const key = normalize(node.nodeValue);
      const translated = activeTranslations[key];
      if (translated) {
        node.nodeValue = node.nodeValue.replace(key, translated);
      }
    });
  };

  const translateAttributes = () => {
    document.querySelectorAll("[aria-label]").forEach((element) => {
      const translated = activeTranslations[normalize(element.getAttribute("aria-label") || "")];
      if (translated) element.setAttribute("aria-label", translated);
    });

    document.querySelectorAll("img[alt]").forEach((image) => {
      const translated = activeTranslations[normalize(image.getAttribute("alt") || "")];
      if (translated) image.setAttribute("alt", translated);
    });
  };

  const translateStructuredContent = () => {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n") || "";
      const translated = activeTranslations[key];
      if (translated) element.textContent = translated;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const key = element.getAttribute("data-i18n-aria") || "";
      const translated = activeTranslations[key];
      if (translated) element.setAttribute("aria-label", translated);
    });
  };

  const applyLanguage = () => {
    if (language === "pt") return;
    document.documentElement.lang = language === "es" ? "es" : language === "it" ? "it" : "en";
    const meta = language === "es" ? spanishMeta[pageKey] : language === "it" ? italianMeta[pageKey] : englishMeta[pageKey];
    if (meta) {
      document.title = meta.title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    }
    translateTextNodes();
    translateAttributes();
    translateStructuredContent();
  };

  const addLanguageSwitch = () => {
    const createSwitch = () => {
      const wrapper = document.createElement("div");
      wrapper.className = "language-switch";
      wrapper.setAttribute("aria-label", language === "en" ? "Language" : language === "es" ? "Idioma" : "Lingua");
      wrapper.innerHTML = `
        <a href="${toLanguageUrl("pt")}" class="${language === "pt" ? "is-active" : ""}" lang="pt-BR">PT</a>
        <span aria-hidden="true">/</span>
        <a href="${toLanguageUrl("en")}" class="${language === "en" ? "is-active" : ""}" lang="en">EN</a>
        <span aria-hidden="true">/</span>
        <a href="${toLanguageUrl("es")}" class="${language === "es" ? "is-active" : ""}" lang="es">ES</a>
        <span aria-hidden="true">/</span>
        <a href="${toLanguageUrl("it")}" class="${language === "it" ? "is-active" : ""}" lang="it">IT</a>
      `;
      return wrapper;
    };

    document.querySelector(".nav-right")?.insertBefore(createSwitch(), document.querySelector(".whatsapp-link"));
    menu?.querySelector("nav")?.appendChild(createSwitch());
  };

  const preserveSelectedLanguageOnInternalLinks = () => {
    if (language === "pt") return;

    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (
        link.closest(".language-switch") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("https://wa.me")
      ) {
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.searchParams.has("lang")) return;
        url.searchParams.set("lang", language);
        link.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
      } catch {
        // Ignore non-standard href values.
      }
    });
  };

  applySeoLanguageUrls();
  addLanguageSwitch();
  applyLanguage();
  preserveSelectedLanguageOnInternalLinks();

  const syncHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 28);
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menu?.classList.remove("is-open");
    menu?.setAttribute("aria-hidden", "true");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    document.body.classList.add("menu-open");
    menu?.classList.add("is-open");
    menu?.setAttribute("aria-hidden", "false");
    menuToggle?.setAttribute("aria-expanded", "true");
  };

  syncHeader();
  menuToggle?.setAttribute("aria-expanded", "false");
  window.addEventListener("scroll", syncHeader, { passive: true });
  menuToggle?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const startHeroPingPongVideo = (videos) => {
    if (videos.length < 2) return;

    let activeIndex = 0;

    const play = async (video) => {
      video.playbackRate = 0.55;
      try {
        await video.play();
        video.classList.add("is-active");
        return true;
      } catch {
        return false;
      }
    };

    videos.forEach((video, index) => {
      video.loop = false;
      video.preload = index === 0 ? "metadata" : "none";
      video.classList.remove("is-active");

      video.addEventListener("ended", async () => {
        if (index !== activeIndex) return;

        const nextIndex = activeIndex === 0 ? 1 : 0;
        const currentVideo = videos[activeIndex];
        const nextVideo = videos[nextIndex];

        nextVideo.currentTime = 0;
        const started = await play(nextVideo);

        if (!started) {
          currentVideo.classList.remove("is-active");
          return;
        }

        window.setTimeout(() => {
          currentVideo.pause();
          currentVideo.classList.remove("is-active");
          activeIndex = nextIndex;
        }, 120);
      });

      video.addEventListener("error", () => {
        if (index !== activeIndex) return;
        video.classList.remove("is-active");
      });
    });

    videos[0].addEventListener(
      "canplay",
      () => {
        videos[1].preload = "auto";
        videos[1].load();
      },
      { once: true }
    );

    play(videos[activeIndex]);
  };

  startHeroPingPongVideo(heroVideos);

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initializeSite, { once: true });
} else {
  initializeSite();
}

