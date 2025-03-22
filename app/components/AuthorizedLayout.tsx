type Props = {
  children: React.ReactNode;
};

export const AuthorizedLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};
