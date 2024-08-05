import type { FunctionalComponent } from 'vue';
import SvgIcon from './src/SvgIcon/index.vue';
import * as AntIcons from '@ant-design/icons-vue';

interface Props {
  type: 'ant' | 'iconfont' | 'svg';
  name: string;
  form?: string;
}

const Icon: FunctionalComponent<Props> = (props: Props) => {
  const { type = 'iconfont', name, form = 'regular' } = props;

  if (type === 'ant') {
    return h((AntIcons as Recordable)[name]);
  } else if (type === 'iconfont') {
    return h('i', {
      class: {
        [`fa-${form}`]: true,
        [`fa-${name}`]: true
      }
    });
  } else if (type === 'svg') {
    return h(SvgIcon, { name: name });
  }
};

export default Icon;
