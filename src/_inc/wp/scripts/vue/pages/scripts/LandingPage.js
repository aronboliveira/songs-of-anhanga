const { createApp } = Vue;

// 1) For the main landing page content (#app):
const landingApp = createApp({
  data() {
    return {
      images: [
        { src: "/wp-content/uploads/spirit1.png", alt: "Spirit 1" },
        { src: "/wp-content/uploads/spirit2.png", alt: "Spirit 2" },
        { src: "/wp-content/uploads/spirit3.png", alt: "Spirit 3" },
      ],
    };
  },
  mounted() {
    this.initHeaderVisibility();
  },
  methods: {
    // as previously shown for the header
    initHeaderVisibility() {
      const header = document.getElementById("site-header");
      let scrollTimeout;

      const updateHeaderVisibility = () => {
        const showHeader = sessionStorage.getItem("showHeader");
        if (window.scrollY === 0 || showHeader === "1") {
          header.classList.remove("hidden");
        } else {
          header.classList.add("hidden");
        }
      };

      window.addEventListener("scroll", () => {
        sessionStorage.setItem("showHeader", "1");
        clearTimeout(scrollTimeout);

        // Hide after 3s of inactivity
        scrollTimeout = setTimeout(() => {
          sessionStorage.setItem("showHeader", "0");
          updateHeaderVisibility();
        }, 3000);

        updateHeaderVisibility();
      });

      // Initial check
      updateHeaderVisibility();
    },
  },
});

// 2) For the footer (#footer-app):
landingApp.component("footer-nav", {
  data() {
    return {
      socialLinks: [
        {
          name: "Twitter",
          url: "https://twitter.com/YourProject",
          iconClass: "fab fa-twitter",
          ariaLabel: "Twitter",
        },
        {
          name: "Facebook",
          url: "https://facebook.com/YourProject",
          iconClass: "fab fa-facebook-f",
          ariaLabel: "Facebook",
        },
        {
          name: "Instagram",
          url: "https://instagram.com/YourProject",
          iconClass: "fab fa-instagram",
          ariaLabel: "Instagram",
        },
      ],
    };
  },
  template: `
    <nav class="footer-nav">
      <ul>
        <li v-for="link in socialLinks" :key="link.name">
          <a :href="link.url" target="_blank" class="social-icon" :aria-label="link.ariaLabel">
            <i :class="link.iconClass"></i>
          </a>
        </li>
      </ul>
    </nav>
  `,
});

// Create & mount the single app on multiple elements
landingApp.mount("#app");
if (document.getElementById("footer-app")) {
  landingApp.mount("#footer-app");
}
