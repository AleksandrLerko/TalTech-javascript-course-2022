<template>
  <Header />
  <div class="container">
    <main role="main" class="pb-3">
      <RouterView />
    </main>
  </div>
  <Footer />
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

// import { usePersonsStore } from '@/stores/persons';
// import { PersonService } from './services/PersonService';

@Options({
  components: {
    Header, Footer
  }
})
export default class App extends Vue {
  // personsStore = usePersonsStore();
  // personService = new PersonService();

  // async mounted(): Promise<void> {
  //   this.personsStore.$state.persons =
  //     await this.personService.getAll();
  // }
}
</script>
