const { createApp } = Vue;

// Utilities
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function passwordStrength(password) {
  if (password.length < 6) return "weak";
  if (password.length < 8 || !/\d/.test(password)) return "medium";
  if (password.length >= 8 && /\d/.test(password) && /[\W_]/.test(password))
    return "strong";
  return "medium";
}

// LOGIN
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

// FORGOT PASSWORD
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

// REGISTER
if (document.getElementById("register-app")) {
  createApp({
    data() {
      return {
        username: "",
        email: "",
        password: "",
        passwordStrength: "",
        error: "",
        loading: false,
      };
    },
    watch: {
      password(newVal) {
        this.passwordStrength = passwordStrength(newVal);
      },
    },
    methods: {
      async submitRegister() {
        this.error = "";
        if (
          !this.username ||
          !validateEmail(this.email) ||
          this.passwordStrength === "weak"
        ) {
          this.error =
            "Please fill all fields correctly and ensure a strong password.";
          return;
        }
        this.loading = true;
        try {
          const response = await fetch("/wp-json/wp/v2/users/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              email: this.email,
              password: this.password,
            }),
          });

          if (response.ok) {
            window.location.href = "/login";
          } else {
            const res = await response.json();
            this.error = res.message || "Registration failed.";
          }
        } catch (e) {
          this.error = "Registration failed. Try again.";
        } finally {
          this.loading = false;
        }
      },
    },
    template: `
      <form @submit.prevent="submitRegister" class="form">
        <div class="form-group">
          <label>Username:</label>
          <input v-model="username" type="text" required />
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>

        <div class="form-group">
          <label>Password:</label>
          <input v-model="password" type="password" required />
          <small>Password Strength: <span :class="passwordStrength">{{ passwordStrength }}</span></small>
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>

        <button type="submit" class="form-button" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>
    `,
  }).mount("#register-app");
}
