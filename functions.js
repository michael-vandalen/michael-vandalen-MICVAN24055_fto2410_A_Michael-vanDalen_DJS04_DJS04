import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

/**
 *
 * @param {Array} books - This is the list of books being/to be displayed.
 * @param {HTMLElement} container - This is where all the previews should be added to
 */
export function createBookPreviews(books, container) {
  const starting = document.createDocumentFragment();

  for (const { author, id, image, title } of books.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
          <img
              class="preview__image"
              src="${image}"
          />
          
          <div class="preview__info">
              <h3 class="preview__title">${title}</h3>
              <div class="preview__author">${authors[author]}</div>
          </div>
      `;

    starting.appendChild(element);
  }
  container.appendChild(starting);
}

/**
 * @param {Object} list -
 * @param {HTMLElement} dropdownList -
 * @param {string} defaultOptionText -
 */

export function populateDropdown(list, dropdown, defaultOptionText) {
  const fragment = document.createDocumentFragment();

  // Create the default "All" option
  const firstElement = document.createElement("option");
  firstElement.value = "any";
  firstElement.innerText = defaultOptionText;
  fragment.appendChild(firstElement);

  // Loop through the list and create an option for each item
  for (const [id, name] of Object.entries(list)) {
    const optionElement = document.createElement("option");
    optionElement.value = id;
    optionElement.innerText = name;
    fragment.appendChild(optionElement);
  }

  // Append the options to the dropdown
  dropdown.appendChild(fragment);
}

export function setTheme(theme) {
  const darkColor = theme === "night" ? "255, 255, 255" : "10, 10, 20";
  const lightColor = theme === "night" ? "10, 10, 20" : "255, 255, 255";

  document.documentElement.style.setProperty("--color-dark", darkColor);
  document.documentElement.style.setProperty("--color-light", lightColor);

  document.querySelector("[data-settings-theme]").value = theme;
}
