"use client";

import  * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AvatarIcon, BellIcon, FileTextIcon } from "@radix-ui/react-icons";
import DialogItem from "../DialogItem";
import { useRouter } from "next/navigation";
import { trpc } from "@/server/client";
import clsx from "clsx";

export type Notification = {
  id: number,
  type: string,
  text: string,
  is_read?: boolean | null,
  person_name?: string | null,
  reference_number?: string | null
}

const DropdownWithDialog = ({num_unread_notifications, notifications}: {num_unread_notifications: number, notifications: Notification[]}) => {
  const router = useRouter();
  const updateNotification = trpc.notification.updateNotification.useMutation();

  const handleNotificationClick = (notification: Notification) => {

    updateNotification.mutate({id: notification.id, is_read: true});
    switch(notification.type) {
      case "platform_update":
        alert(notification.reference_number);
        break;
      case "comment_tag":
        router.push("/comments");
        break;
      case "access_granted":
        router.push("/chats");
        break;
      case "join_workspace":
        router.push("/workspace");
        break;
    }
  }
    return (
      <DropdownMenu.Root >
        <DropdownMenu.Trigger asChild>
          <div className="bg-gray-200 rounded-md p-2 relative">
                      <BellIcon className="w-6 h-6"/>
            <div className="absolute top-0 right-0 bg-red-500 px-0.5 rounded-full">{num_unread_notifications}</div>
                  </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="flex flex-col gap-4 bg-white p-4 rounded-md text-lg border border-gray-400 w-[360px] w-full mt-6 text-center" >
  
        <DropdownMenu.Group className="flex flex-col gap-2">
            <DropdownMenu.Label className="font-semibold">Notifications</DropdownMenu.Label>
            {notifications?.map((notification) => (
              <DropdownMenu.Item key={notification.id} 
              className={clsx("flex items-center gap-2 bg-gray-200 p-2 rounded-md font-semibold", 
                notification.is_read && "bg-white font-normal", 
                notification.type === "platform_update" && "text-yellow-500",
                notification.type === "comment_tag" && "text-blue-500",
                notification.type === "access_granted" && "text-green-500",
                notification.type === "join_workspace" && "text-red-500"
                )} 
              onClick={() => handleNotificationClick(notification)}>
                {notification.type === "platform_update" ? <AvatarIcon className="w-4 h-4"/> : <FileTextIcon className="w-4 h-4"/>}
                {notification.text}
                </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
  
          <DropdownMenu.Separator className="" />
          <DropdownMenu.Group className="flex justify-end gap-4">
            <DropdownMenu.Label className="font-semibold">Add notification</DropdownMenu.Label>
            <DialogItem/>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  }

  export default DropdownWithDialog;