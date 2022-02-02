var loadDataBtn = document.querySelector('.load-data-btn');

loadDataBtn.addEventListener('click', (event) => {
  handleClick(event);
});

const handleClick = (event) => {
  event.preventDefault();
  // refactor when functional
  if (event.target.classList.contains('load-data-btn')) {
    displayReposIds();
    // displayEventsIds();
    // displayHooksErrorMessage();
    // displayIssuesErrorMessage();
    // displayMembersErrorMessage();
    // displayPublicMembersErrorMessage();
  }
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Fetch for ${url} failed`);
  }
};

const displayReposIds = async () => {
  const repoIdsDiv = document.querySelector('.repos-id-div');
  let reposData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/repos'
  );
  repoIdsDiv.innerHTML = reposData.map((repo) => {
    return `
    <section class="single-repo">
    <p>Repo ID: ${repo.id}<p>
    </section>`;
  });
};

const displayEventsIds = async () => {
  const eventIdsDiv = document.querySelector('.events-id-div');
  let eventsData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/events'
  );
  eventIdsDiv.innerHTML = eventsData.map((event) => {
    return `
    <section class="single-event">
      <p>Event ID: ${event.id}<p>
      </section>`;
  });
};

const displayHooksErrorMessage = async () => {
  const hooksIdsDiv = document.querySelector('.hooks-id-div');
  let hooksData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/hooks'
  );
  console.log(hooksData);

  if (hooksData.message === 'Not Found') {
    hooksIdsDiv.innerHTML = `<section class="single-hook">
        <p>No Hooks Found<p>
      </section>`;
  } else {
    hooksIdsDiv.innerHTML = hooksData.map((hook) => {
      return `
      <section class="single-event">
        <p>Hook ID: ${hook.id}<p>
      </section>`;
    });
  }
};

const displayIssuesErrorMessage = async () => {
  const issuesIdsDiv = document.querySelector('.issues-id-div');

  let issuesData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/issues'
  );
  if (issuesData.message === 'Not Found') {
    issuesIdsDiv.innerHTML = `<section class="single-issue">
        <p>No Issues Found<p>
      </section>`;
  } else {
    issuesIdsDiv.innerHTML = issuesData.map((issue) => {
      return `
      <section class="individual-issue">
        <p>Issue ID: ${issue.id}<p>
      </section>`;
    });
  }
};

const displayMembersErrorMessage = async () => {
  const membersIdsDiv = document.querySelector('.members-id-div');
  let membersData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/members{/member}'
  );
  if (membersData.message === 'Not Found') {
    membersIdsDiv.innerHTML = `<section class="individual-member">
       <p>No Members Found<p>
     </section>`;
    console.log(membersData);
  } else {
    membersIdsDiv.innerHTML = membersData.map((member) => {
      return `
     <section class="individual-member">
       <p>Member ID: ${member.id}<p>
     </section>`;
    });
  }
};

const displayPublicMembersErrorMessage = async () => {
  const publicMembersIdsDiv = document.querySelector('.public-members-id-div');
  let publicMembersData = await fetchData(
    'https://api.github.com/orgs/BoomTownROI/public_members{/member}'
  );
  if (publicMembersData.message === 'Not Found') {
    publicMembersIdsDiv.innerHTML = `<section class="single-public-members">
       <p>No Public Members Found<p>
     </section>`;
    console.log(publicMembersData);
  } else {
    publicMembersIdsDiv.innerHTML = publicMembersData.map((member) => {
      return `
     <section class="single-public-member">
       <p>Public Member ID: ${member.id}<p>
     </section>`;
    });
  }
};
