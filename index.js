const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const countDuration = require("./assets/js/timeDuration");

// setting
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

// setting middleware
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use(express.urlencoded({ extended: false }));

// route
app.get("/", home);
app.get("/contactMe", contact);
app.get("/project", project);
app.post("/addProject", addProject);
app.get("/addProject", addProjectGet);
app.get("/project/:id", detilProject);
app.post("/delete/:id", deleteProject);
app.get("/edit/:id",editProjectGet)
app.post("/edit/:id", editProject);
app.get("/testimoni", testimoni);

// data declaration
const data = [];

// service
function home(req, res) {
  res.render("index");
}

function contact(req, res) {
  res.render("contactMe");
}

function project(req, res) {
  res.render("myProject", { data });
}

function addProjectGet(req, res) {
  res.render("addProject");
}

function addProject(req, res) { 
  let datum = getDatum(req,res)
  if (datum!==undefined) {
    data.unshift(datum)
    res.redirect("project")
  }
}

function getDatum (req,res) {
  let body = req.body;
  let projectName = body.projectName;
  let startDate = body.startDate;
  let endDate = body.endDate;
  let description = body.description;

  let technologyIcon = [];
  let detailTechnology = [];

  let reactJs = body.reactJs;
  let nodeJs = body.nodeJs;
  let nextJs = body.nextJs;
  let typeScript = body.typeScript;

  if (reactJs !== undefined) {
    technologyIcon.push(`<i class="fa-brands fa-react"></i>`);
    detailTechnology.push(
      `<span><i class="fa-brands fa-react"></i><p>react js</p></span>`
    );
  }

  if (nodeJs !== undefined) {
    technologyIcon.push(`<i class="fa-brands fa-node-js"></i>`);
    detailTechnology.push(
      `<span><i class="fa-brands fa-node-js"></i><p>Node Js</p></span>`
    );
  }

  if (nextJs !== undefined) {
    technologyIcon.push(
      `<img src="assets/icon/next-js_1.svg" style="height: 25px; width: 25px;"></img>`
    );
    detailTechnology.push(`<span>
    <img src="../assets/icon/next-js_1.svg" style="height: 25px; width: 25px;"></img>
    <p>Next Js</p>
  </span>`);
  }

  if (typeScript !== undefined) {
    technologyIcon.push(
      `<img src="assets/icon/icons8-typescript-500.svg" style="height: 25px; width: 25px;"></img>`
    );
    detailTechnology.push(`<span>
    <img src="../assets/icon/icons8-typescript-500.svg" style="height: 20px; width: 20px;"></img>
    <p>typeScript</p>
  </span>`);
  }

  const image =
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimsQwsSOBn-XDL_vZI4c4_nM8xS2qqY5ejxFELDDn6vd4gvRBUAtaSYwGDxYmtjdCU1dL1RUQCBsTpAVh0PnjFnvEARajDVcnbdBRCkfuaelU1QkuhkleOsuvq1FqRh-fFBZaxvo-7-96cJSMYPe2XlrcFj7COJ-_53hYzxRGya9a7Ybi-Y4KqLork/w1200-h630-p-k-no-nu/Prabowo%20Subianto%20PNG.png";

  let elementDetilIcon = detailTechnology.join("");
  let elementCardIcon = technologyIcon.join("");
  if (
    projectName !== undefined &&
    startDate !== "" &&
    endDate !== "" &&
    endDate >= startDate &&
    description !== ""
  ) {
    let timeDuration = countDuration(startDate, endDate);
    datum = {
      projectName,
      startDate,
      endDate,
      description,
      timeDuration,
      elementCardIcon,
      elementDetilIcon,
      image,
    };

    return datum
  } else {
    console.log("data tidak lengkap")
  }
}

function detilProject(req, res) {
  let id = parseInt(req.params.id);
  let datum = data[id];
  res.render("detilProject", { datum });
}

function deleteProject(req, res) {
  let id = parseInt(req.params.id);
  data.splice(id, 1);
  res.redirect("/project");
}

function editProject(req, res) {
  let datum = getDatum(req,res)
  let id = parseInt(req.params.id);
  if (datum!==undefined) {
    data.splice(id,1,datum);
    res.redirect("/project")
  }
}

function editProjectGet (req,res) {
  let id = parseInt(req.params.id)
  let datum = data[id]
  console.log("ini datum")
  console.log(datum)
  res.render("editProject",{datum,id})
}

function testimoni(req, res) {
  res.render("testimoni");
}


app.listen(port, () => {
  console.log(`server runing in port ${port}`);
});
