<script>
import { mapActions, mapWritableState } from 'pinia';
import { publicStore } from '../stores/public';
import Card from "@/components/card.vue"


export default {
    components: {
        Card
    },

    computed: {
        ...mapWritableState(publicStore, ['news', 'currentPage', 'newsTitle', 'isLoading'])
    },

    methods: {
        ...mapActions(publicStore, ['fetchNews']),

        clickPage(page){
            this.currentPage = page
            this.$route.query.page = this.currentPage
            this.$route.query.title = this.newsTitle
            this.fetchNews()
        }
    },

    created(){
      this.$route.query.page = this.currentPage
      this.$route.query.title = this.newsTitle
      this.fetchNews()
    },
}
</script>

<template>
  <div v-if="isLoading" id="preloader">
    <div class="loading">
        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_remmdtqv.json" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></lottie-player>
    </div>
  </div>

  <div class="container-fluid">

    <!-- landing page -->
    <div class="jumbotron">
        <div class="container my-5">
            <div class="row align-items-center g-5">
              <div class="col-lg-6 text-center text-lg-start">
                <h1 class="display-3 text-white">Open Your Mind,<br>See The Real World</h1>
                <p class="text-white mb-4 pb-2">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
              </div>
              <div class="col-lg-6 text-center text-lg-end overflow-hidden">
                <img class="img-fluid" src="https://cdn.pixabay.com/photo/2012/04/14/14/30/newspaper-34126__480.png" alt="">
              </div>
            </div>
        </div>
    </div>

    <!-- content -->
    <div class="row g-4 mt-3">
        <Card v-for="info in news.rows" :key="info.id" :info="info" />
    </div>

    <!-- Pagination -->
    <nav class="my-4">
        <div class="d-flex justify-content-center">
            <vue-awesome-paginate
            :total-items="news.length != 0 ? news.count : 0"
            :items-per-page="9"
            :max-pages-shown="3"
            v-model="currentPage"
            :on-click = "clickPage"
            />
        </div>
    </nav>

  </div>
</template>

<style>
  #preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: #fff;
    opacity: 0.8;
  }

  #preloader .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(33,37,41);
    border: 1px solid white;
    color: white;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
    color: rgb(33,37,41);
  }
  .active-page {
    background-color: white;
    border: 1px solid white;
    color: rgb(33,37,41);
  }
  .active-page:hover {
    background-color: white;
  }
</style>