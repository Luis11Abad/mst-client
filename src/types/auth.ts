export enum AuthLoadingState {
    None,
    Session,
    Login,
    Complete,
    Profile,
    Reset,
}

interface Company {
    id: string
    name: string | null
    lang: string | null
    is_active: boolean
    slug: string
}

export interface CompleteProfileRequest {
    name: string
    phone: string
    password: string
    avatar: File
}

export interface User {
    id: string
    profile_id: string
    company: Company
    email: string
    name: string | null
    avatar: string | null
    phone: string | null
    is_completed: boolean
    is_active: boolean
}

export interface LoginForm {
    email: string
    password: string
}
