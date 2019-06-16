import localizeFilter from '../filters/localize.filter';

export default {
  install(Vue) {
    Vue.prototype.$title = (titleKey) => {
      const appName = process.env.VUE_APP_NAME;
      return `${localizeFilter(titleKey)} | ${appName}`;
    };
  },
};
