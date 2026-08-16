import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { MOBILE_CSS } from './mobile.css.ts'

/** Required services (cordis fiber inject). None: only the base ctx.effect is used. */
export const inject: string[] = []

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
export function apply(ctx: ClientContext): void {
  ctx.effect(() => {
    const tag = document.createElement('style')
    tag.dataset.plugin = 'openslow'
    tag.dataset.pluginCss = 'openslow/mobile.css'
    tag.textContent = MOBILE_CSS
    document.head.appendChild(tag)
    return () => {
      tag.remove()
    }
  }, 'openslow: styles')

  setupDetailsDrawer()
}

const FRAME_CLASS = 'pI_x6G_frame'
const DETAILS_CLASS = 'pI_x6G_detailsCol'
const OPEN_CLASS = 'mobile-details-open'

function setupDetailsDrawer(): void {
  let fab: HTMLButtonElement | null = null
  let closeBtn: HTMLButtonElement | null = null

  const ensureFab = (frame: Element): void => {
    if (fab !== null) return
    fab = document.createElement('button')
    fab.type = 'button'
    fab.className = 'dsh-mobile-details-fab'
    fab.setAttribute('aria-label', 'Toggle details panel')
    fab.textContent = '\u22ef' // ⋯
    fab.addEventListener('click', () => frame.classList.toggle(OPEN_CLASS))
    document.body.appendChild(fab)
  }

  const ensureClose = (detailsCol: Element): void => {
    if (closeBtn !== null) return
    closeBtn = document.createElement('button')
    closeBtn.type = 'button'
    closeBtn.className = 'dsh-mobile-details-close'
    closeBtn.setAttribute('aria-label', 'Close details panel')
    closeBtn.textContent = '\u2715' // ✕
    closeBtn.addEventListener('click', () => {
      const frame = detailsCol.closest('.' + FRAME_CLASS)
      if (frame !== null) frame.classList.remove(OPEN_CLASS)
    })
    detailsCol.appendChild(closeBtn)
  }

  const observer = new MutationObserver(() => {
    const frame = document.querySelector('.' + FRAME_CLASS)
    if (frame !== null) {
      ensureFab(frame)
      const detailsCol = frame.querySelector('.' + DETAILS_CLASS)
      if (detailsCol !== null) ensureClose(detailsCol)
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
}
