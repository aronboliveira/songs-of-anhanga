<?php
/** @var array $args Includes 'slugs' key */
$slugs = $args['slugs'] ?? [];

?>

<main id="class-app" class="class-page">
  <section class="class-header">
    <h1 class="class-title"><?= ucfirst(end($slugs)); ?></h1>
    <p class="class-path"><?= implode(' / ', array_map('ucfirst', $slugs)); ?></p>
  </section>

  <section class="class-sections">
    <!-- Vue mounts here, each class part is rendered with a Z-pattern layout -->
    <div v-for="(item, index) in classes" :key="item.slug" :class="['class-block', index % 2 === 0 ? 'left' : 'right']">
      <div class="class-image">
        <img :src="item.image" :alt="item.slug" />
      </div>
      <div class="class-description">
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </section>
</main>