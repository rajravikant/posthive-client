import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
const PriavteRoute = () => {
    const {currentUser}  = useSelector((state:RootState) => state.user)
  return currentUser ? <Outlet/> : <Navigate to="/login"/>
}

export default PriavteRoute