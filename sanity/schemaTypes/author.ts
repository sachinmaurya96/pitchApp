// ./schemas/user.ts
import { UserIcon } from "lucide-react";
import type { SchemaTypeDefinition } from "sanity";

const author: SchemaTypeDefinition = {
  name: "author",
  title: "Author",
  type: "document",
  icon:UserIcon,
  fields: [
    // Stable, provider-scoped ID so the same user never duplicates
    {
     name:"id",
     type:"number"
    },
    {
     name:"name",
     type:"string"
    },
    {
     name:"username",
     type:"string"
    },
    {
     name:"email",
     type:"string"
    },
    {
     name:"image",
     type:"url"
    },
    {
     name:"bio",
     type:"text"
    },

   
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};

export default author;
