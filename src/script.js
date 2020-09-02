// Image search api URL
const API_URL =
  "https://api.unsplash.com/search/photos?client_id=WJyjvBHTkEmsqWdy9MuWl-qqlcDGin4vvrwiRIhnFcI";

let ImageGridElement;

let SelectedImageElement;

// Modal element object
const ModalElement = document.querySelector("cs-modal");

// Method to search images
function searchImages(query) {
  return fetch(`${API_URL}&query=${query}`).then((response) => {
    return response.json();
  });
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

// Handling click event on search icon and fetching images basis on query
// Then setting up data in image grid element
document.getElementById("search_icon").addEventListener("click", async (e) => {
  if (document.getElementById("query").value) {
    if (this.ImageGridElement) {
      document
        .querySelector(".image_container")
        .removeChild(this.ImageGridElement);
    }
    const searchResult = await searchImages(
      document.getElementById("query").value
    );
    this.ImageGridElement = document.createElement("image-grid");
    this.ImageGridElement.setAttribute(
      "images",
      JSON.stringify(searchResult.results)
    );
    // Listening to the onImageClick event of imageGridElement
    this.ImageGridElement.addEventListener("onImageClick", (e) =>
      omImageClick(e)
    );
    document
      .querySelector(".image_container")
      .appendChild(this.ImageGridElement);
  }
});
