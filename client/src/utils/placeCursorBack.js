export const placeCursorBack = (e) => {
  const caret = e.target.selectionStart;
  const element = e.target;
  window.requestAnimationFrame(() => {
    element.selectionStart = caret;
    element.selectionEnd = caret;
  });
};
