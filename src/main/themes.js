const fs = require('fs');
const path = require('path');

const BUILT_IN_THEME_TOKENS = {
  dracula: {
    scheme: 'dark',
    bgPrimary: '#282a36',
    bgSecondary: '#21222c',
    bgElevated: '#343746',
    bgHover: '#3b3f52',
    textPrimary: '#f8f8f2',
    textSecondary: '#c2c7e6',
    textMuted: '#8f99c7',
    border: '#44475a',
    accent: '#bd93f9',
    accentSecondary: '#8be9fd',
    codeBg: '#1e1f29',
    calloutBg: 'rgba(189, 147, 249, 0.12)',
  },
  nord: {
    scheme: 'dark',
    bgPrimary: '#2e3440',
    bgSecondary: '#242933',
    bgElevated: '#3b4252',
    bgHover: '#434c5e',
    textPrimary: '#eceff4',
    textSecondary: '#d8dee9',
    textMuted: '#a7b1c2',
    border: '#4c566a',
    accent: '#88c0d0',
    accentSecondary: '#81a1c1',
    codeBg: '#202630',
    calloutBg: 'rgba(136, 192, 208, 0.12)',
  },
  'gruvbox-dark': {
    scheme: 'dark',
    bgPrimary: '#282828',
    bgSecondary: '#1d2021',
    bgElevated: '#32302f',
    bgHover: '#3c3836',
    textPrimary: '#ebdbb2',
    textSecondary: '#d5c4a1',
    textMuted: '#a89984',
    border: '#504945',
    accent: '#fabd2f',
    accentSecondary: '#83a598',
    codeBg: '#1d2021',
    calloutBg: 'rgba(250, 189, 47, 0.12)',
  },
  'catppuccin-mocha': {
    scheme: 'dark',
    bgPrimary: '#1e1e2e',
    bgSecondary: '#181825',
    bgElevated: '#242438',
    bgHover: '#313244',
    textPrimary: '#cdd6f4',
    textSecondary: '#bac2de',
    textMuted: '#9399b2',
    border: '#313244',
    accent: '#cba6f7',
    accentSecondary: '#89b4fa',
    codeBg: '#11111b',
    calloutBg: 'rgba(203, 166, 247, 0.12)',
  },
  'catppuccin-macchiato': {
    scheme: 'dark',
    bgPrimary: '#24273a',
    bgSecondary: '#1e2030',
    bgElevated: '#2b2f45',
    bgHover: '#363a4f',
    textPrimary: '#cad3f5',
    textSecondary: '#b8c0e0',
    textMuted: '#939ab7',
    border: '#363a4f',
    accent: '#c6a0f6',
    accentSecondary: '#8aadf4',
    codeBg: '#181926',
    calloutBg: 'rgba(198, 160, 246, 0.12)',
  },
  'catppuccin-frappe': {
    scheme: 'dark',
    bgPrimary: '#303446',
    bgSecondary: '#292c3c',
    bgElevated: '#383d52',
    bgHover: '#414559',
    textPrimary: '#c6d0f5',
    textSecondary: '#b5bfe2',
    textMuted: '#949cbb',
    border: '#414559',
    accent: '#ca9ee6',
    accentSecondary: '#8caaee',
    codeBg: '#232634',
    calloutBg: 'rgba(202, 158, 230, 0.12)',
  },
  'catppuccin-latte': {
    scheme: 'light',
    bgPrimary: '#eff1f5',
    bgSecondary: '#e6e9ef',
    bgElevated: '#ffffff',
    bgHover: '#dce0e8',
    textPrimary: '#4c4f69',
    textSecondary: '#5c5f77',
    textMuted: '#7c7f93',
    border: '#ccd0da',
    accent: '#8839ef',
    accentSecondary: '#1e66f5',
    codeBg: '#e6e9ef',
    calloutBg: 'rgba(136, 57, 239, 0.1)',
  },
};

function buildThemeCSS(themeName, tokens) {
  return `
/* Lotion built-in theme: ${themeName} */
:root {
  color-scheme: ${tokens.scheme};
  --lotion-bg-primary: ${tokens.bgPrimary};
  --lotion-bg-secondary: ${tokens.bgSecondary};
  --lotion-bg-elevated: ${tokens.bgElevated};
  --lotion-bg-hover: ${tokens.bgHover};
  --lotion-text-primary: ${tokens.textPrimary};
  --lotion-text-secondary: ${tokens.textSecondary};
  --lotion-text-muted: ${tokens.textMuted};
  --lotion-border: ${tokens.border};
  --lotion-accent: ${tokens.accent};
  --lotion-accent-secondary: ${tokens.accentSecondary};
  --lotion-code-bg: ${tokens.codeBg};
  --lotion-callout-bg: ${tokens.calloutBg};

  --theme--bg: var(--lotion-bg-primary);
  --theme--fg: var(--lotion-bg-elevated);
  --theme--text: var(--lotion-text-primary);
  --theme--text_ui: var(--lotion-text-secondary);
  --theme--text_ui_info: var(--lotion-text-muted);
  --theme--interactive: var(--lotion-accent);
  --theme--interactive_hover: var(--lotion-accent-secondary);
  --theme--code: var(--lotion-code-bg);
  --theme--divider: var(--lotion-border);
}

html,
body,
#notion-app,
.notion-app-inner,
.notion-frame,
.notion-page-content,
.notion-scroller {
  background: var(--lotion-bg-primary) !important;
  color: var(--lotion-text-primary) !important;
}

.notion-sidebar-container,
.notion-sidebar,
.notion-topbar,
.notion-topbar-mobile,
.notion-peek-renderer,
.notion-overlay-container [role="dialog"] {
  background: var(--lotion-bg-secondary) !important;
  color: var(--lotion-text-primary) !important;
  border-color: var(--lotion-border) !important;
}

.notion-selectable,
.notion-page-block,
.notion-text-block,
.notion-header-block,
.notion-sub_header-block,
.notion-sub_sub_header-block,
.notion-to_do-block,
.notion-toggle-block,
.notion-bulleted_list-block,
.notion-numbered_list-block,
.notion-quote-block,
.notion-callout-block,
.notion-collection_view-block,
.notion-page-content [contenteditable="true"] {
  color: var(--lotion-text-primary) !important;
}

.notion-sidebar [role="button"],
.notion-sidebar a,
.notion-topbar [role="button"],
.notion-frame [role="button"] {
  color: var(--lotion-text-secondary) !important;
}

.notion-sidebar [role="button"]:hover,
.notion-topbar [role="button"]:hover,
.notion-frame [role="button"]:hover,
.notion-selectable:hover {
  background: var(--lotion-bg-hover) !important;
}

.notion-callout-block,
.notion-quote-block,
.notion-collection_view-block,
.notion-table-view,
.notion-board-view,
.notion-gallery-view,
.notion-list-view,
.notion-calendar-view,
.notion-timeline-view {
  background: var(--lotion-bg-elevated) !important;
  border-color: var(--lotion-border) !important;
}

.notion-code-block,
pre,
code {
  background: var(--lotion-code-bg) !important;
  color: var(--lotion-text-primary) !important;
}

.notion-callout-block {
  background: var(--lotion-callout-bg) !important;
}

.notion-hr-block,
.notion-divider-block,
[style*="border-bottom"],
[style*="border-top"] {
  border-color: var(--lotion-border) !important;
}

a,
[role="link"],
.notion-link-token {
  color: var(--lotion-accent-secondary) !important;
}

input,
textarea,
[contenteditable="true"] {
  caret-color: var(--lotion-accent) !important;
}

::selection {
  background: color-mix(in srgb, var(--lotion-accent) 35%, transparent) !important;
}

[style*="background: white"],
[style*="background-color: white"],
[style*="background: rgb(255, 255, 255)"],
[style*="background-color: rgb(255, 255, 255)"],
[style*="background: rgb(251, 251, 250)"],
[style*="background-color: rgb(251, 251, 250)"] {
  background: var(--lotion-bg-primary) !important;
}

[style*="color: rgb(55, 53, 47)"],
[style*="color: rgb(25, 25, 25)"] {
  color: var(--lotion-text-primary) !important;
}
`;
}

const BUILT_IN_THEME_CSS = Object.fromEntries(
  Object.entries(BUILT_IN_THEME_TOKENS).map(([themeName, tokens]) => [
    themeName,
    buildThemeCSS(themeName, tokens),
  ])
);

function getElectronApp() {
  try {
    const electron = require('electron');
    return electron && electron.app && typeof electron.app.getPath === 'function'
      ? electron.app
      : null;
  } catch (error) {
    return null;
  }
}

function getUserDataPathCandidates() {
  const electronApp = getElectronApp();
  if (!electronApp) {
    return [];
  }

  const candidates = new Set();
  candidates.add(electronApp.getPath('userData'));

  if (process.platform === 'linux') {
    const configPath = path.join(electronApp.getPath('home'), '.config');
    candidates.add(path.join(configPath, 'Lotion'));
    candidates.add(path.join(configPath, 'lotion'));
  }

  return Array.from(candidates).filter(Boolean);
}

function getUserThemePath(themeName) {
  for (const userDataPath of getUserDataPathCandidates()) {
    const candidates = [
      path.join(userDataPath, 'themes', `${themeName}.css`),
      path.join(userDataPath, 'themes', themeName, 'theme.css'),
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  return null;
}

function getThemeCSS(themeName) {
  if (!themeName || themeName === 'default' || themeName === 'none') {
    return { css: null, source: 'default' };
  }

  const userThemePath = getUserThemePath(themeName);
  if (userThemePath) {
    return {
      css: fs.readFileSync(userThemePath, 'utf8'),
      source: userThemePath,
    };
  }

  const builtInTheme = BUILT_IN_THEME_CSS[themeName];
  if (builtInTheme) {
    return {
      css: builtInTheme,
      source: `built-in:${themeName}`,
    };
  }

  return { css: null, source: null };
}

module.exports = {
  BUILT_IN_THEME_NAMES: Object.keys(BUILT_IN_THEME_CSS),
  getThemeCSS,
};
