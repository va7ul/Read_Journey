import { SidebarNav } from './SidebarNav';

export const Statistics = () => {
  return (
    <div className="mt-10 flex flex-col md:max-xl:mt-0 md:max-xl:ml-10 md:max-xl:w-[50%]">
      <div className="flex justify-between">
        <h3 className="text-lg/[18px] font-bold md:text-xl/[20px]">Statistics</h3>
        <SidebarNav />
      </div>
      <p className="text-white-secondary mt-5 text-sm/[18px] max-xl:hidden">
        Each page, each chapter is a new round of knowledge, a new step towards understanding. By rewriting statistics,
        we create our own reading history.
      </p>
      <div className="bg-black-tertiary mt-5 flex h-[80px] w-full items-center justify-center rounded-[12px]"></div>
    </div>
  );
};
