const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
    }
    .scroll-track {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding: 8px 2px 12px;
      /* scrollbar visible pero discreta */
      scrollbar-width: thin;
      scrollbar-color: #aaa #f0f0f0;
    }
    .scroll-track::-webkit-scrollbar {
      height: 6px;
    }
    .scroll-track::-webkit-scrollbar-track {
      background: #f0f0f0;
      border-radius: 3px;
    }
    .scroll-track::-webkit-scrollbar-thumb {
      background: #aaa;
      border-radius: 3px;
    }
    /* Evitar que los hijos se encojan */
    ::slotted(*) {
      flex-shrink: 0;
    }
  </style>
  <div class="scroll-track">
    <slot></slot>
  </div>
`;

class MiHorizontalScroll extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('mi-horizontal-scroll', MiHorizontalScroll);
