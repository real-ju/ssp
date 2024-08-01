import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './custom.less';

export function setupNProgress() {
  NProgress.configure({ showSpinner: false });
}
