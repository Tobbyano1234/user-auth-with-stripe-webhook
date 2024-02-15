import { General } from "./General"
import { User } from "./User"

export enum ModelNames {
    USER = "user",
    GENERAL = "general",
}

export type ModelTypeMap = {
    [ModelNames.USER]: User,
    [ModelNames.GENERAL]: General,
}