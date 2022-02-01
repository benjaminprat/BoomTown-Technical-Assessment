let repos;

repos = fetch('https://api.github.com/orgs/BoomTownROI/repos')
  .then((data) => data.json())
  .then((data) => data)
  .catch((error) => console.log('Sorry, there is an error loading the repos'));

console.log(repos);
