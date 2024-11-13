import React, {useEffect} from "react";
import {Plan} from "../../types/plan";
import {ResultListProduct} from "../../types/result-list-product";
import {fetchPlans, fetchProducts} from "./api";
import {ResultListPlan} from "../../types/result-list-plan";

/**
 * @description custom hook to fetch and set plans
 * @param setPlans
 */
const usePlan = (setPlans: React.Dispatch<React.SetStateAction<Plan[]>>) => {
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const productResult: ResultListProduct = await fetchProducts();

        if (productResult.code !== 1 || !productResult.data?.length) {
          console.error('Error fetching products:', productResult.error?.message);
          return;
        }

        const productId = productResult.data[0].id;

        const planResult: ResultListPlan = await fetchPlans(productId);

        if (planResult.code === 1 && planResult.data) {
          setPlans(planResult.data);
        } else {
          console.error('Error fetching plans:', planResult.error?.message);
        }
      } catch (error) {
        console.error('Error occurred while fetching plans:', error);
      }
    };

    loadPlans();
  }, [setPlans])
};

export default usePlan;
