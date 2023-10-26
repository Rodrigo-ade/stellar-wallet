import Router from 'next/router';
import { getAccount as getAccountService } from '@/services/stellar';

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
    const { balances } = account;
    balance = balances.filter((tempB) => Number(tempB.balance) > 0)
      .map((tempBalance) => {
        const {asset_type, asset_code, balance} = tempBalance;
        
        return {
          asset: asset_type === 'native' ? 'XLM' : asset_code,
          balance: balance,
        }
      });


    payments = (await account.payments({ order: 'desc' })).records.map((tempPayment) => {
      const {
        amount,
        type,
        created_at,
        from,
        to,
        asset_code,
      } = tempPayment;

      return ({
        amount,
        type: type.toString(),
        date: created_at,
        from: from,
        to,
        asset_code,
      });
    });

    payments = payments.filter((tempB) => tempB.type != 'create_account');
  }

  return { payments, balance };
}
