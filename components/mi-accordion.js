const templateAccordion = document.createElement('template');
templateAccordion.innerHTML = `
  <style>
    :host {
      display: block;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      font-family: sans-serif;
    }
    ::slotted(mi-accordion-item:not(:last-child)) {
      border-bottom: 1px solid #ddd;
    }
  </style>
  <slot></slot>
`;

class MiAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateAccordion.content.cloneNode(true));
  }
}

customElements.define('mi-accordion', MiAccordion);

const templateItem = document.createElement('template');
templateItem.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: sans-serif;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 16px;
      cursor: pointer;
      background: #fafafa;
      user-select: none;
      transition: background 0.15s;
    }
    .header:hover {
      background: #f0f0f0;
    }
    .header-title {
      font-size: 0.875rem;
      font-weight: 500;
    }
    .icon {
      width: 20px;
      height: 20px;
      color: #555;
      transition: transform 0.25s ease;
      flex-shrink: 0;
    }
    :host([open]) .icon {
      transform: rotate(180deg);
    }
    .body {
      max-height: 0;
      overflow: hidden;
      background: #fff;
      font-size: 0.85rem;
      color: #444;
      line-height: 1.6;
      transition: max-height 0.3s ease, padding 0.3s ease;
    }
    :host([open]) .body {
      max-height: 400px;
      padding: 14px 16px;
    }
  </style>

  <div class="header" id="header">
    <span class="header-title"><slot name="heading"></slot></span>
    <svg class="icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="5 8 10 13 15 8"/>
    </svg>
  </div>
  <div class="body">
    <slot></slot>
  </div>
`;

class MiAccordionItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateItem.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#header').addEventListener('click', () => {
      this.toggleAttribute('open');
    });
  }
}

customElements.define('mi-accordion-item', MiAccordionItem);
