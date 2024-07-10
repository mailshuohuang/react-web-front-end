import React from 'react'
import { Space, Spin } from 'antd'

import Styles from './index.module.less'

function AppLoading ({ height, fullscreen, text, isFixed = true }) {
  /**
   * 根据加载状态和固定位置标志获取加载动画的类名。
   *
   * 此函数用于决定加载动画的显示方式，根据`isFixed`标志来判断动画是否固定在页面顶部。
   * 如果`isFixed`为真，则返回固定的加载动画类名；否则，返回一个包含非固定加载动画类名。
   */
  const getClassName = () => {
    if (isFixed) {
      return Styles.app_loading
    } else {
      return [Styles.app_loading, Styles.no_fixed].join(' ')
    }
  }

  return (<>
      {
        fullscreen
          ? <Spin
            tip={ text }
            fullscreen
          ></Spin>
          : <div
            className={ getClassName() }
            style={ {
              height: height
            } }
          >
            <Space
              size={ 'small' }
              direction={ 'vertical' }
              align={ 'center' }
            >
              <Spin/>
              <div className={ Styles.tip }>{ text }</div>
            </Space>
          </div>
      }
    </>
  )
}

export default AppLoading
