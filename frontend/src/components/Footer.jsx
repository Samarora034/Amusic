import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-surface-dim border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-8 gap-4 mt-auto">
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className="font-display-sm text-[28px] text-primary">Amusic</span>
        <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024. Built with too much chai & late nights in India.</p>
      </div>
      <nav className="flex flex-wrap justify-center gap-6">
        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-200 hover:-translate-y-[1px]" href="mailto:contact@amusic.app">Say Hi 👋</a>
        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-200 hover:-translate-y-[1px]" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
      </nav>
    </footer>
  );
}

export default Footer;
