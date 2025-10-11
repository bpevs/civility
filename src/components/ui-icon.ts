import { css, html, LitElement } from 'lit'

/**
 * A component for displaying SVG icons.
 *
 * @element ui-icon
 *
 * @slot - Not used, icons are loaded from /static/icons/{name}.svg
 *
 * @cssproperty --ui-icon-color - The color of the icon (defaults to currentColor)
 *
 * @example
 * ```html
 * <ui-icon name="star" label="Favorite" style="font-size: 1.5em;"></ui-icon>
 * <ui-icon auto-width name="logo"></ui-icon>
 * ```
 */
export class UiIcon extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25em;
      width: 1em;
      height: 1em;
      box-sizing: content-box;
    }

    :host([auto-width]) {
      width: auto;
    }

    :host([display="only-icon"]) {
      flex-direction: row;
    }

    :host([display="only-text"]) {
      width: auto;
      height: auto;
    }

    :host([display="both"]) {
      width: auto;
      height: auto;
    }

    .icon-wrapper {
      display: block;
      width: 100%;
      height: 100%;
    }

    :host([display="only-text"]) .icon-wrapper {
      display: none;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }

    :host([auto-width]) img {
      width: auto;
    }

    .label-text {
      display: none;
      font-size: 0.5em;
      line-height: 1;
    }

    :host([display="only-text"]) .label-text,
    :host([display="both"]) .label-text {
      display: block;
    }
  `

  static override properties = {
    /**
     * The name of the icon to display. This corresponds to the filename
     * in /static/icons/ (without the .svg extension).
     */
    name: { type: String },

    /**
     * The accessible label for the icon. If omitted, the icon will be
     * considered presentational (aria-hidden="true").
     */
    label: { type: String },

    /**
     * The visible text to display with the icon (used with display='both' or 'only-text').
     */
    text: { type: String },

    /**
     * Allow the icon to use its natural width instead of 1em.
     */
    autoWidth: { type: Boolean, reflect: true, attribute: 'auto-width' },

    /**
     * Controls what is displayed: 'only-icon' (default), 'only-text', or 'both'.
     */
    display: { type: String, reflect: true },
  }

  name = ''
  label = ''
  text = ''
  autoWidth = false
  display: 'only-icon' | 'only-text' | 'both' = 'only-icon'

  override render() {
    if (!this.name && this.display !== 'only-text') {
      return html`

      `
    }

    const src = `/static/icons/${this.name}.svg`
    const showIcon = this.display !== 'only-text'
    const showText = this.display !== 'only-icon' && this.text

    // Determine accessibility attributes
    // When showing text visually, hide icon from screen readers
    const hideIconFromScreenReader = showText
    const imgAlt = hideIconFromScreenReader ? '' : (this.label || '')
    const imgAriaHidden = hideIconFromScreenReader ? 'true' : undefined
    const imgRole = !hideIconFromScreenReader && this.label ? 'img' : undefined

    return html`
      ${showIcon
        ? html`
          <div class="icon-wrapper">
            <img
              part="icon"
              src="${src}"
              alt="${imgAlt}"
              aria-hidden="${imgAriaHidden}"
              role="${imgRole}"
            />
          </div>
        `
        : ''} ${showText
        ? html`
          <span class="label-text" part="text" aria-hidden="true">${this
            .text}</span>
        `
        : ''}
    `
  }
}

if (!customElements.get('ui-icon')) {
  customElements.define('ui-icon', UiIcon)
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-icon': UiIcon
  }
}
