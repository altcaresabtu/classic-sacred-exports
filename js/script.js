const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = contactForm.querySelector("button[type=\"submit\"]");

const nav = document.querySelector(".category-nav");
productCategories.forEach(category => {

  nav.innerHTML += `
    <a href="#${category.id}">
      ${category.title}
    </a>
  `;

});

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitButton.disabled = true;
  formStatus.textContent = "Sending your inquiry…";

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(contactForm)).toString(),
    });

    if (!response.ok) {
      throw new Error(`Form submission failed with status ${response.status}`);
    }

    contactForm.reset();
    formStatus.textContent = "Thank you. Your inquiry has been submitted.";
  } catch (error) {
    console.error("Unable to send inquiry:", error);
    formStatus.textContent = "We couldn’t send your inquiry. Please try again later or contact us by email.";
  } finally {
    submitButton.disabled = false;
  }
});

const container =
document.getElementById(
  "product-categories-container"
);

productCategories.forEach(function(category){

  let categoryHTML = `
    <section class="product-category" id="${category.id}">

      <h3 class="category-title">
        ${category.title}
      </h3>

      <div class="products">
  `;

  category.products.forEach(function(product){

    categoryHTML += `
      <article class="card">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="card-content">

          <h4>${product.name}</h4>

          <details>

            <summary>
              View product details
            </summary>

 ${createDetails(product.details)}
          </details>

        </div>

      </article>
    `;

  });

  categoryHTML += `
      </div>

    </section>
  `;

  container.innerHTML += categoryHTML;

});

function createDetails(details) {
  const labels = {
    description: "Description",
    brandedPackaging: "Branded Packaging",
    unitSpecifications: "Unit Specifications",
    hsCodeAndCertificate: "HS Code & Certificate",
    shelfLifeAndSku: "Shelf-Life & SKU",
  };

  return Object.entries(details)
    .map(([key, value]) => `
      <p>
        <strong>${labels[key] || key}</strong>:
        ${value}
      </p>
    `)
    .join("");
}

