<template>
<v-row justify="center">
    <v-col
      cols="8"
      sm="10"
      md="4"
      lg="3"
    >
      <v-card ref="form" class="pa-10 mt-fix" outlined>
        <v-card-text>
          <v-form lazy-validation autocomplete="off">
          <div class="login">
            <img src="../assets/logo.png" alt="logo" class="log-img">
          </div>
          <v-text-field
            autocomplete="off"
            ref="phone"
            :prefix="prefixText"
            @focus="focusEvent"
            @blur="focusEvent"
            dense
            outlined
            v-model="phone"
            :rules="[() => !!phone || 'This field is required', validatePhoneNumber]"
            placeholder="Phone"
            type="tel"
            required
            id="txtUserName"
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            ref="password"
            dense
            outlined
            v-model="password"
            :rules="[() => !!password || 'This field is required']"
            type="password"
            placeholder="Password"
            required
            id="txtUserName"
            @keyup.enter="handleLogin"
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
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import { formatNumber } from '../helpers/phoneNumber';

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
  computed: {
    loginForm() {
      return {
        password: this.password,
        phone: this.phone,
      };
    },
    validatePhoneNumber() {
      const { isValid } = formatNumber(`+88${this.phone}`);
      if (!isValid) return 'Phone number should be valid';
      return true;
    },
  },
  watch: {
  },
  methods: {
    ...mapActions(['ADMIN_LOGIN_REQUEST', 'REFRESH_TOKEN_REQUEST', 'LOGOUT_REQUEST']),
    focusEvent(e) {
      if (e.type === 'blur' && !this.phone) {
        this.prefixText = '';
      } else {
        this.prefixText = '+88';
      }
    },
    validdateLoginForm() {
      let formHasErrors = false;
      Object.keys(this.loginForm).forEach((f) => {
        if (!this.loginForm[f]) formHasErrors = true;
        this.$refs[f].validate(true);
      });
      return formHasErrors;
    },
    async handleLogin() {
      try {
        this.isLoading = true;
        const { number, isValid } = formatNumber(`+88${this.phone}`);
        const v = this.validdateLoginForm();
        if (this.phone && this.password && !v && isValid) {
          await this.ADMIN_LOGIN_REQUEST({
            phone: number,
            password: this.password,
          });
        }
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
.mt-fix {
  margin-top: 17vh;
}
#txtPassword{
    -webkit-text-security:disc;
}
</style>
