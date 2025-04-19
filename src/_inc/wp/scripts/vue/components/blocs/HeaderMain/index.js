const { createApp } = Vue;

createApp({
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
}).mount("#app");
