<template>
<v-row justify="center">
    <v-col
      cols="8"
      sm="10"
      md="4"
      lg="4"
    >
      <v-card ref="form" class="pa-10 mt-16" outlined>
        <v-card-text>
          <div class="login">
            <img src="../assets/logo.png" alt="logo" class="log-img">
          </div>
          <v-text-field
            autocomplete="off"
            ref="username"
            :prefix="prefixText"
            @focus="focusEvent"
            @abort="focusEvent"
            dense
            outlined
            v-model="phone"
            :rules="[() => !!phone || 'This field is required']"
            label="Username"
            type="tel"
            required
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            ref="name"
            dense
            outlined
            v-model="password"
            :rules="[() => !!password || 'This field is required']"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <div class="login">
            <v-btn color="primary"
            :block="!isLoading"
            :fab="isLoading"
            :loading="isLoading"
            :small="isLoading"
            @click="handleLogin"
            >Login</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      prefixText: '',
      phone: '',
      password: '',
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(['ADMIN_LOGIN_REQUEST', 'REFRESH_TOKEN_REQUEST', 'LOGOUT_REQUEST']),
    focusEvent(e) {
      this.prefixText = '+88';
      console.log(e);
    },
    async handleLogin() {
      try {
        this.isLoading = true;
        if (this.phone && this.password) {
          await this.ADMIN_LOGIN_REQUEST({
            phone: `88${this.phone}`,
            password: this.password,
          });
        }
        // setTimeout(async () => {
        //   await this.REFRESH_TOKEN_REQUEST();
        // }, 1000 * 12);
        // setTimeout(async () => {
        //   await this.LOGOUT_REQUEST();
        // }, 1000 * 15);
      } catch (err) {
        // console.log(err);
      }
      this.isLoading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  text-align: center;
}
img.log-img {
    margin: 30px;
    margin-top: 10px;
    height: 70px;
}
</style>
// https://vuejsexamples.com/tag/notification/
