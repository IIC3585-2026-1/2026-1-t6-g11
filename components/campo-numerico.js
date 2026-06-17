const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: sans-serif;
      font-size: 0.875rem;
    }
    .wrapper {
      display: inline-flex;
      border: 1px solid #ccc;
      border-radius: 6px;
      overflow: hidden;
    }
    input[type="number"] {
      width: 64px;
      padding: 6px 8px;
      border: none;
      outline: none;
      text-align: center;
      font-size: 0.875rem;
      -moz-appearance: textfield;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
    button {
      width: 32px;
      height: 34px;
      background: #f0f0f0;
      border: none;
      border-left: 1px solid #ccc;
      cursor: pointer;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    button:first-of-type {
      border-left: none;
      border-right: 1px solid #ccc;
    }
    button:hover { background: #e0e0e0; }
    button:active { background: #d0d0d0; }
  </style>

  <slot></slot>

  <div class="wrapper">
    <button class="btn-dec">−</button>
    <input type="number" />
    <button class="btn-inc">+</button>
  </div>
`;

class CampoNumerico extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const input = this.shadowRoot.querySelector('input');
    const dec   = this.shadowRoot.querySelector('.btn-dec');
    const inc   = this.shadowRoot.querySelector('.btn-inc');

    input.value = this.getAttribute('value') ?? 0;
    input.addEventListener('input', () => {
      this._dispatch(input.value)
    });

    dec.addEventListener('click', () => {
      input.value = Number(input.value) - 1;
      this._dispatch(input.value);
    });

    inc.addEventListener('click', () => {
      input.value = Number(input.value) + 1;
      this._dispatch(input.value);
    });
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'value') {
      const input = this.shadowRoot?.querySelector('input');
      if (input) input.value = newVal;
      this._dispatch(input.value)
    }
  }

  _dispatch(value) {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: Number(value) },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('campo-numerico', CampoNumerico);
