<script>
import { mapActions, mapWritableState } from 'pinia';
import { publicStore } from '../stores/public';
import Card from "@/components/card.vue"

export default {
    components: {
        Card
    },

    computed: {
        ...mapWritableState(publicStore, ['bookmarks', 'isLoading'])
    },

    methods: {
        ...mapActions(publicStore, ['fetchBookmark'])
    },

    created(){
        this.fetchBookmark()
    }
}
</script>

<template>
    <div v-if="isLoading" id="preloader">
        <div class="loading">
            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_remmdtqv.json" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></lottie-player>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row g-4 mt-3">

            <div v-if="bookmarks.length === 0" class="d-flex flex-row justify-content-evenly mb-3">
                <div class="col-lg-6 col-md-8 col-sm-12">
                    <form class="text-light text-center">
                        <h1 class="mb-5">You don't have bookmarks yet . . .</h1>
                        <i class="fa-solid fa-poo" style="font-size: 200px;"></i>
                    </form>
                </div>
            </div>

            <Card v-for="bookmark in bookmarks" :key="bookmark.id" :bookmark="bookmark" />
        </div>
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
</style>