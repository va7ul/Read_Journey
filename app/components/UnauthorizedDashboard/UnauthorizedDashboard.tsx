type Props = {
  children: React.ReactNode;
};

export const UnauthorizedDashboard = ({ children }: Props) => {
  return (
    <div>
      <div>{children}</div>
      <div>
        <h1 className="text-regal-blue">Photo</h1>
      </div>
    </div>
  );
};
