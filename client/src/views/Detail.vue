<script>
import { mapActions, mapWritableState } from 'pinia';
import { publicStore } from '../stores/public';


export default {
    computed: {
        ...mapWritableState(publicStore, ['singleNews', 'baseUrl', 'isLoading']),

        dateNews(){
            return new Date(this.singleNews.createdAt).toLocaleString('id-ID', {
                dateStyle: 'medium', 
                timeStyle: 'long', 
                hour12: false 
            })
        }
    },

    methods: {
        ...mapActions(publicStore, ['fetchNewsById'])
    },

    created(){
        const id = this.$route.params.id
        const sharepath = "https://simple-news-portal-w3.web.app" + this.$route.fullPath
        this.fetchNewsById(id, sharepath)
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
        <div class="row">
            <div class="col-md-9">
                <div class="card my-4 list-group-item-secondary shadow">
                    <div class="card-body text-center">
                        <h3 class="card-title fw-bold">{{ singleNews.title }}</h3>
                        <p class="card-text">
                            <i class="fa-solid fa-circle-user"></i>
                            <small class="ms-1">{{ singleNews.Author? singleNews.Author.username : "" }} - </small>
                            <span class="text-muted">{{ singleNews.Category? singleNews.Category.name : "" }}</span></p>
                        <p class="card-text"><small class="text-muted fst-italic">{{ dateNews }}</small></p>
                    </div>
                    <img :src="singleNews.imgUrl" class="card-img-top" alt="...">
                    <p class="card-text"><span class="fw-bold">Latest</span> - {{ singleNews.content }}</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card my-4 list-group-item-secondary shadow" style="width: 18rem;">
                    <div class="card-header">Share this news: </div>
                    <img :src="singleNews.QRCode" class="card-img-top" alt="...">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h5>About News Portal</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras sed felis eget velit aliquet sagittis id. Purus gravida quis blandit turpis cursus in hac habitasse.</p>
                        </li>
                    </ul>
                </div>
            </div>
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