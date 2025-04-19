<template>
  <div id="class-search-bar">
    <label for="class-search">Search a class:</label>
    <input
      list="class-options"
      id="class-search"
      v-model="search"
      @input="onSearchInput"
      placeholder="Start typing (e.g., war...)"
    />

    <datalist id="class-options">
      <option v-for="item in classResults" :key="item.slug" :value="item.name">
        {{ item.excerpt }}
      </option>
    </datalist>
  </div>
</template>
