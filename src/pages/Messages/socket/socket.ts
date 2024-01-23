import { io } from 'socket.io-client'
import { BASE_ROUTE_API } from '../../../constants/constants'

export const socket = io(`${BASE_ROUTE_API}/chat`)
