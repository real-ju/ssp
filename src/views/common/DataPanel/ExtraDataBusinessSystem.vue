<template>
  <a-col class="extra-data-section" :span="12" :xxl="8">
    <div class="icon-box">公安部</div>
    <div class="data-item">
      <div class="value">24</div>
      <div class="title">未定级</div>
    </div>
    <div class="data-item">
      <div class="value">24</div>
      <div class="title">未定级</div>
    </div>
    <div class="data-item">
      <div class="value">24</div>
      <div class="title">未定级</div>
    </div>
    <div class="detail-data-list">
      <div class="row">
        <div class="item">一级（2）</div>
        <div class="item">一级（2）</div>
        <div class="item">一级（2）</div>
      </div>
      <div class="row">
        <div class="item">一级（2）</div>
        <div class="item">一级（2）</div>
        <div class="item"></div>
      </div>
    </div>
  </a-col>
  <a-col class="extra-data-section extra-data-section2" :span="12" :xxl="8">
    <div class="icon-box">工信部</div>
    <div class="data-item">
      <div class="value">24</div>
      <div class="title">未定级</div>
    </div>
    <div class="data-item">
      <div class="value">24</div>
      <div class="title">未定级</div>
    </div>
    <div class="data-item">
      <div class="value">24</div>
      <div class="title">未定级</div>
    </div>
    <div class="detail-data-list">
      <div class="row">
        <div class="item">一级（2）</div>
        <div class="item">一级（2）</div>
        <div class="item">一级（2）</div>
      </div>
      <div class="row">
        <div class="item">一级（2）</div>
        <div class="item">一级（2）</div>
        <div class="item"></div>
      </div>
    </div>
  </a-col>
</template>

<script setup lang="ts" name="VExtraDataBusinessSystem"></script>

<style lang="less" scoped>
.extra-data-section {
  padding: 6px 12px;
  border-left: 1px solid #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon-box {
    width: 40px;
    height: 40px;
    flex: none;
    border-radius: 3px;
    border: 1px solid #299cdb;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #299cdb;
    margin-right: 10px;
  }
  .data-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    bottom: 4px;
    & + .data-item {
      margin-left: 10px;
    }
    .value {
      font-size: 20px;
      font-weight: bold;
    }
    .title {
      font-size: 12px;
      color: #299cdb;
      padding: 2px 6px;
      background-color: rgba(223, 240, 250, 1);
      border-radius: 10px;
      line-height: 1;
    }
  }
  .detail-data-list {
    width: 180px;
    margin-left: 10px;
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & + .row {
        margin-top: 4px;
      }
      .item {
        width: 0px;
        flex: 1;
        font-size: 12px;
        color: #878a99;
      }
    }
  }
}

.extra-data-section2 {
  .icon-box {
    color: #3577f1;
    border-color: #3577f1;
  }
  .data-item {
    .title {
      color: #3577f1;
      background-color: rgba(225, 235, 253, 1);
    }
  }
}
</style>
