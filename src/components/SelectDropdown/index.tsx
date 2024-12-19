"use client";

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import React from "react";



interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof Select.Item> {
    children: React.ReactNode;
    className?: string;
    value: string;
  }
  
  const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ children, className, ...props }, forwardedRef) => {
      return (
        <Select.Item
          className={`relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none ${className || ''}`}
          {...props}
          ref={forwardedRef}
        >
          <Select.ItemText>{children}</Select.ItemText>
          <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
            <CheckIcon />
          </Select.ItemIndicator>
        </Select.Item>
      );
    }
  );
  
  SelectItem.displayName = 'SelectItem';

interface SelectDropdownProps {
    type: string;
    onTypeChange: (newType: string) => void;
}
  
  const SelectDropdown:React.FC<SelectDropdownProps> = ({type, onTypeChange}) => {
    return (
      <Select.Root onValueChange={(value) => onTypeChange(value)} value={type}>
        <Select.Trigger
          className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-lg leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
          aria-label="Food"
        >
          <Select.Value placeholder="Select notification type..." />
          <Select.Icon className="text-violet11">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px]">
              <Select.Group className="flex flex-col gap-2 p-2">
                <Select.Label className="px-[25px] text-sm leading-[25px] text-mauve11">
                  Notification types
                </Select.Label>
                <SelectItem value="platform_update" className="text-yellow-500 text-lg">Platform update</SelectItem>
                <SelectItem value="comment_tag" className="text-blue-500 text-lg">Comment Tag</SelectItem>
                <SelectItem value="access_granted" className="text-green-500 text-lg">Access granted</SelectItem>
                <SelectItem value="join_workspace" className="text-red-500 text-lg">Join workspace</SelectItem>
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  };

export default SelectDropdown;