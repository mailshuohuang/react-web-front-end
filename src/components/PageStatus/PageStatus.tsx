import AppLoading from '../AppLoading/AppLoading.tsx'
import { Result } from 'antd'
import React from 'react'

const PageStatus: React.FC = ({ pageStatus, children, text, height }) => {
  /**
   * 根据页面状态生成相应的UI组件。
   *
   * 该函数根据传入的状态参数，动态渲染不同的UI组件，以反映页面的加载状态。
   * - 当状态为'loading_only'时，显示一个仅加载中的界面。
   * - 当状态为'loading'或空字符串时，显示加载中组件和子组件。
   * - 当状态为'error'或'fail'时，显示一个错误信息组件。
   * - 对于其他所有情况，显示子组件，并在控制台提示未找到匹配的状态。
   * @param status 页面状态，决定渲染哪种UI组件。
   * @param tip 提示信息，用于加载中或错误状态时显示的文本。
   * @returns 返回对应状态的UI组件。
   */
  const generatePageStatus = (status, tip) => {
    switch (status) {
      case 'loading_only':
        return <div>
          <AppLoading fullscreen height={ height || '100vh' } text={ tip || '' }></AppLoading>
        </div>
        break
      case 'loading':
      case '':
        return <div>
          {
            status === 'loading'
              ? <AppLoading
                height={ height || '100vh' }
                text={ tip || '' }
              ></AppLoading>
              : <></>
          }
          { children }
        </div>
        break
      case 'fail':
        return <Result
          status="error"
          title="错误"
          subTitle="Please check and modify the following information before resubmitting."
        ></Result>
        break
      case 'error':
        return <Result
          status="500"
          title={ 'ERROR' }
          subTitle={ tip || '网络错误，查询数据失败' }
        ></Result>
        break
      default:
        console.error('ERROR: not found status')
        return children
    }
  }

  return (<>
    { generatePageStatus(pageStatus, text) }
  </>)
}

export default PageStatus
