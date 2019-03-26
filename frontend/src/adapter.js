const adapter = (function() {
  const API_URL = 'http://localhost:3000/api/v1/issues';

  return {
    fetchIssues: function() {
      return fetch(API_URL)
        .then(response => response.json());
    },
    fetchIssue: function(issueId) {
      return fetch(`${API_URL}/${issueId}`)
        .then(response => response.json());
    },
    createIssue: function(params) {
      return fetch(API_URL, {
          method: 'POST',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(params)
      })
        .then(response => {
          if(response.ok) {
            return response.json();
          }

          throw "Something went wrong!!!!";
        });
    },
    upvoteIssue: function(issueId) {
      return fetch(`${API_URL}/${issueId}/upvote`).then(response => response.json());
    },
    downvoteIssue: function(issueId) {
      return fetch(`${API_URL}/${issueId}/downvote`).then(response => response.json());
    }
  }
})();
