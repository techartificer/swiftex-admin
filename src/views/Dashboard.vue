<template>
  <div>
    <div class="p-6 bg-ash">
        <div class="bg-white nm-flat-white h-full p-3 rounded-3xl">
          <div class="bg-ash rounded-3xl h-full flex">
            <nav class="w-1/6 bg-ash shadow-left rounded-tl-3xl
            rounded-bl-3xl dark:bg-gray-800 select-none overflow-y-auto
            transition duration-500 ease-in-out flex flex-col items-center">
              <div class="mt-20">
                <img class="w-44" src="@/assets/img/altlogoswiftex1.png" alt="" />
              </div>
              <div class="mt-12">
                <ul class="flex flex-col justify-center space-y-8">
                  <DashNavbar
                    exact={true}
                    to="/dashboard"
                    text="Dashboard"
                    icon={homeOutlined}
                  />
                  <DashNavbar
                    exact={true}
                    to="/dashboard/product"
                    text="Product"
                  />
                  <DashNavbar
                    exact={true}
                    to="/dashboard/clients"
                    text="Clients"
                  />
                  <DashNavbar exact={true} to="/dashboard/chat" text="Chat" />
                </ul>
              </div>
            </nav>
            <div class="w-5/6 rounded-br-3xl rounded-tr-3xl px-16">
              <nav class="flex justify-between pt-8 mb-10">
                <div class="flex items-center">
                  <input
                    type="text"
                    id="text"
                    name="text"
                    placeholder="search"
                    class="w-full nm-inset-ash rounded-2xl focus:ring-2
                    focus:ring-gray-400 text-base outline-none text-gray-600
                    py-2 pl-4 pr-5 leading-8 transition-colors duration-200
                    ease-in-out"
                  />
                  <div class="-ml-3">
                    <SquereButton design="fas fa-search text-red-700 text-lg" />
                  </div>
                </div>
                <div class="flex justify-between items-center space-x-4">
                  <SquereButton design="fa fa-bell-o text-red-700 text-lg px-1" />
                  <SquereButton design="fa fa-cog text-red-700 text-lg px-1" />
                  <DropdownMenu
                    name="Donuld Trump"
                    image="@/assets/img/dummy-person.png"
                  />
                </div>
              </nav>
              <div class="flex flex-col space-y-8 mb-16">
                <h3 class="text-black text-4xl font-bold tracking-tight">
                  Analetics Overview
                </h3>
                <div class="w-full flex justify-between">
                  <div class="w-1/5 h-32 nm-flat-ash-lg rounded-2xl">
                    test
                  </div>
                  <div class="w-1/5 h-32 nm-flat-ash-lg rounded-2xl">
                    test
                  </div>
                  <div class="w-1/5 h-32 nm-flat-ash-lg rounded-2xl">
                    test
                  </div>
                  <div class="w-1/5 h-32 nm-flat-ash-lg rounded-2xl">
                    test
                  </div>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="w-1/6 flex flex-col justify-center items-between">
                  <div class="w-full flex justify-between items-center mb-12">
                    <h3 class="text-black font-semibold text-2xl">
                      Top Marchants
                    </h3>
                    <SquereButton design="fa fa-sliders text-red-700 text-xl px-1" />
                  </div>
                  <div class="w-full flex flex-wrap flex-col justify-center space-y-8">
                    <div class="w-full h-20 nm-flat-ash-lg rounded-2xl">
                      test
                    </div>
                    <div class="w-full h-20 nm-flat-ash-lg rounded-2xl">
                      test
                    </div>
                    <div class="w-full h-20 nm-flat-ash-lg rounded-2xl">
                      test
                    </div>
                    <div class="w-full h-20 nm-flat-ash-lg rounded-2xl">
                      test
                    </div>
                    <div class="w-full h-20 nm-flat-ash-lg rounded-2xl">
                      test
                    </div>
                  </div>
                </div>
                <div class="w-4/6 flex flex-col justify-center items-between">
                  <div class="w-full flex justify-between items-center mb-12">
                    <h3 class="text-black font-semibold text-2xl">
                      Top Marchants
                    </h3>
                    <SquereButton design="fa fa-sliders text-red-700 text-xl px-1" />
                  </div>
                  <div class="w-full flex flex-wrap flex-col justify-center space-y-8">
                    <div class="w-full h-36 nm-flat-ash-lg rounded-2xl">
                      test
                    </div>
                    <div class="w-full h-36 nm-flat-ash-lg rounded-2xl">
                      test
                    </div>
                    <div class="w-full h-36 nm-flat-ash-lg rounded-2xl">
                      test
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import SquereButton from '@/components/Buttons/SquereButton.vue';

export default {
  name: 'Dashboard',
  components: {
    SquereButton,
  },
};
</script>
