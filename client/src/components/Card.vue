<script>
import { mapActions, mapWritableState } from 'pinia';
import { publicStore } from '../stores/public';


export default {
    props: {
        info: Object,
        bookmark: Object
    },

    data(){
        return {
            infoCard: '',
            bookmarkCard: ''
        }
    },

    created(){
        if(this.info){
            this.infoCard = this.info
        }
        if(this.bookmark){
            this.bookmarkCard = this.bookmark
        }
    },

    computed: {
        ...mapWritableState(publicStore, ['page', 'isLogin']),

        dateNews(){
            return new Date(this.infoCard? this.infoCard.createdAt : "").toLocaleString('id-ID', {
                dateStyle: 'medium', 
                timeStyle: 'long', 
                hour12: false 
            })
        },

        dateNewsBookmark(){
            return new Date(this.bookmarkCard.News? this.bookmarkCard.News.createdAt : "").toLocaleString('id-ID', {
                dateStyle: 'medium', 
                timeStyle: 'long', 
                hour12: false 
            })
        } 
    },

    methods: {
        ...mapActions(publicStore, ['addBookmark', 'deleteBookmark']),

        clickRead(){
            this.page = 'detail'
            this.$router.push("/detail/" + this.info.id)
        },

        clickReadBookmark(){
            this.page = 'detail'
            this.$router.push("/detail/" + this.bookmark.NewsId)
        },

        clickBookmark(){
            if(this.isLogin ){
                this.addBookmark(this.info.id)
            } else {
                this.page = 'login'
                this.$router.push("/login")
            }
        },

        clickRemove(){
            this.deleteBookmark(this.bookmark.id)
        }
    }
}
</script>

<template>
    <div class="col-sm-4">
        <div class="card list-group-item-secondary shadow">
            <img v-if="$route.fullPath === '/'" :src="infoCard.imgUrl" class="card-img shadow" style="height: 240px; object-fit: cover;" alt="...">
            <img v-if="$route.fullPath === '/bookmark'" :src="bookmarkCard.News? bookmarkCard.News.imgUrl : ''" class="card-img shadow" style="height: 240px; object-fit: cover;" alt="...">
            <div class="card-body">
                <div class="d-flex justify-content-between mb-3">
                    <a v-if="$route.fullPath === '/'" @click.prevent="clickRead" class="text-dark" href="" style="text-decoration: none;">
                        <i class="fa-brands fa-readme"></i>
                        Read
                    </a>
                    <a v-if="$route.fullPath === '/bookmark'" @click.prevent="clickReadBookmark" class="text-dark" href="" style="text-decoration: none;">
                        <i class="fa-brands fa-readme"></i>
                        Read
                    </a>
                    <a v-if="$route.fullPath === '/'" @click.prevent="clickBookmark" class="text-dark" href="" style="text-decoration: none;">
                        <i class="fa-solid fa-bookmark"></i>
                        Bookmark
                    </a>
                    <a v-if="$route.fullPath === '/bookmark'" @click.prevent="clickRemove" href="" class="text-danger" style="text-decoration: none;">
                        <i class="fa-solid fa-trash"></i>
                        Remove
                    </a> 
                </div>
                <h5 v-if="$route.fullPath === '/'" class="card-title fw-bold">{{ infoCard.title }}</h5>
                <h5 v-if="$route.fullPath === '/bookmark'" class="card-title fw-bold">{{ bookmarkCard.News? bookmarkCard.News.title : "" }}</h5>
                <p v-if="$route.fullPath === '/'" class="card-text fst-italic">
                    <i class="fa-solid fa-circle-user"></i> {{ infoCard.Author? infoCard.Author.username : "" }}
                </p>
                <p v-if="$route.fullPath === '/bookmark'" class="card-text fst-italic">
                    <i class="fa-solid fa-circle-user"></i> {{ bookmarkCard.News? bookmarkCard.News.Author.username : "" }}
                </p>
                <p v-if="$route.fullPath === '/'" class="card-text"><small class="text-muted">{{ dateNews }}</small></p>
                <p v-if="$route.fullPath === '/bookmark'" class="card-text"><small class="text-muted">{{ dateNewsBookmark }}</small></p>
            </div>
        </div>
    </div>
</template>