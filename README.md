## To Do List
 - A simple To-Do List created using Next.js, Prisma as the ORM for the Postgresql backend, and Next Auth (Google Auth) and JWT for Authentication
 - A user must login before they can create, update, view , and delete to-do list items.
 
 
 ## ListItem Schema
model ListItem {
  id        Int     @id @default(autoincrement())
  task      String
  priority  Boolean @default(false)
  finished  Boolean @default(false)
  timeStart String  @default("now")
}


## References refered to:
- https://nextjs.org/docs
- https://www.youtube.com/watch?v=C6eH6zsPgSk&ab_channel=LeoRoese
- https://www.youtube.com/watch?v=FMnlyi60avU&ab_channel=Prisma
- https://www.prisma.io/docs/concepts/components/prisma-client/crud#get-a-filtered-list-of-records
- https://www.youtube.com/watch?v=VputqwS4btU
- https://www.youtube.com/watch?v=iW39Merz0zE&ab_channel=ColbyFayock
- https://next-auth.js.org/configuration/options
- https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgres/

## Vercel Deployment
-  https://next-js-to-do-list-zeta.vercel.app
