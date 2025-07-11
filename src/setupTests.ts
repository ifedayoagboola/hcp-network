// Jest setup file for basic testing

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock ResizeObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock canvas for graph rendering
HTMLCanvasElement.prototype.getContext = function() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({ data: new Array(4) }),
    putImageData: () => {},
    createImageData: () => ({ data: new Array(4) }),
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => ({ width: 0 }),
    transform: () => {},
    rect: () => {},
    clip: () => {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
};

// Mock Image for avatar loading
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).Image = class MockImage {
  src = '';
  onload = () => {};
  onerror = () => {};
}; 