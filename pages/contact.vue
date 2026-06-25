<template>
  <div class="contact-form">
    <h1 class="contact-title">CONTACTO</h1>
    <p class="contact-description">
      Puedes rellenar el siguiente formulario o enviar un correo a
      <a href="mailto:tiempodecalidadbusiness@gmail.com">tiempodecalidadbusiness@gmail.com</a>
    </p>

    <form
      name="contacto"
      method="POST"
      action="/contact"
      data-netlify="true"
      netlify-honeypot="bot-field"
      class="form-box"
      @submit.prevent="onSubmit"
    >
      <input type="hidden" name="form-name" value="contacto" />
      <p class="hidden-field">
        <label>No rellenar si eres humano: <input name="bot-field" /></label>
      </p>

      <input v-model="name" name="name" type="text" placeholder="Nombre" class="input-field" required />
      <input v-model="email" name="email" type="email" placeholder="Email" class="input-field" required />
      <textarea v-model="message" name="message" placeholder="Escribe tu mensaje" class="input-field text-area" required></textarea>

      <button type="submit" class="submit-button" :disabled="status === 'sending'">
        {{ status === 'sending' ? 'Enviando…' : 'Enviar' }}
      </button>
    </form>

    <p v-if="status === 'success'" class="form-msg success">
      ¡Gracias! Tu mensaje se ha enviado correctamente. Te responderé lo antes posible.
    </p>
    <p v-if="status === 'error'" class="form-msg error">
      Ha ocurrido un error al enviar. Inténtalo de nuevo o escríbeme directamente a
      <a href="mailto:tiempodecalidadbusiness@gmail.com">tiempodecalidadbusiness@gmail.com</a>.
    </p>
  </div>
</template>

<script setup>
const name = ref('')
const email = ref('')
const message = ref('')
const status = ref('idle') // idle | sending | success | error

const encode = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')

async function onSubmit() {
  status.value = 'sending'
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contacto',
        name: name.value,
        email: email.value,
        message: message.value
      })
    })
    status.value = 'success'
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (e) {
    status.value = 'error'
  }
}

useSeoMeta({
  title: 'Contacto',
  description:
    'Ponte en contacto con Tiempo de Calidad: rellena el formulario o escribe a tiempodecalidadbusiness@gmail.com para dudas, colaboraciones o sugerencias.'
})
</script>

<style scoped>
.contact-form {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 130px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.light-mode .contact-form {
  background-color: #ffffff;
}

.dark-mode .contact-form {
  background-color: #1e202c;
}

.contact-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
}

.contact-description {
  font-size: 15px;
  margin-bottom: 20px;
}

.contact-description a {
  color: #00a182;
  font-weight: bold;
  text-decoration: none;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hidden-field {
  display: none;
}

.input-field {
  padding: 10px;
  margin-top: 20px;
  background-color: #ffffff00;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0px;
  font-size: 16px;
  outline: none;
  font-family: inherit;
}

.input-field.text-area {
  height: 100px;
  resize: vertical;
}

.dark-mode .input-field {
  color: #ffffff;
}

.submit-button {
  background-color: #00a182;
  color: white;
  margin-top: 30px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #008f6d;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: default;
}

.form-msg {
  margin-top: 20px;
  font-size: 15px;
}

.form-msg.success {
  color: #00a182;
  font-weight: bold;
}

.form-msg.error {
  color: #e05260;
}

.form-msg a {
  color: inherit;
}

@media (max-width: 768px) {
  .contact-form {
    margin-top: 80px;
  }

  .contact-title {
    font-size: 20px;
  }

  .contact-description {
    font-size: 14px;
  }

  .input-field {
    font-size: 14px;
  }
}
</style>
