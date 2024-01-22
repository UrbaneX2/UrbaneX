"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { useRouter, usePathname } from 'next/navigation';
import  { updateUser }  from '@/lib/actions/user.actions';
import { CommentValidation } from '@/lib/validations/issue';
// import { createIssue } from '@/lib/actions/issue.actions';

interface Props {
    issueId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({issueId, currentUserImg, currentUserId}: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            issue:'',
        }
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    //    await createIssue(
    //     {
    //         text: values.issue,
    //         author: userId,
    //         communityId: null,
    //         path: pathname,
    //     });

        router.push('/');
    return (
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="mt-10 flex flex-col justify-start gap-10">

           <FormField
          control={form.control}
          name='issue'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                comment
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-gradient-to-r from-gray-800 via-gray-600 to-black text-light-1'>
                <Input
                 type="text"
                 placeholder='Comment...'
                 className='no-focus text-light-1 outline-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <Button
        type='submit'
        className='bg-gradient-to-r from-gray-200 via-gray-400 to-black'
        >
            Post Comment
        </Button>
            </form>
            /</Form>
    )
};
};
export default Comment;