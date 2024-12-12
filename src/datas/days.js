const days = Array.from({ length: 24 }, (_, index) => ({
    day: index + 1,
    isOpen: false,
  }));
  
  export default days;