/** Init Menu  */
const mobileBtn = document.querySelector("[data-js-mobile-btn]")
const navToggles = document.querySelectorAll("[data-js-nav-toggle]")

/**
 * Toggle the visibility of the mobile menu
 * @param {NodeListOf<Element>} navToggles - All the nav toggle elements
 */
const toggleMobileMenu = () => {
  // Toggle aria-expanded attribute
  const toggleExpeded = mobileBtn.getAttribute("aria-expanded") === "false"
  mobileBtn.setAttribute("aria-expanded", toggleExpeded)

  // Toggle the menu visibility
  document.querySelector("[data-js-mobile-menu]").classList.toggle("hidden")
  navToggles.forEach((el) => el.classList.toggle("hidden"))
}

/** Add event listener to the mobile button  */
navToggles.forEach((item) =>
  item.addEventListener("click", () => toggleMobileMenu())
)
