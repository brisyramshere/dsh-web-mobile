/**
 * Mobile stylesheet, shipped as a TS string so the build inlines it into the
 * client bundle. Targets the CSS-module class names of the current dsh build
 * (VOzbGW_* for the settings dialog, pI_x6G_* for the layout frame); a dsh
 * upgrade may change those hashes and require a matching update here.
 */
export const MOBILE_CSS = `
/* ── Settings dialog: full-screen sheet on mobile ── */
@media (max-width: 768px) {
  .VOzbGW_panel {
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    max-width: 100vw !important;
    max-height: 100vh !important;
    max-height: 100dvh !important;
    border-radius: 0 !important;
    flex-direction: column !important;
    padding-top: env(safe-area-inset-top) !important;
    padding-bottom: env(safe-area-inset-bottom) !important;
  }
  .VOzbGW_nav {
    width: 100% !important;
    flex: none !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 8px 12px !important;
    border-bottom: 1px solid var(--dsw-alias-border-l1, rgb(0 0 0 / 8%)) !important;
    overflow-x: auto !important;
  }
  .VOzbGW_navTitle { flex: none !important; padding: 0 4px !important; }
  .VOzbGW_navList { flex: 1 !important; flex-direction: row !important; gap: 4px !important; min-width: 0 !important; }
  .VOzbGW_navCell { flex: none !important; height: 36px !important; padding: 6px 12px !important; white-space: nowrap !important; }
  .VOzbGW_content { flex: 1 !important; min-width: 0 !important; min-height: 0 !important; }
}

/* ── Details panel: full-screen drawer on mobile ── */
@media (max-width: 768px) {
  .pI_x6G_detailsCol {
    position: fixed !important;
    top: 0; right: 0; bottom: 0; left: 0;
    width: 100vw !important;
    z-index: 900;
    transform: translateX(100%);
    transition: transform 0.25s ease;
    background: var(--dsw-alias-bg-base, #f9fafb);
    border-left: none !important;
  }
  .pI_x6G_frame.mobile-details-open .pI_x6G_detailsCol {
    transform: translateX(0);
  }
}

/* ── General mobile: prevent iOS auto-zoom on input focus ── */
@media (max-width: 768px) {
  input, textarea, select { font-size: 16px !important; }
}

/* ── Details drawer FAB + close button ── */
.dsh-mobile-details-fab {
  display: none;
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 950;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--dsw-alias-brand-primary, #3964fe);
  color: #fff;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
}
.dsh-mobile-details-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--dsw-alias-bg-layer-2, #fff);
  color: var(--dsw-alias-label-primary, #0f1115);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
}
@media (max-width: 768px) {
  .dsh-mobile-details-fab { display: block; }
}
`
