export interface Bet {
    title: string;
    category: {
        id: string;
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
        isFinalOption: boolean;
    }[];
    closedAt: Date | null;
    closedBy: {
        id: string;
        displayName: string;
    } | null;
    groupId: string;
    id: string;
}