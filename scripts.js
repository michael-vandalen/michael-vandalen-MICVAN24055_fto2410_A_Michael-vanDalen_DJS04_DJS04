import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { createBookPreviews, populateDropdown, setTheme } from "./functions.js";

let page = 1;
let matches = books;

// This displays the first set of books
const booksContainer = document.querySelector("[data-list-items]");
createBookPreviews(matches, booksContainer);

// Populating the dropdown menu with different genres
populateDropdown(
  genres,
  document.querySelector("[data-search-genres]"),
  "All Genres"
);

// Populating the dropdown menu with different authors
populateDropdown(
  authors,
  document.querySelector("[data-search-authors]"),
  "All Authors"
);

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  setTheme("night");
} else {
  setTheme("day");
}

document.querySelector("[data-list-button]").innerText = `Show more (${
  books.length - BOOKS_PER_PAGE
})`;
document.querySelector("[data-list-button]").disabled =
  matches.length - page * BOOKS_PER_PAGE > 0;

document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })</span>
`;

// All the different type of eventlistners (Also in functions.js??)
function setUpEventListeners() {
  // Search Overlay - To open/close
  document
    .querySelector("[data-header-search]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = true;
      document.querySelector("[data-search-title]").focus();
    });

  document
    .querySelector("[data-search-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = false;
    });
  // Settings overlay - To open/close
  document
    .querySelector("[data-header-settings]")
    .addEventListener("click", () => {
      document.querySelector("[data-settings-overlay]").open = true;
    });
  document
    .querySelector("[data-settings-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-settings-overlay]").open = false;
    });
  // To close the books detail modal
  document.querySelector("[data-list-close]").addEventListener("click", () => {
    document.querySelector("[data-list-active]").open = false;
  });
  // To change the theme
  document
    .querySelector("[data-settings-form]")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      // Used my theme function to set the
      setTheme(formData.get("theme"));

      document.querySelector("[data-settings-overlay]").open = false;
    });
  // To filter for a book
  document
    .querySelector("[data-search-form]")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const filters = Object.fromEntries(formData);
      const result = [];

      for (const book of books) {
        let genreMatch = filters.genre === "any";

        for (const singleGenre of book.genres) {
          if (genreMatch) break;
          if (singleGenre === filters.genre) {
            genreMatch = true;
          }
        }

        if (
          (filters.title.trim() === "" ||
            book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
          (filters.author === "any" || book.author === filters.author) &&
          genreMatch
        ) {
          result.push(book);
        }
      }

      page = 1;
      matches = result;

      if (result.length < 1) {
        document
          .querySelector("[data-list-message]")
          .classList.add("list__message_show");
      } else {
        document
          .querySelector("[data-list-message]")
          .classList.remove("list__message_show");
      }

      // Updating the book list after you searched
      document.querySelector("[data-list-items]").innerHTML = "";
      createBookPreviews(result, document.querySelector("[data-list-items]"));

      document.querySelector("[data-list-button]").disabled =
        matches.length - page * BOOKS_PER_PAGE < 1;

      document.querySelector("[data-list-button]").innerHTML = `
          <span>Show more</span>
          <span class="list__remaining"> (${
            matches.length - page * BOOKS_PER_PAGE > 0
              ? matches.length - page * BOOKS_PER_PAGE
              : 0
          })</span>
      `;

      window.scrollTo({ top: 0, behavior: "smooth" });
      document.querySelector("[data-search-overlay]").open = false;
    });

  // The show more button for displaying next set of books
  document.querySelector("[data-list-button]").addEventListener("click", () => {
    createBookPreviews(
      matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE),
      document.querySelector("[data-list-items]")
    );
    page += 1;
  });
  // To preview a book
  document
    .querySelector("[data-list-items]")
    .addEventListener("click", (event) => {
      const pathArray = Array.from(event.path || event.composedPath());
      let active = null;

      for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
          let result = null;

          for (const singleBook of books) {
            if (result) break;
            if (singleBook.id === node?.dataset?.preview) result = singleBook;
          }

          active = result;
        }
      }

      if (active) {
        document.querySelector("[data-list-active]").open = true;
        document.querySelector("[data-list-blur]").src = active.image;
        document.querySelector("[data-list-image]").src = active.image;
        document.querySelector("[data-list-title]").innerText = active.title;
        document.querySelector("[data-list-subtitle]").innerText = `${
          authors[active.author]
        } (${new Date(active.published).getFullYear()})`;
        document.querySelector("[data-list-description]").innerText =
          active.description;
      }
    });
}

setUpEventListeners();
