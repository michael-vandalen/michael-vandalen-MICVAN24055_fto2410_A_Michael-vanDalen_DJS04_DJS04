import { authors, BOOKS_PER_PAGE } from "./data.js";

/**
 * Creates and appends book preview buttons to a given container element.
 * Each preview includes a book's cover image, title and author
 *
 * @param {Array} books - This is the list of books being/to be displayed. Each object should contain 'author', 'id', 'image' and 'title' properties.
 * @param {HTMLElement} container - This is the container where all the previews are appended to
 */
export function createBookPreviews(books, container) {
  const starting = document.createDocumentFragment();

  for (const { author, id, image, title } of books.slice(0, BOOKS_PER_PAGE)) {
    // Create a new button element to wrap the book preview
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    // Create the book preview and pass data to it using attributes
    const bookPreview = document.createElement("book-preview");
    bookPreview.setAttribute("image", image);
    bookPreview.setAttribute("title", title);
    bookPreview.setAttribute("authors", authors[author]);

    // Append the book preview to the button element
    element.appendChild(bookPreview);

    // Append the button (which contains the book preview) to the fragment
    starting.appendChild(element);
  }

  // Append all the generated book previews to the container
  container.appendChild(starting);
}

/**
 * This function populates a dropdown menu with options to filter for any genre/author
 *
 *
 * @param {Object} list - An object where keys represent option values and values represent option labels.
 * @param {HTMLElement} dropdownList - The dropdown menu where all the options will be appended
 * @param {string} defaultOptionText - This is the text for the default option ("All", "Select an option")
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

/**
 * This function is used to set the theme of the application using and updating css variables
 *
 * @param {string} theme - Two options of "night" being dark mode and "day" being light mode
 */

export function setTheme(theme) {
  const darkColor = theme === "night" ? "255, 255, 255" : "10, 10, 20";
  const lightColor = theme === "night" ? "10, 10, 20" : "255, 255, 255";

  document.documentElement.style.setProperty("--color-dark", darkColor);
  document.documentElement.style.setProperty("--color-light", lightColor);

  document.querySelector("[data-settings-theme]").value = theme;
}
