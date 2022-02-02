var repoIdsDiv = document.querySelector('.repos-id-div');
var eventIdsDiv = document.querySelector('.events-id-div');
var hooksIdsDiv = document.querySelector('.hooks-id-div');

let reposData;
let eventsData;
let hooksData;

reposData = fetch('https://api.github.com/orgs/BoomTownROI/repos')
  .then((data) => data.json())
  .then((data) => data)
  .catch((error) => console.log(error.message));

eventsData = fetch('https://api.github.com/orgs/BoomTownROI/events')
  .then((data) => data.json())
  .then((data) => data)
  .catch((error) => console.log(error.message));

hooksData = fetch('https://api.github.com/orgs/BoomTownROI/hooks')
  .then((data) => data.json())
  .then((data) => data.message)
  .catch((error) => console.log(error.message));

console.log(reposData);

Promise.all([reposData, eventsData, hooksData])
  .then((data) => {
    reposData = data;
    eventsData = data;
    hooksData = data;
  })
  .then(() => {
    displayReposIds(reposData);
    displayEventsIds(eventsData);
    displayHooksErrorMessage(hooksData);
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
  eventIdsDiv.innerHTML = events[1].map((event) => {
    return `
    <section class="single-event">
      <p>Event ID: ${event.id}<p>
      </section>`;
  });
};

const displayHooksErrorMessage = (hooks) => {
  if (hooks[2] === 'Not Found') {
    hooksIdsDiv.innerHTML = `<section class="single-hook">
        <p>No Hooks Found<p>
      </section>`;
    console.log(hooks[2]);
  } else {
    hooksIdsDiv.innerHTML = hooks[2].map((hook) => {
      return `
      <section class="single-event">
        <p>Hook ID: ${hook.id}<p>
      </section>`;
    });
  }
};
