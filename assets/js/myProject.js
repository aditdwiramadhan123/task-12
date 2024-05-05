const formId = document.getElementById("formId");
let projectData = [];

formId.addEventListener("submit", (event) => {

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

});
