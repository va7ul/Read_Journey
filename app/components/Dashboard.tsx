type Props = {
  children: React.ReactNode;
};

export const Dashboard = ({ children }: Props) => {
  return (
    <div>
      <div className="bg-black-secondary flex flex-col gap-x-8 rounded-[30px] p-5 md:p-8 md:max-xl:flex-row xl:p-5 xl:pt-10">
        {children}
      </div>
    </div>
  );
};
