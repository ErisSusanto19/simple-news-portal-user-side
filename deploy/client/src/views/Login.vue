<script>
import { mapActions, mapWritableState } from 'pinia';
import { publicStore } from '../stores/public';


export default {
    computed: {
        ...mapWritableState(publicStore, ['isLogin', 'email', 'password'])
    },

    methods: {
        ...mapActions(publicStore, ['login', 'googleSignIn']),

        submitLogin(){
            this.login()
        },

        shortCutGoogle(response){
            this.googleSignIn(response)
        },

        goTo(){
            this.page = 'register'
            this.$router.push({name: "register"})
        }
    }
}
</script>

<template>
    <div class="container" id="login-gate-section">
        <div class="col">
          <div class="text-center mt-5">
            <div>
                <h2>Log In</h2>
            </div>
          </div>
          <div class="d-flex flex-row justify-content-evenly mb-3">
            <div class="col-lg-5 col-md-8 col-sm-12">
                <form @submit.prevent="submitLogin" id="login-form">
                    <div class="form-floating">
                        <input v-model="email" type="email" class="form-control" id="floatingEmailLog" placeholder="name@example.com" required>
                        <label for="floatingEmailLog">Email address</label>
                    </div>
                    <div class="form-floating mt-4">
                        <input v-model="password" type="password" class="form-control" id="floatingPasswordLog" placeholder="Password" required>
                        <label for="floatingPasswordLog">Password</label>
                    </div>
        
                    <button class="btn w-100 btn-lg btn-outline-light mt-4">Log in</button>
        
                </form>
                <div class="text-center my-3">
                    <label class="text-light">Or sign in with:</label>
                </div>
                <div class="d-flex justify-content-center">
                    <GoogleLogin :callback="shortCutGoogle"/>
                </div>

                <div class="d-flex justify-content-center my-3">
                    <label class="text-light me-2">Don't have an account?</label>
                    <a @click.prevent="goTo" style="text-decoration: none;" href=""> Sign up </a>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>

<style>
    .form-floating:focus-within {
        z-index: 2;
    }
</style>