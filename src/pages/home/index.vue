<template>
  <h3>Home page</h3>
  <el-button @click="getTest">Get Request Test</el-button>
  <div v-if="state.result && state.result.length > 0">
    <div class="item" v-for="item in state.result" :key="item.id">id: {{ item.id }}, name: {{ item.name }}, email: {{item.email}}</div>
  </div>
</template>

<script setup>
  import { getDemo } from '@/api/demo'
  import { reactive } from "vue"
  const state = reactive({
    loading: false,
    result: []
  })
  function getTest() {

    const param = {
      postId: 1
    }
    getDemo(param).then( res=> {
      state.result = res
    }).catch( err=> {

    })
  }

</script>