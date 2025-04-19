<template>
  <div class="position-relative">
    <div class="input-group">
      <span class="input-group-text" aria-hidden="true">
        <span class="search-icon" role="img">
          <!-- Bootstrap "search" SVG icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 
              1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.656a5.5 
              5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"
            />
          </svg>
        </span>
      </span>

      <input
        type="text"
        class="form-control"
        placeholder="Search classes..."
        v-model="search"
        @input="onSearchInput"
        @keydown="handleKeydown"
        aria-label="Search class"
      />
    </div>

    <ul
      class="list-group position-absolute w-100 z-3 mt-1 shadow"
      v-if="classResults.length > 0"
      style="max-height: 300px; overflow-y: auto"
    >
      <li
        v-for="(item, index) in classResults"
        :key="item.slug"
        class="list-group-item list-group-item-action"
        :class="{ active: index === highlightedIndex }"
        @mouseover="highlightedIndex = index"
        @mouseleave="highlightedIndex = -1"
        @click="navigateTo(item.slug)"
        style="cursor: pointer"
      >
        <div class="fw-bold">{{ item.name }}</div>
        <small class="text-muted">{{ item.excerpt }}</small>
      </li>
    </ul>
  </div>
</template>
