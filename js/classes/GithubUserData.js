export class GithubUserData {
  static search (username){
    const request = `https://api.github.com/users/${username}`;
    return fetch(request).then(data => data.json())
    .then(({login, name,public_repos,followers}) => ({login, name,public_repos,followers}));   
  }
}