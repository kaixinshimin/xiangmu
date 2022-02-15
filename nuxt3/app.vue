<template>
  <main>
    <NuxtPage />
  </main>
</template>

<script setup>
import { watchEffect } from 'vue'
const { user } = useUser()
const {emails}=getEmail();
const login = useLogin()
const config = useRuntimeConfig();
const { data } = await useFetch(`/user/userinfo`, { server: false })
if (!config.API_BASE) {
  watchEffect(() => {
    if (data.value) {
      login.value = data.value.login
      user.value = data.value.name;
      emails.value = data.value.email;
    }
  })
}
</script>
<style>
</style>