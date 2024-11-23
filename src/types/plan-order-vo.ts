export interface PlanOrderVo {
    id: string;
    orderNumber: string;
    orderTransactionNumber: string;
    userId: string;
    type: string;
    orderStatus: string;
    afterStatus: string;
    productAmountTotal: number;
    orderAmountTotal: number;
    payType: string;
    payNumber: string;
    payTime: string;
    orderSettlementStatus: string;
    orderSettlementTime: string;
    createTime: string;
    deliveryTime: string;
    updateTime: string;
  }
  