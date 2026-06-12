const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: sans-serif;
    }
    .wrapper {
      display: inline-flex;
      border: 1px solid #ccc;
      border-radius: 6px;
      overflow: hidden;
    }
    input {
      width: 60px;
      padding: 4px 8px;
      border: none;
      outline: none;
      text-align: center;
      font-size: 1rem;
      /* -moz-appearance evita flechitas nativas del number input */
      -moz-appearance: textfield;
    }
    input::-webkit-inner-spin-button { -webkit-appearance: none; }
    button {
      width: 32px;
      background: #f0f0f0;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
    }
    button:hover { background: #e0e0e0; }
  </style>

  <slot></slot>          <!-- aquí cae el texto "Number:" del HTML -->

  <div class="wrapper">
    <button class="dec">−</button>
    <input type="number" />
    <button class="inc">+</button>
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
    const dec   = this.shadowRoot.querySelector('.dec');
    const inc   = this.shadowRoot.querySelector('.inc');

    input.value = this.getAttribute('value') ?? 0;

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
    }
  }

  _dispatch(value) {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: Number(value) },
      bubbles: true,
      composed: true  
    }));
  }
}

customElements.define('campo-numerico', CampoNumerico);