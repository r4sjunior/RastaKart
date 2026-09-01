/** Minimal DOM helpers. No framework, no per-frame allocation. */

export function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

export function add(parent, tag, cls, html) {
  const n = el(tag, cls, html);
  parent.appendChild(n);
  return n;
}

/** Writes textContent only when it actually changed (avoids layout churn). */
export function setText(node, value) {
  const s = String(value);
  if (node._rkText === s) return false;
  node._rkText = s;
  node.textContent = s;
  return true;
}

/** Toggles a class only on change. */
export function setClass(node, cls, on) {
  const key = '_rkC_' + cls;
  if (node[key] === !!on) return false;
  node[key] = !!on;
  node.classList.toggle(cls, !!on);
  return true;
}

/** Sets a CSS custom property only on change. */
export function setVar(node, name, value) {
  const key = '_rkV_' + name;
  const s = String(value);
  if (node[key] === s) return false;
  node[key] = s;
  node.style.setProperty(name, s);
  return true;
}

/** Restarts a CSS keyframe animation on `node` by re-adding `cls`. */
export function replay(node, cls) {
  node.classList.remove(cls);
  void node.offsetWidth;          // force reflow so the animation restarts
  node.classList.add(cls);
}
