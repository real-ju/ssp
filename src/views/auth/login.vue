<template>
  <div class="login-view">
    <a-form
      ref="formRef"
      :model="formModel"
      name="form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
      :rules="formRules"
    >
      <a-form-item name="username">
        <a-input v-model:value="formModel.username" size="large" placeholder="账号">
          <template #prefix>
            <Icon class="input-prefix-icon" name="auth-username" type="svg" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password v-model:value="formModel.password" size="large" placeholder="密码">
          <template #prefix>
            <Icon class="input-prefix-icon" name="auth-password" type="svg" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button
          block
          size="large"
          @click="handleSubmit"
          :loading="loginLoading"
          :disabled="loginLoading"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts" name="VLogin">
const router = useRouter();
const route = useRoute();

const formRef = ref();

const formModel = reactive({
  username: '',
  password: ''
});

const formRules = {
  username: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }]
};

const loginLoading = ref(false);

const handleSubmit = () => {
  formRef.value.validate().then(() => {
    handleLogin();
  });
};

const handleLogin = () => {};

const handleLoginSuccess = () => {
  const backUrl = route.query.back_url;
  const redirectUrl = backUrl ? decodeURIComponent(String(backUrl)) : '/';
  router.push(redirectUrl);
};

const handleLoginFail = () => {};
</script>

<style lang="less" scoped>
.login-view {
  .input-prefix-icon {
    color: #bfbfbf;
  }
}
</style>
