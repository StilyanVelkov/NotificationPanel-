"use client";

import { useEffect, useState } from "react";
import DropdownWithDialog, { Notification } from "@/components/DropdownWithDialog";
import { trpc } from "@/server/client";

export default function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const getNotifications = trpc.notification.getNotifications.useQuery();
  const unreadNotifications = notifications?.filter((notification: Notification) => !notification.is_read);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNotifications.refetch();
      if (data) setNotifications(data?.data || []);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div><DropdownWithDialog num_unread_notifications={unreadNotifications?.length} notifications={notifications}/></div>
    </div>
  );
}




