<template>
  <a-col class="extra-data-section" :span="24" :xxl="16">
    <div class="data-item" v-for="item in extraData" :key="item.title">
      <div class="value">{{ item.value }}</div>
      <div class="title">{{ item.title }}</div>
    </div>
  </a-col>
</template>

<script setup lang="ts" name="VExtraDataCommon">
const props = defineProps({
  extraData: {
    type: Object,
    default() {
      return [];
    }
  }
});
</script>

<style lang="less" scoped>
.extra-data-section {
  padding: 6px 12px;
  border-left: 1px solid #cccccc;
  display: flex;
  align-items: center;
  .data-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 20px;
    .value {
      font-size: 20px;
      font-weight: bold;
    }
    .title {
      font-size: 12px;
      color: @primary-color;
      padding: 2px 6px;
      background-color: #edebf8;
      border-radius: 10px;
      line-height: 1;
    }
  }
}
</style>
