import { useState , useEffect } from 'react';
import { MdNetworkWifi, MdSignalWifiOff } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if(!isOnline) {
        toast.success('Internet Connected!', {
          position: toast.POSITION.BOTTOM_LEFT,
          closeButton: false,
          hideProgressBar: false,
          icon: <MdNetworkWifi />,
          className: 'bg-green-300 text-green-900 dark:text-white dark:bg-slate-600 font-bold',
        });
      }
    };
    const handleOffline = () => {
      setIsOnline(false);
      if (isOnline) {
        toast.error('Internet Disconnected!', {
          position: toast.POSITION.BOTTOM_LEFT,
          closeButton: false,
          hideProgressBar: false,
          icon: <MdSignalWifiOff />,
          className:'bg-red-300 dark:bg-slate-600 text-black dark:text-white font-bold',
        });
      }
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline]);

  return (
    <>
      <ToastContainer autoClose={5000} />
    </>
  )
}
export default ConnectionStatus