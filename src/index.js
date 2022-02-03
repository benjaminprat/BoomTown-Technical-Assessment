//Select elements from HTML and assign as variables

var loadDataBtn = document.querySelector('.load-data-btn');
var verifyDatesBtn = document.querySelector('.verify-dates-btn');
var compareLengthBtn = document.querySelector('.compare-length-btn');

// Notififying the DOM of click event which invokes clickHandler
loadDataBtn.addEventListener('click', (event) => {
  handleClick(event);
});
verifyDatesBtn.addEventListener('click', (event) => {
  handleClick(event);
});

compareLengthBtn.addEventListener('click', (event) => {
  handleClick(event);
});

//Functions invoked dynamically depending on particular button clicked
const handleClick = (event) => {
  event.preventDefault();

  if (event.target.classList.contains('load-data-btn')) {
    loadAllData();
  } else if (event.target.classList.contains('verify-dates-btn')) {
    verifyDates();
  } else if (event.target.classList.contains('compare-length-btn')) {
    allRepositoryData();
  }
};

//Helper function to fetch and display data and error messages
const loadAllData = () => {
  displayReposIds();
  displayEventsIds();
  displayHooksErrorMessage();
  displayIssuesErrorMessage();
  displayMembersErrorMessage();
  displayPublicMembersErrorMessage();
};

//Reusable function to parse data or throws error if fetch fails
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Fetch for ${url} failed`);
  }
};

//Displays repository id's after fetch
const displayReposIds = async () => {
  const repoIdsDiv = document.querySelector('.repos-id-div');
  let reposData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/repos'
  );

  repoIdsDiv.innerHTML = reposData
    .map((repo) => {
      return `
      <section class="single">
        <p>Repo ID: ${repo.id}</p>
      </section>`;
    })
    .join('');
};

//Displays event id's after fetch.
const displayEventsIds = async () => {
  const eventIdsDiv = document.querySelector('.events-id-div');
  let eventsData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/events'
  );

  eventIdsDiv.innerHTML = eventsData
    .map((event) => {
      return `
    <section class="single">
      <p>Event ID: ${event.id}</p>
      </section>`;
    })
    .join('');
};

//Displays hooks error message after fetch.
const displayHooksErrorMessage = async () => {
  const hooksIdsDiv = document.querySelector('.hooks-id-div');
  let hooksData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/hooks'
  );

  if (hooksData.message === 'Not Found') {
    hooksIdsDiv.innerHTML = `<section class="single">
        <p>No Hooks Found</p>
      </section>`;
  } else {
    hooksIdsDiv.innerHTML = hooksData.map((hook) => {
      return `
      <section class="single">
        <p>Hook ID: ${hook.id}</p>
      </section>`;
    });
  }
};

//Displays issues error after fetch.
const displayIssuesErrorMessage = async () => {
  const issuesIdsDiv = document.querySelector('.issues-id-div');

  let issuesData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/issues'
  );

  if (issuesData.message === 'Not Found') {
    issuesIdsDiv.innerHTML = `<section class="single">
        <p>No Issues Found</p>
      </section>`;
  } else {
    issuesIdsDiv.innerHTML = issuesData.map((issue) => {
      return `
      <section class="individual-issue">
        <p>Issue ID: ${issue.id}</p>
      </section>`;
    });
  }
};

//Displays members error after fetch.
const displayMembersErrorMessage = async () => {
  const membersIdsDiv = document.querySelector('.members-id-div');
  let membersData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/members{/member}'
  );

  if (membersData.message === 'Not Found') {
    membersIdsDiv.innerHTML = `<section class="individual-member">
       <p>No Members Found</p>
     </section>`;
  } else {
    membersIdsDiv.innerHTML = membersData.map((member) => {
      return `
     <section class="individual-member">
       <p>Member ID: ${member.id}</p>
     </section>`;
    });
  }
};

//Displays public members error after fetch
const displayPublicMembersErrorMessage = async () => {
  const publicMembersIdsDiv = document.querySelector('.public-members-id-div');
  let publicMembersData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/public_members{/member}'
  );

  if (publicMembersData.message === 'Not Found') {
    publicMembersIdsDiv.innerHTML = `<section class="single">
       <p>No Public Members Found</p>
     </section>`;
  } else {
    publicMembersIdsDiv.innerHTML = publicMembersData.map((member) => {
      return `
     <section class="single">
       <p>Public Member ID: ${member.id}</p>
     </section>`;
    });
  }
};

const verifyDates = async () => {
  const verifyResultDiv = document.querySelector('.verify-result-div');
  let topLevelData = await fetchData('https://api.github.com/orgs/BoomTownROI');

  // Selects given date from top level
  let originalCreationDate = await topLevelData.created_at;
  let originalUpdateDate = await topLevelData.updated_at;

  //Converts original date for comparison
  let newCreationDate = new Date(originalCreationDate);
  let newUpdateDate = new Date(originalUpdateDate);

  //Compares dates and displays results
  if (newCreationDate < newUpdateDate) {
    verifyResultDiv.innerHTML = `Updated date is more recent than created date.
  `;
  } else {
    verifyResultDiv.innerHTML = `Updated date is less recent than created date.`;
  }
};

const allRepositoryData = async () => {
  //Top level object
  const publicRepos = await fetchData(
    'https://api.github.com/orgs/BoomTownROI'
  );

  //The api returns 30 objects per call for repos so we need to know number of pages
  let cycleRequirement = Math.ceil(publicRepos.public_repos / 30);
  let repoCount = 0;

  //Iterate over /repos with cycleRequirement as baseline for i
  for (i = 1; i <= cycleRequirement; i++) {
    repoCount += await iterateRepos(i);
  }

  //Helper function invocation(total repo objects,public repos value(integer))
  compareRepoLength(repoCount, publicRepos.public_repos);
};

const iterateRepos = async (i) => {
  let data = await fetchData(
    `https://api.github.com/orgs/BoomTownROI/repos?page=${i}`
  );
  //Number of objects from fetch of each page.
  return data.length;
};

const compareRepoLength = async (reposLength, publicRepos) => {
  const resultsDiv = document.querySelector('.length-result-div');

  if (reposLength === publicRepos) {
    resultsDiv.innerHTML = ` Repositories are the same length.`;
  } else {
    resultsDiv.innerHTML = ` Repositories are NOT the same length.`;
  }
};
