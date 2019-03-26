const issueAdapter = (function() {
  const API_URL = 'http://localhost:3000/api/v1/issues';

  return {
    fetch: function() {
      return fetch(API_URL)
      .then(response => response.json());
    },
    create: function(params) {
      return fetch(
        `${API_URL}`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(params)
        }
      )
      .then(res => {
        if(res.ok) {
          return res.json()
        }

        throw "Something went wrong!!!!"
      })
    },
    upvote: function(params) {
      return fetch(
        `${API_URL}/${params.id}/upvote`,
      ).then(response => response.json())
    }
  }
})();
