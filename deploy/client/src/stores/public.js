import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
// import { ref } from "vue";

export const publicStore = defineStore('public', {
  state: () => ({
    // baseUrl: "http://localhost:3000",
    baseUrl: "https://simplenewsportal-production.up.railway.app",
    isLoading: false,
    isLogin: false,
    nickname: "",
    username: "",
    email: "",
    password: "",
    news: [],
    singleNews: {},
    bookmarks: [],
    currentPage: 1,
    newsTitle: "",
  }),

  actions: {
    async register(){
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "/pub/register",
          data: {
            username: this.username,
            email: this.email,
            password: this.password
          }
        })
        console.log(data);
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("name", data.name)
        this.username = ""
        this.email = ""
        this.password = ""
        this.isLogin = true
        this.newsTitle = ""
        this.nickname = data.name
        this.router.push("/")

        await Swal.fire({
          icon: 'success',
          title: `${data.email} successfully registered`,
          showConfirmButton: false,
          timer: 1500
        })

        Swal.fire({
          icon: 'success',
          title: `Welcome ${data.name}`,
          showConfirmButton: false,
          timer: 1500
        })

      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    },

    async login(){
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "/pub/login",
          data: {
            email: this.email,
            password: this.password
          }
        })
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("name", data.name)
        // console.log(data);
        this.email = ""
        this.password = ""
        this.isLogin = true
        this.newsTitle = ""
        this.nickname = data.name
        this.router.push("/")

        Swal.fire({
          icon: 'success',
          title: `Welcome ${data.name}`,
          showConfirmButton: false,
          timer: 1500
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    },

    async googleSignIn(response){
      try {
        const { credential } = response
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "/pub/google-sign-in",
          headers: { "google-oauth-token": credential }
        })
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("name", data.name)
        this.isLogin = true
        this.newsTitle = ""
        this.nickname = data.name
        this.router.push("/")

        Swal.fire({
          icon: 'success',
          title: `Welcome ${data.name}`,
          showConfirmButton: false,
          timer: 1500
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    },

    async fetchNews(){
      try {
        this.isLoading = true

        let path = "/pub/news?page=" + this.currentPage

        if(this.newsTitle){
          path = path + "&title=" + this.newsTitle
        }

        const { data } = await axios({
          method: "get",
          url: this.baseUrl + path
        })
        
        this.news = data
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      } finally {
        this.isLoading = false
      }
    },

    async fetchNewsById(id, sharepath){
      try {
        this.isLoading = true

        const { data } = await axios({
          method: "get",
          url: this.baseUrl + `/pub/news/${id}`,
          headers: {sharepath}
        })
        
        this.singleNews = data
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      } finally {
        this.isLoading = false
      }
    },

    async addBookmark(newsId){
      try {
        await axios({
          method: "post",
          url: this.baseUrl + "/pub/bookmarks/" + newsId,
          headers: {access_token: localStorage.access_token}
        })
        // console.log(data);
        Swal.fire({
          icon: 'success',
          title: `Successfully bookmarked`,
          showConfirmButton: false,
          timer: 1500
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    },

    async fetchBookmark(){
      try {
        this.isLoading = true
        const { data } = await axios({
          method: "get",
          url: this.baseUrl + "/pub/bookmarks",
          headers: {access_token: localStorage.access_token}
        })

        this.bookmarks = data 
        
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      } finally {
        this.isLoading = false
      }
    },

    async deleteBookmark(id){
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })

        if (result.isConfirmed) {
          const { data } = await axios({
            method: "delete",
            url: this.baseUrl + "/pub/bookmarks/" + id,
            headers: {access_token: localStorage.access_token}
          })
          await this.fetchBookmark()
          Swal.fire('Deleted!', data.message, 'success')
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    }
  }
})
