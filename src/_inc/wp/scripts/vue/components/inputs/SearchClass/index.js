const { createApp } = Vue;

createApp({
  data() {
    return {
      search: "",
      classResults: [],
      lastRenderedList: [],
      highlightedIndex: -1,
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

      if (!this.areListsEqual(classes, this.lastRenderedList)) {
        this.classResults = classes;
        this.lastRenderedList = classes;
      }
    },
    areListsEqual(a, b) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i].slug !== b[i].slug || a[i].excerpt !== b[i].excerpt)
          return false;
      }
      return true;
    },
    navigateTo(slug) {
      window.location.href = `/${slug}`;
    },
    handleKeydown(e) {
      if (this.classResults.length === 0) return;

      if (e.key === "ArrowDown") {
        this.highlightedIndex =
          (this.highlightedIndex + 1) % this.classResults.length;
      } else if (e.key === "ArrowUp") {
        this.highlightedIndex =
          (this.highlightedIndex - 1 + this.classResults.length) %
          this.classResults.length;
      } else if (e.key === "Enter" && this.highlightedIndex >= 0) {
        this.navigateTo(this.classResults[this.highlightedIndex].slug);
      }
    },
    doSearchClick() {
      if (this.classResults.length > 0) {
        this.navigateTo(this.classResults[0].slug);
      }
    },
  },
  template: `
    <div class="position-relative">
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input
          type="text"
          class="form-control"
          placeholder="Search classes..."
          v-model="search"
          @input="onSearchInput"
          @keydown="handleKeydown"
        />
      </div>

      <ul
        class="list-group position-absolute w-100 z-3 mt-1 shadow"
        v-if="classResults.length > 0"
        style="max-height: 300px; overflow-y: auto;"
      >
        <li
          v-for="(item, index) in classResults"
          :key="item.slug"
          class="list-group-item list-group-item-action"
          :class="{ active: index === highlightedIndex }"
          @mouseover="highlightedIndex = index"
          @mouseleave="highlightedIndex = -1"
          @click="navigateTo(item.slug)"
          style="cursor: pointer;"
        >
          <div class="fw-bold">{{ item.name }}</div>
          <small class="text-muted">{{ item.excerpt }}</small>
        </li>
      </ul>
    </div>
  `,
}).mount("#class-search-bar");
