"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import * as React from "react";
import SelectDropdown from "../SelectDropdown";
import { trpc } from "@/server/client";


interface DialogItemProps {
    onSelect?: () => void;
    onOpenChange?: (open: boolean) => void;
  }
  
const DialogItem = React.forwardRef<HTMLDivElement, DialogItemProps>((props, forwardedRef) => {
    const {  onSelect, onOpenChange, ...itemProps } = props;
    const [open, setOpen] = React.useState(false);
    const getNotifications = trpc.notification.getNotifications.useQuery();
    const addNotification = trpc.notification.addNotification.useMutation(
        {
            onSettled: () => {
                getNotifications.refetch();
            }
        }
    );

    const [type, setType] = React.useState('');
    const [personName, setPersonName] = React.useState('');
    const [referenceNumber, setReferenceNumber] = React.useState('');


    const handleSubmit = () => {
        let notificationText = '';

        switch(type) {  
            case "platform_update":
                notificationText = "New features - see what’s new";
                break;
            case "comment_tag":
                notificationText = `${personName} tagged you in a comment`;
                break;
            case "access_granted":
                notificationText = `${personName} shared a chat with you`;
                break;
            case "join_workspace":
                notificationText = `${personName} joined your workspace`;
                break;
            default:
                console.warn(`Unhandled notification type: ${type}`);
                return; // Exit if the type is not recognized
        }

        addNotification.mutate({type, person_name: personName, reference_number: referenceNumber, text: notificationText});
    }
  
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <DropdownMenu.Item
            {...itemProps}
            ref={forwardedRef}
            className=""
            onSelect={(event) => {
              event.preventDefault();
              onSelect && onSelect();
            }}>
            <PlusIcon className="w-7 h-7 bg-green-500 rounded-full p-1" />
          </DropdownMenu.Item>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-[#000000]/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md w-[360px] border flex flex-col gap-3">
          <Dialog.Title className="text-xl font-semibold">Edit</Dialog.Title>
              <Dialog.Description className="">
                Edit this record below.
              </Dialog.Description>
              <form className="flex flex-col gap-3 " 
              onSubmit={(event) => {
                              setOpen(false);
                              handleSubmit();
                              event.preventDefault();
                          }}>
                <SelectDropdown type={type} onTypeChange={(newType) => setType(newType)}/>
                <input disabled={type !== "platform_update"} type="text" placeholder="Release number..." className="text-2xl border rounded-md p-2"  value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)}/>
                <input disabled={type === "platform_update"} type="text" placeholder="Person name..." className="text-2xl border rounded-md p-2" value={personName} onChange={(e) => setPersonName(e.target.value)}/>
                <button type="submit">Sumbit</button>
              </form>
            <Dialog.Close asChild>
              <button className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  });

DialogItem.displayName = "DialogItem";

export default DialogItem;