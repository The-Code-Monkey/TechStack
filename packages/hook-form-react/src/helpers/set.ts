// This function sets a value at a specific path within an object.
// It takes an object, a path, and a value as parameters.
const set = (object: object, path: string, value: never) => {
  // Split the path into parts.
  const pathParts = path.split('.');
  // Initialize the current object to be the root object.
  let current = object;
  // Iterate over each part in the path except the last one.
  for (let i = 0; i < pathParts.length - 1; i++) {
    // If the current part does not exist in the current object, create an empty object at that path.
    if (!current[pathParts[i]]) {
      current[pathParts[i]] = {};
    }
    // Move the current object to the next part in the path.
    current = current[pathParts[i]];
  }
  // Set the value at the final part of the path in the current object.
  current[pathParts[pathParts.length - 1]] = value;
};

export default set;
