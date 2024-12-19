import { z } from "zod";
import { procedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const notificationRouter = router({
    getNotifications: procedure.query(async () => {
        return await prisma.notification.findMany();
    }),

    addNotification: procedure.input(z.object({
        type: z.string(),
        person_name: z.string().optional(),
        reference_number: z.string().optional(),
        text: z.string(),
        is_read: z.boolean().optional()
    })).mutation(async (opts) => {
        const {input} = opts;
        await prisma.notification.create({
            data: {
                type: input.type,
                person_name: input.person_name,
                reference_number: input.reference_number,
                text: input.text,
                is_read: input.is_read
            }
        });
    }),
    updateNotification: procedure.input(z.object({
        id: z.number(),
        is_read: z.boolean()
    })).mutation(async (opts) => {
        const {input} = opts;
        await prisma.notification.update({
            where: {id: input.id},
            data: {is_read: input.is_read}
        });
    })
})


