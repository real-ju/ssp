<script lang="ts">
import type { VNode } from 'vue';

export default defineComponent({
  name: 'TableOperateGroup',
  setup(props, { slots }) {
    return () => {
      let bottonItems: VNode[];
      if (!slots.default) {
        bottonItems = [];
      } else {
        bottonItems = slots.default().filter((item) => {
          return typeof item.type !== 'symbol';
        });
      }

      const childrenNodes: VNode[] = [];
      bottonItems.forEach((item, index) => {
        if (index !== 0) {
          childrenNodes.push(h('span', { class: 'item-divider' }, '|'));
        }
        childrenNodes.push(item);
      });

      return h(
        'div',
        {
          class: 'table-operate-group'
        },
        childrenNodes
      );
    };
  }
});
</script>

<style lang="less" scoped>
.table-operate-group {
  display: flex;
  align-items: center;

  .item-divider {
    color: #cccccc;
    margin: 0px 8px;
  }
}
</style>
