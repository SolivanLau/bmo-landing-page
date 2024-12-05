// DATA
// panel data
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

// MOBILE MENU
function initMobileMenu() {
    const mobileMenu = document.querySelector(".header__list");
    const menuButton = document.querySelector(".header__menu");

    menuButton.addEventListener("click", () => {
        menuButton.classList.toggle("active");
        document.body.classList.toggle("overlay--mobile-active");
        mobileMenu.classList.toggle("header__list--active");
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", !isExpanded);
    });
}
// HOW IT WORKS PANELS
function initHowItWorks() {
    const howItWorks = document.querySelector(".how-it-works");
    const panelButtons = howItWorks.querySelectorAll(".button");
    const text = howItWorks.querySelector(".how-it-works__text");
    const graphic = howItWorks.querySelector(".how-it-works__graphic");
    const youtubeEmbed = howItWorks.querySelector("iframe");

    panelButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const panelNumber = button.getAttribute("data-panel");

            panelButtons.forEach((btn) => {
                btn.classList.remove("button--active");
            });
            button.classList.toggle("button--active");

            text.innerHTML = "";
            text.innerHTML = panels[panelNumber].text;

            if (panels[panelNumber].graphicType === "gif") {
                youtubeEmbed.style.display = "none";

                const existingImg = graphic.querySelector("img");
                if (existingImg) existingImg.remove();

                const img = document.createElement("img");
                img.src = `/${panels[panelNumber].graphic}`;
                img.alt = "Checkout process through BMO PaySmart application";
                graphic.appendChild(img);
            } else {
                const existingImg = graphic.querySelector("img");
                if (existingImg) existingImg.remove();

                youtubeEmbed.style.display = "block";
            }
        });
    });
}

// VIDEO MODAL
function initVideoPlayer() {
    const videoButtons = document.querySelectorAll("[data-video-id]");
    const videoModal = document.querySelector(".modal");
    const closeButton = videoModal.querySelector(".modal__close");
    const iframe = videoModal.querySelector("iframe");

    videoButtons.forEach((button) => {
        button.addEventListener("click", () => {
            videoModal.removeAttribute("hidden");
            document.body.classList.add("overlay--active");

            const videoId = button.getAttribute("data-video-id");
            const iframeUrl = `https://www.youtube.com/embed/${videoId}`;
            iframe.src = iframeUrl;
        });
    });

    closeButton.addEventListener("click", () => {
        videoModal.setAttribute("hidden", true);
        document.body.classList.remove("overlay--active");
        iframe.src = "";
    });
}

// CALCULATOR SECTION
const calculatePaySmartPlan = (purchaseAmount) => {
    const amount = Number(purchaseAmount);
    if (isNaN(amount) || amount <= 0) return null;

    const monthlyFee = amount * 0.009;

    const terms = [3, 6, 12];
    const results = terms.map((term) => {
        const monthlyPrincipal = amount / term;
        const monthlyInstallment = monthlyPrincipal + monthlyFee;

        return {
            term: term,
            monthlyInstallment: monthlyInstallment.toFixed(2),
            monthlyPrincipal: monthlyPrincipal.toFixed(2),
            monthlyFee: monthlyFee.toFixed(2),
        };
    });

    return results;
};
function initCalculator() {
    const calculatorForm = document.querySelector(".calculator__form");
    const calculatorInput = calculatorForm.querySelector("#purchase");
    const calculatorGrid = document.querySelector(".calculator__grid");

    calculatorForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    calculatorInput.addEventListener("input", (e) => {
        let value = e.target.value;

        if (isNaN(value) || value <= 0) {
            return;
        } else {
            const results = calculatePaySmartPlan(value);

            results.forEach((result) => {
                const card = calculatorGrid.querySelector(`[data-term="${result.term}"]`);
                if (!card) return;

                const installmentAmountNode = card.querySelector(
                    ".calculator__installment-amount .calculator__data",
                );
                const principalAmountNode = card.querySelector(
                    ".calculator__monthly-principal .calculator__data",
                );
                const monthlyFeeNode = card.querySelector(
                    ".calculator__monthly-fee .calculator__data",
                );

                installmentAmountNode.textContent = `$${result.monthlyInstallment}`;
                principalAmountNode.textContent = `$${result.monthlyPrincipal}`;
                monthlyFeeNode.textContent = `$${result.monthlyFee}`;
            });
        }
    });
}

// ACCORDIONS

function initAccordion() {
    const accordionItems = document.querySelectorAll(".accordion__item");

    accordionItems.forEach((item) => {
        const header = item.querySelector(".accordion__header");

        header.addEventListener("click", () => {
            const isActive = item.classList.contains("accordion__item--active");

            // Close all items
            accordionItems.forEach((otherItem) => {
                otherItem.classList.remove("accordion__item--active");
            });

            // If clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add("accordion__item--active");
            }
        });
    });
}
// OVERLAYS
function initOverlayInteractions() {
    const mobileMenu = document.querySelector(".header__list");
    const menuButton = document.querySelector(".header__menu");
    const videoModal = document.querySelector(".modal");
    const iframe = videoModal.querySelector("iframe");

    document.addEventListener("click", (event) => {
        if (
            document.body.classList.contains("overlay--active") ||
            document.body.classList.contains("overlay--mobile-active")
        ) {
            if (
                mobileMenu.classList.contains("header__list--active") &&
                !mobileMenu.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                mobileMenu.classList.remove("header__list--active");
                menuButton.classList.remove("active");
                document.body.classList.remove("overlay--mobile-active");
                menuButton.setAttribute("aria-expanded", "false");
            }

            if (
                videoModal.classList.contains("modal--active") &&
                !videoModal.contains(event.target)
            ) {
                videoModal.classList.remove("modal--active");
                document.body.classList.remove("overlay--active");
                iframe.src = "";
            }
        }
    });
}

function init() {
    initMobileMenu();
    initHowItWorks();
    initVideoPlayer();
    initCalculator();
    initAccordion();
    initOverlayInteractions();
}

document.addEventListener("DOMContentLoaded", init);
