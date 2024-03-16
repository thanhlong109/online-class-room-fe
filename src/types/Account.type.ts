export interface Account {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    parentEmail: string;
    role: string;
    birthDate: string;
    biography: string;
    profileImg: string;
    sex: string;
    status: string;
}

export interface GetAllAccount {
    accounts: Account[];
    currentPage: number;
    pageSize: number;
    totalAccounts: number;
    totalPages: number;
}

export interface LocalUserData {
    accessToken: string;
    email: string;
    refreshToken: string;
}
