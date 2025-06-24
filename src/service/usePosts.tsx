import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addComment,
  addPost,
  deleteComment,
  deletePost,
  editComment,
  editPost,
  getPaginatedPosts,
  getPost,
  getPosts,
  getPostsByCategory,
} from "./blog";

export function usePostsQuery() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getPosts,
  });
}

export function usePostByCategoryQuery(category: string) {
  return useQuery({
    queryKey: ["blogs", category],
    queryFn: () => getPostsByCategory(category),
  });
}

export function usePostbySlug(slug: string) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getPost(slug),
  });
}

export function usePaginatedPostsQuery(
  searchQuery: string,
  selectedCategory: string,
  sortBy: "asc" | "desc" = "desc",
) {
  return useInfiniteQuery({
    queryKey: ["blogs", searchQuery, selectedCategory, sortBy],
    queryFn: ({ pageParam }) =>
      getPaginatedPosts(
        selectedCategory.toLowerCase(),
        sortBy,
        searchQuery,
        pageParam,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

export function usePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => addPost(formData),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useEditPostMutation() {
  return useMutation({
    mutationFn: ({ postId, formData }: { postId: string; formData: FormData }) =>
      editPost(postId, formData),
  });
}

export function useDeletePostMutation() {
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
  });
}

export function useAddComment() {
  return useMutation({
    mutationFn: (data: { comment: string; postId: string }) => addComment(data.postId, data.comment)
    
  });
}


export function useEditComment(){
  return useMutation({
    mutationFn: (data: { comment: string; commentId: string }) => editComment(data.commentId, data.comment),
  });
}


export function useDeleteCommentMutation() {
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId)
  });
}