import { inventory } from "./data/inventory.js";
import { books } from "./data/books.js";
import { comics } from "./data/comics.js";
import "./style.css";

const app = document.querySelector("#app");

const sections = [
  {
    id: "the-phantom-menace",
    title: "The Phantom Menace",
    shortTitle: "TPM",
    description: "Figuras y piezas relacionadas con el Episodio I.",
    image: "/images/sections/tpm.png",
  },
  {
    id: "attack-of-the-clones",
    title: "Attack of the Clones",
    shortTitle: "AOTC",
    description: "Colección del Episodio II.",
    image: "/images/sections/aotc.png",
  },
  {
    id: "the-clone-wars",
    title: "The Clone Wars",
    shortTitle: "Clone Wars",
    description: "Figuras, vehículos y escenas de The Clone Wars.",
    image: "/images/sections/tcw.png",
    imagePosition: "50% 1%",
  },
  {
    id: "revenge-of-the-sith",
    title: "Revenge of the Sith",
    shortTitle: "ROTS",
    description: "Piezas de Anakin, Obi-Wan, Mustafar y la caída de los Jedi.",
    image: "/images/sections/rots.png",
  },
  {
    id: "a-new-hope",
    title: "A New Hope",
    shortTitle: "ANH",
    description: "Objetos y figuras del Episodio IV.",
    image: "/images/sections/anh.png",
    imagePosition: "50% 10%",
  },
  {
    id: "the-empire-strikes-back",
    title: "The Empire Strikes Back",
    shortTitle: "ESB",
    description: "Figuras del Episodio V.",
    image: "/images/sections/esb.png",
    imageFit: "cover",
    imagePosition: "50% 50%",
  },
  {
    id: "return-of-the-jedi",
    title: "Return of the Jedi",
    shortTitle: "ROTJ",
    description: "Figuras del Episodio VI.",
    image: "/images/sections/rotj.png",
    imageFit: "cover",
  },
  {
    id: "obi-wan-kenobi",
    title: "Obi-Wan Kenobi",
    shortTitle: "Kenobi",
    description: "Piezas de la serie Obi-Wan Kenobi.",
    image: "/images/sections/kenobi.png",
  },
  {
    id: "ahsoka",
    title: "Ahsoka",
    shortTitle: "Ahsoka Serie",
    description: "Figuras de la serie Ahsoka.",
    image: "/images/sections/ahsoka.png",
  },
  {
    id: "the-mandalorian",
    title: "The Mandalorian",
    shortTitle: "Mandaloriano",
    description: "Figuras de The Mandalorian.",
    image: "/images/sections/man.png",
  },
  {
    id: "the-last-jedi",
    title: "The Last Jedi",
    shortTitle: "TLJ",
    description: "Figuras del Episodio VIII.",
    image: "/images/sections/tlj.png",
  },
    {
    id: "valuable-objects",
    title: "Objetos de colección",
    shortTitle: "Objetos",
    description: "Réplicas, autógrafos y piezas especiales de la colección.",
    image: "/images/figures/autografoana.jpg",
  },
  {
    id: "books",
    title: "Libros",
    shortTitle: "Libros",
    description: "Lista ordenada de libros de la colección.",
    image: "/images/sections/libros.jpg",
    imagePosition: "50% 15%",
  },
  {
    id: "comics",
    title: "Cómics",
    shortTitle: "Cómics",
    description: "Lista ordenada de cómics de la colección.",
    image: "/images/sections/comics.jpg",
    imagePosition: "50% 10%",
  },

];

function getItemSection(item) {
  if (item.category === "valuable-object") return "valuable-objects";

  const saga = item.saga?.toLowerCase() || "";
  const name = item.name?.toLowerCase() || "";

  if (saga.includes("tpm")) return "the-phantom-menace";
  if (saga.includes("aotc")) return "attack-of-the-clones";
  if (saga.includes("rots")) return "revenge-of-the-sith";
  if (saga.includes("anh")) return "a-new-hope";
  if (saga.includes("esb")) return "the-empire-strikes-back";
  if (saga.includes("rotj")) return "return-of-the-jedi";
  if (saga.includes("clone wars")) return "the-clone-wars";
  if (saga.includes("kenobi")) return "obi-wan-kenobi";
  if (saga.includes("ahsoka")) return "ahsoka";
  if (saga.includes("tlj")) return "the-last-jedi";
  if (name.includes("mandaloriano")) return "the-mandalorian";

  return "other";
}

function getItemsBySection(sectionId) {
  if (sectionId === "books") {
    return books;
  }

  if (sectionId === "comics") {
    return comics;
  }

  return inventory
    .filter((item) => getItemSection(item) === sectionId)
    .sort((a, b) => {
      return (a.displayOrder || 9999) - (b.displayOrder || 9999);
    });
}

function renderStats() {
  const totalItems = inventory.length;
  const totalFigures = inventory.filter((item) => item.category === "figure").length;
  const totalCollectionObjects = inventory.filter(
    (item) => item.category === "valuable-object"
  ).length;

  const totalBooks = books.length;
  const totalComics = comics.length;

  return `
    <section class="stats">
      <article class="stat-card">
        <span>Total de piezas</span>
        <strong>${totalItems}</strong>
      </article>

      <article class="stat-card">
        <span>Figuras</span>
        <strong>${totalFigures}</strong>
      </article>

      <article class="stat-card">
        <span>Objetos de colección</span>
        <strong>${totalCollectionObjects}</strong>
      </article>

      <article class="stat-card">
        <span>Libros</span>
        <strong>${totalBooks}</strong>
      </article>

      <article class="stat-card">
        <span>Cómics</span>
        <strong>${totalComics}</strong>
      </article>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <p>
        Proyecto personal creado por Joaquín García ·
        <a href="https://github.com/Joaquin7gg" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>
    </footer>
  `;
}

function openImageModal(imageSrc, imageAlt) {
  const existingModal = document.querySelector(".modal-overlay");

  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="image-modal">
      <button class="modal-close" aria-label="Cerrar modal">×</button>
      <img src="${imageSrc}" alt="${imageAlt}" />
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".modal-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        modal.remove();
      }
    },
    { once: true }
  );
}

function renderHome() {
  app.innerHTML = `
    <main class="app">
      <section class="hero hero-with-image">
        <div class="hero-copy">
          <p class="eyebrow">Inventario personal</p>
          <h1>Star Wars Collection</h1>
          <p class="hero-text">
            Bienvenidos a este espacio personal dedicado a compartir mi colección de figuras,
            libros, cómics y objetos relacionados con el universo de Star Wars. Aquí encontrarás
            una muestra de las piezas que he reunido a lo largo de los años, cada una con su
            propia historia y significado especial para mí como seguidor de esta saga. Desde las
            figuras más icónicas hasta los libros y cómics que han enriquecido mi experiencia
            como seguidor de Star Wars, este es un lugar para celebrar la pasión por esta galaxia
            muy, muy lejana.
          </p>
        </div>

        <button class="hero-image-button" id="heroImageButton" type="button">
          <img src="/images/hero/vitrina.jpg" alt="Vitrina de mi colección de Star Wars" />
        </button>
      </section>

      ${renderStats()}

      <section class="collection">
        <h2>Películas, series y colección</h2>

        <div class="grid">
          ${sections
            .filter((section) => getItemsBySection(section.id).length > 0)
            .map((section) => {
              const total = getItemsBySection(section.id).length;

              return `
                <button class="card section-card" data-section-id="${section.id}">
                  <img
                    src="${section.image}"
                    alt="${section.title}"
                    style="--image-fit: ${section.imageFit || "cover"}; --image-position: ${section.imagePosition || "center"}; --image-zoom: ${section.imageZoom || 1};"
                  />
                  <div class="card-content">
                    <p class="tag">${total} pieza${total !== 1 ? "s" : ""}</p>
                    <h3>${section.title}</h3>
                    <p>${section.description}</p>
                  </div>
                </button>
              `;
            })
            .join("")}
        </div>
      </section>

      ${renderFooter()}
    </main>
  `;

  document.querySelectorAll(".section-card").forEach((button) => {
    button.addEventListener("click", () => {
      renderSection(button.dataset.sectionId);
    });
  });

  const heroImageButton = document.querySelector("#heroImageButton");

  if (heroImageButton) {
    heroImageButton.addEventListener("click", () => {
      openImageModal(
        "/images/hero/vitrina.jpg",
        "Vitrina de mi colección de Star Wars"
      );
    });
  }
}

function renderBooksList(items) {
  const sortedBooks = [...items].sort((a, b) => {
    return (a.releaseYear || 9999) - (b.releaseYear || 9999);
  });

  return `
    <div class="books-list">
      ${sortedBooks
        .map(
          (book) => `
            <article class="book-row">
              <img
                class="book-cover"
                src="${book.image || "/images/figures/placeholder.jpg"}"
                alt="${book.title}"
              />

              <div class="book-info">
                <p class="tag">${book.category || "Libro"}</p>
                <h3>${book.title}</h3>
                <p>${book.author || "Autor desconocido"}</p>
                ${book.publisher ? `<small>${book.publisher}</small>` : ""}
              </div>

              <div class="book-meta">
                <span>Año de lanzamiento</span>
                <strong>${book.releaseYear || "Sin año"}</strong>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderComicsList(items) {
  const sortedComics = [...items].sort((a, b) => {
    return (a.releaseYear || 9999) - (b.releaseYear || 9999);
  });

  return `
    <div class="books-list">
      ${sortedComics
        .map(
          (comic) => `
            <article class="book-row">
              <img
                class="book-cover"
                src="${comic.image || "/images/figures/placeholder.jpg"}"
                alt="${comic.title}"
              />

              <div class="book-info">
                <p class="tag">${comic.category || "Cómic"}</p>
                <h3>${comic.title}</h3>
                <p>${comic.author || "Autor desconocido"}</p>
                ${comic.publisher ? `<small>${comic.publisher}</small>` : ""}
              </div>

              <div class="book-meta">
                <span>Año de lanzamiento</span>
                <strong>${comic.releaseYear || "Sin año"}</strong>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function openItemModal(item) {
  const existingModal = document.querySelector(".modal-overlay");

  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <button class="modal-close" aria-label="Cerrar modal">×</button>

      <div class="modal-image-wrapper">
        <img src="${item.image}" alt="${item.name}" />
      </div>

      <div class="modal-content">
        <p class="tag">${item.line || item.type}</p>
        <h2>${item.name}</h2>

        <div class="modal-meta">
          <span>${item.saga || "Objeto de colección"}</span>
          <span>${item.purchaseDate || "En curso"}</span>
        </div>

        <p class="modal-description">
          ${
            item.description ||
            "Pieza perteneciente a la colección personal. Descripción pendiente de añadir."
          }
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".modal-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        modal.remove();
      }
    },
    { once: true }
  );
}

function renderSection(sectionId) {
  const section = sections.find((section) => section.id === sectionId);
  const items = getItemsBySection(sectionId);

  app.innerHTML = `
    <main class="app">
      <button class="back-button" id="backButton">← Volver al inicio</button>

      <section class="hero">
        <p class="eyebrow">${items.length} pieza${items.length !== 1 ? "s" : ""}</p>
        <h1>${section.title}</h1>
        <p class="hero-text">${section.description}</p>
      </section>

      <section class="collection">
        <h2>Colección</h2>

        ${
          items.length === 0
            ? `<p class="empty-message">Todavía no hay piezas en esta sección.</p>`
            : sectionId === "books"
              ? renderBooksList(items)
              : sectionId === "comics"
                ? renderComicsList(items)
                : `
                  <div class="grid">
                    ${items
                      .map(
                        (item) => `
                          <article class="card item-card" data-item-id="${item.id}">
                            <img
                              src="${item.image}"
                              alt="${item.name}"
                              style="--image-fit: ${item.imageFit || "cover"}; --image-position: ${item.imagePosition || "center"}; --image-zoom: ${item.imageZoom || 1};"
                            />
                            <div class="card-content">
                              <p class="tag">${item.line || item.type}</p>
                              <h3>${item.name}</h3>
                              <p>${item.saga || "Objeto de colección"}</p>
                              <small>${item.purchaseDate || "En curso"}</small>
                            </div>
                          </article>
                        `
                      )
                      .join("")}
                  </div>
                `
        }
      </section>

      ${renderFooter()}
    </main>
  `;

  document.querySelector("#backButton").addEventListener("click", renderHome);

  document.querySelectorAll(".item-card").forEach((card) => {
    card.addEventListener("click", () => {
      const itemId = Number(card.dataset.itemId);
      const selectedItem = inventory.find((item) => item.id === itemId);

      if (selectedItem) {
        openItemModal(selectedItem);
      }
    });
  });
}

renderHome();