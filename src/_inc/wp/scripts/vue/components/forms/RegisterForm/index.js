const { createApp } = Vue;
if (document.getElementById("forgot-password-app")) {
  createApp({
    data() {
      return {
        email: "",
        message: "",
        error: "",
        loading: false,
      };
    },
    methods: {
      async submitForgotPassword() {
        this.error = "";
        this.message = "";
        if (!validateEmail(this.email)) {
          this.error = "Enter a valid email.";
          return;
        }
        this.loading = true;
        try {
          const formData = new FormData();
          formData.append("user_login", this.email);

          const response = await fetch("/wp-login.php?action=lostpassword", {
            method: "POST",
            body: formData,
            credentials: "same-origin",
          });

          this.message =
            "If the email exists, you will receive a reset link shortly.";
        } catch (e) {
          this.error = "Failed to request reset.";
        } finally {
          this.loading = false;
        }
      },
    },
    template: `
      <form @submit.prevent="submitForgotPassword" class="form">
        <div class="form-group">
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>
        <p v-if="message" class="form-success">{{ message }}</p>

        <button type="submit" class="form-button" :disabled="loading">
          {{ loading ? 'Sending...' : 'Send Reset Link' }}
        </button>
      </form>
    `,
  }).mount("#forgot-password-app");
}
