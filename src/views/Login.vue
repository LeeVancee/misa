<template>
  <div class="container">
    <validate-from @from-submit="onFromSubmit">
      <div class="mb-3">
        <label class="form-label">郵箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="請輸入郵箱地址"
          type="text"
          ref="inputRef"
        ></validate-input>
      </div>

      <div class="mb-3">
        <label class="form-label">密碼</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordVal"
          placeholder="請輸入密碼"
          type="password"
        ></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-danger">submit</span>
      </template>
    </validate-from>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateFrom from '../components/ValidateFrom.vue'

export default defineComponent({
  name: 'Login',
  setup() {
    const emailVal = ref('123@123.com')
    const passwordVal = ref('asd12345567')
    const inputRef = ref()
    const router = useRouter()
    const store = useStore()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密碼不能為空' },
      { type: 'password', message: '密码8位以及以上，需要包含，数字字母' }
    ]

    const onFromSubmit = (result: boolean) => {
      if (result) {
        router.push('/')
        store.commit('login')
        console.log(222)
      }
    }
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFromSubmit,
      inputRef
    }
  },
  components: {
    ValidateInput,
    ValidateFrom
  }
})
</script>

<style></style>
