import Router from 'next/router';

export interface IBalance {
  asset: string;
  balance: string;
}

export interface IPayment {
  ammount: string,
  type: string,
  from: string,
  to: string,
  asset_code: string | undefined,
  date: string,
}

export function redirectToDashboard() {
  Router.push({ pathname: '/dashboard' });
}

export function redirectToIndex() {
  Router.push({ pathname: '/' });
}
