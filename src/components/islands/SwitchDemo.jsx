import { useEffect, useRef, useState } from 'react';

// React es el caso "incómodo" con eventos custom: no existe un onChange
// que mapee a un CustomEvent('change'). El patrón confiable es ref +
// addEventListener. (Esto es justo lo que vale la pena documentar.)
export default function SwitchDemo() {
  const ref = useRef(null);
  const [estado, setEstado] = useState('Off');

  useEffect(() => {
    const el = ref.current;
    const onChange = (e) => setEstado(e.detail.checked ? 'On' : 'Off');
    el.addEventListener('change', onChange);
    return () => el.removeEventListener('change', onChange);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <mi-switch ref={ref}>
        <span slot="checked-message">On</span>
        <span slot="unchecked-message">Off</span>
        <label>Captions:</label>
      </mi-switch>
      <code style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>
        React lee: {estado}
      </code>
    </div>
  );
}
