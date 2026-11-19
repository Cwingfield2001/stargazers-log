const repositoryList = document.querySelector("#repository-list");
const listStatus = document.querySelector("#list-status");

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    for (const repository of repositories) {
      const item = document.createElement("li");
      item.className = "repository";

      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;

      const description = document.createElement("p");
      description.textContent = repository.description;

      const date = document.createElement("time");
      date.dateTime = repository.starred_at;
      date.textContent = `Starred ${repository.starred_at}`;

      item.append(link, description, date);
      repositoryList.append(item);
    }

    listStatus.textContent = repositories.length
      ? ""
      : "No starred repositories yet.";
  } catch (error) {
    listStatus.textContent = "Could not load starred repositories.";
    console.error(error);
  }
}

loadRepositories();
