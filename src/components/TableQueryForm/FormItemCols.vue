<script lang="ts">
import type { VNode } from 'vue';

import { Col } from 'ant-design-vue';

export default defineComponent({
  name: 'FormItemCols',
  props: {
    isCollapsed: {
      type: Boolean,
      default: true
    },
    maxColNum: {
      type: Number,
      default: 3
    }
  },
  setup(props, { slots }) {
    return () => {
      if (!slots.default) return null;
      const defaultSlots = slots.default();
      let formItemComps = defaultSlots[0].children! as VNode[];
      formItemComps = formItemComps.filter((item) => {
        return (item.type as any).name === 'AFormItem';
      });
      if (props.isCollapsed) {
        formItemComps = formItemComps.slice(0, props.maxColNum);
      }
      return formItemComps.map((item) => {
        return h(
          Col,
          {
            span: 12,
            lg: 8,
            xl: 6,
            xxl: 4
          },
          () => item
        );
      });
    };
  }
});
</script>

<style lang="less" scoped></style>
