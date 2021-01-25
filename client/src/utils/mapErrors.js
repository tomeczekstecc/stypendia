export const mapErrors = (object) => {
  if (!object) return;
  const errors = [];
  for (const [key, value] of Object.entries(object)) {
    errors.push(value);
  }

  return errors;
};
