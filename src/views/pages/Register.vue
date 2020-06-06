<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm @submit.prevent="handleRegister">
                <h1>Register</h1>
                <div v-if="!successful">
                  <p class="text-muted">Create your account</p>
                  <CInput
                    v-model="user.username"
                    v-validate="'required|min:3|max:20'"
                    placeholder="Username"
                    autocomplete="username"
                    name="username"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <div
                    v-if="submitted && errors.has('username')"
                    class="alert-danger"
                  >{{errors.first('username')}}</div>

                  <CInput
                    v-model="user.email"
                    v-validate="'required|email|max:50'"
                    placeholder="Email"
                    autocomplete="email"
                    name="email"
                    prepend="@"
                  />
                  <div
                    v-if="submitted && errors.has('email')"
                    class="alert-danger"
                  >{{errors.first('email')}}</div>

                  <CInput
                    v-model="user.password"
                    v-validate="'required|min:6|max:40'"
                    placeholder="Password"
                    name="password"
                    type="password"
                    ref="password"
                    autocomplete="new-password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <div
                    v-if="submitted && errors.has('password')"
                    class="alert-danger"
                  >{{errors.first('password')}}</div>

                  <CInput
                    v-model="user.confirm"
                    v-validate="'required|confirmed:password'"
                    placeholder="Confirm password"
                    type="password"
                    name="confirm_password"
                    autocomplete="confirm_password"
                    class="mb-4"
                    data-vv-as="Confirm password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                   <div
                    v-if="errors.has('confirm_password')"
                    class="alert-danger"
                  >{{errors.first('confirm_password')}}</div>
                  <CButton color="success" type="submit" block>Create Account</CButton>
                </div>
              </CForm>
              <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
              >{{message}}</div>
            </CCardBody>

            <!-- <CCardFooter class="p-4">
              <CRow>
                <CCol col="6">
                  <CButton block color="facebook">
                    Facebook
                  </CButton>
                </CCol>
                <CCol col="6">
                  <CButton block color="twitter">
                    Twitter
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter> -->
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import User from '../../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/users');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>
