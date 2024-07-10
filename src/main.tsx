import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { App, ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'dayjs/locale/zh-cn';
import { Provider } from 'react-redux'
import router from './routers/router'
import { store } from './store/store'
import './assets/styles/application.less'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider componentSize={ 'middle' } locale={ zhCN }>
      <Provider store={store}>
        <App>
          <RouterProvider router={ router }/>
        </App>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
)
