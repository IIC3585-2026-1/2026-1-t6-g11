const templateBreadcrumb = document.createElement('template');
templateBreadcrumb.innerHTML = `
  <style>
    :host {
      display: block;
    }
    nav ol {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
      font-family: sans-serif;
      font-size: 0.875rem;
    }
  </style>
  <nav aria-label="breadcrumb">
    <ol><slot></slot></ol>
  </nav>
`;

class MiBreadcrumb extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateBreadcrumb.content.cloneNode(true));
  }
}

customElements.define('mi-breadcrumb', MiBreadcrumb);

const templateItem = document.createElement('template');
templateItem.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      align-items: center;
      font-family: sans-serif;
      font-size: 0.875rem;
    }
    :host(:not(:last-of-type))::after {
      content: '/';
      margin: 0 8px;
      color: #aaa;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    span.current {
      color: #666;
    }
  </style>
  <slot></slot>
`;

class MiBreadcrumbItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateItem.content.cloneNode(true));
  }

  connectedCallback() {
    const href = this.getAttribute('href');
    const slot = this.shadowRoot.querySelector('slot');

    if (href) {
      const a = document.createElement('a');
      a.href = href;
      slot.replaceWith(a);
      a.appendChild(slot);
    } else {
      const span = document.createElement('span');
      span.className = 'current';
      slot.replaceWith(span);
      span.appendChild(slot);
    }
  }
}

customElements.define('mi-breadcrumb-item', MiBreadcrumbItem);
