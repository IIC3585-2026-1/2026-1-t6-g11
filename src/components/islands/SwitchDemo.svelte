<script>
  import { onMount } from 'svelte';

  // En Svelte uso bind:this + addEventListener: es el patrón que funciona
  // igual en Svelte 4 y 5 para eventos custom de un custom element.
  // (Svelte 5 también acepta `onchange={...}` como azúcar.)
  let el;
  let estado = 'Off';

  onMount(() => {
    const onChange = (e) => (estado = e.detail.checked ? 'On' : 'Off');
    el.addEventListener('change', onChange);
    return () => el.removeEventListener('change', onChange);
  });
</script>

<div style="display:flex; align-items:center; gap:16px">
  <mi-switch bind:this={el}>
    <span slot="checked-message">On</span>
    <span slot="unchecked-message">Off</span>
    <label>Captions:</label>
  </mi-switch>
  <code style="font-family: ui-monospace, monospace; font-size:13px">
    Svelte lee: {estado}
  </code>
</div>
