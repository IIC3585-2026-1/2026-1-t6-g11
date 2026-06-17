const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: sans-serif;
      font-size: 0.875rem;
      cursor: pointer;
      user-select: none;
    }
    .track {
      position: relative;
      width: 44px;
      height: 24px;
      background: #ccc;
      border-radius: 12px;
      transition: background 0.2s;
      flex-shrink: 0;
    }
    :host([checked]) .track {
      background: #333;
    }
    .thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.2s;
    }
    :host([checked]) .thumb {
      transform: translateX(20px);
    }
    .message {
      font-size: 0.8rem;
      color: #666;
      min-width: 28px;
    }
  </style>

  <slot></slot>
  <div class="track">
    <div class="thumb"></div>
  </div>
  <span class="message" id="msg"></span>
`;

class MiSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const track = this.shadowRoot.querySelector('.track');

    this._updateMessage();

    track.addEventListener('click', () => {
      this.toggleAttribute('checked');
      this._updateMessage();
      this.dispatchEvent(new CustomEvent('change', {
        detail: { checked: this.hasAttribute('checked') },
        bubbles: true,
        composed: true,
      }));
    });
  }

  static get observedAttributes() {
    return ['checked'];
  }

  attributeChangedCallback() {
    this._updateMessage();
  }

  _updateMessage() {
    const msg = this.shadowRoot?.querySelector('#msg');
    if (!msg) return;
    const on = this.hasAttribute('checked');
    const checkedSlot   = this.querySelector('[slot="checked-message"]');
    const uncheckedSlot = this.querySelector('[slot="unchecked-message"]');
    msg.textContent = on
      ? (checkedSlot?.textContent   ?? 'On')
      : (uncheckedSlot?.textContent ?? 'Off');
  }
}

customElements.define('mi-switch', MiSwitch);