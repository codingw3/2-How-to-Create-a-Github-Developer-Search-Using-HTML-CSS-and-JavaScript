const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");

btnSearch.addEventListener("click", function (e) {
  let user = inputSearch.value;
  searchUser(user);
});

document.addEventListener("keydown", function (event) {
  let user = inputSearch.value;

  if (event.key === "Enter") {
    searchUser(user);
  }
});

window.onload = function () {
  inputSearch.focus();
  searchUser("codingw3");
};

function searchUser(user) {
  if (verifyNullBoolean(user)) {
    let endpoint = `https://api.github.com/users/${user}`;
    let imageProfile = document.getElementById("image-profile");
    let name = document.getElementById("name");
    let username = document.getElementById("username");
    let dateCreation = document.getElementById("date-creation");
    let description = document.getElementById("description");
    let numberRepositories = document.getElementById("number-repositories");
    let numberFollowers = document.getElementById("number-followers");
    let numberFollowing = document.getElementById("number-following");
    let location = document.getElementById("location");
    let twitter = document.getElementById("twitter");
    let link = document.getElementById("link");
    let company = document.getElementById("company");

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const dateJoined = new Date(data.created_at);
        const dateJoinedFormated = `${dateJoined.getFullYear()}-${
          dateJoined.getMonth() + 1
        }-${dateJoined.getDate()}`;

        imageProfile.src = data.avatar_url;
        imageProfile.alt = "User photo " + verifyNull(data.login);
        name.innerHTML = verifyNull(data.name);
        username.innerHTML = "@" + data.login;
        username.href = data.html_url;
        dateCreation.innerHTML = "Joined " + dateJoinedFormated;
        description.innerHTML = verifyNull(data.bio);
        numberRepositories.innerHTML = data.public_repos;
        numberFollowers.innerHTML = data.followers;
        numberFollowing.innerHTML = data.following;
        location.innerHTML = verifyNull(data.location);

        twitter.innerHTML = verifyNull(data.twitter_username);

        if (verifyNullBoolean(data.twitter_username)) {
          twitter.setAttribute("target", "_blank");
          twitter.href = "https://twitter.com/" + data.twitter_username;
        } else {
          twitter.removeAttribute("target");
          twitter.href = "#";
        }

        link.innerHTML = verifyNull(data.blog);

        if (verifyNullBoolean(data.blog)) {
          link.setAttribute("target", "_blank");
          link.href = verifyContainsHttps(data.blog)
            ? data.blog
            : "https://" + data.blog;
        } else {
          link.removeAttribute("target");
          link.href = "#";
        }

        company.innerHTML = verifyNull(data.company);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        inputSearch.focus();
        inputSearch.value = "";
      });
  } else {
    alert("Please enter a valid username");
    inputSearch.focus();
  }
}

function verifyNull(data) {
  return data != null && data.trim().length >= 1 ? data : "Not avaliable";
}

function verifyNullBoolean(data) {
  return data != null && data.trim().length >= 1;
}

function verifyContainsHttps(data) {
  return data.includes("http://") || data.includes("https://");
}
