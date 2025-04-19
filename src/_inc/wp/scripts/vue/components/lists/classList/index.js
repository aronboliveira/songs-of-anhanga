const { createApp } = Vue;

// Utility to deeply compare arrays of objects (shallow on known fields)
function areClassListsEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].slug !== b[i].slug || a[i].excerpt !== b[i].excerpt) return false;
  }
  return true;
}

createApp({
  data() {
    return {
      search: "",
      classResults: [],
      lastRenderedList: [],
    };
  },
  methods: {
    async onSearchInput() {
      const query = this.search.trim();
      if (query.length < 2) {
        this.classResults = [];
        return;
      }

      const response = await fetch(
        `/wp-json/wp/v2/posts?search=${encodeURIComponent(
          query
        )}&per_page=10&_fields=slug,title,excerpt`
      );
      const data = await response.json();

      const classes = data.map(post => ({
        name: post.title.rendered,
        excerpt: post.excerpt?.rendered?.replace(/<[^>]+>/g, "") ?? "",
        slug: post.slug,
      }));

      if (!areClassListsEqual(classes, this.lastRenderedList)) {
        this.classResults = classes;
        this.lastRenderedList = classes;
      }
    },
  },
}).mount("#class-search-bar");
