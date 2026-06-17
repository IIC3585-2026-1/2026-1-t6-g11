const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      /*
        CSS custom properties son el único canal que cruza el shadow boundary.
        Se definen desde afuera con --card-width y --card-height,
        y se consumen aquí con var().
      */
      width:  var(--card-width,  120px);
      height: var(--card-height, 120px);
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: sans-serif;
      font-size: 0.8rem;
      color: #555;
      padding: 12px;
      text-align: center;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    :host(:hover) {
      border-color: #999;
    }
  </style>
  <slot></slot>
`;

class MiCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('mi-card', MiCard);
