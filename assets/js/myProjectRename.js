const formId = document.getElementById("formId");
let projectData = [];

formId.addEventListener("submit", (event) => {
  event.preventDefault();


  let projectName = document.getElementById("projectName").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let description = document.getElementById("description").value;
  let image = document.getElementById("inputImage").files[0];
  let inputImageUrl = document.getElementById("inputImage").value;

  let checkboxNodeJs = document.getElementById("nodeJs");
  let checkboxNextJs = document.getElementById("nextJs");
  let checkboxReactJs = document.getElementById("reactJs");
  let checkboxTypeScript = document.getElementById("typeScript");

  if (projectName === "") {
    return alert("Isi kolom nama project");
  } else if (startDate === "") {
    return alert("Isi kolom start date");
  } else if (endDate === "") {
    return alert("Isi kolom end date");
  } else if (endDate < startDate) {
    return alert("Kolom end date tidak valid");
  } else if (description === "") {
    return alert("Isi kolom description");
  } else if (inputImageUrl === "") {
    return alert("Masukan gambar");
  }

  inputImageUrl = URL.createObjectURL(image);

  let technology = [];
  if (checkboxNodeJs.checked === true) {
    technology.push(checkboxNodeJs.value);
  }

  if (checkboxNextJs.checked === true) {
    technology.push(checkboxNextJs.value);
  }

  if (checkboxReactJs.checked === true) {
    technology.push(checkboxReactJs.value);
  }

  if (checkboxTypeScript.checked === true) {
    technology.push(checkboxTypeScript.value);
  }

  // function time duration
  let timeDuration = countDuration(startDate, endDate);

  let data = {
    projectName,
    startDate,
    endDate,
    timeDuration,
    description,
    technology,
    inputImageUrl,
  };

  projectData.unshift(data);
  console.log(projectData);
  render(projectData);
});

// function to counting time duration
const countDuration = (startDate, endDate) => {
  let startDatePart = startDate.split("/");
  let endDatePart = endDate.split("/");

  let formatStartDate =
    startDatePart[2] + "-" + startDatePart[1] + "-" + startDatePart[0];
  let formatEndDate =
    endDatePart[2] + "-" + endDatePart[1] + "-" + endDatePart[0];

  let newStartDate = new Date(formatStartDate);
  let newEndDate = new Date(formatEndDate);

  let timeDifferent = newEndDate - newStartDate;
  let differentDay = Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
  let differentMonth = Math.floor(differentDay / 30);
  let differentYear = Math.floor(differentMonth / 12);

  let monthString = newStartDate.toLocaleString("en-US", { month: "long" });
  let day = newStartDate.getDate();
  let year = newStartDate.getFullYear();
  startDate = monthString + " " + day + ", " + year;

  monthString = newEndDate.toLocaleString("en-US", { month: "long" });
  day = newEndDate.getDate();
  year = newEndDate.getFullYear();
  endDate = monthString + " " + day + ", " + year;

  let timeDuration;
  if (differentYear >= 1) {
    if (differentYear == 1) {
      timeDuration = `${differentYear} year`;
    } else {
      timeDuration = `${differentYear} years`;
    }
  } else if (differentMonth >= 1) {
    if (differentMonth == 1) {
      timeDuration = `${differentMonth} month`;
    } else {
      timeDuration = `${differentMonth} months`;
    }
  } else if (differentDay >= 0) {
    if (differentDay <= 1) {
      timeDuration = `${differentDay} day`;
    } else {
      timeDuration = `${differentDay} days`;
    }
  }

  return timeDuration;
};

// function to render
const render = (projectData) => {
  const card = document.getElementById("cardPage");
  const detilProjectPage = document.getElementById("detilProjectPage");

  card.innerHTML = `<h1>MY PROJECT</h1>
    <div class="containerCard" id="containerCard"></div>`;
  const containerCard = document.getElementById("containerCard");
  detilProjectPage.innerHTML = "";

  for (let i = 0; i < projectData.length; i++) {
    console.log(i);
    let projectName = projectData[i].projectName;
    let startDate = projectData[i].startDate;
    let endDate = projectData[i].endDate;
    let timeDuration = projectData[i].timeDuration;
    let description = projectData[i].description;
    let previewDescription = description.substring(0, 100) + "...";
    let technology = projectData[i].technology;
    let inputImageUrl = projectData[i].inputImageUrl;

    let htmlTechnologyIcon = "";
    let htmlDetilTechnology = "";

    for (let k = 0; k < technology.length; k++) {
      let technologyIcon;
      let detailTechnology;

      if (technology[k] == "node Js") {
        technologyIcon = `<i class="fa-brands fa-node-js"></i>`;
        detailTechnology = `<span>
        <i class="fa-brands fa-node-js"></i>
        <p>Node Js</p>
      </span>`;
      } else if (technology[k] == "react Js") {
        technologyIcon = `<i class="fa-brands fa-react"></i>`;
        detailTechnology = `<span>
        <i class="fa-brands fa-react"></i>
        <p>react js</p>
      </span>`;
      } else if (technology[k] == "next Js") {
        technologyIcon = `<img src="assets/icon/next-js_1.svg" style="height: 25px; width: 25px;"></img>`;
        detailTechnology = `<span>
        <img src="assets/icon/next-js_1.svg" style="height: 25px; width: 25px;"></img>
        <p>Next Js</p>
      </span>`;
      } else if (technology[k] == "typeScript") {
        technologyIcon = `<img src="assets/icon/icons8-typescript-500.svg" style="height: 25px; width: 25px;"></img>`;
        detailTechnology = `<span>
        <img src="assets/icon/icons8-typescript-500.svg" style="height: 20px; width: 20px;"></img>
        <p>typeScript</p>
      </span>`;
      }

      htmlTechnologyIcon += technologyIcon;
      htmlDetilTechnology += detailTechnology;
    }

    containerCard.innerHTML += `
    <a href=#project${i}>
      <div class="card item" id="card">
      <div class="cardInner">
        <img src="${inputImageUrl}" alt="project image" />
        <h3>${projectName}</h3>
        <p class="p-duration">durasi : ${timeDuration}</p>
        <p class="description">${previewDescription}</p>
        <div class="card-icon" id="card-icon">
          ${htmlTechnologyIcon}
        </div>
        <div class="card-button-container">
          <button>edit</button>
          <button>delete</button>
        </div>
        </div>
      </div>
    </a>`;

    detilProjectPage.innerHTML += `
    <div class="containerDetilProject w-100" id ="project${i}">
    <h1 class="item-project">${projectName}</h1>
    <div id="projectDetil" class="item-project">
      <div class="containerDetilImg">
        <img src="${inputImageUrl}" alt="project image">
        <div class="container-content">
          <div class="container-duration">
            <h3>Duration</h3>
            <span>
              <i class="fa-solid fa-calendar-days"></i>
              <p>${startDate} - ${endDate}</p>
            </span>
            <span>
              <i class="fa-solid fa-clock"></i>
              <p>${timeDuration}</p>
            </span>
          </div>
          <div class="container-tecnologies">
            <h3>Technologies</h3>
            <div class="iconContainer">
              ${htmlDetilTechnology}
            </div>
          </div>
        </div>
      </div>
      <p class="description item-project">${description}</p>
    </div>
  </div>`;

    const containerProject = document.getElementById(`project${i}`);
    if (i % 2 === 0) {
      containerProject.style.backgroundColor = "none";
    } else {
      containerProject.style.backgroundColor = " #fff";
    }
  }
};
