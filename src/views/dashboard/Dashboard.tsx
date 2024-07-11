import { Button } from 'antd'
import { useAppSelector } from '../../store/hooks.ts'

function Dashboard () {
  const envInfo = useAppSelector(state => state.envInfo.envInfo)

  const showMessage = () => {
    console.log(envInfo)
  }

  return (<div>
    <Button
      type={ 'primary' }
      onClick={ showMessage }
    >弹窗</Button>
  </div>)
}

export default Dashboard
