import { html, LitElement } from 'lit'
import './ui-icon.ts'

export interface TransportState {
  hasPrevSet: boolean
  hasPrevRep: boolean
  hasNextRep: boolean
  hasNextSet: boolean
  isRunning: boolean
  isPaused: boolean
  isComplete: boolean
  hasTimer: boolean
}

export interface TransportCallbacks {
  prevSet: () => void
  prevRep: () => void
  toggleStart: () => void
  nextRep: () => void
  nextSet: () => void
}

export class Transport extends LitElement {
  static override properties = {
    state: { attribute: false },
    callbacks: { attribute: false },
  }

  state: TransportState = {
    hasPrevSet: false,
    hasPrevRep: false,
    hasNextRep: false,
    hasNextSet: false,
    isRunning: false,
    isPaused: false,
    isComplete: false,
    hasTimer: false,
  }

  callbacks: TransportCallbacks = {
    prevSet: () => {},
    prevRep: () => {},
    toggleStart: () => {},
    nextRep: () => {},
    nextSet: () => {},
  }

  override createRenderRoot() {
    return this
  }

  override render() {
    const { state, callbacks } = this

    return html`
      <div class="transport-controls">
        <button
          class="transport-btn"
          ?disabled="${!state.hasPrevSet}"
          @click="${callbacks.prevSet}"
          aria-label="Previous Set"
        >
          <ui-icon
            name="skip-back"
            text="SET"
            display="both"
            style="font-size: 24px;"
          ></ui-icon>
        </button>

        <button
          class="transport-btn"
          ?disabled="${!state.hasPrevRep}"
          @click="${callbacks.prevRep}"
          aria-label="Previous Rep"
        >
          <ui-icon
            name="rewind"
            text="REP"
            display="both"
            style="font-size: 24px;"
          ></ui-icon>
        </button>

        <button
          class="transport-btn play-btn"
          @click="${callbacks.toggleStart}"
          ?disabled="${!state.hasTimer || state.isComplete}"
          aria-label="${(state.isPaused || !state.isRunning)
            ? 'Play'
            : 'Pause'}"
        >
          <ui-icon
            name="${(state.isPaused || !state.isRunning) ? 'play' : 'pause'}"
            style="font-size: 24px;"
          ></ui-icon>
        </button>

        <button
          class="transport-btn"
          ?disabled="${!state.hasNextRep}"
          @click="${callbacks.nextRep}"
          aria-label="Next Rep"
        >
          <ui-icon
            name="fast-forward"
            text="REP"
            display="both"
            style="font-size: 24px;"
          ></ui-icon>
        </button>

        <button
          class="transport-btn"
          ?disabled="${!state.hasNextSet}"
          @click="${callbacks.nextSet}"
          aria-label="Next Set"
        >
          <ui-icon
            name="skip-forward"
            text="SET"
            display="both"
            style="font-size: 24px;"
          ></ui-icon>
        </button>
      </div>
    `
  }
}

if (!customElements.get('ui-transport')) {
  customElements.define('ui-transport', Transport)
}

declare global {
  interface HTMLElementTagNameMap {
    'transport': Transport
  }
}
