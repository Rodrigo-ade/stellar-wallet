import Router from 'next/router';
import { getAccount as getAccountService } from '@/services/stellar';
import { AccountResponse } from 'stellar-sdk';

export interface IBalance {
  asset: string;
  balance: string;
}

export interface IPayment {
  amount: string;
  type: string;
  from: string;
  to: string;
  asset_code: string | undefined;
  date: string;
}

export function redirectToDashboard() {
  Router.push({ pathname: '/dashboard' });
}

export function redirectToIndex() {
  Router.push({ pathname: '/' });
}

export async function getAccount(publicKey: string) {
  let payments: IPayment[];
  let balance: IBalance[];

  const account = await getAccountService(publicKey);

  if (account instanceof Error) {
    payments = [];
    balance = [
      {
        asset: 'XLM',
        balance: '0',
      },
    ];
  } else {
    payments = await getAccountPayments(account);
    balance = getAccountBalance(account);
  }

  return { payments, balance };
}

function getAccountBalance({ balances }: AccountResponse): IBalance[] {
  const balance = balances.map((tempBalance) => {
    const { asset_type, asset_code, balance } = tempBalance;

    return {
      asset: asset_type === 'native' ? 'XLM' : asset_code,
      balance: balance,
    };
  });

  return balance.filter((tempB) => Number(tempB.balance) > 0);
}

async function getAccountPayments(account: AccountResponse) {
  const { records } = await account.payments({ order: 'desc' });

  const payments = records.map(({ amount, type, created_at, from, to, asset_code }) => ({
    amount,
    type: type.toString(),
    date: created_at,
    from,
    to,
    asset_code,
  }));

  return payments.filter((tempB) => tempB.type != 'create_account');
}
