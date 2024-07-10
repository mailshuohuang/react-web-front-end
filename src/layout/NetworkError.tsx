import React from 'react'
import { useRouteError } from 'react-router'
import { Button, Result } from 'antd'
import { useNavigate } from "react-router-dom"

/**
 * 网络错误组件。
 *
 * 该组件用于显示网络错误页面，当路由中检测到网络错误时，会渲染此组件。
 * 主要处理404和500两种常见的HTTP状态码错误，提供友好的错误提示和返回首页的选项。
 */
const NetworkError:React.FC = () => {
  const navigator = useNavigate()
  const error = useRouteError()

  /**
   * 导航到首页。
   *
   * 该函数使用浏览器的navigator对象来导航到应用程序的根路径。
   * 它不接受任何参数，也不返回任何值，它的作用是简单地改变浏览器的URL，
   * 以达到导航到应用程序的首页的目的。
   */
  const navigatorToHome = () => {
    navigator('/')
  }

  /**
   * 根据错误信息生成相应的错误页面内容。
   *
   * 该函数旨在根据传入的错误对象，判断错误类型，并返回相应状态码的错误页面组件。
   * 主要处理404和500两种常见的服务器错误状态码，为用户提供明确的错误提示，并提供返回首页的选项。
   * 对于不识别的错误类型，函数将返回undefined，不渲染任何内容。
   *
   * @param error 未知的错误对象。期望该对象包含一个status属性，用于判断错误类型。
   * @returns 根据错误类型返回对应的Result组件，或在无法识别错误类型时返回undefined，将会使用默认样式。
   */
  const getErrorContent = (error: unknown) => {
    if (error.status === 404) {
      return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={ <Button
          type="primary"
          onClick={ navigatorToHome }
        >Back Home</Button> }
      />
    } else if (error.status === 500) {
      return <Result
        status="500"
        title="500"
        subTitle="Sorry, the page you visited does not exist."
        extra={ <Button type="primary">Back Home</Button> }
      />
    } else {
      return undefined
    }
  }

  return (
    <div>
      { getErrorContent(error) }
    </div>
  )
}

export default NetworkError
