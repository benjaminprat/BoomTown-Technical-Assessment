var repoIdsDiv = document.querySelector('.repos-id-div');
var eventIdsDiv = document.querySelector('.events-id-div');
var hooksIdsDiv = document.querySelector('.hooks-id-div');
var issuesIdsDiv = document.querySelector('.issues-id-div');
var membersIdsDiv = document.querySelector('.members-id-div');
var publicMembersIdsDiv = document.querySelector('.public-members-id-div');

let reposData;
let eventsData;
let hooksData;
let issuesData;
let membersData;
let publicMembersData;

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Fetch for ${url} failed`);
  }
};

reposData = fetchData('https://api.github.com/orgs/BoomTownROI/repos');
eventsData = fetchData('https://api.github.com/orgs/BoomTownROI/events');
hooksData = fetchData('https://api.github.com/orgs/BoomTownROI/hooks');
issuesData = fetchData('https://api.github.com/orgs/BoomTownROI/issues');
membersData = fetchData(
  'https://api.github.com/orgs/BoomTownROI/members{/member}'
);
publicMembersData = fetchData(
  'https://api.github.com/orgs/BoomTownROI/public_members{/member}'
);

Promise.all([
  reposData,
  eventsData,
  hooksData,
  issuesData,
  membersData,
  publicMembersData,
])
  .then((data) => {
    reposData = data;
    eventsData = data;
    hooksData = data;
    issuesData = data;
    membersData = data;
    publicMembersData = data;
  })
  .then(() => {
    displayReposIds(reposData);
    displayEventsIds(eventsData);
    displayHooksErrorMessage(hooksData);
    displayIssuesErrorMessage(issuesData);
    displayMembersErrorMessage(membersData);
    displayPublicMembersErrorMessage(publicMembersData);
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
  } else {
    hooksIdsDiv.innerHTML = hooks[2].map((hook) => {
      return `
      <section class="single-event">
        <p>Hook ID: ${hook.id}<p>
      </section>`;
    });
  }
};

const displayIssuesErrorMessage = (issues) => {
  if (issues[3] === 'Not Found') {
    issuesIdsDiv.innerHTML = `<section class="single-issue">
        <p>No Issues Found<p>
      </section>`;
  } else {
    issuesIdsDiv.innerHTML = issues[3].map((issue) => {
      return `
      <section class="individual-issue">
        <p>Issue ID: ${issue.id}<p>
      </section>`;
    });
  }
};

const displayMembersErrorMessage = (members) => {
  if (members[4] === 'Not Found') {
    membersIdsDiv.innerHTML = `<section class="individual-member">
       <p>No Members Found<p>
     </section>`;
    console.log(members[4]);
  } else {
    membersIdsDiv.innerHTML = members[4].map((member) => {
      return `
     <section class="individual-member">
       <p>Member ID: ${member.id}<p>
     </section>`;
    });
  }
};

const displayPublicMembersErrorMessage = (publicMembers) => {
  if (publicMembers[5] === 'Not Found') {
    publicMembersIdsDiv.innerHTML = `<section class="single-public-members">
       <p>No Public Members Found<p>
     </section>`;
    console.log(publicMembers[5]);
  } else {
    publicMembersIdsDiv.innerHTML = publicMembers[5].map((member) => {
      return `
     <section class="single-public-member">
       <p>Public Member ID: ${member.id}<p>
     </section>`;
    });
  }
};
