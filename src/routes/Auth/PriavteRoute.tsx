import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import { RootState } from '../../store'
const PriavteRoute = () => {
    const {currentUser}  = useSelector((state:RootState) => state.user)
  return currentUser ? <Outlet/> : <Navigate to="/login"/>
}

export default PriavteRoute