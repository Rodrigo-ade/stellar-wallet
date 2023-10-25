import { Notification } from '@/entities/Notification';

export interface INotificationModalProps {
  notification: Notification;
  redirect?: (() => void) | null;
}

export function NotificationModal({ notification, redirect = null }: INotificationModalProps) {
  const { isSuccess, message } = notification;

  if (redirect) {
    const REDIRECT_TIMEOUT = 2500;
    setTimeout(() => {
      redirect();
    }, REDIRECT_TIMEOUT);
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-purple-dark bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-5">
        <div className="flex min-h-full items-end justify-center p-5 text-center sm:items-center sm:p-0">
          <div className="notification-modal relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-purple-highlight p-16">
              <div>
                <div className="text-center">
                  <h3 className={'font-semibold ' + (isSuccess ? 'text-green-500' : 'text-red-500')} id="modal-title">
                    {message}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
