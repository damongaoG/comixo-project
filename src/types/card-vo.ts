export interface CardVO {
    id: string;
    created: number;
    customer: string;
    card: {
        brand: string;
        display_brand: string;
        exp_month: number;
        exp_year: number;
        last4: string;
        checks: {
            cvc_check: string;
        };
    };
    type: string;
}