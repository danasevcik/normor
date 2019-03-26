const adapter = (function() {
  const API_URL = 'http://localhost:3000/api/v1/issues';
  const API_URL_COMMENTS = 'http://localhost:3000/api/v1/comments';
  const API_URL_CATEGORIES = 'http://localhost:3000/api/v1/categories';

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
      return fetch(`${API_URL}/${issueId}/upvoteissue`).then(response => response.json());
    },
    downvoteIssue: function(issueId) {
      return fetch(`${API_URL}/${issueId}/downvoteissue`).then(response => response.json());
    },
    upvoteComment: function(commentId) {
      return fetch(`${API_URL_COMMENTS}/${commentId}/upvotecomment`).then(response => response.json());
    },
    downvoteComment: function(commentId) {
      return fetch(`${API_URL_COMMENTS}/${commentId}/downvotecomment`).then(response => response.json());
    },
    fetchCategories: function() {
      return fetch(API_URL_CATEGORIES)
        .then(response => response.json());
    },
    createComment: function(params) {
      return fetch(API_URL_COMMENTS, {
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
    }
  }
})();
