const categoryAdapter = (function() {
  const API_URL = 'http://localhost:3000/api/v1/categories';

  return {
    fetch: function() {
      return fetch(API_URL)
      .then(response => response.json());
    }
  }
})();
