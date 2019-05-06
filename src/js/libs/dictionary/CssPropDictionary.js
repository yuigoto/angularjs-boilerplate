class CssPropDictionary extends Array {
  /**
   * Instância de `CssPropType`.
   * 
   * @type {CssPropType}
   */
  static type = new CssPropType();

  /**
   * Contém os dados "crus" das propriedades CSS.
   * 
   * @type {Array}
   */
  static data = [
    // Size
    // ------------------------------------------------------------------
    {
      name: "width",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Largura"
    },
    {
      name: "maxWidth",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Largura Máx."
    },
    {
      name: "minWidth",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Largura Mín."
    },
    {
      name: "height",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Altura"
    },
    {
      name: "maxHeight",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Altura Máx."
    },
    {
      name: "minHeight",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Altura Mín."
    },

    // Color + Border
    // ------------------------------------------------------------------
    {
      name: "color",
      type: CssPropDictionary.type.HEX_COLOR,
      value: "000",
      label: "Cor"
    },
    {
      name: "border",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Borda"
    },
    {
      name: "borderCollapse",
      type: CssPropDictionary.type.DROPDOWN,
      value: "collapse",
      label: "Juntar Bordas",
      options: [
        "separate",
        "collapse",
        "initial"
      ]
    },
    {
      name: "borderRadius",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Arredondar Borda"
    },

    // Background
    // ------------------------------------------------------------------
    {
      name: "backgroundColor",
      type: CssPropDictionary.type.HEX_COLOR,
      value: "fff",
      label: "Cor de Fundo"
    },
    {
      name: "backgroundImage",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Imagem de Fundo"
    },
    {
      name: "backgroundSize",
      type: CssPropDictionary.type.RADIO,
      value: "auto",
      label: "Tamanho do Fundo",
      customizable: true,
      options: [
        "auto",
        "contain",
        "cover"
      ]
    },
    {
      name: "backgroundPosition",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Posição do Fundo"
    },
    {
      name: "backgroundPositionX",
      type: CssPropDictionary.type.RADIO,
      value: "center",
      label: "Posição do Funod (Hor.)",
      customizable: true,
      options: [
        "left",
        "center",
        "right"
      ]
    },
    {
      name: "backgroundPositionY",
      type: CssPropDictionary.type.RADIO,
      value: "center",
      label: "Posição do Funod (Hor.)",
      customizable: true,
      options: [
        "top",
        "center",
        "bottom"
      ]
    },
    {
      name: "backgroundRepeat",
      type: CssPropDictionary.type.RADIO,
      value: "no-repeat",
      label: "Repetição do Fundo",
      options: [
        "no-repeat",
        "repeat",
        "repeat-x",
        "repeat-y"
      ]
    },

    // Fonts + Text
    // ------------------------------------------------------------------
    {
      name: "fontFamily",
      type: CssPropDictionary.type.DROPDOWN,
      value: "Regular",
      label: "Fonte",
      customizable: true,
      options: [
        "Light",
        "Regular",
        "Medium",
        "Bold",
        "Open Sans",
        "Montserrat",
        "Gotham Light",
        "Gotham"
      ]
    },
    {
      name: "fontSize",
      type: CssPropDictionary.type.DROPDOWN,
      value: "14px",
      label: "Tam. Fonte",
      options: [
        "14px",
        "16px",
        "20px",
        "22px",
        "28px",
        "32px",
        "35px",
        "40px",
        "45px",
        "60px",
        "72px"
      ]
    },
    {
      name: "fontWeight",
      type: CssPropDictionary.type.DROPDOWN,
      value: "regular",
      label: "Peso da Fonte",
      options: [
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
        "light",
        "regular",
        "medium",
        "bold",
        "bolder"
      ]
    },
    {
      name: "fontStyle",
      type: CssPropDictionary.type.DROPDOWN,
      value: "normal",
      label: "Estilo da Fonte",
      options: [
        "normal",
        "oblique",
        "italic"
      ]
    },
    {
      name: "lineHeight",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Altura da Linha"
    },
    {
      name: "verticalAlign",
      type: CssPropDictionary.type.DROPDOWN,
      value: "baseline",
      label: "Alinhamento Vertical",
      options: [
        "baseline",
        "text-top",
        "text-bottom",
        "sub",
        "super"
      ]
    },
    {
      name: "whiteSpace",
      type: CssPropDictionary.type.DROPDOWN,
      value: "normal",
      label: "Envelopar",
      options: [
        "normal",
        "nowrap",
        "pre"
      ]
    },

    // Margins + Spacing
    // ------------------------------------------------------------------
    {
      name: "boxSizing",
      type: CssPropDictionary.type.RADIO,
      value: "border-box",
      label: "Box Sizing",
      options: [
        "content-box",
        "border-box",
        "initial",
        "inherit"
      ]
    },
    {
      name: "margin",
      type: CssPropDictionary.type.SINGLE_LINE_ARRAY,
      singleLineArraySize: 4,
      value: "0 auto 0 auto",
      label: "Margens"
    },
    {
      name: "padding",
      type: CssPropDictionary.type.SINGLE_LINE_ARRAY,
      singleLineArraySize: 4,
      value: "0 0 0 0",
      label: "Preenchimento"
    },
    {
      name: "display",
      type: CssPropDictionary.type.DROPDOWN,
      value: "inline-block",
      label: "Display",
      options: [
        "table",
        "inline",
        "inline-block",
        "inline-flex",
        "block",
        "flex"
      ]
    },

    // Flex Box
    // ------------------------------------------------------------------
    {
      name: "flex",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Flex"
    },
    {
      name: "flexDirection",
      type: CssPropDictionary.type.RADIO,
      value: "row",
      label: "Flex Direction",
      options: [
        "row",
        "column"
      ]
    },
    {
      name: "flexBasis",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Flex Basis"
    },
    {
      name: "flexGrow",
      type: CssPropDictionary.type.NUMERIC,
      value: "",
      label: "Expandir Flex"
    },
    {
      name: "flexShrink",
      type: CssPropDictionary.type.NUMERIC,
      value: "",
      label: "Encolher Flex"
    },
    {
      name: "flexWrap",
      type: CssPropDictionary.type.DROPDOWN,
      value: "wrap",
      label: "Flex Wrap",
      options: [
        "nowrap",
        "wrap",
        "wrap-reverse"
      ]
    },
    {
      name: "alignItems",
      type: CssPropDictionary.type.DROPDOWN,
      value: "initial",
      label: "Alinhar Items",
      options: [
        "stretch",
        "center",
        "flex-start",
        "flex-end",
        "baseline",
        "initial"
      ]
    },
    {
      name: "justifyContent",
      type: CssPropDictionary.type.DROPDOWN,
      value: "initial",
      label: "Just. Conteúdo",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "initial"
      ]
    },

    // Positioning
    // ------------------------------------------------------------------
    {
      name: "position",
      type: CssPropDictionary.type.DROPDOWN,
      value: "relative",
      label: "Posição",
      options: [
        "static",
        "relative",
        "fixed",
        "absolute",
        "sticky"
      ],
      children: [
        {
          name: "top",
          type: CssPropDictionary.type.SINGLE_LINE,
          value: "",
          label: "Top"
        },
        {
          name: "right",
          type: CssPropDictionary.type.SINGLE_LINE,
          value: "",
          label: "Right"
        },
        {
          name: "bottom",
          type: CssPropDictionary.type.SINGLE_LINE,
          value: "",
          label: "Bottom"
        },
        {
          name: "left",
          type: CssPropDictionary.type.SINGLE_LINE,
          value: "",
          label: "Left"
        },
        {
          name: "zIndex",
          type: CssPropDictionary.type.SINGLE_LINE,
          value: "",
          label: "Z-Index"
        }
      ]
    },

    // FX
    // ------------------------------------------------------------------
    {
      name: "opacity",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "1",
      label: "Opacidade"
    },
    {
      name: "cursor",
      type: CssPropDictionary.type.DROPDOWN,
      value: "default",
      label: "Cursor",
      options: [
        "alias",
        "all-scroll",
        "auto",
        "cell",
        "context-menu",
        "col-resize",
        "copy",
        "crosshair",
        "default",
        "e-resize",
        "ew-resize",
        "grab",
        "grabbing",
        "help",
        "move",
        "n-resize",
        "ne-resize",
        "nesw-resize",
        "ns-resize",
        "nw-resize",
        "nwse-resize",
        "no-drop",
        "none",
        "not-allowed",
        "pointer",
        "progress",
        "row-resize",
        "s-resize",
        "se-resize",
        "sw-resize",
        "text",
        "w-resize",
        "wait",
        "zoom-in",
        "zoom-out"
      ]
    },
    {
      name: "transition",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Transição"
    },
    {
      name: "transform",
      type: CssPropDictionary.type.SINGLE_LINE,
      value: "",
      label: "Transformar"
    }
  ];

  // Lifecycle
  // ----------------------------------------------------------------------

  constructor () {
    super();
    
    for (let n = 0; n < CssPropDictionary.data.length; n++) {
      let curr = CssPropDictionary.data[n];
      this.push(curr);
    }
  }
}
