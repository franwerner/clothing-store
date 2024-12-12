import router from "@/router";
import { Entries, FromEntries, Keys } from "my-utilities";

declare global {
  interface ObjectConstructor {
    fromEntries<T>(array: T): FromEntries<T>;
    entries<T>(obj: T): Entries<T>;
    keys<T>(obj: T): Keys<T>;
  }
  type RouterState = Parameters<Parameters<typeof router.subscribe>[0]>[0]


}



export { }