<template>
  <header ref="headerEl" class="site-header">
    <nav class="main-nav">
      <div class="nav-left">
        <!-- <NuxtLink to="/" class="nav-logo">Folklore RPG</NuxtLink> -->
        <!-- <NuxtLink to="#story" class="nav-link">Story</NuxtLink> -->
        <!-- <NuxtLink to="#characters" class="nav-link">Characters</NuxtLink> -->
        <!-- <NuxtLink to="#world" class="nav-link">World</NuxtLink> -->
      </div>
      <div class="nav-right">
        <button v-if="isLoggedIn" @click="logout" class="nav-button">Logout</button>
        <!-- <NuxtLink v-else to="/login" class="nav-button">Login</NuxtLink> -->
        <!-- <NuxtLink v-else to="/register" class="nav-button">Register</NuxtLink> -->
      </div>
    </nav>
  </header>
</template>

<script setup>
  // import { ref, onMounted } from "vue";
  // import { useRouter } from "vue-router";
  // const headerEl = ref(null),
  //   isLoggedIn = ref(false), // TODO: replace with real auth state
  //   router = useRouter();
  // function logout() {
  //   // TODO: call your logout API
  //   isLoggedIn.value = false;
  //   router.push("/");
  // }
  // onMounted(() => {
  //   let scrollTimeout: ReturnType<typeof setTimeout>;
  //   const updateHeaderVisibility = () => {
  //     const show = sessionStorage.getItem("showHeader");
  //     if (window.scrollY === 0 || show === "1") {
  //       headerEl.value?.classList.remove("hidden");
  //     } else {
  //       headerEl.value?.classList.add("hidden");
  //     }
  //   };

  //   window.addEventListener("scroll", () => {
  //     sessionStorage.setItem("showHeader", "1");
  //     clearTimeout(scrollTimeout);
  //     scrollTimeout = setTimeout(() => {
  //       sessionStorage.setItem("showHeader", "0");
  //       updateHeaderVisibility();
  //     }, 3000);
  //     updateHeaderVisibility();
  //   });

  //   updateHeaderVisibility();
  // });
</script>

<style scoped></style>
