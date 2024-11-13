import {ResultListProduct} from "../../types/result-list-product";
import {ResultListPlan} from "../../types/result-list-plan";

export const listProducts = async () => {
  return fetch(process.env.REACT_APP_PRODUCT_URL! + '?list=' + btoa(JSON.stringify({page: 0, pageSize: 10})), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
}

export const listPlans = async (id: string) => {
  return fetch(process.env.REACT_APP_PRODUCT_URL! + `/plans/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
}

export const fetchProducts = async (): Promise<ResultListProduct> => {
  const response = await listProducts();
  return response.json();
}

export const fetchPlans = async (productId: string): Promise<ResultListPlan> => {
  const response = await listPlans(productId);
  return response.json();
}
