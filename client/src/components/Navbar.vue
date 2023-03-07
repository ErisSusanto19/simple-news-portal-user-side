<script>
import { mapActions, mapWritableState } from 'pinia';
import { publicStore } from '../stores/public';
import Swal from 'sweetalert2'


export default {
  computed: {
    ...mapWritableState(publicStore, ['isLogin','nickname', 'newsTitle', 'news', 'singleNews', 'currentPage', 'bookmarks'])
  },

  methods: {
    ...mapActions(publicStore, ['fetchNews']),

    logout(){
      Swal.fire({
        title: 'Are you sure want to quit?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, quit now!'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear()
          google.accounts.id.disableAutoSelect()
          this.isLogin = false
          this.bookmarks = []
          this.newsTitle = ""
          this.currentPage = 1
          this.fetchNews()
          this.$router.replace({name: 'home'})
        }
      })
    },

    changePage(view){
      if(view === 'home'){
        this.newsTitle = ""
        this.singleNews = {}
        this.$route.query.page = this.currentPage
        this.$route.query.title = this.newsTitle
        this.fetchNews()
        this.$router.push({name: view})
      } else if(view === 'bookmark'){
        if(this.isLogin){
          this.$router.push({name: view})
        } else{
          this.$router.push({name: 'login'})
        }
      } else{
        this.$router.push({name: view})
      }
    },

    async searchTitle(){
      this.currentPage = 1
      this.$route.query.page = this.currentPage
      this.$route.query.title = this.newsTitle
      await this.fetchNews()
      if(this.news.count === 0){
        this.$router.push({name: 'notfound'})
      } else {
        this.$router.push({name: 'home'})
      }
      // this.newsTitle = ""
    }
  },

  created(){
    if(localStorage.access_token){
      this.nickname = localStorage.name
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>

<template>
    <nav class="navbar navbar-dark sticky-top navbar-expand-lg bg-dark shadow border-bottom">
        <div class="container-fluid">
          <a @click.prevent="changePage('home')" class="navbar-brand" href="#">
            <img src="https://cdn.pixabay.com/photo/2012/04/14/14/30/newspaper-34126__480.png" alt="" width="50">
            <span class="ms-2">News Portal</span>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav mb-2 mb-md-0 me-auto">
              <li v-if="$route.fullPath == '/' || $route.fullPath == '/bookmark' || $route.name == 'detail' || $route.name == 'notfound'" class="nav-item">
                <a @click.prevent="changePage('home')" class="nav-link" href="#">
                Home
                </a>
              </li>
              <li v-if="$route.fullPath == '/' || $route.fullPath == '/bookmark' || $route.name == 'detail' || $route.name == 'notfound'" class="nav-item">
                <a @click.prevent="changePage('bookmark')" class="nav-link" href="#">
                Bookmark
                </a>
              </li>
              <li v-if="isLogin" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Hai, <span>{{ nickname }}</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="nav-item">
                    <a @click.prevent="logout" class="dropdown-item" href="#">
                        <i class="fa-solid fa-right-from-bracket"></i><i class="fa-solid fa-person-running"></i>
                        Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form v-if="$route.fullPath === '/' || $route.fullPath === '/notfound'" @click.prevent="searchClicked" class="d-flex flex-row">
                  <input v-model="newsTitle" class="form-control" type="text" name="name" placeholder="Search" aria-label="Search">
                  <button @click.prevent="searchTitle" class="btn btn-outline-light rounded ms-1" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <ul v-if="!isLogin && $route.fullPath === '/' || !isLogin && $route.fullPath === '/notfound'" class="navbar-nav mb-2 mb-md-0 ms-2">
              <li class="nav-item">
                <a @click.prevent="changePage('login')" class="nav-link" href="#">
                  <button type="button" class="btn btn-outline-light">Login</button>
                </a>
              </li>
              <li class="nav-item">
                <a @click.prevent="changePage('register')" class="nav-link" href="#">
                  <button type="button" class="btn btn-outline-light">Signup</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
    </nav>
</template>