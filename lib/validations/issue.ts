import * as z from 'zod';

export const IssueValidation = z.object({
    issue: z.string(
        {required_error:"issue is required"}
    ).min(4, {message: 'Minimum 4 characters required'}).max(1000),
    accountId: z.string(),
});
export const CommentValidation = z.object({
    issue: z.string(
        {required_error:"issue is required"}
    ).min(4, {message: 'Minimum 4 characters required'}).max(1000),
});
