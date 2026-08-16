import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
/** Required services (cordis fiber inject). None: only the base ctx.effect is used. */
export declare const inject: string[];
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
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map