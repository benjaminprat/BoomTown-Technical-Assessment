var repoIdsDiv = document.querySelector('.repos-id-div');

let reposData;
let eventsData;

reposData = fetch('https://api.github.com/orgs/BoomTownROI/repos')
  .then((data) => data.json())
  .then((data) => data)
  .catch((error) => console.log(error.message));

eventsData = fetch('https://api.github.com/orgs/BoomTownROI/events')
  .then((data) => data.json())
  .then((data) => data)
  .catch((error) => console.log(error.message));

console.log(reposData);

Promise.all([reposData, eventsData])
  .then((data) => {
    reposData = data;
    eventsData = data;
  })
  .then(() => {
    // eslint-disable-next-line no-undef
    displayReposIds(reposData);
    displayEventsIds(eventsData);
  })
  .catch((error) => {
    console.log(error.message);
  });

const displayReposIds = (repos) => {
  repoIdsDiv.innerHTML = repos[0].map((repo) => {
    return `
    <section class="single-repo">
    <p>Repo ID: ${repo.id}<p>
    </section>`;
  });
};

const displayEventsIds = (events) => {
  console.log(events[1], 'events');
};
