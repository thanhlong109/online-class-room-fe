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
}

export interface GetAllAccount {
    accounts: Account[];
    currentPage: number;
    pageSize: number;
    totalAccounts: number;
    totalPages: number;
}
