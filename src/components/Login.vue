<template>
    <section class="text-gray-600 body-font font-rajdhani bg-ash">
        <div class="container px-5 mx-auto flex justify-center items-center h-screen">
          <div class="w-full flex flex-wrap justify-center items-center">
            <div class="xl:w-1/3 lg:w-2/4 md:w-1/2 w-full
            nm-flat-ash-lg rounded-lg p-8 flex flex-col md:mt-0">
              <h2 class="text-black text-xl font-semibold
              title-font mb-2 self-center text-center">
                Sign In
              </h2>
              <p class="text-black text-base mb-5 self-center text-center">
                Enter your phone number and password to sign in.
              </p>
              <div class="relative mb-4">
                <input
                  v-model="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  class="w-full bg-ash nm-inset-ash rounded-lg border
                  border-gray-300
                  focus:border-red-100
                  focus:ring-2 focus:ring-gray-400 text-base outline-none
                  text-gray-700 py-2 px-3 leading-8 transition-colors
                  duration-200 ease-in-out"
                />
              </div>
              <div class="relative mb-4">
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  class="w-full bg-ash nm-inset-ash rounded-lg border
                  border-gray-300 focus:border-red-100 focus:ring-2
                  focus:ring-gray-400 text-base outline-none text-gray-700
                  py-2 px-3 leading-8 transition-colors duration-200
                  ease-in-out"
                />
              </div>
              <button
                @click="handleLogin"
                class="transition duration-300 font-semibold
                text-black hover:text-ash border-t-2 nm-flat-ash
                border-0 py-3 px-8 focus:outline-none hover:bg-black
                rounded-lg text-lg flex justify-center items-center
                space-x-8"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['ADMIN_LOGIN_REQUEST', 'REFRESH_TOKEN_REQUEST', 'LOGOUT_REQUEST']),
    async handleLogin() {
      try {
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
        this.$router.push('/dashboard');
      } catch (err) {
        // console.log(err);
      }
    },
  },
};
</script>
