import Navbar from '@components/Navbar';
import { ToastContainer } from 'react-toastify';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />

      <div p="x-[100px] md:x-[160px] lg:x-[220px]">{children}</div>
      <ToastContainer
        toastClassName={() =>
          'bg-white relative flex p-1 my-3 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        bodyClassName={() =>
          'text-sm text-black font-bold block p-3 flex items-center'
        }
        hideProgressBar={true}
        autoClose={3000}
        closeButton={false}
      />
    </>
  );
}
