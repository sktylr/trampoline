const destinationStore = (() => {
  const key = 'trampoline:destination';

  return {
    getDestination() {
      return localStorage.getItem(key);
    },
    setDestination(value) {
      localStorage.setItem(key, value);
    }
  };
})();
