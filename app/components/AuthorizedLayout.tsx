type Props = {
  children: React.ReactNode;
};

export const AuthorizedLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto flex max-w-[1216px] flex-col gap-2.5 px-5 pb-10 md:gap-4 md:px-8 md:pb-8 xl:flex-row">
      {children}
    </div>
  );
};
