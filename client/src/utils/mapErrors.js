export const mapErrors = (object) => {
  if (!object) return;
  const errors = [];
  // eslint-disable-next-line no-unused-vars
  for (const [key, value] of Object.entries(object)) {
    errors.push(value);
  }

  return errors;
};
