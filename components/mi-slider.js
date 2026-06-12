class MiSliderLabel extends HTMLElement {}
customElements.define('mi-slider-label', MiSliderLabel);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      padding-bottom: 28px;
    }
    .value-bubble {
      display: inline-block;
      background: #333;
      color: #fff;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      margin-bottom: 8px;
      font-family: monospace;
    }
    .track-wrapper {
      position: relative;
      padding-bottom: 24px;
    }
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: #ddd;
      outline: none;
      cursor: pointer;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #333;
      cursor: pointer;
      transition: transform 0.1s;
    }
    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }
    .labels-container {
      position: absolute;
      top: 18px;
      left: 0;
      right: 0;
    }
    .label-item {
      position: absolute;
      transform: translateX(-50%);
      font-size: 11px;
      color: #666;
      font-family: monospace;
      white-space: nowrap;
    }
  </style>

  <div class="value-bubble" id="bubble">—</div>
  <div class="track-wrapper">
    <input type="range" id="range" />
    <div class="labels-container" id="labels"></div>
  </div>
`;

class MiSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const range  = this.shadowRoot.querySelector('#range');
    const bubble = this.shadowRoot.querySelector('#bubble');
    const labelsCont = this.shadowRoot.querySelector('#labels');

    range.min   = this.getAttribute('min')   ?? 0;
    range.max   = this.getAttribute('max')   ?? 100;
    range.value = this.getAttribute('value') ?? 50;
    range.step  = this.getAttribute('step')  ?? 1;

    const update = () => {
      bubble.textContent = range.value;
      this._dispatch(range.value);
    };

    range.addEventListener('input', update);
    update();


    this.querySelectorAll('mi-slider-label').forEach(el => {
      const pos  = el.hasAttribute('position') ? el.getAttribute('position') : '0';
      const span = document.createElement('span');
      span.className   = 'label-item';
      span.textContent = el.textContent.trim();
      span.style.left  = `${pos}%`;
      labelsCont.appendChild(span);
    });
  }

  _dispatch(value) {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: Number(value) },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('mi-slider', MiSlider);
