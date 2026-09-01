/** Minimal synchronous event bus shared by every system. */
export class EventBus {
  #map = new Map();

  on(type, fn) {
    if (!this.#map.has(type)) this.#map.set(type, new Set());
    this.#map.get(type).add(fn);
    return () => this.off(type, fn);
  }

  once(type, fn) {
    const off = this.on(type, (...a) => { off(); fn(...a); });
    return off;
  }

  off(type, fn) { this.#map.get(type)?.delete(fn); }

  emit(type, payload) {
    const set = this.#map.get(type);
    if (!set) return;
    for (const fn of [...set]) {
      try { fn(payload); }
      catch (err) { console.error(`[EventBus] "${type}" handler failed`, err); }
    }
  }

  clear() { this.#map.clear(); }
}
