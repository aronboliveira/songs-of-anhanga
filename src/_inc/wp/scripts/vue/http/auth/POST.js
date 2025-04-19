export async function postRegister() {
  const response = await fetch("/wp-json/custom-auth/v1/register", {
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
}
