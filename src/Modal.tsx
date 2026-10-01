import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

// menambahkan tipe children props, ReactElement = JSX
const Modal = ({ children }: { children: ReactNode }) => {
  const elRef = useRef<HTMLDivElement | null>(null); // menambahkan generic type ke ref
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) return; // memeriksa jika modal tidak ada

    modalRoot.appendChild(elRef.current);

    return () => {
      // cek jika ref tidak null sebelum remove
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(
    <div className="rounded-[30px] bg-background p-3.75 text-center">
      {children}
    </div>,
    elRef.current,
  );
};

export default Modal;
