// MOBILE MENU
const mobileMenu = document.querySelector(".header__list");
const menuButton = document.querySelector(".header__menu");

menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("active");
    document.body.classList.toggle("overlay--mobile-active");
    mobileMenu.classList.toggle("header__list--active");
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !isExpanded);
});

// HOW IT WORKS
const howItWorks = document.querySelector(".how-it-works");
const panelButtons = howItWorks.querySelectorAll(".button");

const text = howItWorks.querySelector(".how-it-works__text");
const graphic = howItWorks.querySelector(".how-it-works__graphic");

const youtubeEmbed = howItWorks.querySelector("iframe");

const panels = [
    {
        text: `      <p>
                    Enjoy lower monthly payments with no interest and a low monthly fee. Convert your recent qualifying purchase into a BMO PaySmart Installment Plan through the BMO Mobile App or BMO <a href="#" class="link link--body">Online Banking</a> today.
                  </p>

                  <ol class="list list--number">
                    <li>
                      <p class="text--bold">Log in to your account</p>
                      <p>Sign in to <a href="#" class="link link--body">Online Banking</a> or Mobile Banking.</p>
                    </li>
                    <li>
                      <p class="text--bold">Select a purchase</p>
                      <p>Choose an eligible credit card purchase you'd like to convert into a PaySmart plan. Or you can go to the Installment Plan tab and click Create to view a list of all qualifying transactions.</p>
                    </li>
                    <li>
                      <p class="text--bold">Choose a plan</p>
                      <p>Pick between the 3, 6, or 12 month options and review the monthly fee (up to 0.9%†1) that applies - no interest.</p>
                    </li>
                    <li>
                      <p class="text--bold">Give consent</p>
                      <p>Read and agree to the BMO PaySmart Terms and Conditions.</p>
                    </li>
                  </ol>`,
    },
    {
        text: `         <p>
                            Checkout with a BMO PaySmart Installment Plan and make your purchases more manageable. At <a href="#" class="link link--body">participating retailers</a>, eligible cardholders can choose a PaySmart Installment Plan at checkout to split a qualifying purchase into equal monthly payments with no fees, just monthly interest - it's that easy!
                          </p>

                          <ol class="list list--number">
                            <li>
                              <p class="text--bold">Make a purchase</p>
                              <p>
                                Use your credit card to make a qualifying purchase with  <a href="#" class="link link--body">participating retailers</a>.
                              </p>
                            </li>
                            <li>
                              <p class="text--bold">Choose your plan</p>
                              <p>If your card is eligible, you'll be asked to select an installment plan.</p>
                            </li>
                            <li>
                              <p class="text--bold">Give consent</p>
                              <p>Review and agree to the terms and conditions of the plan to complete the purchase.</p>
                            </li>
                            <li>
                              <p class="text--bold">Get your receipt</li>
                              </p>
                              <p>Your physical or online receipt will show the installment plan details, and you'll get an email confirming your request.</p>
                            </li>
                          </ol>`,
        graphicType: "gif",
        graphic: "how-it-works-checkout.gif",
    },
];
panelButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const panelNumber = button.getAttribute("data-panel");

        // revert button state
        panelButtons.forEach((btn) => {
            btn.classList.remove("button--active");
        });
        // set new button state
        button.classList.toggle("button--active");

        text.innerHTML = "";
        text.innerHTML = panels[panelNumber].text;

        if (panels[panelNumber].graphicType === "gif") {
            // Hide YouTube embed
            youtubeEmbed.style.display = "none";

            // Remove any existing images first
            const existingImg = graphic.querySelector("img");
            if (existingImg) existingImg.remove();

            // Create and append new image
            const img = document.createElement("img");
            img.src = `/${panels[panelNumber].graphic}`;
            img.alt = "Checkout process through BMO PaySmart application";
            graphic.appendChild(img);
        } else {
            // Remove any existing images
            const existingImg = graphic.querySelector("img");
            if (existingImg) existingImg.remove();

            // Show YouTube embed
            youtubeEmbed.style.display = "block";
        }
    });
});
