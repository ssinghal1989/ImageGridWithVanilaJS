// Custom component for showing an Image in Modal

class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0,0.5);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }
                #modal {
                    z-index: 100;
                    position: fixed;
                    background: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: 'space-between';
                    opacity: 0;
                    pointer-events: none;
                }
                @media only screen and (max-width: 600px) {
                    #modal {
                        top: 2vh;
                        left: 1%;
                        width: 98%;
                        height: 96vh;
                    }
                }
                @media only screen and (min-width: 601px) {
                    #modal {
                        top: 5vh;
                        left: 10%;
                        width: 80%;
                        height: 90vh;
                    }
                }
                @media only screen and (min-width: 1001px) {
                    #modal {
                        top: 15vh;
                        left: 25%;
                        width: 50%;
                        height: 70vh;
                    }
                }
                :host([opened]) #backdrop, :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }
                header {
                    padding: 1rem;
                }

                header h1 {
                    font-size: 1.25rem;
                }

                #main {
                    padding: 1rem;
                    height: 80%;
                }

                #actions {
                    padding: 2rem 1rem;
                    display: flex;
                    justify-content: flex-end;
                }

                #actions button {
                    margin: 0 0.25rem;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id="close">Close</button>
                </section>
            </div>
        `;

    const cancelButton = this.shadowRoot.querySelector("#close");
    cancelButton.addEventListener("click", (e) => {
      this.close();
    });
  }

  // Public methods those can be accessed from parent component
  open() {
    this.setAttribute("opened", "");
  }

  close() {
    this.removeAttribute("opened");
  }
}

customElements.define("cs-modal", Modal);
