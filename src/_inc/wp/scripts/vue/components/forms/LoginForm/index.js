const { createApp } = Vue;
if (document.getElementById("login-app")) {
  createApp({
    data() {
      return {
        email: "",
        password: "",
        error: "",
        loading: false,
      };
    },
    methods: {
      async submitLogin() {
        this.error = "";
        if (!validateEmail(this.email) || !this.password) {
          this.error = "Valid email and password are required.";
          return;
        }
        this.loading = true;
        try {
          const formData = new FormData();
          formData.append("log", this.email);
          formData.append("pwd", this.password);
          formData.append("rememberme", "1");
          formData.append("redirect_to", window.location.origin);

          const response = await fetch("/wp-login.php", {
            method: "POST",
            body: formData,
            credentials: "same-origin",
          });

          if (response.redirected) {
            window.location.href = response.url; // On success, WP redirects
          } else {
            this.error = "Login failed. Check credentials.";
          }
        } catch (e) {
          this.error = "Login failed. Please try again.";
        } finally {
          this.loading = false;
        }
      },
    },
    template: `
      <form @submit.prevent="submitLogin" class="form">
        <div class="form-group">
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>

        <div class="form-group">
          <label>Password:</label>
          <input v-model="password" type="password" required />
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>

        <button type="submit" class="form-button" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    `,
  }).mount("#login-app");
}
