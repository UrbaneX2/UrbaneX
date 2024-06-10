"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { useRouter, usePathname } from 'next/navigation';
import { CommentValidation } from '@/lib/validations/issue';
import Image from 'next/image';
import { addCommentToIssue } from '@/lib/actions/issue.actions';

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
       await addCommentToIssue(issueId, values.issue, JSON.parse(currentUserId), pathname);

       form.reset();
    }

    return (
        <Form {...form}>
      <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='issue'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt='current_user'
                  width={48}
                  height={48}
                  className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  {...field}
                  placeholder='Comment...'
                  className='no-focus text-light-1 outline-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='comment-form_btn'>
          Reply
        </Button>
      </form>
    </Form>
  );
}
export default Comment;

