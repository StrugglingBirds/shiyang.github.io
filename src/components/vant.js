import { Popup, ConfigProvider, NavBar, Icon } from 'vant';

export function useVant (app) {
  app.use(Popup)
  app.use(ConfigProvider)
  app.use(NavBar)
  app.use(Icon)
}
