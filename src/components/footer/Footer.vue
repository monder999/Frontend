<template>
    <footer class="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="sr-only">
          Footer
        </h2>
        <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div class="xl:grid xl:grid-cols-3 xl:gap-8">
            <div class="space-y-8">
              <img
                class="h-7"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Company name"
              />
              <p class="text-sm leading-6 text-gray-300">
                Making the world a better place through constructing elegant hierarchies.
              </p>
              <div class="flex space-x-6">
                <!-- <a v-for="item in navigation.solutions" :key='item.name'  :href='item.href' class="text-gray-500 hover:text-gray-400">
                    <span className="sr-only">{item.name}</span>
                  
                  </a> -->
                    <!-- <item.icon className="h-6 w-6" aria-hidden="true" /> -->
              </div>
            </div>
            <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div class="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 class="text-sm font-semibold leading-6 text-white">Solutions</h3>
                  <ul role="list" class="mt-6 space-y-4">
                
                      <li v-for="item in navigation.solutions" :key='item.name'>
                        <a :href='item.href' class="text-sm leading-6 text-gray-300 hover:text-white">
                         {{item.name}}
                        </a>
                      </li>
                  
                  </ul>
                </div>
                <div class="mt-10 md:mt-0">
                  <h3 class="text-sm font-semibold leading-6 text-white">Support</h3>
                  <ul role="list" class="mt-6 space-y-4">
                  
                     
                    <li v-for="item in navigation.support" :key='item.name'>
                        <a :href='item.href' class="text-sm leading-6 text-gray-300 hover:text-white">
                         {{item.name}}
                        </a>
                      </li>
                   
                  </ul>
                </div>
              </div>
              <div class="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 class="text-sm font-semibold leading-6 text-white">Company</h3>
                  <ul role="list" class="mt-6 space-y-4">
                     
                    <li v-for="item in navigation.company" :key='item.name'>
                        <a :href='item.href' class="text-sm leading-6 text-gray-300 hover:text-white">
                         {{item.name}}
                        </a>
                      </li>
                  </ul>
                </div>
                <div class="mt-10 md:mt-0">
                  <h3 class="text-sm font-semibold leading-6 text-white">Legal</h3>
                  <ul role="list" class="mt-6 space-y-4">
                    <li v-for="item in navigation.legal" :key='item.name'>
                        <a :href='item.href' class="text-sm leading-6 text-gray-300 hover:text-white">
                         {{item.name}}
                        </a>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p class="text-xs leading-5 text-gray-400">&copy; 2020 Your Company, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
</template>


<script setup>
// import FacebookIcon from '../../components/icons/FacebookIcon.vue'
// import InstagramIcon from '../../components/icons/InstagramIcon.vue'
// import TwitterIcon from '../../components/icons/TwitterIcon.vue'
// import GithubIcon from '../../components/icons/GithubIcon.vue'
// import YoutubeIcon from '../../components/icons/YoutubeIcon.vue'


// components: {
//     FacebookIcon,
//     YouTubeIcon,
//     InstagramIcon,
//     GithubIcon,
//     TwitterIcon
//   }

const navigation = {
    solutions: [
      { name: 'Marketing', href: '#' },
      { name: 'Analytics', href: '#' },
      { name: 'Commerce', href: '#' },
      { name: 'Insights', href: '#' },
    ],
    support: [
      { name: 'Pricing', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'API Status', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Jobs', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Partners', href: '#' },
    ],
    legal: [
      { name: 'Claim', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
    ],
    // social: [
    //   {
    //     name: 'Facebook',
    //     href: '#',
    //     icon: FacebookIcon,
    //   },
    //   {
    //     name: 'Instagram',
    //     href: '#',
    //     icon: InstagramIcon,
    //   },
    //   {
    //     name: 'Twitter',
    //     href: '#',
    //     icon: TwitterIcon
    //   },
    //   {
    //     name: 'GitHub',
    //     href: '#',
    //     icon: GitHubIcon,
    //   },
    //   {
    //     name: 'YouTube',
    //     href: '#',
    //     icon: YoutubeIcon,
    //   },
    // ],
  }
</script>
