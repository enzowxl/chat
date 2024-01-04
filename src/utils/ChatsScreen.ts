export class ChatsScreenUtils {
  filters(chats: any[], search: string) {
    const filterChats = [...chats].sort((a, b) => {
      if (a.favorite && !b.favorite) {
        return -1;
      } else if (!a.favorite && b.favorite) {
        return 1;
      }
      return 0;
    });

    const filterSearch =
      search.length > 0
        ? filterChats.filter((res) => {
            const fullName = `${res.name} ${res.lastName}`.toUpperCase();
            return fullName.includes(search.toUpperCase());
          })
        : [];

    const filterButton = filterChats.filter(
      (res) =>
        (res.unreadMessages > 0 &&
          res.name.toUpperCase().includes(search.toUpperCase())) ||
        res.favorite
    );

    return { filterChats, filterSearch, filterButton };
  }
}
