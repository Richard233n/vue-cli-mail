import {
  Form,
  Field,
  CellGroup,
  Toast,
  NavBar,
  Sidebar,
  SidebarItem,
  Stepper,
  Tabbar,
  TabbarItem,
  SubmitBar,
  Popup,
  Switch,
  AddressList,
  AddressEdit,
  Uploader,
  ActionSheet,
  Dialog
} from 'vant'
// 放入数组中
const plugins = [
  Form,
  Field,
  CellGroup,
  Stepper,
  Toast,
  NavBar,
  Sidebar,
  SidebarItem,
  Tabbar,
  TabbarItem,
  SubmitBar,
  Popup,
  Switch,
  AddressList,
  AddressEdit,
  Uploader,
  ActionSheet,
  Dialog
]
export default function getVant (app) {
  plugins.forEach((item) => {
    return app.use(item)
  })
}
