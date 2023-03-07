<script>
import { mapActions, mapWritableState } from 'pinia';
import { publicStore } from '../stores/public';


export default {
    computed: {
        ...mapWritableState(publicStore, ['isLogin', 'username', 'email', 'password'])
    },

    methods: {
        ...mapActions(publicStore, ['register', 'googleSignIn']),

        submitReg(){
            this.register()
        },

        shortCutGoogle(response){
            this.googleSignIn(response)
        },

        goTo(){
            this.page = 'login'
            this.$router.push({name: "login"})
        }
    }
}
</script>

<template>
    <div class="container" id="login-gate-section">
        <div class="col">
          <div class="text-center mt-5">
            <div>
                <h2>Sign Up</h2>
            </div>
          </div>
          <div class="d-flex flex-row justify-content-evenly mb-3">
            <div class="col-lg-5 col-md-8 col-sm-12">
                <form @submit.prevent="submitReg" id="register-form">
                    <div class="form-floating">
                        <input v-model="username" type="text" class="form-control" id="floatingName" placeholder="Name" required>
                        <label for="floatingName">Username</label>
                    </div>
                    <div class="form-floating mt-4">
                        <input v-model="email" type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" required>
                        <label for="floatingEmail">Email address</label>
                    </div>
                    <div class="form-floating mt-4">
                        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" required>
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button class="btn w-100 btn-lg btn-outline-light mt-4">Sign up</button>
        
                </form>
                <div class="text-center my-3">
                    <label class="text-light">Or sign up using:</label>
                </div>
                <div class="d-flex justify-content-center">
                    <GoogleLogin :callback="shortCutGoogle"/>
                </div>

                <div class="d-flex justify-content-center my-3">
                    <label class="text-light me-2">Already have account?</label>
                    <a @click.prevent="goTo" style="text-decoration: none;" href=""> Login </a>
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