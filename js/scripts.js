const getTheCountrys = (e) => {
  fetch("http://192.168.0.111:8080/getTheRegion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      str: e.target.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      populateCountryDropdown(data);
      getTopicDropdownOptions();
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
};

window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
    });
  }
});
// document.getElementById('sendPutRequest').addEventListener('click', sendPutRequest);
function populateCountryDropdown(countries) {
  const countrySelect = document.getElementById("countrySelect");

  // Clear existing options
  countrySelect.innerHTML = "";

  // Add default option (optional)
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select a country";
  countrySelect.appendChild(defaultOption);

  // Add countries from the array
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.text = country;
    countrySelect.appendChild(option);
  });
}

const getTopicDropdownOptions = () => {
  fetch("http://192.168.0.111:8080/getTheTopics", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({
    //     "str": e.target.value
    // })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      populateTopicDropdown(data);
    })
    .catch((error) => {
      console.error("Error fetching topics:", error);
    });
};
function populateTopicDropdown(topics) {
  const countrySelect = document.getElementById("topicSelect");

  // Clear existing options
  countrySelect.innerHTML = "";

  // Add default option (optional)
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select a Topic";
  countrySelect.appendChild(defaultOption);

  // Add countries from the array
  topics.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.text = country;
    countrySelect.appendChild(option);
  });
}
const getTheQuestions = (e) => {
  console.log("hello");
  fetch("http://192.168.0.111:8080/getTheQuestions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      str: e.target.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      populateQuestionDropdown(data);
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
};
function populateQuestionDropdown(questions) {
  const countrySelect = document.getElementById("questionsSelect");

  // Clear existing options
  countrySelect.innerHTML = "";

  // Add default option (optional)
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select a Topic";
  countrySelect.appendChild(defaultOption);

  // Add countries from the array
  questions.forEach((question) => {
    const option = document.createElement("option");
    option.value = question;
    option.text = question;
    countrySelect.appendChild(option);
  });
}

function storeCompliants() {
  const region = document.getElementById("region");
  const country = document.getElementById("countrySelect");
  const prgramoffice = document.getElementById("programoffice");
  const projectoffice = document.getElementById("projectoffice");
  const topics = document.getElementById("topicSelect");
  const questions = document.getElementById("questionsSelect");
  const answers = document.getElementById("answers");
  console.log(region.value);
  console.log(country.value);
  console.log(prgramoffice.value);
  console.log(projectoffice.value);
  console.log(topics.value);
  console.log(questions.value);
  console.log(answers.value);
  const requestData = {
    region: region.value,
    programoffice: country.value,
    topics: topics.value,
    projectoffice: projectoffice.value,
    programoffice: prgramoffice.value,
    questions: questions.value,
    answers: answers.value,
  };
  fetch("http://192.168.0.111:8080/saveCompliants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data saved successfully:", data);
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
}

function toggleDropdown(event) {
  event.preventDefault();
  var dropdown = document.getElementById("myDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}
google.charts.load("current", { packages: ["corechart", "bar"] });
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {
  var data = google.visualization.arrayToDataTable([
    ["Tasks", "Check Compliants"],
    ["New Tasks", 1],
    ["Pending Tasks", 2],
    ["Completed Tasks", 2],
  ]);

  var options = {
    title: "Complaints",
    chartArea: { width: "50%" },
    hAxis: {
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
    colors: ["#3366cc", "#dc3912", "#ff9900"],
  };

  var chart = new google.visualization.BarChart(
    document.getElementById("chart_divv")
  );

  chart.draw(data, options);
}
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart1);

function drawChart1() {
  var data = google.visualization.arrayToDataTable([
    ["Task", "Checking Portal"],
    ["New Tasks", 1], // Red color
    ["Pending Tasks", 2], // Turquoise color
    ["Completed Tasks", 1], // Gold color
  ]);

  var options = {
    title: "",
    legend: { position: "none" },
    colors: ["#85C1E9", "#73C6B6", "#E59866"],
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Element", "Density", { role: "style" }],
    ["New Tasks", 1, "#F4D03F"],
    ["Pending Tasks", 2, "#AF7AC5"],
    ["Completed Tasks", 1, "#99A3A4"],
  ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([
    0,
    1,
    { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" },
    2,
  ]);

  var options = {
    title: "",
    width: 600,
    height: 400,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };
  var chart = new google.visualization.BarChart(
    document.getElementById("barchart_values")
  );
  chart.draw(view, options);
}
