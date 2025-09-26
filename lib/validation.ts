import { z } from "zod";
export const formSchema = z.object({
  title: z.string().min(3, "Name must be at least 3 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  link: z.string().url("Please enter a valid URL").refine( async (url)=>{
    try{
        const res = await fetch(url,{method:'HEAD'})
        const contentType = res.headers.get('content-type')
        if(contentType && contentType.startsWith('image/')){
            return true
        }else{
            return false
        }
    }catch{
        return false
    }
  }),
  pitch: z.string().min(10, "Pitch must be at least 10 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
});
