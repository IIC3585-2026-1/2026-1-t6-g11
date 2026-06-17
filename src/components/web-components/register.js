// Punto único de registro. Importar SOLO desde un <script> de Astro
// (es decir, en el navegador), nunca en el frontmatter de una página,
// porque estos archivos llaman a customElements.define() y extienden
// HTMLElement: en el servidor esos globales no existen y reventaría.
import './campo-numerico.js';
import './mi-slider.js';
import './mi-switch.js';
import './mi-breadcrumb.js';
import './mi-accordion.js';
import './mi-card.js';
import './mi-horizontal-scroll.js';
