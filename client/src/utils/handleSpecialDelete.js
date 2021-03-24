export const handleSpecialDelete = (e, curDocument) =>{
  //https://github.com/telerik/kendo-react/issues/327
  if (
    (e.keyCode === 8 || e.keyCode === 46) &&
    (e.target.innerText.length === 0 || e.target.value.length === 0)
  ) {
    curDocument[e.target.offsetParent.dataset.name] = null;

  }
}