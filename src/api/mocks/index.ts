/* eslint-disable prettier/prettier */
import { env } from "@/pages/env";
import { setupWorker } from "msw/browser";
import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-in-period-mock";
import { getDayOrdersAmountMock } from "./get-day-orders-amount-mock";
import { getMonthCanceledOrdersAmountMock } from "./get-month-canceled-orders-amount-mock";
import { getMonthOrdersAmountMock } from "./get-month-orders-amount-mock";
import { getMonthRevenueMock } from "./get-month-revenue-mock";
import { getPopularProductsMock } from "./get-popular-products-mock";
import { registerRestaurantMock } from "./register-restaurant-mock";
import { signInMock } from "./sign-in-mock";
import { getOrdersMock } from "./get-orders-mock";
import { getProfileMock } from "./get-profile-mock";
import { getManagedRestaurantMock } from "./get-managed-restaurant-mock";
import { updateProfileMock } from "./update-profile-mock";
import { getOrdersDetailsMock } from "./get-orders-details-mock";
import { cancelOrderMock } from "./cancel-order-mock";
import { approveOrderMock } from "./approve-order-mock";
import { deliverOrderMock } from "./deliver-order-mock";
import { dispatchOrderMock } from "./dispach-order-mock";

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getOrdersMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersDetailsMock,
  cancelOrderMock,
  approveOrderMock,
  deliverOrderMock,
  dispatchOrderMock
);
export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }

  await worker.start();
}
