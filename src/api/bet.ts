export interface Bet {
    title: string;
    category: {
        name: string;
    } | null;
    wagers: {
        id: string;
        amount: number;
        option: {
            id: string;
            name: string;
        };
        user: {
            id: string;
            displayName: string;
            version: number;
        };
    }[];
    options: {
        id: string;
        name: string;
    }[];
    groupId: string;
    id: string;
}