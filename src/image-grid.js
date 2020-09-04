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

            #image-container {
              height: 10rem;
              position: relative;
            }

            img {
              height: 100%;
              width: 100%;
              object-fit: fill;
            }

            #like-icon {
              position: absolute;
              top: 4px;
              right: 4px;
              font-size: 24px;
              color: white;
              cursor: pointer;
            }

            .liked {
              color: red !important;
            }

            #zoom-in-icon {
              font-size: 32px;
              color: white;
              cursor: pointer;
              position: absolute;
              left: calc(50% - 16px);
              bottom: calc(50% - 16px);
              display: none;
            }
            #image-container:hover #zoom-in-icon {
              display: block;
            }
        </style>`;
    
  }

  // Method called when element is connected with DOM
  async connectedCallback() {
    if (this.hasAttribute("images")) {
      const LIKED_IMAGES_KEY = 'LIKED_IMAGES';
      const likedImages = await localStorage.getItem(LIKED_IMAGES_KEY);
      this.images = JSON.parse(this.getAttribute("images"));
      this._gridContainer = document.createElement("div");
      this._gridContainer.setAttribute("id", "image-grid");
      this.images.forEach((imageData) => {
        const imageContainer = document.createElement("div");
        imageContainer.setAttribute('id', 'image-container');
        
        // Like Icon starts 
        const likeIcon = document.createElement("i");
        likeIcon.classList.add("fa");
        likeIcon.classList.add("fa-thumbs-up");
        likeIcon.setAttribute('id', 'like-icon');
        likeIcon.addEventListener("click", (e) => this.onLikeButtonClick(e, imageData));
        if (likedImages && likedImages.indexOf(imageData.id) !== -1) {
          likeIcon.classList.add('liked');
        }
        imageContainer.appendChild(likeIcon);
        // Like Icon ends

        // Zoom in icon start
        const zoomInIcon = document.createElement('i');
        zoomInIcon.classList.add("fa");
        zoomInIcon.classList.add("fa-search-plus");
        zoomInIcon.setAttribute('id', 'zoom-in-icon')
        zoomInIcon.addEventListener("click", (e) => this.onImageClick(e, imageData));
        imageContainer.appendChild(zoomInIcon);
        // Zoom in icon ends

        // Image element start
        const imageElement = document.createElement("img");
        imageElement.setAttribute("src", imageData.urls.regular);
        imageElement.setAttribute("image-data", imageData);
        imageContainer.appendChild(imageElement);
        this._gridContainer.appendChild(imageContainer);
        // Image element ends

        this.shadowRoot.appendChild(this._gridContainer);
      });
    }
  }

  // Method to handle click event on zoom icon
  onImageClick(event, imageData) {
    const clickEvent = new Event("onImageClick");
    clickEvent["data"] = imageData;
    this.dispatchEvent(clickEvent);
  }

  // Method to handle like button click
  async onLikeButtonClick(event, imageData) {
    const LIKED_IMAGES_KEY = 'LIKED_IMAGES';
    const targetElement = event.target;
    let likedImages = await localStorage.getItem(LIKED_IMAGES_KEY);
    if (!likedImages) {
      targetElement.classList.add('liked');
      likedImages = imageData.id;
      localStorage.setItem(LIKED_IMAGES_KEY, likedImages);
    } else if(likedImages.indexOf(imageData.id) !== -1) {
      targetElement.classList.remove('liked');
      likedImages = likedImages.replace(imageData.id, '');
      likedImages = likedImages.toString().replace(',,', ',');
      localStorage.setItem(LIKED_IMAGES_KEY, likedImages);
    } else {
      targetElement.classList.add('liked');
      likedImages = `${likedImages},${imageData.id}`;
      localStorage.setItem(LIKED_IMAGES_KEY, likedImages);
    }
  }
}

customElements.define("image-grid", ImageGrid);
