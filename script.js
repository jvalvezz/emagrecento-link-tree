// -----------------------------
// CONFIGURAÇÃO E ELEMENT SDK
// -----------------------------

// Cores e tipografia padrão (5 cores no máximo)
const defaultConfig = {
  background_color: "#104480", // BACKGROUND: gradiente começa aqui
  background_color_2: "#0db7e3", // BACKGROUND: gradiente termina aqui
  surface_color: "#0e3a6e", // SECONDARY_SURFACE: cards
  text_color: "#ffffff", // TEXT: textos principais
  accent_color: "#f4d0ff", // PRIMARY_ACTION: botões WhatsApp
  secondary_action_color: "#b0e7ff", // SECONDARY_ACTION: elementos clicáveis secundários (endereços, ícones)
  font_family: "Inter",
  font_size: 15,

  main_title: "Emagrecentro",
  main_subtitle: "Escolha a unidade mais próxima de você!",
  whatsapp_button_text: "Falar com a unidade no WhatsApp",
  footer_text:
    "Mais de 40 anos de experiência e milhares de resultados comprovados em todo o Brasil e exterior.",
};

// Função de atualização visual com base na config
async function onConfigChange(config) {
  const cfg = Object.assign({}, defaultConfig, config || {});

  const root = document.getElementById("root");
  const appSurface = document.getElementById("app-surface");

  const fontBase = cfg.font_family || defaultConfig.font_family;
  const baseFontStack = `${fontBase}, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  const baseSize = Number(cfg.font_size || defaultConfig.font_size);

  // Fundo em gradiente
  if (root) {
    root.style.background = `linear-gradient(135deg, ${cfg.background_color}, ${cfg.background_color_2})`;
  }

  // Superfície principal (cards) levemente translúcida em cima do gradiente
  if (appSurface) {
    appSurface.style.backgroundColor = cfg.surface_color + "cc"; // com leve transparência
  }

  // Títulos e subtítulo
  const mainTitle = document.getElementById("main-title");
  const mainSubtitle = document.getElementById("main-subtitle");

  if (mainTitle) {
    mainTitle.textContent = cfg.main_title || defaultConfig.main_title;
    mainTitle.style.color = cfg.text_color;
    mainTitle.style.fontFamily = baseFontStack;
    mainTitle.style.fontSize = baseSize * 2 + "px";
  }

  if (mainSubtitle) {
    mainSubtitle.textContent = cfg.main_subtitle || defaultConfig.main_subtitle;
    mainSubtitle.style.color = cfg.text_color + "dd";
    mainSubtitle.style.fontFamily = baseFontStack;
    mainSubtitle.style.fontSize = baseSize * 1.2 + "px";
  }

  // Footer
  const footerText = document.getElementById("footer-text");
  if (footerText) {
    footerText.textContent = cfg.footer_text || defaultConfig.footer_text;
    footerText.style.color = cfg.text_color + "dd";
    footerText.style.fontFamily = baseFontStack;
    footerText.style.fontSize = baseSize * 0.7 + "px";
  }

  // Cards de unidade
  const unitCards = document.querySelectorAll(".unit-card");
  unitCards.forEach((card) => {
    card.style.backgroundColor = cfg.surface_color;
    card.style.color = cfg.text_color;
    card.style.fontFamily = baseFontStack;
  });

  const unitTitles = document.querySelectorAll(".unit-title");
  unitTitles.forEach((t) => {
    t.style.fontSize = baseSize * 0.95 + "px";
    t.style.color = cfg.text_color;
  });

  // Botões WhatsApp em todas as unidades
  const whatsButtons = document.querySelectorAll(".whats-button");
  whatsButtons.forEach((btn) => {
    btn.style.backgroundColor = "#ffffff";
    btn.style.color = "#104480";
    btn.style.fontFamily = baseFontStack;
    btn.style.fontSize = baseSize * 0.9 + "px";
    btn.classList.add("hover:brightness-110");

    btn.addEventListener("focus", () => btn.classList.add("focus-ring"));
    btn.addEventListener("blur", () => btn.classList.remove("focus-ring"));
  });

  // Ícones de WhatsApp herdam a cor de texto do botão
  const whatsIcons = document.querySelectorAll(".whats-button .icon-circle");
  whatsIcons.forEach((ic) => {
    ic.style.backgroundColor = "transparent";
    ic.style.color = "#25D366";
  });

  // Texto dos botões WhatsApp
  const whatsTexts = document.querySelectorAll(".whats-text");
  whatsTexts.forEach((span) => {
    span.textContent =
      cfg.whatsapp_button_text || defaultConfig.whatsapp_button_text;
  });

  // Links de endereço
  const addressLinks = document.querySelectorAll(".address-link");
  addressLinks.forEach((link) => {
    link.style.color = cfg.secondary_action_color;
    link.style.fontFamily = baseFontStack;
    link.style.fontSize = baseSize * 0.8 + "px";
    link.classList.add("hover:underline");

    link.addEventListener("focus", () => link.classList.add("focus-ring"));
    link.addEventListener("blur", () => link.classList.remove("focus-ring"));
  });

  const addressIcons = document.querySelectorAll(".address-link .icon-circle");
  addressIcons.forEach((ic) => {
    ic.style.backgroundColor = cfg.secondary_action_color + "33";
    ic.style.color = cfg.secondary_action_color;
  });

  // Fonte no restante
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    mainContent.style.fontFamily = baseFontStack;
  }
}

function mapToCapabilities(config) {
  const cfg = Object.assign({}, defaultConfig, config || {});

  return {
    recolorables: [
      {
        get: () => cfg.background_color || defaultConfig.background_color,
        set: (value) => {
          cfg.background_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ background_color: value });
          }
        },
      },
      {
        get: () => cfg.background_color_2 || defaultConfig.background_color_2,
        set: (value) => {
          cfg.background_color_2 = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ background_color_2: value });
          }
        },
      },
      {
        get: () => cfg.surface_color || defaultConfig.surface_color,
        set: (value) => {
          cfg.surface_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ surface_color: value });
          }
        },
      },
      {
        get: () => cfg.accent_color || defaultConfig.accent_color,
        set: (value) => {
          cfg.accent_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ accent_color: value });
          }
        },
      },
      {
        get: () =>
          cfg.secondary_action_color || defaultConfig.secondary_action_color,
        set: (value) => {
          cfg.secondary_action_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ secondary_action_color: value });
          }
        },
      },
    ],
    borderables: [],
    fontEditable: {
      get: () => cfg.font_family || defaultConfig.font_family,
      set: (value) => {
        cfg.font_family = value;
        if (window.elementSdk) {
          window.elementSdk.setConfig({ font_family: value });
        }
      },
    },
    fontSizeable: {
      get: () => Number(cfg.font_size || defaultConfig.font_size),
      set: (value) => {
        cfg.font_size = Number(value);
        if (window.elementSdk) {
          window.elementSdk.setConfig({ font_size: Number(value) });
        }
      },
    },
  };
}

function mapToEditPanelValues(config) {
  const cfg = Object.assign({}, defaultConfig, config || {});
  return new Map([
    ["main_title", cfg.main_title || defaultConfig.main_title],
    ["main_subtitle", cfg.main_subtitle || defaultConfig.main_subtitle],
    [
      "whatsapp_button_text",
      cfg.whatsapp_button_text || defaultConfig.whatsapp_button_text,
    ],
    ["footer_text", cfg.footer_text || defaultConfig.footer_text],
  ]);
}

// Inicialização segura do Element SDK
(function initElementSdk() {
  if (!window.elementSdk || typeof window.elementSdk.init !== "function") {
    // Mesmo sem SDK, ainda renderizamos com config padrão
    onConfigChange(defaultConfig);
    return;
  }

  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues,
  });

  // Render inicial com a config atual do SDK (se existir)
  onConfigChange(window.elementSdk.config || defaultConfig);
})();