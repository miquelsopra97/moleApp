export const globalFontCSS = new CSSStyleSheet();
globalFontCSS.replaceSync(`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

  :root {
    font-family: 'Inter', system-ui, sans-serif;
  }

  body {
    margin: 0;
    font-family: inherit;
  }
`);
