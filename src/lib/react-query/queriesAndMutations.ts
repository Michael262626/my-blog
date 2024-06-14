import {
    useMutation, useQuery,
    useQueryClient,
} from '@tanstack/react-query'

import {INewPost, INewUser, IUpdatePost} from "@/types";
import {createUserAccount, signInAccount, signOutAccount, createPost, updatePost, getRecentPosts} from "@/lib/appwrite/api.ts";
import {QUERY_KEYS} from "@/lib/react-query/queryKeys.ts";

export const useCreateUserAccount = () =>{
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}
export const useSignInAccount = () =>{
    return useMutation({
        mutationFn: (user: {
                             email: string,
                             password: string,
                         }) => signInAccount(user)
    })
}
export const useSignOutAccount = () =>{
    return useMutation({
        mutationFn: signOutAccount
    })
}
export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
        },
    });
};
export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
            });
        },
    });
};
export const useGetRecentPosts = ()=>{
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    });
};