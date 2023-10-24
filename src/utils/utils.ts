import Router from 'next/router';

export interface IBalance {
  asset: string;
  balance: string;
}


export function redirectToDashboard() {
  Router.push({ pathname: '/dashboard' });
}

export function redirectToIndex() {
  Router.push({ pathname: '/' });
}
