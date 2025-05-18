'use client';

import Image from 'next/image';

import * as Select from '@radix-ui/react-select';
import { useShallow } from 'zustand/shallow';

import { SortedBy } from '@/assets/definitions';
import { useAppStore } from '@/assets/store/store';
import ChevronDown from '@icons/chevron-down.svg';

export const SelectFilter = () => {
  const { sortedBy, setParams } = useAppStore(
    useShallow(state => ({
      sortedBy: state.sortedBy,
      setParams: state.setParams,
    }))
  );

  const handleChange = (value: SortedBy) => {
    setParams({ sortedBy: value });
  };

  return (
    <Select.Root defaultValue={sortedBy} onValueChange={handleChange}>
      <Select.Trigger
        className="border-white-primary/20 group inline-flex w-[120px] items-center justify-between rounded-[12px] border border-solid bg-transparent px-3.5 py-3 text-xs/[16px] md:w-[152px] md:py-3.5 md:text-sm/[18px]"
        aria-label="Books filter"
      >
        <Select.Value />
        <Select.Icon>
          <Image
            src={ChevronDown}
            alt=""
            className="transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180"
          />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          side="bottom"
          align="end"
          sideOffset={4}
          className="bg-black-tertiary w-[120px] rounded-[12px] p-3.5 md:w-[152px]"
        >
          <Select.Viewport>
            <Select.Item
              value="unread"
              className="text-white-secondary data-[state=checked]:text-white-primary cursor-pointer text-xs/[16px] outline-none md:text-sm/[18px]"
            >
              <Select.ItemText>Unread</Select.ItemText>
            </Select.Item>
            <Select.Item
              value="In progress"
              className="text-white-secondary data-[state=checked]:text-white-primary mt-2 cursor-pointer text-xs/[16px] outline-none md:text-sm/[18px]"
            >
              <Select.ItemText>In progress</Select.ItemText>
            </Select.Item>
            <Select.Item
              value="done"
              className="text-white-secondary data-[state=checked]:text-white-primary mt-2 cursor-pointer text-xs/[16px] outline-none md:text-sm/[18px]"
            >
              <Select.ItemText>Done</Select.ItemText>
            </Select.Item>
            <Select.Item
              value="all"
              className="text-white-secondary data-[state=checked]:text-white-primary mt-2 cursor-pointer text-xs/[16px] outline-none md:text-sm/[18px]"
            >
              <Select.ItemText>All books</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
