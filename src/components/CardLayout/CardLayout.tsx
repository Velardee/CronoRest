import type { FunctionComponent, ReactNode } from "react";

interface CardLayoutProps {
  children: ReactNode;
}

const CardLayout: FunctionComponent<CardLayoutProps> = ({ children }) => {
  return (
    <div className="w-full max-w-3xl bg-white/10 rounded-xl p-6 flex flex-col gap-6">
      {children}
    </div>
  );
};

export default CardLayout;
