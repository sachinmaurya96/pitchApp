import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/query"
import { writeClient } from "./sanity/lib/write-client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account, profile }) {
      // GitHub id is numeric; your schema's `id` is number → coerce to Number
      const githubId = Number(profile?.id ?? NaN)
      if (!Number.isFinite(githubId)) return false

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubId })

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: githubId,                // number (matches your schema)
          name: user.name,
          username: (profile as any)?.login,
          image: user.image,
          email: user.email,
          bio: (profile as any)?.bio || "",
        })
      }

      return true // ← CRUCIAL
    },

    async jwt({ token, account, profile }) {
      // Only on the initial OAuth callback do we get account/profile
      if (account && profile) {
        const githubId = Number(profile?.id ?? NaN)
        if (Number.isFinite(githubId)) {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubId })

          token.id = user?._id ?? null  // store Sanity _id (doc id)
        }
      }
      return token
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id ?? null }) // expose Sanity doc _id
      return session
    },
  },
})
