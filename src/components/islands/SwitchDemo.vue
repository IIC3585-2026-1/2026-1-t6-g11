<script setup>
import { ref } from 'vue';

// Vue es el caso "limpio": @change se compila a addEventListener('change'),
// y como en astro.config marcamos mi-switch como custom element, no se queja.
const estado = ref('Off');
function onChange(e) {
  estado.value = e.detail.checked ? 'On' : 'Off';
}
</script>

<template>
  <div style="display:flex; align-items:center; gap:16px">
    <mi-switch @change="onChange">
      <span slot="checked-message">On</span>
      <span slot="unchecked-message">Off</span>
      <label>Captions:</label>
    </mi-switch>
    <code style="font-family: ui-monospace, monospace; font-size:13px">
      Vue lee: {{ estado }}
    </code>
  </div>
</template>
