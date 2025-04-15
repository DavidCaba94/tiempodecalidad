<template>
  <div class="contact-form">
    <Head>
      <Title>Contacto - Tiempo de Calidad</Title>
      <Meta name="description" content="Formulario de contacto para Tiempo de Calidad" />
      <link rel="icon" type="image/x-icon" href="/icon.ico" />
    </Head>
    <h1 class="contact-title">CONTACTO</h1>
    <p class="contact-description">Puedes rellenar el siguiente formulario o enviar un correo a <a href="mailto:tiempodecalidadbusiness@gmail.com">tiempodecalidadbusiness@gmail.com</a></p>
    <div class="form-box">
      <input v-model="name" type="text" placeholder="Nombre" class="input-field">
      <input v-model="email" type="email" placeholder="Email" class="input-field">
      <textarea v-model="message" placeholder="Escribe tu mensaje" class="input-field text-area"></textarea>
      <div class="submit-button" @change="sendForm()">Enviar</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  head() {
    return {
      title: 'Contacto - Tiempo de Calidad',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Formulario de contacto para Tiempo de Calidad'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }]
    }
  },
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    sendForm() {
      // Aquí puedes implementar la lógica para enviar el formulario
      alert('Formulario enviado');
    }
  },
}
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

.input-field {
  padding: 10px;
  margin-top: 20px;
  background-color: #ffffff00;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0px;
  font-size: 16px;
  outline: none;
}

.input-field.text-area {
  height: 100px;
}

.dark-mode .input-field {
  color: #ffffff;
}

.submit-button {
  background-color: #00a182;
  color: white;
  margin-top: 30px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #008f6d;
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