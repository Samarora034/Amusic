/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        "on-primary-fixed": "var(--color-on-primary-fixed)",
        "primary": "var(--color-primary)",
        "on-secondary-fixed-variant": "var(--color-on-secondary-fixed-variant)",
        "on-secondary": "var(--color-on-secondary)",
        "on-tertiary-fixed": "var(--color-on-tertiary-fixed)",
        "inverse-on-surface": "var(--color-inverse-on-surface)",
        "secondary-fixed": "var(--color-secondary-fixed)",
        "surface-variant": "var(--color-surface-variant)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "secondary": "var(--color-secondary)",
        "on-secondary-fixed": "var(--color-on-secondary-fixed)",
        "on-primary": "var(--color-on-primary)",
        "on-primary-container": "var(--color-on-primary-container)",
        "surface-dim": "var(--color-surface-dim)",
        "on-error-container": "var(--color-on-error-container)",
        "inverse-primary": "var(--color-inverse-primary)",
        "background": "var(--color-background)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "tertiary": "var(--color-tertiary)",
        "surface-tint": "var(--color-surface-tint)",
        "error-container": "var(--color-error-container)",
        "error": "var(--color-error)",
        "tertiary-container": "var(--color-tertiary-container)",
        "surface-container-low": "var(--color-surface-container-low)",
        "outline": "var(--color-outline)",
        "on-tertiary-container": "var(--color-on-tertiary-container)",
        "on-surface": "var(--color-on-surface)",
        "surface-container-highest": "var(--color-surface-container-highest)",
        "primary-fixed": "var(--color-primary-fixed)",
        "surface-container-high": "var(--color-surface-container-high)",
        "on-error": "var(--color-on-error)",
        "surface": "var(--color-surface)",
        "secondary-container": "var(--color-secondary-container)",
        "inverse-surface": "var(--color-inverse-surface)",
        "secondary-fixed-dim": "var(--color-secondary-fixed-dim)",
        "tertiary-fixed": "var(--color-tertiary-fixed)",
        "on-tertiary-fixed-variant": "var(--color-on-tertiary-fixed-variant)",
        "outline-variant": "var(--color-outline-variant)",
        "on-secondary-container": "var(--color-on-secondary-container)",
        "on-primary-fixed-variant": "var(--color-on-primary-fixed-variant)",
        "surface-bright": "var(--color-surface-bright)",
        "on-tertiary": "var(--color-on-tertiary)",
        "primary-fixed-dim": "var(--color-primary-fixed-dim)",
        "tertiary-fixed-dim": "var(--color-tertiary-fixed-dim)",
        "surface-container": "var(--color-surface-container)",
        "primary-container": "var(--color-primary-container)",
        "on-background": "var(--color-on-background)"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "margin-mobile": "20px",
        "margin-desktop": "64px",
        "gutter": "24px",
        "container-max": "1440px",
        "unit": "8px"
      },
      fontFamily: {
        "label-sm": ["Inter"],
        "display-sm": ["Montserrat"],
        "body-lg": ["Inter"],
        "label-md": ["Inter"],
        "headline-lg": ["Montserrat"],
        "headline-lg-mobile": ["Montserrat"],
        "display-lg": ["Montserrat"],
        "body-md": ["Inter"],
        "hyper": ["Orbitron"]
      },
      fontSize: {
        "label-sm": ["12px", { "lineHeight": "1.2", "fontWeight": "500" }],
        "display-sm": ["40px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "label-md": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "headline-lg": ["32px", { "lineHeight": "1.3", "fontWeight": "700" }],
        "headline-lg-mobile": ["24px", { "lineHeight": "1.3", "fontWeight": "700" }],
        "display-lg": ["56px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
