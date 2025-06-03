import { SidebarNav } from './SidebarNav';

export const Diary = () => {
  return (
    <div className="mt-10 flex flex-col md:max-xl:mt-0 md:max-xl:ml-10 md:max-xl:w-[50%]">
      <div className="flex justify-between">
        <h3 className="text-lg/[18px] font-bold md:text-xl/[20px]">Diary</h3>
        <SidebarNav />
      </div>
      <div className="bg-black-tertiary mt-5 flex h-[80px] w-full items-center justify-center rounded-[12px]"></div>
    </div>
  );
};
