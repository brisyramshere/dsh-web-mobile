window.__ModuleLoader__.load({ id: "@openslow/dsh-web-mobile", factory: (require) => {
var __modules = {};
__modules["mobile.css.js"] = function (require, module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOBILE_CSS = void 0;
/**
 * Mobile stylesheet, shipped as a TS string so the build inlines it into the
 * client bundle. Targets the CSS-module class names of the current dsh build
 * (VOzbGW_* for the settings dialog, pI_x6G_* for the layout frame); a dsh
 * upgrade may change those hashes and require a matching update here.
 */
exports.MOBILE_CSS = `
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
`;
};
__modules["index.js"] = function (require, module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
exports.apply = apply;
const mobile_css_ts_1 = require("./mobile.css.js");
/** Required services (cordis fiber inject). None: only the base ctx.effect is used. */
exports.inject = [];
/**
 * Mobile-adaptive shell, browser half: injects the mobile stylesheet, then
 * wires the details-panel drawer (floating toggle + close button).
 *
 * The layout plugin's computeColumns() forces the details column to 0px on
 * narrow viewports, so the built-in openDetails() action never shows it. We
 * bypass that by toggling our own class, which the stylesheet turns into a
 * full-screen drawer.
 * @param ctx - client root context.
 */
function apply(ctx) {
    ctx.effect(() => {
        const tag = document.createElement('style');
        tag.dataset.plugin = '@openslow/dsh-web-mobile';
        tag.dataset.pluginCss = '@openslow/dsh-web-mobile/mobile.css';
        tag.textContent = mobile_css_ts_1.MOBILE_CSS;
        document.head.appendChild(tag);
        return () => {
            tag.remove();
        };
    }, 'openslow: styles');
    setupDetailsDrawer();
}
const FRAME_CLASS = 'pI_x6G_frame';
const DETAILS_CLASS = 'pI_x6G_detailsCol';
const OPEN_CLASS = 'mobile-details-open';
function setupDetailsDrawer() {
    let fab = null;
    let closeBtn = null;
    const ensureFab = (frame) => {
        if (fab !== null)
            return;
        fab = document.createElement('button');
        fab.type = 'button';
        fab.className = 'dsh-mobile-details-fab';
        fab.setAttribute('aria-label', 'Toggle details panel');
        fab.textContent = '\u22ef'; // ⋯
        fab.addEventListener('click', () => frame.classList.toggle(OPEN_CLASS));
        document.body.appendChild(fab);
    };
    const ensureClose = (detailsCol) => {
        if (closeBtn !== null)
            return;
        closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'dsh-mobile-details-close';
        closeBtn.setAttribute('aria-label', 'Close details panel');
        closeBtn.textContent = '\u2715'; // ✕
        closeBtn.addEventListener('click', () => {
            const frame = detailsCol.closest('.' + FRAME_CLASS);
            if (frame !== null)
                frame.classList.remove(OPEN_CLASS);
        });
        detailsCol.appendChild(closeBtn);
    };
    const observer = new MutationObserver(() => {
        const frame = document.querySelector('.' + FRAME_CLASS);
        if (frame !== null) {
            ensureFab(frame);
            const detailsCol = frame.querySelector('.' + DETAILS_CLASS);
            if (detailsCol !== null)
                ensureClose(detailsCol);
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
};
var __cache = {};
function __localRequire(id) {
  if (id.charCodeAt(0) !== 46) return require(id);
  id = id.slice(2);
  var cached = __cache[id];
  if (cached) return cached.exports;
  var module = { exports: {} };
  __cache[id] = module;
  __modules[id](__localRequire, module, module.exports);
  return module.exports;
}
var module = { exports: {} };
__modules["index.js"](__localRequire, module, module.exports);
return module.exports; } });
