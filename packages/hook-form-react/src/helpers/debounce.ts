// Define a debounce function
const debounce = (
  func: (...args: unknown[]) => void,
  delay: number
): ((...args: unknown[]) => void) => {
  // Declare a variable to hold the timer ID
  let debounceTimer: NodeJS.Timeout;

  // Return a function that will be called every time the debounced function is invoked
  return function (...args: unknown[]) {
    // Save the context (this) and arguments of the function call
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    // If the debounced function is invoked again before the delay has passed, clear the timer
    clearTimeout(debounceTimer);

    // Set a new timer. When the delay has passed, the original function will be invoked with the saved context and arguments
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default debounce;
