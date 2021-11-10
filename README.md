## To Do List
 A simple To-Do List created using Next.js, Prisma as the ORM for the Postgresql backend, and Next Auth (Google Auth) and JWT for Authentication
 A user must login before they can create, update, view , and delete to-do list items.
 
 
 ## ListItem Schema
model ListItem {
  id        Int     @id @default(autoincrement())
  task      String
  priority  Boolean @default(false)
  finished  Boolean @default(false)
  timeStart String  @default("now")
}


## References used:
- https://nextjs.org/docs
- https://www.youtube.com/watch?v=C6eH6zsPgSk&ab_channel=LeoRoese
- https://www.youtube.com/watch?v=FMnlyi60avU&ab_channel=Prisma
