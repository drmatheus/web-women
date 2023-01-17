/* Desenvolva sua lógica aqui... */
let jobs = document.querySelector("#listJobs");
/*let buttons = document.querySelectorAll("#listJobs button")*/
let sectionJobSelection = document.querySelector("#mySelection");
let jobSelection = [];
let appliedJobs;

function attMyStorage() {
  if (!localStorage.getItem("appliedJobs")) {
    localStorage.setItem("appliedJobs", "[]");
  }

  let testingTheStoredItem = JSON.parse(localStorage.getItem("appliedJobs"));
  if (testingTheStoredItem.length > jobSelection.length) {
    jobSelection = testingTheStoredItem;
  } else if (
    JSON.stringify(testingTheStoredItem) !== JSON.stringify(jobSelection)
  ) {
    appliedJobs = localStorage.setItem(
      "appliedJobs",
      JSON.stringify(jobSelection)
    );
    appliedJobs = localStorage.getItem("appliedJobs");
    appliedJobs = JSON.parse(appliedJobs);
    jobSelection = appliedJobs;
  }

  showMySelection(jobSelection);
}

function alreadySelected(obj) {
  let trueOrNot = false;
  let testingTheStoredItem = JSON.parse(localStorage.getItem("appliedJobs"));
  if (testingTheStoredItem) {
    testingTheStoredItem.find((element) => {
      if (JSON.stringify(element) === JSON.stringify(obj)) {
        trueOrNot = true;
      }
    });
  }
  return trueOrNot;
}

function showJobs(obj) {
  let addOrRemove = "Candidatar";

  if (alreadySelected(obj)) {
    addOrRemove = "Remover Candidatura";
  }

  let li = document.createElement("li");
  li.classList = "jobOffert flex column gapRow2";

  let jobTitle = document.createElement("h2");
  jobTitle.classList = "title2";
  jobTitle.innerText = `${obj.title}`;

  let divEnterpriseAndLocation = document.createElement("div");
  divEnterpriseAndLocation.classList = "flex columnGap1 marginOff";

  let jobEnterprise = document.createElement("span");
  jobEnterprise.classList = "text3";
  jobEnterprise.innerText = `${obj.enterprise}`;

  let jobLocation = document.createElement("span");
  jobLocation.classList = "text3";
  jobLocation.innerText = `${obj.location}`;

  divEnterpriseAndLocation.append(jobEnterprise, jobLocation);

  let jobDescription = document.createElement("p");
  jobDescription.classList = "text2";
  jobDescription.innerText = `${obj.descrition}`;

  let divModalitiesAndButton = document.createElement("div");
  divModalitiesAndButton.classList =
    "flex spaceBetween alignCenter mobileWrap  columnGap1 rowGapMobile";

  obj.modalities.forEach((modalitie) => {
    let modalities = document.createElement("span");
    modalities.classList = "text3 jobType";
    modalities.innerText = `${modalitie}`;

    divModalitiesAndButton.append(modalities);
  });

  let button = document.createElement("button");
  button.classList = "button buttonJobOffert marginLeftMax";
  button.id = `${obj.id}`;
  button.innerText = `${addOrRemove}`;
  button.addEventListener("click", () => {
    addJobSelected(event.target);
    jobs.innerHTML = "";
    jobsData.forEach(showJobs);
  });

  divModalitiesAndButton.append(button);

  li.append(
    jobTitle,
    divEnterpriseAndLocation,
    jobDescription,
    divModalitiesAndButton
  );

  jobs.appendChild(li);
}

function addJobSelected(target) {
  if (jobSelection.find((element) => element.id == target.id)) {
    target.innerText = "Candidatar";
    removeJobSelected(target);
  } else {
    let selectedJob = jobsData.find((element) => element.id == target.id);
    target.innerText = "Remover Candidatura";
    jobSelection.push(selectedJob);
    attMyStorage();
    showMySelection(jobSelection);
  }
}

function removeJobSelected(target) {
  jobSelection.forEach((job, index) => {
    if (job.id == target.id) {
      jobSelection.splice(index, 1);
      localStorage.setItem("appliedJobs", JSON.stringify(jobSelection));
    }
  });
  showMySelection(jobSelection);
}

function showMySelection(myArray) {
  sectionJobSelection.innerHTML = "";
  if (Array.isArray(myArray)) {
    myArray.forEach((job) => {
      let li = document.createElement("li");
      li.classList = "jobOffertSelected flex column gapRow2 animationSlideIn";

      let divTitleAndButton = document.createElement("div");
      divTitleAndButton.classList = "flex columnGap1 spaceBetween";

      let titleJob = document.createElement("h2");
      titleJob.classList = "title3";
      titleJob.innerText = `${job.title}`;

      let buttonDelete = document.createElement("button");
      buttonDelete.classList = "buttonDelete";
      buttonDelete.id = `${job.id}`;

      buttonDelete.addEventListener("click", () => {
        removeJobSelected(event.target);
        jobs.innerHTML = "";
        jobsData.forEach(showJobs);
      });

      divTitleAndButton.append(titleJob, buttonDelete);

      let divEnterpriseAndLocation = document.createElement("div");
      divEnterpriseAndLocation.classList = "flex columnGap1";

      let jobEnterprise = document.createElement("span");
      jobEnterprise.innerText = `${job.enterprise}`;

      let jobLocation = document.createElement("span");
      jobLocation.innerText = `${job.location}`;

      divEnterpriseAndLocation.append(jobEnterprise, jobLocation);

      li.append(divTitleAndButton, divEnterpriseAndLocation);

      sectionJobSelection.appendChild(li);
    });
  }

  if (sectionJobSelection.childElementCount == 0) {
    let li = document.createElement("li");
    li.classList = "jobOffertSelected flex column gapRow2";

    let warning = document.createElement("h2");
    warning.classList = "title3";
    warning.innerText = "Você ainda não selecionou nenhuma vaga";

    li.appendChild(warning);

    sectionJobSelection.appendChild(li);
  }
}

attMyStorage();
jobsData.forEach(showJobs);
