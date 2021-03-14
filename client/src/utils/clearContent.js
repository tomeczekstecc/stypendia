export const clearContent = (parent, name, curDocument) => {
  if (parent && name) {
    if (curDocument && curDocument[parent] && curDocument[parent] === true) {
      curDocument[name] = '';
    }
  }
};
