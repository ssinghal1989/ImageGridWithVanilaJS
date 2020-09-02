// Custom component to show am image grid

class ImageGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.images;
    this._gridContainer;
    this.shadowRoot.innerHTML = `
        
        <style>
            @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css");
            #image-grid {
                display: grid;
                grid-gap: 1rem;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            }
        </style>`;
  }

  connectedCallback() {
    if (this.hasAttribute("images")) {
      this.images = JSON.parse(this.getAttribute("images"));
      this._gridContainer = document.createElement("div");
      this._gridContainer.setAttribute("id", "image-grid");
      this.images.forEach((imageData) => {
        const imageContainer = document.createElement("div");
        imageContainer.style.height = "10rem";
        imageContainer.style.position = "relative";
        const likeIcon = document.createElement("i");
        likeIcon.classList.add("fa");
        likeIcon.classList.add("fa-thumbs-up");
        likeIcon.style.position = "absolute";
        likeIcon.style.top = "4px";
        likeIcon.style.right = "4px";
        likeIcon.style.fontSize = "24px";
        likeIcon.style.color = "white";
        likeIcon.addEventListener("click", (e) => e.stopPropagation());
        imageContainer.appendChild(likeIcon);
        const imageElement = document.createElement("img");
        imageElement.setAttribute("src", imageData.urls.regular);
        imageElement.setAttribute("image-data", imageData);
        imageElement.style.height = "100%";
        imageElement.style.width = "100%";
        imageElement.style.objectFit = "fill";
        imageElement.style.cursor = "pointer";

        imageContainer.appendChild(imageElement);
        imageContainer.addEventListener("click", (e) =>
          this.onImageClick(e, imageData)
        );
        this._gridContainer.appendChild(imageContainer);
        this.shadowRoot.appendChild(this._gridContainer);
      });
    }
  }

  onImageClick(event, imageData) {
    const clickEvent = new Event("onImageClick");
    clickEvent["data"] = imageData;
    this.dispatchEvent(clickEvent);
  }
}

customElements.define("image-grid", ImageGrid);
