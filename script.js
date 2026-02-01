const API_URL = "https://remotive.com/api/remote-jobs";
let allJobs = [];
let categories = [];
let currentPage = 1;
const jobsPerPage = 6;

// Fetch jobs from API
async function fetchJobs() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allJobs = data.jobs;

    // Extract unique categories from jobs
    categories = [...new Set(allJobs.map(job => job.category))];
    populateCategoryFilter();
    renderJobs(allJobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    document.getElementById("jobs-container").innerHTML = "<p>Failed to load jobs.</p>";
  }
}

// Dynamically populate category dropdown
function populateCategoryFilter() {
  const select = document.getElementById("categoryFilter");
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function renderJobs(list) {
  const container = document.getElementById("jobs-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * jobsPerPage;
  const end = start + jobsPerPage;
  const paginatedJobs = list.slice(start, end);

  if (paginatedJobs.length === 0) {
    container.innerHTML = "<p>No jobs found.</p>";
    document.getElementById("pageInfo").innerText = "";
    return;
  }

  paginatedJobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job-card";
    div.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>${job.company_name}</strong> — ${job.candidate_required_location}</p>
      <p>${job.job_type} | ${job.category}</p>
      <p>Salary: ${job.salary || "Not specified"}</p>
      <a href="${job.url}" target="_blank">View Job</a>
    `;
    container.appendChild(div);
  });

  document.getElementById("pageInfo").innerText = 
    `Page ${currentPage} of ${Math.ceil(list.length / jobsPerPage)}`;
}

function applyFilters() {
  const search = document.getElementById("search").value.toLowerCase();
  const type = document.getElementById("typeFilter").value;
  const category = document.getElementById("categoryFilter").value;

  let filtered = allJobs.filter(job =>
    job.title.toLowerCase().includes(search) ||
    job.company_name.toLowerCase().includes(search) ||
    job.candidate_required_location.toLowerCase().includes(search)
  );

  if (type) filtered = filtered.filter(job => job.job_type === type);
  if (category) filtered = filtered.filter(job => job.category === category);

  return filtered;
}

// Event Listeners
document.getElementById("search").addEventListener("input", () => {
  currentPage = 1;
  renderJobs(applyFilters());
});

document.getElementById("typeFilter").addEventListener("change", () => {
  currentPage = 1;
  renderJobs(applyFilters());
});

document.getElementById("categoryFilter").addEventListener("change", () => {
  currentPage = 1;
  renderJobs(applyFilters());
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderJobs(applyFilters());
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const filtered = applyFilters();
  if (currentPage * jobsPerPage < filtered.length) {
    currentPage++;
    renderJobs(filtered);
  }
});

// Initialize
fetchJobs();
