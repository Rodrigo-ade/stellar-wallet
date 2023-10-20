import Router from 'next/router';

export function redirectToDashboard() {
  Router.push({ pathname: '/dashboard' });
}

export function redirectToIndex() {
  Router.push({ pathname: '/' });
}
