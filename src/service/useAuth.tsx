import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./auth";


// export function useLoginMutation() {
//   return useMutation({
//     mutationFn: (identifier : string  , password: string) => loginUser(identifier, password),
//   });
// }