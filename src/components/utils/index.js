import { registerSW } from 'virtual:pwa-register';

export const registerServiceWorker = () => {
  registerSW({
    onNeedRefresh() {},
    onOfflineReady() {
      console.log('App ready to work offline');
    },
  });
};
