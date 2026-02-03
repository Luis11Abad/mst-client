export enum AlertType {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warning = 'warning',
}

export enum Layout {
    Main = 'Main',
    Auth = 'Auth',
}

export enum DropDownDirections {
    BottomLeft = 'bl',
    BottomRight = 'br',
    TopLeft = 'tl',
    TopRight = 'tr',
}

export enum ModalType {
    Center = 'center',
    Side = 'side',
}

export interface Alert {
    type: AlertType
    message: string
}
