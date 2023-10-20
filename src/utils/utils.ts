import Router from 'next/router';

export function redirectToDashboard(publicKey: string) {
  Router.push({ pathname: '/dashboard', query: { account: publicKey } });
}
