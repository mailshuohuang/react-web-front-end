import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import PageStatus from '../components/PageStatus/PageStatus.tsx'
import request from '../common/request.ts'

import { useAppDispatch } from '../store/hooks.ts'
import ResponseCode from '../common/ResponseCode.ts'
import { updateEnvInfo } from '../store/slice/env-info-slice.ts'
import { AxiosResType } from '../plugins/axios.ts'

const Layout: React.FC = () => {
  const [pageStatus, setPageStatus] = useState('')
  const [pageStatusText, setPageStatusText] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    getPreloadInfo()
    getEnvInfo()
  }, [])

  /**
   * 获取预加载信息的函数。
   *
   * 该函数旨在通过Promiss.all一次性获取预加载资源的信息，完成加载后才会开始渲染项目页面，
   * 确保页面不会因为资源加载不完全而报错。
   * @returns {void} 该函数没有返回值。
   */
  const getPreloadInfo = () => {
    setPageStatusText('正在初始页面数据')
    setPageStatus('loading_only')
    // Promise.all([]).then(([]) => {
    // setPageStatus('')
    // setPageStatusText('')
    // })
    setTimeout(() => {
      setPageStatus('')
      setPageStatusText('')
    }, 1000)
  }

  const getEnvInfo = () => {
    request.getAppEnv().then((res: AxiosResType) => {
      if (res.code === ResponseCode.success) {
        dispatch(updateEnvInfo({
          envInfo: res.data
        }))
      }
    })
  }

  return (
    <PageStatus
      pageStatus={ pageStatus }
      text={ pageStatusText }
      height={ '50vh' }
    >
      <Outlet/>
    </PageStatus>
  )
}

export default Layout

