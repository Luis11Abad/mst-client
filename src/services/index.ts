import { AuthService } from './auth'
import { EventService } from './event'

export const ServiceProvider = {
    auth: new AuthService(),
    event: new EventService(),
}
