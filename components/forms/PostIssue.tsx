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
import { Textarea } from "@/components/ui/textarea"
import * as z from "zod"
import { useRouter, usePathname } from 'next/navigation';
import  { updateUser }  from '@/lib/actions/user.actions';
import { IssueValidation } from '@/lib/validations/issue';
import { createIssue } from '@/lib/actions/issue.actions';
import { useOrganization } from '@clerk/nextjs';

interface Props {
    user:{
        id:string,
        objectId:string,
        username:string,
        name:string,
        bio:string,
        image:string,
    };
    btnTitle:string;
    }

function PostIssue({ userId }: {userId: string}) {
    const router = useRouter();
    const pathname = usePathname();
    const { organization } = useOrganization();

    const form = useForm({
        resolver: zodResolver(IssueValidation),
        defaultValues: {
            issue:'',
            accountId:userId,
        }
    });

    const onSubmit = async (values: z.infer<typeof IssueValidation>) => { 
      await createIssue(
        {
            text: values.issue,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname,
        });

        router.push('/');
    };

    return(
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
                Explain the Issue
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-gradient-to-r from-gray-800 via-gray-600 to-black text-light-1'>
                <Textarea
                  rows={20}
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
            Post Issue
        </Button>
            </form>
            /</Form>
    )
}

export default PostIssue;