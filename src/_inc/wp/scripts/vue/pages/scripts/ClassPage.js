const { createApp } = Vue;

createApp({
  data() {
    return {
      classes: [],
    };
  },
  async mounted() {
    const slugs = window.location.pathname
      .replace(/^\/|\/$/g, "")
      .split("/")
      .filter(Boolean);

    const media = await this.fetchImages(slugs);

    this.classes = slugs.map((slug, i) => ({
      slug,
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      description: `Description for ${slug}...`, // You can later fetch real content from REST API
      image: media[slug] || "/wp-content/uploads/default-class.jpg",
    }));
  },
  methods: {
    async fetchImages(slugs) {
      const result = {};
      const response = await fetch(`/wp-json/wp/v2/media?per_page=100`);
      const data = await response.json();

      slugs.forEach(slug => {
        const matched = data.find(
          item => item.slug === slug || item.slug.includes(slug)
        );
        if (matched) result[slug] = matched.source_url;
      });

      return result;
    },
  },
}).mount("#class-app");
