<template>
  <div class="login" :style="'background-image: url(' + bgpic + ')'">
    <el-form class="form-signin" >
      <h3 class="">管理平台</h3>
      <div class="item">
        <el-input placeholder="用户名" v-model="userInfo.username"></el-input>
      </div>
      <div class="item">
        <el-input show-password placeholder="密码" v-model="userInfo.pass">
        </el-input>
      </div>
      <div class="act-btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script >
import { reactive } from 'vue'
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router'
import { getUser } from '@/api/demo'
import { useStore } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      pass: '',
      roundPic: [
        'https://s.cn.bing.net/th?id=OHR.MangroveDay_ZH-CN5590436101_1920x1080.jpg',
        'https://s.cn.bing.net/th?id=OHR.FourTigresses_ZH-CN4095017352_1920x1080.jpg'
      ],
      bgpic: '',
    }
  },
  created () {
    this.bgpic = this.roundPic[parseInt(Math.random() * this.roundPic.length)]
  },
  setup() {
    let store = useStore()
    const router = useRouter()
    const userInfo = reactive({
      username: '',
      pass: '',
    })


    function login() {
      if (userInfo.username == '' || userInfo.pass == '') {
        ElMessage.error('账号或者密码不能为空！')
        return
      }
      let params = {
        username: userInfo.username,
        password: userInfo.pass
      }

      // 调用 vuex 中的 action 登录
      store.dispatch('user/login', params ).then((res) => {
        if(res.id) {
          router.push('/')
        }
      }).catch(err => {
        console.error(err)
      })
    }

    return {
      userInfo,
      login
    }

  },
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  background-color: #dadada;
}

.login {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.form-signin {
  width: 350px;
  min-height: 240px;
  padding: 15px 45px 45px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2;
  margin-left: -225px;
  margin-top: -160px;
  background-color: #fff;
}
.act-btn{
  padding-top: 10px;
}
.act-btn button {
  width: 100%;
}

</style>