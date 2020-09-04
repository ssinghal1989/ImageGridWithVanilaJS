// Image search api URL
const API_URL =
  "https://api.unsplash.com/search/photos?client_id=WJyjvBHTkEmsqWdy9MuWl-qqlcDGin4vvrwiRIhnFcI";

let ImageGridElement;

let SelectedImageElement;

let ImageCount = 0;

let isImagesLoading = false;

// Modal element object
const ModalElement = document.querySelector("cs-modal");

// Method to search images
function searchImages(query, pageNumber) {
  return fetch(`${API_URL}&query=${query}&page=${pageNumber}&per_page=20`).then(
    (response) => {
      return response.json();
    }
  );
}

// Method to handle click on any image and show the full image in Modal
function omImageClick(e) {
  if (this.SelectedImageElement) {
    ModalElement.removeChild(this.SelectedImageElement);
  }
  this.SelectedImageElement = document.createElement("img");
  this.SelectedImageElement.setAttribute("src", e.data.urls.full);
  this.SelectedImageElement.style.height = "-webkit-fill-available";
  this.SelectedImageElement.style.width = "100%";
  this.SelectedImageElement.style.objectFit = "fill";
  ModalElement.appendChild(this.SelectedImageElement);
  ModalElement.open();
}

// Method for searching images
async function searchAndAppendImages(refresh, pageNumber) {
  if (refresh) {
    this.ImageGridElement.clearGrid();
    this.ImageCount = 0;
  }
  document.querySelector("#loading_images").classList.remove("hidden");
  const searchResult = await searchImages(
    document.getElementById("query").value,
    pageNumber
  );
  document.querySelector("#loading_images").classList.add("hidden");

  // Listening to the onImageClick event of imageGridElement

  this.ImageGridElement.addImages(JSON.stringify(searchResult.results));
  this.ImageCount += searchResult.results.length;
  this.isImagesLoading = false;
}

// Handling click event on search icon and fetching images basis on query
// Then setting up data in image grid element
document.getElementById("search_icon").addEventListener("click", async (e) => {
  if (document.getElementById("query").value) {
    this.searchAndAppendImages(true, 1);
  }
});

document.addEventListener("scroll", (event) => {
  if (
    document.scrollingElement.scrollHeight -
      document.scrollingElement.clientHeight -
      10 <
      document.scrollingElement.scrollTop &&
    this.ImageCount % 20 == 0 &&
    !this.isImagesLoading
  ) {
    this.isImagesLoading = true;
    this.searchAndAppendImages(false, this.ImageCount / 20 + 1);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  this.ImageGridElement = document.createElement("image-grid");
  this.ImageGridElement.addEventListener("onImageClick", (e) =>
    omImageClick(e)
  );
  document.querySelector(".image_container").appendChild(this.ImageGridElement);
});
